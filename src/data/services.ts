export interface Service {
  id: string;
  icon: string; // Lucide icon name in Icon.astro
  title: {
    en: string;
    ar: string;
  };
  subtitle: {
    en: string;
    ar: string;
  };
  detail: {
    en: string;
    ar: string;
  };
  subservices: {
    en: string[];
    ar: string[];
  };
  engagement: {
    en: string;
    ar: string;
  };
  ctaLabel: {
    en: string;
    ar: string;
  };
}

// Calendar booking link. All service CTAs point here.
export const CALENDAR_URL = 'https://calendly.com/thabetamer-pt2t/30min';

export const services: Service[] = [
  {
    id: 'fractional-leadership',
    icon: 'rocket',
    title: {
      en: 'Fractional / Interim Tech Leadership',
      ar: 'القيادة التقنية بنظام جزئي'
    },
    subtitle: {
      en: 'Senior leadership without a full-time hire',
      ar: 'قيادة عليا دون توظيف دائم'
    },
    detail: {
      en: 'Senior engineering leadership, part-time: CTO, Head of Engineering, or Technical PM without a full-time hire.',
      ar: 'قيادة هندسية عليا بدوام جزئي: دور مدير تقني أو رئيس هندسة دون توظيف دائم.'
    },
    subservices: {
      en: [
        'Interim CTO / Head of Engineering',
        'Technical strategy & roadmaps',
        'Team scaling & org design',
        'Vendor & contract negotiation',
        'Architecture & stack decisions',
        'Hiring & technical interviewing'
      ],
      ar: [
        'مدير تقني / رئيس هندسة مؤقت',
        'الاستراتيجية التقنية وخرائط الطريق',
        'توسيع الفرق وتصميم الهيكل',
        'التفاوض مع الموردين والعقود',
        'قرارات البنية والحزمة التقنية',
        'التوظيف والمقابلات التقنية'
      ]
    },
    engagement: {
      en: 'Retainer · Fractional',
      ar: 'احتفاظ · جزئي'
    },
    ctaLabel: {
      en: 'Book a call',
      ar: 'احجز مكالمة'
    }
  },
  {
    id: 'startup-advisory',
    icon: 'target',
    title: {
      en: 'Startup & Product Advisory',
      ar: 'استشارات الشركات الناشئة والمنتجات'
    },
    subtitle: {
      en: 'From idea to fundable product',
      ar: 'من الفكرة إلى منتج قابل للتمويل'
    },
    detail: {
      en: 'Turn an idea into a fundable, launch-ready product.',
      ar: 'تحويل الفكرة إلى منتج قابل للتمويل وجاهز للإطلاق.'
    },
    subservices: {
      en: [
        'MVP scoping & product definition',
        'Business modeling & unit economics',
        'Go-to-market strategy',
        'Fundraising & pitch readiness',
        'Technical due diligence',
        'Roadmap & prioritization'
      ],
      ar: [
        'تحديد المنتج الأولي (MVP)',
        'نمذجة الأعمال واقتصاديات الوحدة',
        'استراتيجية الدخول إلى السوق',
        'الجاهزية لجمع التمويل والعروض',
        'العناية التقنية الواجبة',
        'خرائط المنتج وترتيب الأولويات'
      ]
    },
    engagement: {
      en: 'Retainer · Day-rate',
      ar: 'احتفاظ · باليوم'
    },
    ctaLabel: {
      en: 'Book a call',
      ar: 'احجز مكالمة'
    }
  },
  {
    id: 'cloud-devops',
    icon: 'cloud',
    title: {
      en: 'Cloud & DevOps Architecture',
      ar: 'هندسة السحابة و DevOps'
    },
    subtitle: {
      en: 'Scalable infrastructure, modern delivery',
      ar: 'بنية قابلة للتوسع وتسليم حديث'
    },
    detail: {
      en: 'Resilient cloud architecture and modern delivery, with measurable results.',
      ar: 'بنية سحابية مرنة وعمليات تسليم حديثة بنتائج قابلة للقياس.'
    },
    subservices: {
      en: [
        'AWS solution architecture',
        'Kubernetes & containers',
        'CI/CD pipeline design',
        'Infrastructure-as-Code (Terraform)',
        'Cloud cost optimization',
        'Observability & monitoring'
      ],
      ar: [
        'هندسة حلول AWS',
        'Kubernetes وتنسيق الحاويات',
        'تصميم خطوط CI/CD',
        'البنية التحتية ككود (Terraform)',
        'تحسين تكاليف السحابة',
        'المراقبة والرصد'
      ]
    },
    engagement: {
      en: 'Project-based',
      ar: 'حسب المشروع'
    },
    ctaLabel: {
      en: 'Request a proposal',
      ar: 'اطلب عرضاً'
    }
  },
  {
    id: 'ai-enablement',
    icon: 'brain',
    title: {
      en: 'AI Enablement',
      ar: 'تمكين الذكاء الاصطناعي'
    },
    subtitle: {
      en: 'AI in production, done right',
      ar: 'ذكاء اصطناعي في الإنتاج بإتقان'
    },
    detail: {
      en: 'Adopt AI in production, from tooling to team enablement. (AWS-certified.)',
      ar: 'تبنّي الذكاء الاصطناعي في الإنتاج، من الأدوات إلى تأهيل الفريق. (معتمد من AWS.)'
    },
    subservices: {
      en: [
        'AI tooling & workflow adoption',
        'LLM integration & RAG systems',
        'AI guardrails & governance',
        'Team upskilling & enablement',
        'Use-case discovery',
        'Prompt engineering & evaluation'
      ],
      ar: [
        'تبنّي أدوات وسير عمل الذكاء الاصطناعي',
        'دمج نماذج اللغة وأنظمة RAG',
        'ضوابط وحوكمة الذكاء الاصطناعي',
        'تأهيل الفريق ورفع المهارات',
        'اكتشاف حالات الاستخدام',
        'هندسة وتقييم الموجهات'
      ]
    },
    engagement: {
      en: 'Project · Retainer',
      ar: 'مشروع · احتفاظ'
    },
    ctaLabel: {
      en: 'Book a call',
      ar: 'احجز مكالمة'
    }
  },
  {
    id: 'training-workshops',
    icon: 'users',
    title: {
      en: 'Training & Workshops',
      ar: 'التدريب وورش العمل'
    },
    subtitle: {
      en: 'Upskill your team, in English or Arabic',
      ar: 'طوّر مهارات فريقك بالعربية أو الإنجليزية'
    },
    detail: {
      en: 'Hands-on, practitioner-led workshops for engineers and leaders, delivered in English or Arabic.',
      ar: 'ورش عمل عملية بقيادة ممارس للمهندسين والقادة، بالعربية أو الإنجليزية.'
    },
    subservices: {
      en: [
        'AI-assisted delivery & agentic workflows',
        'Building with LLMs: RAG, evals & guardrails',
        'Cloud architecture and scalability',
        'DevOps in practice',
        'Agile, Scrum & OKRs for scaling teams',
        'Product discovery to MVP-to-market',
        'Engineering leadership & team topologies',
        'System design and structure'
      ],
      ar: [
        'التسليم المعزّز بالذكاء الاصطناعي وسير العمل الوكيلي',
        'البناء بنماذج اللغة: RAG والتقييم والضوابط',
        'هندسة السحابة وقابلية التوسع',
        'DevOps عمليًا',
        'الأجايل وScrum وOKRs لفرق التوسع',
        'من اكتشاف المنتج إلى الإطلاق (MVP)',
        'القيادة الهندسية وطوبولوجيا الفرق',
        'تصميم وبنية الأنظمة'
      ]
    },
    engagement: {
      en: 'Training cohort',
      ar: 'دورة تدريبية'
    },
    ctaLabel: {
      en: 'Request a proposal',
      ar: 'اطلب عرضاً'
    }
  },
  {
    id: 'ict4d',
    icon: 'heartbeat',
    title: {
      en: 'ICT4D / Development-Sector Tech',
      ar: 'تقنية القطاع التنموي'
    },
    subtitle: {
      en: 'Tech for development programs',
      ar: 'تقنية للبرامج التنموية'
    },
    detail: {
      en: 'Digital solutions for development programs, built to donor standards.',
      ar: 'حلول رقمية للبرامج التنموية تلبّي متطلبات المانحين.'
    },
    subservices: {
      en: [
        'Digital platforms for programs',
        'Monitoring & evaluation (M&E) systems',
        'Data collection & dashboards',
        'Capacity building & training',
        'Technical proposal support',
        'Donor-compliant solution design'
      ],
      ar: [
        'منصات رقمية للبرامج',
        'أنظمة الرصد والتقييم (M&E)',
        'جمع البيانات ولوحات المعلومات',
        'بناء القدرات والتدريب',
        'دعم المقترحات التقنية',
        'تصميم حلول متوافقة مع المانحين'
      ]
    },
    engagement: {
      en: 'Project · Advisory',
      ar: 'مشروع · استشارة'
    },
    ctaLabel: {
      en: 'Request a proposal',
      ar: 'اطلب عرضاً'
    }
  },
  {
    id: 'advisor-board',
    icon: 'compass',
    title: {
      en: 'Technical Advisor / Board / Diligence',
      ar: 'مستشار تقني / مجلس إدارة / عناية واجبة'
    },
    subtitle: {
      en: 'Guidance for investors & boards',
      ar: 'إرشاد للمستثمرين ومجالس الإدارة'
    },
    detail: {
      en: 'Technical guidance for investors, accelerators, and boards.',
      ar: 'إرشاد تقني للمستثمرين والمسرّعات ومجالس الإدارة.'
    },
    subservices: {
      en: [
        'Technical due diligence',
        'Board & investor advisory',
        'Architecture review & audits',
        'Accelerator mentorship',
        'Tech risk assessment',
        'Scale & security readiness'
      ],
      ar: [
        'العناية التقنية الواجبة',
        'استشارات مجالس الإدارة والمستثمرين',
        'مراجعة وتدقيق البنية',
        'إرشاد المسرّعات',
        'تقييم المخاطر التقنية',
        'جاهزية التوسع والأمان'
      ]
    },
    engagement: {
      en: 'Retainer · Day-rate',
      ar: 'احتفاظ · باليوم'
    },
    ctaLabel: {
      en: 'Book a call',
      ar: 'احجز مكالمة'
    }
  }
];
