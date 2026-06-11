"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { type } from "@/lib/styles";
import { LanguageToggle } from "./LanguageToggle";
import { TachibanaLogo } from "./TachibanaLogo";
import { ProseText } from "./ProseText";

interface HeaderProps {
  lang: Language;
  t: TranslationContent;
  onLangChange: (lang: Language) => void;
}

const navItems = [
  { key: "about", href: "#about" },
  { key: "process", href: "#process" },
  { key: "framework", href: "#framework" },
  { key: "activities", href: "#activities" },
  { key: "founder", href: "#founder" },
] as const;

export function Header({ lang, t, onLangChange }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl min-w-0 items-center justify-between gap-5 px-6 py-4.5">
        <a href="#" className="group min-w-0 max-w-[calc(100%-9rem)] shrink sm:max-w-lg">
          <TachibanaLogo
            lang={lang}
            line1={
              lang === "ja"
                ? t.header.orgNameFull
                : t.header.orgNameShort
            }
            line2={
              lang === "ja"
                ? t.header.orgNameShort
                : t.header.orgNameFull
            }
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={type.navLink}
            >
              <ProseText lang={lang}>{t.nav[item.key]}</ProseText>
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageToggle lang={lang} onToggle={onLangChange} />
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800 sm:flex"
          >
            <Mail className="h-4 w-4" />
            {t.nav.contact}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
