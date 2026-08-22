"use client";
import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/config/site";
import { TelegramIcon } from "./Icons";
import s from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={s.header}>
      <div className={`container ${s.nav}`}>
        <Link href="#top" className={s.logo}>ខ្ចីប្រាក់ <span>iCloud</span></Link>
        <ul className={`${s.menu} ${isOpen ? s.open : ""}`}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setIsOpen(false)}>{l.label}</a></li>
          ))}
        </ul>
        <a className={`btn ${s.cta}`} href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer">
          <TelegramIcon /> ទាក់ទង Telegram: <span className="num">{SITE.phoneDisplay}</span>
        </a>
        <button className={s.burger} aria-label="menu" aria-expanded={isOpen} onClick={() => setIsOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
