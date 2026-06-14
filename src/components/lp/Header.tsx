"use client";

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
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4.5 lg:gap-4">
        <a href="#" className="group shrink-0">
          <TachibanaLogo
            line1={lang === "ja" ? t.header.orgNameFull : t.header.orgNameShort}
            line2={lang === "ja" ? t.header.orgNameShort : t.header.orgNameFull}
          />
        </a>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-6" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`${type.navLink} whitespace-nowrap`}
            >
              <ProseText lang={lang}>{t.nav[item.key]}</ProseText>
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageToggle lang={lang} onToggle={onLangChange} />
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-all hover:bg-slate-800 sm:flex"
          >
            <Mail className="h-4 w-4" />
            {t.nav.contact}
          </button>
        </div>
      </div>
    </header>
  );
}
