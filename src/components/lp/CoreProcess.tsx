"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Layers } from "lucide-react";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { card, iconCushionOrangeClass, type } from "@/lib/styles";
import { ProseText } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

interface CoreProcessProps {
  lang: Language;
  t: TranslationContent;
}

const icons = [Brain, Sparkles, Layers];

export function CoreProcess({ lang, t }: CoreProcessProps) {
  return (
    <Section id="process" tone="sage">
      <SectionHeader
        lang={lang}
        label={t.coreProcess.sectionLabel}
        title={t.coreProcess.title}
        intro={t.coreProcess.lead}
      />

      <div className="mb-12 grid min-w-0 gap-6 md:grid-cols-3">
        {t.coreProcess.steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <FadeInSection key={step.key} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`group h-full min-w-0 ${card.padded}`}
              >
                <div className={iconCushionOrangeClass}>
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className={type.stepSubtitle}>{step.subtitle}</p>
                <h3 className={`${type.cardTitle} mb-3`}>
                  <ProseText lang={lang}>{step.title}</ProseText>
                </h3>
                <p className={type.proseSm}>
                  <ProseText lang={lang}>{step.description}</ProseText>
                </p>
              </motion.div>
            </FadeInSection>
          );
        })}
      </div>

      <FadeInSection delay={0.3}>
        <p className={`${type.sectionIntroWide} text-center`}>
          <ProseText lang={lang}>{t.coreProcess.description}</ProseText>
        </p>
      </FadeInSection>
    </Section>
  );
}
