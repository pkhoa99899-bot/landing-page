"use client";
import { useState, type FormEvent } from "react";
import { SITE } from "@/config/site";
import s from "./Contact.module.css";

const FIELDS = [
  { name: "name", type: "text", placeholder: "ឈ្មោះរបស់អ្នក" },
  { name: "device", type: "text", placeholder: "ម៉ូដែល iPhone (ឧ. iPhone 13 Pro)" },
  { name: "amount", type: "text", placeholder: `ចំនួនប្រាក់ចង់ខ្ចី (${SITE.loan.min} – ${SITE.loan.max})` },
  { name: "phone", type: "tel", placeholder: "លេខទូរស័ព្ទ (9–10 ខ្ទង់)", pattern: "[0-9]{9,10}", maxLength: 10, inputMode: "numeric", title: "លេខទូរស័ព្ទត្រូវមាន 9 ឬ 10 ខ្ទង់" },
] as const;

const onlyDigits = (e: React.FormEvent<HTMLInputElement>) => {
  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
};

type Status = "idle" | "sending" | "success" | "error" | "rate_limited";

export default function LeadForm() {
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
      <h3>ទុកព័ត៌មាន<br />ទទួលការប្រឹក្សា</h3>
      <p>ទុកព័ត៌មានតាមទម្រង់ខាងក្រោម ហើយក្រុមប្រឹក្សានឹងទាក់ទងទៅលោកអ្នកវិញដើម្បីប្រឹក្សាលម្អិត</p>
      {FIELDS.map((f) => (
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
        {isSending ? "កំពុងផ្ញើ..." : "ចុះឈ្មោះឥឡូវនេះ"}
      </button>
      {status === "success" && <div className={s.ok}>✅ បានទទួលព័ត៌មានរបស់អ្នកហើយ! យើងនឹងទាក់ទងទៅលោកអ្នកឆាប់ៗនេះ។</div>}
      {status === "rate_limited" && <div className={s.err}>⚠️ អ្នកបានផ្ញើច្រើនដងពេក។ សូមទាក់ទងផ្ទាល់តាមទូរស័ព្ទ ឬ Telegram។</div>}
      {status === "error" && (
        <div className={s.err}>
          ❌ ផ្ញើមិនបានជោគជ័យ។ សូមព្យាយាមម្តងទៀត ឬទាក់ទងផ្ទាល់តាម{" "}
          <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
      )}
    </form>
  );
}
