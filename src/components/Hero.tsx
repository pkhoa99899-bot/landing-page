import { SITE } from "@/config/site";
import { TelegramIcon, ThumbIcon } from "./Icons";
import s from "./Hero.module.css";

export default function Hero() {
  const { loan } = SITE;
  return (
    <section className={s.hero} id="top">
      <div className={s.bg} />
      <div className={`container ${s.inner}`}>
        <h1 className={s.title}>
          ខ្ចីប្រាក់រហ័សបំផុត<br />រហូតដល់ <span className="num">{loan.max}</span><br />គ្រាន់តែមាន iPhone
        </h1>

        <div className={s.row}>
          <ThumbIcon className={s.thumb} />
          <div className={s.sub}>
            <h3>ទទួលបានប្រាក់ក្នុងថ្ងៃតែមួយ</h3>
            <p>រហ័ស – ងាយស្រួល – សម្ងាត់</p>
          </div>
          <ThumbIcon className={`${s.thumb} ${s.flip}`} />
        </div>

        <h4 className={s.support}>គាំទ្រអតិថិជនដែលមាន {loan.device} ឡើងទៅ</h4>
        <div className={s.meta}>
          <div><b>ចំនួនកម្ចី:</b> អប្បបរមា <span className="num">{loan.min}</span> – អតិបរមា <span className="num">{loan.max}</span></div>
          <div><b>រយៈពេល:</b> អប្បបរមា {loan.minTerm} – អតិបរមា {loan.maxTerm}</div>
        </div>

        <div className={s.cta}>
          <a href="#dang-ky" className="btn btn--lg">ចុះឈ្មោះខ្ចីឥឡូវនេះ</a>
          <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className="btn btn--lg btn--ghost">
            <TelegramIcon /> ជជែកតាម Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
