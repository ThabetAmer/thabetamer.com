export interface Certification {
  id: string;
  image: string;
  url?: string; // Credly, Udemy, or certificate verification URL
  name: {
    en: string;
    ar: string;
  };
  issuer: {
    en: string;
    ar: string;
  };
  year: string;
}

export interface Education {
  id: string;
  image: string;
  url?: string; // Institution or program URL
  degree: {
    en: string;
    ar: string;
  };
  institution: {
    en: string;
    ar: string;
  };
  field?: {
    en: string;
    ar: string;
  };
}

export const certifications: Certification[] = [
  {
    id: 'aws-ai',
    image: '/images/credentials/aws-ai.png',
    url: 'https://www.credly.com/badges/34d4a27c-a625-4094-bd95-cbca49a2b2ff',
    name: {
      en: 'AWS Certified AI Practitioner Early Adopter',
      ar: 'ممارس الذكاء الاصطناعي المعتمد من AWS - متبني مبكر'
    },
    issuer: {
      en: 'Amazon Web Services',
      ar: 'أمازون ويب سيرفيسز'
    },
    year: '2025'
  },
  {
    id: 'pmp',
    image: '/images/credentials/pmp.png',
    url: 'https://www.credly.com/badges/29217340-574a-4689-ab70-b9e30fce0dd5',
    name: {
      en: 'Project Management Professional (PMP)',
      ar: 'محترف إدارة المشاريع (PMP)'
    },
    issuer: {
      en: 'PMI',
      ar: 'معهد إدارة المشاريع'
    },
    year: '2025'
  },
  {
    id: 'psm',
    image: '/images/credentials/psm.png',
    url: 'https://www.credly.com/badges/61c1ca9a-f1c8-4f5f-bf80-65478df53351',
    name: {
      en: 'Professional Scrum Master I (PSM I)',
      ar: 'سكرم ماستر محترف (PSM I)'
    },
    issuer: {
      en: 'Scrum.org',
      ar: 'Scrum.org'
    },
    year: '2024'
  },
  {
    id: 'soft-skills',
    image: '/images/credentials/linkedin-learning.png',
    url: 'https://www.linkedin.com/learning/certificates/11c76dc21eb517beee0573d104d433be7d88c02613860c600a75ec57d73aa144',
    name: {
      en: 'Master In-Demand Professional Soft Skills',
      ar: 'إتقان المهارات الشخصية المهنية المطلوبة'
    },
    issuer: {
      en: 'LinkedIn Learning',
      ar: 'لينكد إن للتعلم'
    },
    year: '2019'
  },
  {
    id: 'kubernetes',
    image: '/images/credentials/linkedin-learning.png',
    url: 'https://www.linkedin.com/learning/certificates/8a4df6b27e0a9f9406440f226dd9aa0b77ab6982fe4fe16e105cab62fd8b6cf2',
    name: {
      en: 'Getting Started with Kubernetes',
      ar: 'البدء مع كوبرنيتس'
    },
    issuer: {
      en: 'LinkedIn Learning',
      ar: 'لينكد إن للتعلم'
    },
    year: '2019'
  }
];

export const education: Education[] = [
  {
    id: 'indiana-mba',
    image: '/images/credentials/iup.png',
    url: 'https://www.iup.edu/business/index.html',
    degree: {
      en: 'Master of Business Administration (MBA)',
      ar: 'ماجستير إدارة الأعمال (MBA)'
    },
    institution: {
      en: 'Indiana University of Pennsylvania',
      ar: 'جامعة إنديانا في بنسلفانيا'
    },
    field: {
      en: 'Strategic Management',
      ar: 'الإدارة الاستراتيجية'
    }
  },
  {
    id: 'birzeit-bsc',
    image: '/images/credentials/birzeit.svg',
    url: 'https://www.birzeit.edu/en/study/faculties/engineering-technology',
    degree: {
      en: 'Bachelor of Science (BSc)',
      ar: 'بكالوريوس العلوم'
    },
    institution: {
      en: 'Birzeit University',
      ar: 'جامعة بيرزيت'
    },
    field: {
      en: 'Computer Engineering',
      ar: 'هندسة الحاسوب'
    }
  }
];
