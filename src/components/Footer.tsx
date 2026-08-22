import { NAV_LINKS, SITE } from "@/config/site";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div>Copyright © {new Date().getFullYear()} – {SITE.name}</div>
        <ul className={s.menu}>
          {NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
      </div>
    </footer>
  );
}
