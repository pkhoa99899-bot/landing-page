import { SITE } from "@/config/site";
import { PhoneIcon, TelegramIcon } from "./Icons";
import s from "./FloatButtons.module.css";

export default function FloatButtons() {
  return (
    <div className={s.float}>
      <a className={s.call} href={`tel:${SITE.phone}`} aria-label="ទូរស័ព្ទ"><PhoneIcon /></a>
      <a className={s.tg} href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><TelegramIcon /></a>
    </div>
  );
}
