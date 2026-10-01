import { SITE } from "@/config/site";
import { bi, inlineBi } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";
import LeadForm from "./LeadForm";
import { PhoneIcon, PinIcon, TelegramIcon } from "./Icons";
import s from "./Contact.module.css";

export default function Contact({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  return (
    <section className={s.contact} id="dang-ky">
      <div className={`container ${s.wrap}`}>
        <LeadForm t={dict.form} />
        <div className={s.info}>
          <h2>{bi(t.title)}</h2>
          <p>{bi(t.desc)}</p>

          <div className={s.row}>
            <PinIcon />
            <div><small>{inlineBi(t.addressLabel)}</small><strong>{bi(t.address)}</strong></div>
          </div>
          <div className={s.row}>
            <PhoneIcon />
            <div><small>{inlineBi(t.phoneLabel)}</small><a className="num" href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a></div>
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
