"use client";
import { useState, type FormEvent } from "react";
import { SITE } from "@/config/site";
import { bi, biLines, biPair, inlineBi, splitBi } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";
import s from "./Contact.module.css";

type FormText = Dictionary["form"];

/** Nhãn hiển thị song ngữ phía trên ô nhập; placeholder chỉ là gợi ý ngắn. */
const buildFields = (t: FormText) => [
  { name: "name", type: "text", label: t.name },
  { name: "device", type: "text", label: t.device, placeholder: "iPhone 13 Pro" },
  { name: "amount", type: "text", label: t.amount, placeholder: `${SITE.loan.min} – ${SITE.loan.max}` },
  { name: "phone", type: "tel", label: t.phone, placeholder: inlineBi(t.phoneHint), pattern: "[0-9]{9,10}", maxLength: 10, inputMode: "numeric", title: inlineBi(t.phoneTitle) },
] as const;

const onlyDigits = (e: React.FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
};

type Status = "idle" | "sending" | "success" | "error" | "rate_limited";

export default function LeadForm({ t }: { t: FormText }) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 429) {
        setStatus("rate_limited");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const isSending = status === "sending";
  const error = splitBi(t.error);
  const telegramLink = <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer">Telegram</a>;

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h3>{biLines(t.title)}</h3>
      <p>{bi(t.desc)}</p>
      {buildFields(t).map((f) => (
        <label key={f.name}>
          <span className={s.caption}>{inlineBi(f.label)}</span>
          <input
            name={f.name}
            type={f.type}
            placeholder={"placeholder" in f ? f.placeholder : undefined}
            pattern={"pattern" in f ? f.pattern : undefined}
            maxLength={"maxLength" in f ? f.maxLength : undefined}
            inputMode={"inputMode" in f ? f.inputMode : undefined}
            title={"title" in f ? f.title : undefined}
            onInput={"inputMode" in f ? onlyDigits : undefined}
            required
            disabled={isSending}
          />
        </label>
      ))}
      <button type="submit" className={`btn ${s.submit}`} disabled={isSending}>
        <span className="bi-stack">{bi(isSending ? t.sending : t.submit)}</span>
      </button>
      {status === "success" && <div className={s.ok}>{bi(t.success)}</div>}
      {status === "rate_limited" && <div className={s.err}>{bi(t.rateLimited)}</div>}
      {status === "error" && (
        <div className={s.err}>
          {biPair(<>{error[0]} {telegramLink}</>, <>{error[1]} {telegramLink}</>)}
        </div>
      )}
    </form>
  );
}
