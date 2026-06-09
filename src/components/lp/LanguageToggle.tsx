"use client";

import { motion } from "framer-motion";
import type { Language } from "@/types/i18n";

interface LanguageToggleProps {
  lang: Language;
  onToggle: (lang: Language) => void;
}

export function LanguageToggle({ lang, onToggle }: LanguageToggleProps) {
  return (
    <div className="flex items-center rounded-full border border-slate-300 bg-slate-50 p-1">
      {(["ja", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => onToggle(l)}
          className={`relative rounded-full px-3.5 py-1.5 text-sm font-semibold tracking-wider transition-colors ${
            lang === l ? "text-white" : "text-text/70 hover:text-text"
          }`}
          aria-label={l === "ja" ? "日本語に切り替え" : "Switch to English"}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-slate-900"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
