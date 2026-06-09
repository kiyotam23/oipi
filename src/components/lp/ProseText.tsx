import type { Language } from "@/types/i18n";
import { protectJaText } from "@/lib/protect-phrases";

type ProseTextProps = {
  lang: Language;
  children: string;
  className?: string;
};

export function ProseText({ lang, children, className = "" }: ProseTextProps) {
  const content = lang === "ja" ? protectJaText(children) : children;

  return <span className={`jp-prose ${className}`.trim()}>{content}</span>;
}

type SectionTitleProps = {
  lang: Language;
  children: string;
  className?: string;
};

export function SectionTitle({ lang, children, className = "" }: SectionTitleProps) {
  return (
    <h2 className={`heading-balance ${className}`.trim()}>
      {lang === "ja" ? protectJaText(children) : children}
    </h2>
  );
}
