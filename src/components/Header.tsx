"use client";
import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { bi, inlineBi, splitBi } from "@/i18n/format";
import { TelegramIcon } from "./Icons";
import s from "./Header.module.css";

export default function Header({ dict }: { dict: Dictionary }) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoKm, logoEn] = splitBi(dict.header.logo);
  return (
    <header className={s.header}>
      <div className={`container ${s.nav}`}>
        <Link href="#top" className={s.logo}><span lang="km">{logoKm}</span> <span className={s.brand}>iCloud</span> {logoEn}</Link>
        <ul className={`${s.menu} ${isOpen ? s.open : ""}`}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setIsOpen(false)}>{bi(dict.nav[l.key])}</a></li>
          ))}
        </ul>
        <a className={`btn ${s.cta}`} href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer">
          <TelegramIcon /> {inlineBi(dict.header.cta)} Telegram: <span className="num">{SITE.phoneDisplay}</span>
        </a>
        <button className={s.burger} aria-label={inlineBi(dict.header.menu)} aria-expanded={isOpen} onClick={() => setIsOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
