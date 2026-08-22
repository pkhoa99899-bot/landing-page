import { SITE } from "@/config/site";
import LeadForm from "./LeadForm";
import { PhoneIcon, PinIcon, TelegramIcon } from "./Icons";
import s from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={s.contact} id="dang-ky">
      <div className={`container ${s.wrap}`}>
        <LeadForm />
        <div className={s.info}>
          <h2>ទាក់ទងមកយើង</h2>
          <p>ទទួលប្រាក់រហ័ស – ធានារក្សាព័ត៌មានសម្ងាត់! សូមទូរស័ព្ទមកយើង ឬចុះឈ្មោះតាមទម្រង់ខាងក្បែរ។ យើងនឹងទាក់ទងទៅលោកអ្នកវិញឱ្យបានឆាប់បំផុត!</p>

          <div className={s.row}>
            <PinIcon />
            <div><small>អាសយដ្ឋាន</small><strong>ប្រព័ន្ធសាខារីករាលដាលទូទាំងប្រទេសកម្ពុជា</strong></div>
          </div>
          <div className={s.row}>
            <PhoneIcon />
            <div><small>ទាក់ទងប្រឹក្សា</small><a className="num" href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a></div>
          </div>
          <div className={s.row}>
            <TelegramIcon />
            <div><small>Telegram</small><a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer">@{SITE.telegramUser}</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
