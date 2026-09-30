import type { Dictionary } from "@/i18n/dictionaries";
import { BoltIcon, HeartIcon, ListIcon, ShieldIcon } from "./Icons";
import s from "./WhyUs.module.css";

const ICONS = [ListIcon, BoltIcon, ShieldIcon, HeartIcon];

export default function WhyUs({ dict }: { dict: Dictionary }) {
  const [line1, line2] = dict.whyUs.title;
  return (
    <section className={s.why}>
      <div className={`container ${s.inner}`}>
        <h2>{line1}<br />{line2}</h2>
        <div className={s.grid}>
          {dict.whyUs.reasons.map((text, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div className={s.item} key={text}>
                <div className={s.icon}><Icon /></div>
                <p>{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
