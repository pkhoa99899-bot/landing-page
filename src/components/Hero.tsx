import { SITE } from "@/config/site";
import { format, rich } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";
import { TelegramIcon, ThumbIcon } from "./Icons";
import s from "./Hero.module.css";

export default function Hero({ dict }: { dict: Dictionary }) {
  const { loan } = SITE;
  const t = dict.hero;
  const num = (v: string) => <span className="num">{v}</span>;
  return (
    <section className={s.hero} id="top">
      <div className={s.bg} />
      <div className={`container ${s.inner}`}>
        <h1 className={s.title}>
          {t.title.map((line, i) => (
            <span key={i}>{rich(line, { max: num(loan.max) })}{i < t.title.length - 1 && <br />}</span>
          ))}
        </h1>

        <div className={s.row}>
          <ThumbIcon className={s.thumb} />
          <div className={s.sub}>
            <h3>{t.subTitle}</h3>
            <p>{t.subText}</p>
          </div>
          <ThumbIcon className={`${s.thumb} ${s.flip}`} />
        </div>

        <h4 className={s.support}>{format(t.support, { device: loan.device })}</h4>
        <div className={s.meta}>
          <div><b>{t.amountLabel}</b> {rich(t.amount, { min: num(loan.min), max: num(loan.max) })}</div>
          <div><b>{t.termLabel}</b> {format(t.term, { min: dict.loan.minTerm, max: dict.loan.maxTerm })}</div>
        </div>

        <div className={s.cta}>
          <a href="#dang-ky" className="btn btn--lg">{t.ctaRegister}</a>
          <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className="btn btn--lg btn--ghost">
            <TelegramIcon /> {t.ctaTelegram}
          </a>
        </div>
      </div>
    </section>
  );
}
