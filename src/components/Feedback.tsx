import Image from "next/image";
import { SITE } from "@/config/site";
import s from "./Feedback.module.css";

export default function Feedback() {
  return (
    <section className={s.feedback}>
      <div className={`container ${s.inner}`}>
        <h2 className={`sec-title ${s.title}`}>មតិយោបល់ពីអតិថិជន</h2>
        <p className={`sec-desc ${s.desc}`}>អតិថិជនរាប់ពាន់នាក់បានទុកចិត្ត និងទទួលបានប្រាក់កម្ចីរហ័សពីយើង</p>
        <div className={s.grid}>
          {SITE.feedbackVideos.map((v, i) => (
            <div className={`${s.video} ${v.orientation === "tall" ? s.tall : s.wide}`} key={v.id}>
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={`មតិយោបល់អតិថិជន ${i + 1}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>

        <h3 className={s.galleryTitle}>រូបភាពអតិថិជន <span>ទទួលបានប្រាក់ជោគជ័យ</span></h3>
        <div className={s.gallery}>
          {SITE.feedbackPhotos.map((src, i) => (
            <div className={s.photo} key={src}>
              <Image src={src} alt={`អតិថិជនទទួលបានប្រាក់កម្ចី ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" />
              <span className={s.badge}>ទទួលបានប្រាក់</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
