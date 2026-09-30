import { NAV_LINKS } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import s from "./Footer.module.css";

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div>Copyright © {new Date().getFullYear()} – {dict.siteName}</div>
        <ul className={s.menu}>
          {NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{dict.nav[l.key]}</a></li>)}
        </ul>
      </div>
    </footer>
  );
}
