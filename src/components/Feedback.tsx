import Image from "next/image";
import { SITE } from "@/config/site";
import { bi, biPair, format, inlineBi, splitBi } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries";
import s from "./Feedback.module.css";

export default function Feedback({ dict }: { dict: Dictionary }) {
  const t = dict.feedback;
  const galleryTitle = splitBi(t.galleryTitle);
  const gallerySub = splitBi(t.gallerySub);
  return (
    <section className={s.feedback}>
      <div className={`container ${s.inner}`}>
        <h2 className={`sec-title ${s.title}`}>{bi(t.title)}</h2>
        <p className={`sec-desc ${s.desc}`}>{bi(t.desc)}</p>
        <div className={s.grid}>
          {SITE.feedbackVideos.map((v, i) => (
            <div className={`${s.video} ${v.orientation === "tall" ? s.tall : s.wide}`} key={v.id}>
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={inlineBi(format(t.videoTitle, { n: String(i + 1) }))}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>

        <h3 className={s.galleryTitle}>
          {biPair(<>{galleryTitle[0]} <span className={s.hl}>{gallerySub[0]}</span></>, <>{galleryTitle[1]} <span className={s.hl}>{gallerySub[1]}</span></>)}
        </h3>
        <div className={s.gallery}>
          {SITE.feedbackPhotos.map((src, i) => (
            <div className={s.photo} key={src}>
              <Image src={src} alt={inlineBi(format(t.photoAlt, { n: String(i + 1) }))} fill sizes="(max-width: 768px) 50vw, 25vw" />
              <span className={s.badge}>{bi(t.badge)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
