import { NextResponse, after } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Apps Script có độ trễ thất thường (median ~2s, đuôi tới >30s).
 * Chờ tối đa CHO_NHANH_MS; quá thì trả lời ngay và ghi tiếp ở nền bằng after().
 */
const CHO_NHANH_MS = 3_000;
const WEBHOOK_TIMEOUT_MS = 25_000;
const TONG_NGAN_SACH_MS = 50_000;
const WEBHOOK_MAX_RETRIES = 2;
const WEBHOOK_RETRY_DELAY_MS = 800;

const FIELDS = ["name", "device", "amount", "phone"] as const;
type LeadField = (typeof FIELDS)[number];
type Lead = Record<LeadField, string>;
const MAX_LEN = 120;
const PHONE_RE = /^[0-9]{9,10}$/; // SĐT Campuchia: 9 hoặc 10 chữ số

const parseLead = (body: unknown): Lead | null => {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const entries = FIELDS.map((f) => [f, typeof raw[f] === "string" ? (raw[f] as string).trim().slice(0, MAX_LEN) : ""] as const);
  if (entries.some(([, v]) => !v)) return null;
  const lead = Object.fromEntries(entries) as Lead;
  return PHONE_RE.test(lead.phone) ? lead : null;
};

const clientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

/** Chặn CSRF: chỉ nhận request từ chính domain này (so khớp host chính xác). */
const isSameOrigin = (req: Request) => {
  const origin = req.headers.get("origin");
  if (!origin) return true; // curl / app native không gửi Origin
  const host = req.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Ghi vào Sheet, tự thử lại trong ngân sách. Không bao giờ throw (vì còn chạy ở nền). */
const ghiVaoSheet = async (webhook: string, payload: string, lead: Lead): Promise<boolean> => {
  const hanChot = Date.now() + TONG_NGAN_SACH_MS;
  let loiCuoi: unknown = null;

  for (let lan = 1; lan <= WEBHOOK_MAX_RETRIES; lan++) {
    const conLai = hanChot - Date.now();
    if (conLai <= 0) break;
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        signal: AbortSignal.timeout(Math.min(WEBHOOK_TIMEOUT_MS, conLai)),
      });
      if (!res.ok) throw new Error(`Sheet trả về ${res.status}`);
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!data?.ok) throw new Error(`Sheet từ chối: ${data?.error ?? "không rõ"}`);
      return true;
    } catch (err) {
      loiCuoi = err;
      console.error(`[lead] Lần ${lan}/${WEBHOOK_MAX_RETRIES} thất bại:`, err);
      if (lan < WEBHOOK_MAX_RETRIES && hanChot - Date.now() > WEBHOOK_RETRY_DELAY_MS) await sleep(WEBHOOK_RETRY_DELAY_MS);
    }
  }
  console.error("[lead] MẤT LEAD, không ghi được vào Sheet:", { loi: String(loiCuoi), lead });
  return false;
};

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  if (isRateLimited(clientIp(req))) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const lead = parseLead(await req.json().catch(() => null));
  if (!lead) return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });

  const webhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEET_SECRET;
  if (!webhook || !secret) {
    console.warn("[lead] Chưa cấu hình GOOGLE_SHEET_WEBHOOK_URL — lead:", lead);
    return NextResponse.json({ ok: false, error: "server_not_configured" }, { status: 500 });
  }

  const payload = JSON.stringify({
    secret,
    ...lead,
    client: req.headers.get("user-agent")?.includes("Mobile") ? "Mobile" : "Desktop",
  });

  const viec = ghiVaoSheet(webhook, payload, lead);
  const kipGhi = await Promise.race([viec, sleep(CHO_NHANH_MS).then(() => null)]);

  if (kipGhi === true) return NextResponse.json({ ok: true });
  if (kipGhi === false) return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });

  after(viec);
  console.warn("[lead] Sheet chậm, chuyển sang ghi nền:", lead);
  return NextResponse.json({ ok: true, pending: true });
}
