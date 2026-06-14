"use client";

import { motion } from "framer-motion";
import type { Language } from "@/types/i18n";

interface LanguageToggleProps {
  lang: Language;
  onToggle: (lang: Language) => void;
}

const pillTransition = { type: "spring", stiffness: 520, damping: 40 } as const;

export function LanguageToggle({ lang, onToggle }: LanguageToggleProps) {
  return (
    <div className="relative grid w-[5.5rem] shrink-0 grid-cols-2 rounded-full border border-slate-300 bg-slate-50 p-1">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-slate-900"
        animate={{ x: lang === "ja" ? 0 : "100%" }}
        transition={pillTransition}
      />
      {(["ja", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onToggle(l)}
          className={`relative z-10 py-1.5 text-center text-sm font-semibold tracking-wider transition-colors ${
            lang === l ? "text-white" : "text-text/70 hover:text-text"
          }`}
          aria-label={l === "ja" ? "日本語に切り替え" : "Switch to English"}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
