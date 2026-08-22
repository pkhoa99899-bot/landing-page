import Image from "next/image";
import { SITE } from "@/config/site";
import { CheckIcon, ClockIcon, StarIcon, UserIcon } from "./Icons";
import s from "./CashLoan.module.css";

const FEATURES = [
  { Icon: UserIcon, title: "អ្នកអាចខ្ចី", lines: ["– ពលរដ្ឋកម្ពុជា", `– មានទូរស័ព្ទ ${SITE.loan.device} ឡើងទៅ`] },
  { Icon: ClockIcon, title: "រហ័ស", lines: ["អនុម័តក្នុងរយៈពេល 15 នាទី"] },
  { Icon: CheckIcon, title: "សាមញ្ញ", lines: ["នីតិវិធីសាមញ្ញ អនុម័តតាមអនឡាញ"] },
  { Icon: StarIcon, title: "ជឿជាក់", lines: ["បទពិសោធន៍ជាង 15 ឆ្នាំ ជាមួយសាខារាប់សិបទូទាំងប្រទេស"] },
];

export default function CashLoan() {
  return (
    <section className={s.cash} id="doi-tuong">
      <div className={`container ${s.wrap}`}>
        <div className={s.img}>
          <Image src="/images/user.png" alt="បុគ្គលិកប្រឹក្សា" width={650} height={975} />
        </div>
        <div>
          <h2>ខ្ចីប្រាក់សុទ្ធ <small>រហ័ស – ជឿជាក់ – សម្ងាត់</small></h2>
          <div className={s.grid}>
            {FEATURES.map(({ Icon, title, lines }) => (
              <div className={s.feat} key={title}>
                <div className={s.featIcon}><Icon /></div>
                <div>
                  <span>{title}</span>
                  <p>{lines.map((l, i) => <span key={i}>{l}{i < lines.length - 1 && <br />}</span>)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
