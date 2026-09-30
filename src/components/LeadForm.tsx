"use client";
import { useState, type FormEvent } from "react";
import { SITE } from "@/config/site";
import { format } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";
import s from "./Contact.module.css";

type FormText = Dictionary["form"];

const buildFields = (t: FormText) => [
  { name: "name", type: "text", placeholder: t.name },
  { name: "device", type: "text", placeholder: t.device },
  { name: "amount", type: "text", placeholder: format(t.amount, { min: SITE.loan.min, max: SITE.loan.max }) },
  { name: "phone", type: "tel", placeholder: t.phone, pattern: "[0-9]{9,10}", maxLength: 10, inputMode: "numeric", title: t.phoneTitle },
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

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h3>{t.title[0]}<br />{t.title[1]}</h3>
      <p>{t.desc}</p>
      {buildFields(t).map((f) => (
        <label key={f.name}>
          <input
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
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
        {isSending ? t.sending : t.submit}
      </button>
      {status === "success" && <div className={s.ok}>{t.success}</div>}
      {status === "rate_limited" && <div className={s.err}>{t.rateLimited}</div>}
      {status === "error" && (
        <div className={s.err}>
          {t.error}{" "}
          <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
      )}
    </form>
  );
}
