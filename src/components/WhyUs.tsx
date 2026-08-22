import { BoltIcon, HeartIcon, ListIcon, ShieldIcon } from "./Icons";
import s from "./WhyUs.module.css";

const REASONS = [
  { Icon: ListIcon, text: "ទម្រង់កម្ចីចម្រុះ (តាមថ្ងៃ ឬខែ) ដោយមិនចាំបាច់បញ្ជាក់ប្រាក់ចំណូល មិនចាំបាច់ទ្រព្យបញ្ចាំ" },
  { Icon: BoltIcon, text: "មិនចាំបាច់ពិនិត្យឯកសារ។ ទទួលបានប្រាក់ក្នុងរយៈពេល 5 នាទី" },
  { Icon: ShieldIcon, text: "ទំហំកម្ចីខ្ពស់ រយៈពេលបត់បែន រក្សាព័ត៌មានសម្ងាត់ 100%" },
  { Icon: HeartIcon, text: "គាំទ្រអ្នកមានប្រវត្តិបំណុលអាក្រក់ មិនចាំបាច់ទ្រព្យបញ្ចាំ" },
];

export default function WhyUs() {
  return (
    <section className={s.why}>
      <div className={`container ${s.inner}`}>
        <h2>ហេតុអ្វីបានជាអតិថិជន<br />ជ្រើសរើសយើង?</h2>
        <div className={s.grid}>
          {REASONS.map(({ Icon, text }) => (
            <div className={s.item} key={text}>
              <div className={s.icon}><Icon /></div>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
