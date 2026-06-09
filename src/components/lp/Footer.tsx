"use client";

import { cn } from "@/lib/cn";
import { color } from "@/lib/colors";
import { layout } from "@/lib/styles";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { ProseText } from "./ProseText";

interface FooterProps {
  lang: Language;
  t: TranslationContent;
}

export function Footer({ lang, t }: FooterProps) {
  return (
    <footer className={cn("border-t", color.border.sage, color.bg.sage, "px-6 py-12")}>
      <div className={layout.container.lg}>
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <p className="heading-balance text-sm font-medium text-text">
            <ProseText lang={lang}>{t.footer.orgName}</ProseText>
          </p>
          <p className="text-xs tracking-widest text-text/50">{t.footer.orgNameEn}</p>
        </div>

        <p className="text-center text-xs text-text/50">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
