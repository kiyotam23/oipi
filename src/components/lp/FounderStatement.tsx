"use client";

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

          <div className="text-center sm:text-left">
            <p className={type.cardHeading}>{t.founder.name}</p>
            <p className={`mt-1 ${type.meta}`}>{t.founder.nameEn}</p>
            <p className={`mt-3 ${type.meta} ${color.text.accent}`}>{t.founder.role}</p>
            <p className={`mt-1 ${type.metaSubtle}`}>{t.founder.affiliation}</p>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-8 text-center sm:text-left">
            <p className={type.meta}>{t.founder.date}</p>
            <p className={`mt-2 ${type.proseLead}`}>
              <ProseText lang={lang}>{t.founder.orgName}</ProseText>
            </p>
          </div>
        </div>
      </FadeInSection>
    </Section>
  );
}
