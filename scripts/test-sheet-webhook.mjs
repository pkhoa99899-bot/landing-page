/**
 * Kiểm tra webhook Google Sheet đã hoạt động chưa.
 * Chạy:  node scripts/test-sheet-webhook.mjs
 * Đọc URL + khóa bí mật từ .env.local, ghi 1 dòng THỬ "KIEM TRA HE THONG" vào Sheet HSN.
 */
import { readFile } from "node:fs/promises";

const docEnv = (text) =>
  Object.fromEntries(
    text.split("\n").map((l) => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)).filter(Boolean).map((m) => [m[1], m[2].trim()]),
  );

const env = docEnv(await readFile(new URL("../.env.local", import.meta.url), "utf8").catch(() => ""));
const url = env.GOOGLE_SHEET_WEBHOOK_URL;
const secret = env.GOOGLE_SHEET_SECRET;

console.log("\n  Kiểm tra kết nối Google Sheet (HSN)\n  " + "-".repeat(46));
if (!url || !secret) {
  console.log("  ✗ Thiếu GOOGLE_SHEET_WEBHOOK_URL hoặc GOOGLE_SHEET_SECRET trong .env.local");
  console.log("    Làm theo docs/HUONG-DAN-GOOGLE-SHEET.md rồi chạy lại.\n");
  process.exit(1);
}

const goi = (body) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
  }).then((r) => r.text());

// 1) Deploy đã chạy chưa
const ping = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) }).then((r) => r.text()).catch((e) => "ERR " + e.message);
if (ping.includes('"ok":true')) console.log("  ✓ Bước 1/3 — Web App đang chạy");
else if (ping.includes("<html")) { console.log('  ✗ Bước 1/3 — Google trả về trang đăng nhập → Deploy chưa đặt "Who has access: Anyone".\n'); process.exit(1); }
else { console.log("  ✗ Bước 1/3 — không gọi được URL:", ping.slice(0, 120), "\n"); process.exit(1); }

// 2) Khóa bí mật
const sai = await goi({ secret: "khoa-sai-co-y", name: "x" });
console.log(sai.includes("sai-khoa") ? "  ✓ Bước 2/3 — khóa bí mật được kiểm tra đúng" : "  ✗ Bước 2/3 — Apps Script KHÔNG chặn khóa sai. Kiểm tra biến SECRET trong code.");

// 3) Ghi thử
const ket = await goi({ secret, name: "KIEM TRA HE THONG", device: "iPhone 13 Pro", amount: "500$", phone: "067767674", client: "Test" });
if (ket.includes('"ok":true')) {
  console.log("  ✓ Bước 3/3 — đã ghi được một dòng vào Sheet HSN");
  console.log('\n  HOÀN TẤT. Mở Sheet sẽ thấy dòng "KIEM TRA HE THONG" + 1 email về pkhoa99899@gmail.com. Xóa dòng đó đi là xong.\n');
} else {
  console.log("  ✗ Bước 3/3 — không ghi được. Phản hồi:", ket.slice(0, 200), "\n");
  process.exit(1);
}
