export interface Article {
  title: {
    en: string;
    ar: string;
  };
  date: string;
  url?: string;
}

export const articles: Article[] = [
  {
    title: {
      en: 'Scaling Engineering Teams in Distributed Organizations',
      ar: 'توسيع فرق الهندسة في المنظمات الموزعة'
    },
    date: '2024-09',
    url: '#'
  },
  {
    title: {
      en: 'The Case for Platform Engineering in Humanitarian Tech',
      ar: 'أهمية هندسة المنصات في التكنولوجيا الإنسانية'
    },
    date: '2024-06',
    url: '#'
  },
  {
    title: {
      en: 'From Monolith to Microservices: A Pragmatic Approach',
      ar: 'من التطبيق المتجانس إلى الخدمات المصغرة: نهج عملي'
    },
    date: '2024-02',
    url: '#'
  },
  {
    title: {
      en: 'Building Offline-First Applications for Low-Connectivity Environments',
      ar: 'بناء تطبيقات تعمل بدون إنترنت للبيئات ضعيفة الاتصال'
    },
    date: '2023-11',
    url: '#'
  }
];
