export interface Service {
  id: string;
  icon: string; // Lucide icon name
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  tags?: string[];
}

export const services: Service[] = [
  {
    id: 'tech-strategy',
    icon: 'rocket',
    title: {
      en: 'Tech Strategy & Leadership',
      ar: 'القيادة التقنية الاستراتيجية'
    },
    description: {
      en: 'Scaling engineering teams, digital transformation, and executive technology planning. Business development, vendor negotiations, and innovation roadmaps.',
      ar: 'توسيع فرق الهندسة والتحول الرقمي والتخطيط التقني التنفيذي.'
    }
  },
  {
    id: 'cloud-devops',
    icon: 'cloud',
    title: {
      en: 'Cloud & DevOps',
      ar: 'السحابة و DevOps'
    },
    description: {
      en: 'AWS, Kubernetes, Terraform, and CI/CD pipelines. Infrastructure-as-Code, cost optimization, and high-availability deployments.',
      ar: 'AWS وKubernetes وTerraform وخطوط CI/CD.'
    }
  },
  {
    id: 'project-product',
    icon: 'target',
    title: {
      en: 'Product & Project Delivery',
      ar: 'إدارة المشاريع والمنتجات'
    },
    description: {
      en: 'PMP & Scrum certified. Product roadmaps, release management, agile sprints, and cross-functional team leadership.',
      ar: 'شهادة PMP وScrum. خرائط المنتجات وإدارة الإصدارات.'
    }
  },
  {
    id: 'ai-systems',
    icon: 'brain',
    title: {
      en: 'AI-Driven Systems',
      ar: 'الأنظمة المدعومة بالذكاء الاصطناعي'
    },
    description: {
      en: 'Machine learning integration, intelligent automation, and data-driven platforms. Building AI-powered workflows and predictive systems.',
      ar: 'تكامل التعلم الآلي والأتمتة الذكية والمنصات المبنية على البيانات.'
    }
  },
  {
    id: 'full-stack',
    icon: 'code',
    title: {
      en: 'Full-Stack Development',
      ar: 'تطوير المنتجات الشامل'
    },
    description: {
      en: 'SaaS platforms, microservices, and API design. End-to-end SDLC leadership for web, mobile, and blockchain applications.',
      ar: 'منصات SaaS والخدمات المصغرة وتصميم API.'
    }
  },
  {
    id: 'team-mentorship',
    icon: 'users',
    title: {
      en: 'Team Building & Mentorship',
      ar: 'بناء الفرق والإرشاد'
    },
    description: {
      en: 'Recruiting, training, and mentoring engineering talent. Building high-performing distributed teams across multiple time zones.',
      ar: 'توظيف وتدريب وإرشاد المواهب الهندسية. بناء فرق موزعة عالية الأداء.'
    }
  }
];
