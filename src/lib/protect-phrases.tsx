import { Fragment, type ReactNode } from "react";

/** Longest first so nested phrases match correctly */
export const JA_PROTECTED_PHRASES = [
  "岡山サイケデリック精神医療研究会",
  "サイケデリック精神医療",
  "サイケデリック心理療法",
  "サイケデリック医療",
  "変性意識状態",
  "心理療法的",
  "三段階モデル",
  "ケタミン治療",
  "メンタルヘルス",
  "精神医療",
  "意識の探究",
  "意識研究",
  "意識現象",
  "精神分析学",
  "専門医療従事者",
  "人材育成",
  "社会対話",
  "学術研究",
  "変容",
  "意味づけ",
  "心理療法",
  "精神医学",
  "神経科学",
  "心理学",
  "統合",
  "準備",
  "体験",
  "治療",
  "成長",
  "回復",
  "探究",
  "哲学",
  "人類学",
  "宗教学",
] as const;

export function protectJaText(text: string): ReactNode {
  let nodes: ReactNode[] = [text];

  JA_PROTECTED_PHRASES.forEach((phrase, phraseIndex) => {
    const next: ReactNode[] = [];

    nodes.forEach((node, nodeIndex) => {
      if (typeof node !== "string") {
        next.push(node);
        return;
      }

      if (!node.includes(phrase)) {
        next.push(node);
        return;
      }

      const parts = node.split(phrase);
      parts.forEach((part, partIndex) => {
        if (partIndex < parts.length - 1) {
          const after = parts[partIndex + 1] ?? "";
          const quoted =
            part.endsWith("「") && after.startsWith("」");

          if (quoted) {
            if (part.slice(0, -1)) next.push(part.slice(0, -1));
            next.push(
              <span
                key={`${phraseIndex}-${nodeIndex}-${partIndex}-q`}
                className="inline-block max-w-full"
              >
                {`「${phrase}」`}
              </span>,
            );
            parts[partIndex + 1] = after.slice(1);
            return;
          }

          if (part) next.push(part);
          next.push(
            <span
              key={`${phraseIndex}-${nodeIndex}-${partIndex}`}
              className="inline-block max-w-full"
            >
              {phrase}
            </span>,
          );
          return;
        }

        if (part) next.push(part);
      });
    });

    nodes = next;
  });

  return nodes.map((node, index) =>
    typeof node === "string" ? <Fragment key={`s-${index}`}>{node}</Fragment> : node,
  );
}
