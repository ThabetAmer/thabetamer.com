export interface Experience {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  company: {
    en: string;
    ar: string;
  };
  period: string;
  type: 'leadership' | 'technical' | 'hybrid' | 'founder';
  highlight?: boolean;
}

export const experiences: Experience[] = [
  {
    id: 'medtech-cofounder',
    title: {
      en: 'Co-founder',
      ar: 'شريك مؤسس'
    },
    company: {
      en: 'Stealth Medtech Startup',
      ar: 'شركة ناشئة في التقنية الطبية'
    },
    period: '2025 - Present',
    type: 'founder',
    highlight: true
  },
  {
    id: 'cto',
    title: {
      en: 'CTO, Tech Manager, Tech Lead',
      ar: 'رئيس التنفيذي للتكنولوجيا'
    },
    company: {
      en: 'Startups & innovative Mid-size',
      ar: 'الشركات الناشئة'
    },
    period: '2018 - Present',
    type: 'leadership',
    highlight: true
  },
  {
    id: 'project-manager',
    title: {
      en: 'Project & Product Manager',
      ar: 'مدير المشاريع والمنتجات'
    },
    company: {
      en: 'Innovative Startups',
      ar: 'الشركات الناشئة'
    },
    period: '2020 - Present',
    type: 'leadership'
  },
  {
    id: 'devops-specialist',
    title: {
      en: 'DevOps Specialist',
      ar: 'متخصص عمليات DevOps'
    },
    company: {
      en: 'Startups & Scaleups',
      ar: 'الشركات الناشئة والكبرى'
    },
    period: '2018 - 2025',
    type: 'technical'
  },
  {
    id: 'solutions-architect',
    title: {
      en: 'Solutions Architect',
      ar: 'مهندس الحلول'
    },
    company: {
      en: 'Enterprise & Gov',
      ar: 'المؤسسات والحكومة'
    },
    period: '2012 - 2022',
    type: 'technical'
  },
  {
    id: 'senior-systems-engineer',
    title: {
      en: 'Senior Systems Engineer',
      ar: 'مهندس نظام أول'
    },
    company: {
      en: 'Software Houses',
      ar: 'شركات البرمجيات'
    },
    period: '2009 - 2014',
    type: 'technical'
  }
];
