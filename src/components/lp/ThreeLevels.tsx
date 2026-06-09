"use client";

import { Heart, TrendingUp, Eye } from "lucide-react";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { levelIconCushionClass, type } from "@/lib/styles";
import { ProseText } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

interface ThreeLevelsProps {
  lang: Language;
  t: TranslationContent;
}

const levelIcons = [Heart, TrendingUp, Eye];

export function ThreeLevels({ lang, t }: ThreeLevelsProps) {
  return (
    <Section id="framework">
      <SectionHeader
        lang={lang}
        label={t.threeLevels.sectionLabel}
        title={t.threeLevels.title}
        intro={t.threeLevels.intro}
        introWidth="3xl"
      />

      <div className="space-y-6">
        {t.threeLevels.levels.map((level, i) => {
          const Icon = levelIcons[i];
          return (
            <FadeInSection key={level.key} delay={i * 0.1}>
              <div className="flex min-w-0 flex-col gap-6 rounded-lg bg-white p-8 shadow-sm sm:flex-row sm:items-start">
                <div className={levelIconCushionClass}>
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xs font-mono tracking-widest text-text/40">
                      {level.number}
                    </span>
                    <h3 className={type.cardTitle}>
                      <ProseText lang={lang} className="inline">
                        {level.subtitle}
                      </ProseText>
                    </h3>
                    <span className="text-sm text-text/50">
                      — {level.title}
                    </span>
                  </div>
                  <p className={type.proseBody}>
                    <ProseText lang={lang}>{level.description}</ProseText>
                  </p>
                </div>
              </div>
            </FadeInSection>
          );
        })}
      </div>

      <FadeInSection delay={0.3} className="mt-16 space-y-4 text-center">
        <p className={type.proseBodyEmphasis}>
          <ProseText lang={lang}>{t.threeLevels.tradition}</ProseText>
        </p>
        <p className={type.sectionIntroWide}>
          <ProseText lang={lang}>{t.threeLevels.traditionDetail}</ProseText>
        </p>
      </FadeInSection>
    </Section>
  );
}
