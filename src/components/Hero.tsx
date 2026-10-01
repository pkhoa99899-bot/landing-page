import type { ReactNode } from "react";
import { SITE } from "@/config/site";
import { bi, biLines, biPair, format, rich, splitBi } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";
import { TelegramIcon, ThumbIcon } from "./Icons";
import s from "./Hero.module.css";

const num = (v: string) => <span className="num">{v}</span>;

/** Một dòng "nhãn: giá trị" song ngữ — `render` nhận (giá trị, vị trí 0 = Khmer | 1 = English). */
const metaRow = (label: string, value: string, render: (part: string, index: number) => ReactNode) => {
  const labels = splitBi(label);
  const [km, en] = splitBi(value).map((part, i) => <><b>{labels[i]}</b> {render(part, i)}</>);
  return biPair(km, en);
};

export default function Hero({ dict }: { dict: Dictionary }) {
  const { loan } = SITE;
  const t = dict.hero;
  const minTerm = splitBi(dict.loan.minTerm);
  const maxTerm = splitBi(dict.loan.maxTerm);
  const amountVars = { min: num(loan.min), max: num(loan.max) };
  return (
    <section className={s.hero} id="top">
      <div className={s.bg} />
      <div className={`container ${s.inner}`}>
        <h1 className={s.title}>{biLines(t.title, (part) => rich(part, { max: num(loan.max) }))}</h1>

        <div className={s.row}>
          <ThumbIcon className={s.thumb} />
          <div className={s.sub}>
            <h3>{bi(t.subTitle)}</h3>
            <p>{bi(t.subText)}</p>
          </div>
          <ThumbIcon className={`${s.thumb} ${s.flip}`} />
        </div>

        <h4 className={s.support}>{bi(format(t.support, { device: loan.device }))}</h4>
        <div className={s.meta}>
          <div>{metaRow(t.amountLabel, t.amount, (part) => rich(part, amountVars))}</div>
          <div>{metaRow(t.termLabel, t.term, (part, i) => format(part, { min: minTerm[i], max: maxTerm[i] }))}</div>
        </div>

        <div className={s.cta}>
          <a href="#dang-ky" className="btn btn--lg"><span className="bi-stack">{bi(t.ctaRegister)}</span></a>
          <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className="btn btn--lg btn--ghost">
            <TelegramIcon /> <span className="bi-stack">{bi(t.ctaTelegram)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
