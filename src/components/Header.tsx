"use client";
import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/config/site";
import { localeHome, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { TelegramIcon } from "./Icons";
import s from "./Header.module.css";

type Props = { dict: Dictionary; lang: Locale };

export default function Header({ dict, lang }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const otherLang: Locale = lang === "km" ? "en" : "km";
  return (
    <header className={s.header}>
      <div className={`container ${s.nav}`}>
        <Link href="#top" className={s.logo}>{dict.header.logo} <span>iCloud</span></Link>
        <ul className={`${s.menu} ${isOpen ? s.open : ""}`}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setIsOpen(false)}>{dict.nav[l.key]}</a></li>
          ))}
        </ul>
        <div className={s.actions}>
          <a className={`btn ${s.cta}`} href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer">
            <TelegramIcon /> {dict.header.cta} <span className="num">{SITE.phoneDisplay}</span>
          </a>
          <Link className={s.lang} href={localeHome(otherLang)} hrefLang={otherLang} lang={otherLang} aria-label={dict.header.switchAria}>
            {dict.header.switchLabel}
          </Link>
          <button className={s.burger} aria-label={dict.header.menu} aria-expanded={isOpen} onClick={() => setIsOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
