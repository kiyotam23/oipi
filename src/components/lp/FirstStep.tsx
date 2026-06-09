"use client";

import { ArrowRight } from "lucide-react";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { color } from "@/lib/colors";
import { inlineSectionLabelClass, type } from "@/lib/styles";
import { ProseText, SectionTitle } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { ImageVisualPanel } from "./ImageVisualPanel";

interface FirstStepProps {
  lang: Language;
  t: TranslationContent;
}

export function FirstStep({ lang, t }: FirstStepProps) {
  return (
    <section
      id="first-step"
      className="relative min-h-[min(42vh,400px)] overflow-hidden py-12 lg:min-h-[min(44vh,420px)] lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[clamp(340px,50vw,780px)] lg:block"
        aria-hidden
      >
        <ImageVisualPanel
          src="/our_first_step.png"
          particleId="tsparticles-first-step"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl min-w-0 px-6">
        <FadeInSection>
          <div className="max-w-lg lg:max-w-[min(100%,480px)]">
            <p className={`mb-3 ${inlineSectionLabelClass}`}>{t.firstStep.sectionLabel}</p>

            <SectionTitle lang={lang} className={`${type.sectionTitleMb.default} ${type.sectionTitle}`}>
              {t.firstStep.title}
            </SectionTitle>

            <div className="relative -mx-6 mb-8 h-36 sm:h-44 lg:hidden">
              <ImageVisualPanel
                src="/our_first_step.png"
                particleId="tsparticles-first-step-mobile"
                sizes="100vw"
              />
            </div>

            <p className={`${type.proseBody} mb-8 max-w-md`}>
              <ProseText lang={lang}>{t.firstStep.description}</ProseText>
            </p>

            <button
              type="button"
              disabled
              aria-disabled="true"
              className={`inline-flex cursor-not-allowed items-center gap-2 rounded-full ${color.bg.goldLight} px-6 py-3 text-sm font-semibold tracking-wide ${color.text.label} opacity-90 ring-1 ring-label/25 transition-opacity`}
            >
              {t.firstStep.ctaLabel}
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
            </button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
