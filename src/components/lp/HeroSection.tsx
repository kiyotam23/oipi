"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import type { TranslationContent } from "@/lib/i18n";
import type { Language } from "@/types/i18n";
import { color } from "@/lib/colors";
import { type } from "@/lib/styles";
import { ProseText } from "./ProseText";
import { FadeInSection } from "./FadeInSection";
import { HeroVisual } from "./HeroVisual";

interface HeroSectionProps {
  lang: Language;
  t: TranslationContent;
}

export function HeroSection({ lang, t }: HeroSectionProps) {
  return (
    <section id="about" className="relative overflow-hidden pb-24 pt-20">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[clamp(420px,58vw,920px)] lg:block"
        aria-hidden
      >
        <HeroVisual />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl min-w-0 px-6">
        <div className="max-w-xl text-center lg:max-w-[min(100%,540px)] lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-balance mb-4 text-3xl font-light leading-tight tracking-tight text-text sm:text-4xl md:text-5xl"
          >
            {lang === "ja" ? (
              <>
                <span className="inline-block max-w-full">岡山サイケデリック</span>
                <span className="inline-block max-w-full">精神医療研究会</span>
              </>
            ) : (
              t.hero.title
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12 text-sm tracking-[0.2em] text-text/70 uppercase"
          >
            {t.hero.subtitle}
          </motion.p>

          <div className="relative -mx-6 mb-10 h-52 sm:h-64 lg:hidden">
            <HeroVisual />
          </div>

          <FadeInSection trigger="mount" delay={0.65} className="space-y-6 text-left">
            <p className={`${type.proseBodyEmphasis} sm:text-lg`}>
              <ProseText lang={lang}>{t.hero.intro1}</ProseText>
            </p>
            <p className={`${type.proseBody} sm:text-lg`}>
              <ProseText lang={lang}>{t.hero.intro2}</ProseText>
            </p>
          </FadeInSection>

          <FadeInSection trigger="mount" delay={0.85} className="mt-12 space-y-6 text-left">
            <p className={type.proseBody}>
              <ProseText lang={lang}>{t.hero.context1}</ProseText>
            </p>
            <p className={type.proseBody}>
              <ProseText lang={lang}>{t.hero.context2}</ProseText>
            </p>
            <p className={type.proseBodyEmphasis}>
              <ProseText lang={lang}>{t.hero.context3}</ProseText>
            </p>
          </FadeInSection>

          <FadeInSection trigger="mount" delay={1.05} className="mt-16 lg:text-left">
            <div
              className={`inline-flex max-w-full items-center gap-2 rounded-full ${color.bg.sageLight} px-5 py-2.5`}
            >
              <CalendarDays className={`h-4 w-4 shrink-0 ${color.text.accent}`} strokeWidth={1.5} />
              <span className="text-sm text-text/80">{t.hero.foundingDate}</span>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
