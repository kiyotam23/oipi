import type { Language } from "@/types/i18n";

export const translations = {
  ja: {
    nav: {
      about: "概要",
      process: "三段階モデル",
      framework: "三つの階層",
      activities: "活動の柱",
      founder: "代表",
      contact: "お問い合わせ",
    },
    header: {
      orgNameShort: "岡山サイケデリック精神医療研究会",
      orgNameFull: "Okayama Psychedelic Psychiatric Institute",
    },
    hero: {
      badge: "発足声明",
      title: "岡山サイケデリック精神医療研究会",
      titleLines: ["岡山サイケデリック", "精神医療研究会"],
      subtitle: "発足声明",
      intro1:
        "私たちは2026年6月8日、「岡山サイケデリック精神医療研究会」を発足いたします。",
      context1:
        "近年、世界ではシロシビン、MDMA、ケタミンなどを用いたサイケデリック医療研究が急速に進展しています。",
      context2:
        "うつ病、PTSD、依存症、終末期不安などに対する有効性が報告される一方で、その治療効果は薬理作用のみでは説明できず、人間の意識、意味づけ、人生観の変容と深く関わることが明らかになりつつあります。",
      context3:
        "本研究会は、サイケデリック医療を単なる薬物療法としてではなく、人間の回復と成長を支援する包括的な心理療法的プロセスとして捉え、精神医学、心理学、神経科学、精神分析学、人類学、宗教学、哲学、意識研究などの学際的視点から、人間の心と意識の理解を深め、新しいメンタルヘルスの可能性を探究することを目的として設立されました。",
    },
    coreProcess: {
      sectionLabel: "Core Process",
      title: "三段階モデル",
      lead: "当研究会のアプローチの中心には、世界的に認められたサイケデリック心理療法の基本モデルがあります。",
      leadEnd:
        "という三段階モデルです。",
      description:
        "安全な準備のもとで体験を迎え、その体験を人生の文脈へと統合していくことこそが、サイケデリック心理療法の本質であると私たちは考えています。",
      steps: [
        {
          key: "preparation",
          title: "準備",
          subtitle: "Preparation",
          description:
            "安全な準備のもとで体験を迎えるための心理的・医学的基盤を整える段階です。",
        },
        {
          key: "experience",
          title: "体験",
          subtitle: "Experience",
          description:
            "変性意識状態における意味深い体験を、専門的な支援のもとで迎える段階です。",
        },
        {
          key: "integration",
          title: "統合",
          subtitle: "Integration",
          description:
            "その体験を人生の文脈へと統合し、持続的な変容へとつなげていく段階です。",
        },
      ],
    },
    threeLevels: {
      sectionLabel: "Framework",
      title: "三つの階層",
      intro:
        "本研究会では、人間の回復と成長のプロセスを三つの階層から理解することを試みます。",
      levels: [
        {
          key: "healing",
          number: "01",
          title: "Healing",
          subtitle: "治療",
          description:
            "精神疾患や心理的苦痛の軽減、トラウマからの回復、情動調整機能の回復など、精神医療としての役割を担う領域です。",
        },
        {
          key: "growth",
          number: "02",
          title: "Growth",
          subtitle: "成長",
          description:
            "自己理解の深化、人間関係の改善、創造性の発揮、生きる意味や価値の再発見など、人間的成熟と自己実現を目指す領域です。",
        },
        {
          key: "consciousness",
          number: "03",
          title: "Awareness and Consciousness Research",
          subtitle: "意識の探究",
          description:
            "自己とは何か、意識とは何か、人間の精神性とは何かという根源的な問いに向き合いながら、変性意識状態や神秘体験を含む意識現象を科学的かつ人文学的に探究する領域です。",
        },
      ],
      tradition:
        "私たちは特定の宗教的立場をとるものではありません。",
      traditionDetail:
        "しかし、人類が長い歴史の中で積み重ねてきた宗教的体験、瞑想実践、神秘思想、伝統的治癒文化の知見に敬意を払いながら、それらを現代科学と対話させることを目指します。",
    },
    activities: {
      sectionLabel: "Activity Pillars",
      title: "活動の柱",
      intro: "当研究会は、安全で倫理的なサイケデリック精神医療の確立を目指し、学術研究、人材育成、社会対話の3つの領域において多角的な活動を展開します。",
      introEnd: "を活動の柱とします。",
      items: [
        {
          title: "世界の先端知見の共有",
          description:
            "サイケデリック医療に関する最新の学術研究を収集・検討し、国内外の知見を共有します。",
        },
        {
          title: "専門医療従事者の育成",
          description:
            "精神科医、心理士、看護師ら医療・支援専門職に対する教育とトレーニングを提供します。",
        },
        {
          title: "サイケデリック心理療法の研究",
          description:
            "準備・体験・統合の三段階モデルに基づく、エビデンスに裏付けられた心理療法モデルを探究します。",
        },
        {
          title: "変性意識状態の科学",
          description:
            "変性意識状態や意識現象を、科学および人文の両視点から学術的に探究します。",
        },
        {
          title: "グローバルな学際連携",
          description:
            "国内外の研究機関・研究者との協働を通じて、学際的な知のネットワークを構築します。",
        },
        {
          title: "市民への情報公開と対話",
          description:
            "正確で偏りのない情報発信を行い、市民社会との建設的な対話を促進します。",
        },
        {
          title: "安全かつ倫理的な基盤",
          description:
            "現行法令を遵守し、患者安全と倫理責任を最優先とした臨床・研究の基盤を確立します。",
        },
      ],
      compliance:
        "現行法令を遵守し、安全性と倫理性を最優先とした研究と実践を行います。",
    },
    firstStep: {
      sectionLabel: "Our First Step",
      title: "第一歩",
      description:
        "研究会の第一歩として、現在日本国内で合法的に実施可能であり、世界的にも精神医療への応用が進んでいるケタミン治療を出発点とし、その臨床経験と研究成果を蓄積してまいります。",
      ctaLabel: "詳細は近日公開",
    },
    mission: {
      sectionLabel: "Our Mission",
      title: "目指す未来",
      goal1:
        "私たちの目標は、新しい治療法を普及させることだけではありません。",
      goal2:
        "苦しみからの回復を支援し、人間の成長を促し、そして意識そのものへの理解を深めること。",
      goal3:
        "精神医療と心理療法、人文知と自然科学、治療と成長、個人の回復と社会の幸福をつなぐ新たな知のプラットフォームを岡山から創造していくことです。",
      closing1: "岡山から日本へ。",
      closing2:
        "より深く、より人間的なメンタルヘルスの未来を、多くの仲間とともに育んでいきたいと考えています。",
    },
    founder: {
      sectionLabel: "Founder",
      title: "代表",
      name: "遠迫 憲英",
      nameEn: "Norihide Ensako, M.D.",
      role: "精神科医",
      affiliation: "HIKARI CLINIC 理事長・院長",
      date: "2026年6月8日",
      orgName: "岡山サイケデリック精神医療研究会",
    },
    footer: {
      orgName: "岡山サイケデリック精神医療研究会",
      orgNameEn: "Okayama Psychedelic Psychiatric Institute",
      compliance:
        "現行法令を遵守し、安全性と倫理性を最優先とした研究と実践を行います。",
      copyright: "© 2026 Okayama Psychedelic Psychiatric Institute. All rights reserved.",
    },
  },
  en: {
    nav: {
      about: "About",
      process: "Process",
      framework: "Levels",
      activities: "Activities",
      founder: "Founder",
      contact: "Contact",
    },
    header: {
      orgNameShort: "Okayama Psychedelic Psychiatric Institute",
      orgNameFull: "岡山サイケデリック精神医療研究会",
    },
    hero: {
      badge: "Founding Statement",
      title: "Okayama Psychedelic Psychiatric Institute",
      titleLines: ["Okayama Psychedelic", "Psychiatric Institute"],
      subtitle: "Founding Statement",
      intro1:
        "On June 8, 2026, we will establish the Okayama Psychedelic Psychiatric Institute.",
      context1:
        "In recent years, psychedelic medicine research using psilocybin, MDMA, ketamine, and related substances has advanced rapidly worldwide.",
      context2:
        "While efficacy has been reported for depression, PTSD, addiction, end-of-life anxiety, and other conditions, it is becoming clear that therapeutic effects cannot be explained by pharmacological action alone—they are deeply connected to transformations in human consciousness, meaning-making, and worldview.",
      context3:
        "The Institute views psychedelic medicine not merely as pharmacological intervention, but as a comprehensive psychotherapeutic process that supports human recovery and growth, and was established to deepen understanding of mind and consciousness and explore new possibilities for mental health through an interdisciplinary approach integrating psychiatry, psychology, neuroscience, psychoanalysis, anthropology, religious studies, philosophy, and consciousness research.",
    },
    coreProcess: {
      sectionLabel: "Core Process",
      title: "Three-Stage Model",
      lead: "At the center of our approach is the internationally recognized foundational model of psychedelic psychotherapy.",
      leadEnd: "",
      description:
        "We believe that welcoming experience on a foundation of safe preparation, and integrating that experience into the context of one's life, is the essence of psychedelic psychotherapy.",
      steps: [
        {
          key: "preparation",
          title: "Preparation",
          subtitle: "Preparation",
          description:
            "The stage of establishing the psychological and medical foundation for welcoming experience under safe preparation.",
        },
        {
          key: "experience",
          title: "Experience",
          subtitle: "Experience",
          description:
            "The stage of welcoming meaningful experience in altered states of consciousness under professional support.",
        },
        {
          key: "integration",
          title: "Integration",
          subtitle: "Integration",
          description:
            "The stage of integrating that experience into the context of one's life and connecting it to lasting transformation.",
        },
      ],
    },
    threeLevels: {
      sectionLabel: "Framework",
      title: "Three Levels",
      intro:
        "The Institute seeks to understand the process of human recovery and growth through three levels.",
      levels: [
        {
          key: "healing",
          number: "01",
          title: "Healing",
          subtitle: "Healing",
          description:
            "This is the domain of psychiatric medicine: reducing mental illness and psychological distress, recovering from trauma, and restoring emotional regulation.",
        },
        {
          key: "growth",
          number: "02",
          title: "Growth",
          subtitle: "Growth",
          description:
            "This is the domain of human maturation and self-actualization: deepening self-understanding, improving relationships, fostering creativity, and rediscovering meaning and purpose in life.",
        },
        {
          key: "consciousness",
          number: "03",
          title: "Awareness and Consciousness Research",
          subtitle: "Consciousness Inquiry",
          description:
            "This is the domain of fundamental inquiry into what the self is, what consciousness is, and what human spirituality is—exploring phenomena of consciousness, including altered states and mystical experience, through both scientific and humanistic lenses.",
        },
      ],
      tradition: "We do not adopt any particular religious position.",
      traditionDetail:
        "However, we aim to engage religious experience, contemplative practice, mystical thought, and traditional healing cultures—knowledge accumulated over human history—in dialogue with modern science, with respect for their insights.",
    },
    activities: {
      sectionLabel: "Activity Pillars",
      title: "Activity Pillars",
      intro:
        "The Institute pursues multidimensional activities across three domains—academic research, professional development, and public dialogue—to establish safe and ethical psychedelic psychiatric medicine.",
      introEnd: "",
      items: [
        {
          title: "Sharing Global Leading Knowledge",
          description:
            "Reviewing and disseminating the latest scientific research in psychedelic medicine from around the world.",
        },
        {
          title: "Training Healthcare Professionals",
          description:
            "Providing education and professional training for psychiatrists, psychologists, nurses, and mental health professionals.",
        },
        {
          title: "Psychedelic Psychotherapy Research",
          description:
            "Developing evidence-informed models grounded in the preparation, experience, and integration framework.",
        },
        {
          title: "The Science of Altered States",
          description:
            "Investigating altered states of consciousness through scientific and humanistic inquiry.",
        },
        {
          title: "Global Interdisciplinary Collaboration",
          description:
            "Building networks of knowledge through partnerships with domestic and international researchers and institutions.",
        },
        {
          title: "Public Education and Dialogue",
          description:
            "Promoting accurate public information and fostering constructive dialogue with the broader community.",
        },
        {
          title: "Safe and Ethical Foundation",
          description:
            "Establishing standards for clinical practice rooted in legal compliance, patient safety, and ethical responsibility.",
        },
      ],
      compliance:
        "We conduct research and practice in compliance with applicable laws, prioritizing safety and ethics.",
    },
    firstStep: {
      sectionLabel: "Our First Step",
      title: "First Step",
      description:
        "As the Institute's first step, we will begin with ketamine treatment—which can currently be provided legally in Japan and is advancing worldwide in psychiatric applications—accumulating clinical experience and research findings.",
      ctaLabel: "Details coming soon",
    },
    mission: {
      sectionLabel: "Our Mission",
      title: "The Future We Aim For",
      goal1: "Our goal is not simply to spread new treatments.",
      goal2:
        "It is to support recovery from suffering, foster human growth, and deepen our understanding of consciousness itself.",
      goal3:
        "It is to create from Okayama a new platform of knowledge that connects psychiatric medicine and psychotherapy, the humanities and natural sciences, treatment and growth, individual recovery and social well-being.",
      closing1: "From Okayama to Japan.",
      closing2:
        "We hope to cultivate, together with many colleagues, a deeper and more human future for mental health.",
    },
    founder: {
      sectionLabel: "Founder",
      title: "Founder",
      name: "Norihide Ensako, M.D.",
      nameEn: "Norihide Ensako, M.D.",
      role: "Psychiatrist",
      affiliation: "Chairman and Director, HIKARI CLINIC",
      date: "June 8, 2026",
      orgName: "Okayama Psychedelic Psychiatric Institute",
    },
    footer: {
      orgName: "Okayama Psychedelic Psychiatric Institute",
      orgNameEn: "岡山サイケデリック精神医療研究会",
      compliance:
        "We conduct research and practice in compliance with applicable laws, prioritizing safety and ethics.",
      copyright: "© 2026 Okayama Psychedelic Psychiatric Institute. All rights reserved.",
    },
  },
} as const;

export type TranslationContent = (typeof translations)[Language];

export function getTranslation(lang: Language): TranslationContent {
  return translations[lang];
}
