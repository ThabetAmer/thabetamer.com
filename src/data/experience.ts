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
    id: 'director-of-engineering',
    title: {
      en: 'Director of Engineering',
      ar: 'مدير الهندسة'
    },
    company: {
      en: 'Apricot International',
      ar: 'أبريكوت الدولية'
    },
    period: '2024 - Present',
    type: 'leadership',
    highlight: true
  },
  {
    id: 'cto',
    title: {
      en: 'Deputy CTO',
      ar: 'نائب الرئيس التنفيذي للتكنولوجيا'
    },
    company: {
      en: 'Souktel Inc.',
      ar: 'سوكتل'
    },
    period: '2013 - 2020',
    type: 'leadership',
    highlight: true
  },
  {
    id: 'tech-project-manager',
    title: {
      en: 'Technical Project & Product Manager',
      ar: 'مدير المشروع والمنتج التقني'
    },
    company: {
      en: 'OBI International',
      ar: 'OBI الدولية'
    },
    period: '2020 - Present',
    type: 'hybrid'
  },
  {
    id: 'tech-lead',
    title: {
      en: 'Technical Lead',
      ar: 'قائد تقني'
    },
    company: {
      en: 'Startups & Scaleups',
      ar: 'الشركات الناشئة والكبرى'
    },
    period: '2015 - 2023',
    type: 'hybrid'
  },
  {
    id: 'devops-specialist',
    title: {
      en: 'DevOps Specialist',
      ar: 'متخصص DevOps'
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
    period: '2012 - 2023',
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
    period: '2009 - 2015',
    type: 'technical'
  }
];
