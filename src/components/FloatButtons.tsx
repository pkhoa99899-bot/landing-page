import { SITE } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { inlineBi } from "@/i18n/format";
import { PhoneIcon, TelegramIcon } from "./Icons";
import s from "./FloatButtons.module.css";

export default function FloatButtons({ dict }: { dict: Dictionary }) {
  return (
    <div className={s.float}>
      <a className={s.call} href={`tel:${SITE.phone}`} aria-label={inlineBi(dict.contact.callAria)}><PhoneIcon /></a>
      <a className={s.tg} href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><TelegramIcon /></a>
    </div>
  );
}
