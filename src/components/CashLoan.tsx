import Image from "next/image";
import { SITE } from "@/config/site";
import { format } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";
import { CheckIcon, ClockIcon, StarIcon, UserIcon } from "./Icons";
import s from "./CashLoan.module.css";

const ICONS = [UserIcon, ClockIcon, CheckIcon, StarIcon];

export default function CashLoan({ dict }: { dict: Dictionary }) {
  const t = dict.cashLoan;
  return (
    <section className={s.cash} id="doi-tuong">
      <div className={`container ${s.wrap}`}>
        <div className={s.img}>
          <Image src="/images/user.png" alt={t.imageAlt} width={650} height={975} />
        </div>
        <div>
          <h2>{t.title} <small>{t.tagline}</small></h2>
          <div className={s.grid}>
            {t.features.map(({ title, lines }, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              return (
                <div className={s.feat} key={title}>
                  <div className={s.featIcon}><Icon /></div>
                  <div>
                    <span>{title}</span>
                    <p>{lines.map((l, i) => <span key={i}>{format(l, { device: SITE.loan.device })}{i < lines.length - 1 && <br />}</span>)}</p>
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
