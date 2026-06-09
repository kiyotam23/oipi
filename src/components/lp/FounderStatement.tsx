"use client";

import { User } from "lucide-react";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { color } from "@/lib/colors";
import { card, sectionLabelClass, type } from "@/lib/styles";
import { ProseText, SectionTitle } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { Section } from "./Section";

interface FounderStatementProps {
  lang: Language;
  t: TranslationContent;
}

export function FounderStatement({ lang, t }: FounderStatementProps) {
  return (
    <Section id="founder" width="sm">
      <FadeInSection>
        <div className={card.bordered}>
          <p className={sectionLabelClass}>{t.founder.sectionLabel}</p>
          <SectionTitle
            lang={lang}
            className={`${type.sectionTitleMb.founder} ${type.sectionTitle}`}
          >
            {t.founder.title}
          </SectionTitle>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${color.bg.sageLight}`}>
              <User className={`h-8 w-8 ${color.text.accent}`} strokeWidth={1.5} />
            </div>
            <div className="min-w-0 text-center sm:text-left">
              <p className={type.cardTitle}>{t.founder.name}</p>
              <p className="mt-1 text-sm text-text/70">{t.founder.nameEn}</p>
              <p className={`mt-3 text-sm ${color.text.accent}`}>{t.founder.role}</p>
              <p className="mt-1 text-sm text-text/50">{t.founder.affiliation}</p>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-8 text-center sm:text-left">
            <p className="text-sm text-text/70">{t.founder.date}</p>
            <p className="heading-balance mt-2 text-base font-medium text-text">
              <ProseText lang={lang}>{t.founder.orgName}</ProseText>
            </p>
          </div>
        </div>
      </FadeInSection>
    </Section>
  );
}
