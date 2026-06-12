import type { Language } from "@/types/i18n";
import { cn } from "@/lib/cn";
import { protectJaText } from "@/lib/protect-phrases";

type ProseTextProps = {
  lang: Language;
  children: string;
  className?: string;
};

export function ProseText({ lang, children, className = "" }: ProseTextProps) {
  const content = lang === "ja" ? protectJaText(children) : children;

  return <span className={cn("jp-prose", className)}>{content}</span>;
}

type SectionTitleProps = {
  lang: Language;
  children: string;
  className?: string;
  textBgClassName?: string;
};

export function SectionTitle({
  lang,
  children,
  className = "",
  textBgClassName,
}: SectionTitleProps) {
  const content = lang === "ja" ? protectJaText(children) : children;

  return (
    <h2 className={cn("heading-balance", className)}>
      {textBgClassName ? <span className={textBgClassName}>{content}</span> : content}
    </h2>
  );
}
