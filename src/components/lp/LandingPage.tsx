"use client";

import { useEffect, useState } from "react";
import { getTranslation } from "@/lib/i18n";
import { particlesEnabled } from "@/lib/features";
import type { Language } from "@/types/i18n";
import { BackgroundParallax } from "./BackgroundParallax";
import { ParticlesBackground } from "./ParticlesBackground";
import { ParticlesProviderRoot } from "./ParticlesProviderRoot";
import { ReadabilityOverlay } from "./ReadabilityOverlay";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { CoreProcess } from "./CoreProcess";
import { ThreeLevels } from "./ThreeLevels";
import { ActivityPillars } from "./ActivityPillars";
import { FirstStep } from "./FirstStep";
import { MissionSection } from "./MissionSection";
import { FounderStatement } from "./FounderStatement";
import { Footer } from "./Footer";

export function LandingPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = getTranslation(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <ParticlesProviderRoot>
      <div lang={lang} className="relative min-h-screen bg-white text-text">
        {particlesEnabled && (
          <BackgroundParallax>
            <ParticlesBackground />
            <ReadabilityOverlay />
          </BackgroundParallax>
        )}
        <div className="relative z-10 min-w-0">
          <Header lang={lang} t={t} onLangChange={setLang} />
          <main className="min-w-0" key={lang}>
            <HeroSection lang={lang} t={t} />
            <CoreProcess lang={lang} t={t} />
            <ThreeLevels lang={lang} t={t} />
            <ActivityPillars lang={lang} t={t} />
            <FirstStep lang={lang} t={t} />
            <MissionSection lang={lang} t={t} />
            <FounderStatement lang={lang} t={t} />
          </main>
          <Footer lang={lang} t={t} />
        </div>
      </div>
    </ParticlesProviderRoot>
  );
}
