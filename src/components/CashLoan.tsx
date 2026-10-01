import Image from "next/image";
import { SITE } from "@/config/site";
import { bi, biPair, format, inlineBi, splitBi } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";
import { CheckIcon, ClockIcon, StarIcon, UserIcon } from "./Icons";
import s from "./CashLoan.module.css";

const ICONS = [UserIcon, ClockIcon, CheckIcon, StarIcon];

export default function CashLoan({ dict }: { dict: Dictionary }) {
  const t = dict.cashLoan;
  const title = splitBi(t.title);
  const tagline = splitBi(t.tagline);
  return (
    <section className={s.cash} id="doi-tuong">
      <div className={`container ${s.wrap}`}>
        <div className={s.img}>
          <Image src="/images/user.png" alt={inlineBi(t.imageAlt)} width={650} height={975} />
        </div>
        <div>
          <h2>{biPair(<>{title[0]} <small>{tagline[0]}</small></>, <>{title[1]} <small>{tagline[1]}</small></>)}</h2>
          <div className={s.grid}>
            {t.features.map(({ title: featTitle, lines }, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              return (
                <div className={s.feat} key={featTitle}>
                  <div className={s.featIcon}><Icon /></div>
                  <div>
                    <span>{bi(featTitle)}</span>
                    <p>{lines.map((l, i) => <span className={s.line} key={i}>{bi(format(l, { device: SITE.loan.device }))}</span>)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
