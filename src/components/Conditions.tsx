import { SITE } from "@/config/site";
import { bi, rich } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";
import { DiamondIcon } from "./Icons";
import s from "./Conditions.module.css";

const { loan } = SITE;
const VARS = {
  device: <b>{loan.device}</b>,
  min: <b className="num">{loan.min}</b>,
  max: <b className="num">{loan.max}</b>,
};
const withVars = (part: string) => rich(part, VARS);

export default function Conditions({ dict }: { dict: Dictionary }) {
  const t = dict.conditions;
  return (
    <section className={s.cond}>
      <div className={s.bg} />
      <div className={`container ${s.inner}`}>
        <div className={s.card}>
          <div className={s.head}>{bi(t.title)}</div>
          <div className={s.body}>
            <div className={s.grid}>
              {t.items.map((c) => (
                <div className={s.item} key={c.title}>
                  <div className={s.dot}><DiamondIcon /></div>
                  <span>{bi(c.title)}</span>
                  <p>{c.lines.map((l, i) => <span className={s.line} key={i}>{bi(l, withVars)}</span>)}</p>
                </div>
              ))}
            </div>
            <p className={s.note}>{bi(t.note)}</p>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.head}>{bi(t.methodTitle)}</div>
          <div className={`${s.body} ${s.method}`}>
            {t.method.map((p) => <p key={p}>{bi(p)}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
