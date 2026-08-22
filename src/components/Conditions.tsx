import { SITE } from "@/config/site";
import { DiamondIcon } from "./Icons";
import s from "./Conditions.module.css";

const { loan } = SITE;

const CONDITIONS = [
  { title: "អ្នកអាចខ្ចី", body: <>– ពលរដ្ឋអាយុ 18 ឆ្នាំឡើងទៅ<br />– គ្រាន់តែមាន <b>{loan.device}</b> ឡើងទៅ</> },
  { title: "កញ្ចប់កម្ចី", body: <>– កញ្ចប់កម្ចីពី <b className="num">{loan.min}</b> ដល់ <b className="num">{loan.max}</b><br />– ខ្ចីតាមរយៈឧបករណ៍ iCloud <b>({loan.device} ឡើងទៅ)</b></> },
  { title: "បង់រំលោះចម្រុះ", body: <>– តាមថ្ងៃ ឬតាមខែ<br />– តាមការព្រមព្រៀង</> },
];

export default function Conditions() {
  return (
    <section className={s.cond}>
      <div className={s.bg} />
      <div className={`container ${s.inner}`}>
        <div className={s.card}>
          <div className={s.head}>លក្ខខណ្ឌកម្ចី</div>
          <div className={s.body}>
            <div className={s.grid}>
              {CONDITIONS.map((c) => (
                <div className={s.item} key={c.title}>
                  <div className={s.dot}><DiamondIcon /></div>
                  <span>{c.title}</span>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            <p className={s.note}>** ប្រឹក្សារៀបចំឯកសារអនឡាញ 24/7 ដោយឥតគិតថ្លៃ ធានាមិនមានថ្លៃបន្ថែម</p>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.head}>វិធីសាស្ត្រ</div>
          <div className={`${s.body} ${s.method}`}>
            <p>បន្ទាប់ពីទទួលបានព័ត៌មានរបស់លោកអ្នក ក្រុមបុគ្គលិកដែលមានបទពិសោធន៍ និងប្រព័ន្ធសាខាដែលរីករាលដាលទូទាំងប្រទេសកម្ពុជា នឹងផ្តល់ការប្រឹក្សា និងបម្រើលោកអ្នកដល់ទីកន្លែង។</p>
            <p>ផ្នែកវាយតម្លៃធ្វើការដោយភាពប៉ិនប្រសប់ និងសុភាពរាបសា ទាំងធានារក្សាព័ត៌មានរបស់លោកអ្នកឱ្យមានសុវត្ថិភាព ទាំងអាចពិនិត្យប្រភពចំណូលប្រចាំថ្ងៃបានត្រឹមត្រូវ និងវាស់កម្រិតទំនុកចិត្តរបស់អ្នកខ្ចី។</p>
          </div>
        </div>
      </div>
    </section>
  );
}
