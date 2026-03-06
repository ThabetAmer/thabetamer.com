// Bilingual text type
export type BilingualText = {
  en: string;
  ar: string;
};

// Project tags for filtering
export type ProjectTag = 'product' | 'architecture' | 'cloud' | 'ai' | 'devops' | 'startups' | 'saas' | 'edtech' | 'agritech' | 'ict4d' | 'gov';

// Location definition for map markers
export interface WorkLocation {
  id: string;
  country: BilingualText;
  countryCode: string;
  coordinates: { x: number; y: number };
}

// Unified work item
export interface WorkItem {
  id: string;

  // Visibility flags
  showInPortfolio: boolean;
  showOnMap: boolean;

  // Portfolio display fields
  image: string;
  title: BilingualText;
  client: BilingualText;
  role: BilingualText;
  description: BilingualText;
  details?: BilingualText;
  tags: ProjectTag[];
  year: string;

  // Map/location fields
  locationIds: string[];
}

// All locations for map display
export const locations: WorkLocation[] = [
  {
    id: 'usa-west',
    country: { en: 'United States (West)', ar: 'الولايات المتحدة (الغرب)' },
    countryCode: 'US',
    coordinates: { x: 145, y: 193 }
  },
  {
    id: 'usa-mid',
    country: { en: 'United States (Central)', ar: 'الولايات المتحدة (الوسط)' },
    countryCode: 'US',
    coordinates: { x: 195, y: 205 }
  },
  {
    id: 'usa-east',
    country: { en: 'United States (East)', ar: 'الولايات المتحدة (الشرق)' },
    countryCode: 'US',
    coordinates: { x: 258, y: 182 }
  },
  {
    id: 'malawi',
    country: { en: 'Malawi', ar: 'ملاوي' },
    countryCode: 'MW',
    coordinates: { x: 533, y: 326 }
  },
  {
    id: 'bangladesh',
    country: { en: 'Bangladesh', ar: 'بنغلاديش' },
    countryCode: 'BD',
    coordinates: { x: 672, y: 232 }
  },
  {
    id: 'jordan',
    country: { en: 'Jordan', ar: 'الأردن' },
    countryCode: 'JO',
    coordinates: { x: 540, y: 212 }
  },
  {
    id: 'egypt',
    country: { en: 'Egypt', ar: 'مصر' },
    countryCode: 'EG',
    coordinates: { x: 525, y: 224 }
  },
  {
    id: 'uae',
    country: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
    countryCode: 'AE',
    coordinates: { x: 582, y: 231 }
  },
  {
    id: 'palestine',
    country: { en: 'Palestine', ar: 'فلسطين' },
    countryCode: 'PS',
    coordinates: { x: 537, y: 208 }
  },
  {
    id: 'austria',
    country: { en: 'Austria', ar: 'النمسا' },
    countryCode: 'AT',
    coordinates: { x: 490, y: 168 }
  },
  {
    id: 'uk',
    country: { en: 'United Kingdom', ar: 'المملكة المتحدة' },
    countryCode: 'GB',
    coordinates: { x: 435, y: 152 }
  },
  {
    id: 'syria',
    country: { en: 'Syria', ar: 'سوريا' },
    countryCode: 'SY',
    coordinates: { x: 545, y: 200 }
  },
  {
    id: 'lebanon',
    country: { en: 'Lebanon', ar: 'لبنان' },
    countryCode: 'LB',
    coordinates: { x: 534, y: 203 }
  },
  {
    id: 'tunisia',
    country: { en: 'Tunisia', ar: 'تونس' },
    countryCode: 'TN',
    coordinates: { x: 472, y: 205 }
  },
  {
    id: 'libya',
    country: { en: 'Libya', ar: 'ليبيا' },
    countryCode: 'LY',
    coordinates: { x: 492, y: 215 }
  },
  {
    id: 'afghanistan',
    country: { en: 'Afghanistan', ar: 'أفغانستان' },
    countryCode: 'AF',
    coordinates: { x: 618, y: 205 }
  },
  {
    id: 'rwanda',
    country: { en: 'Rwanda', ar: 'رواندا' },
    countryCode: 'RW',
    coordinates: { x: 522, y: 290 }
  },
  {
    id: 'turkey',
    country: { en: 'Turkey', ar: 'تركيا' },
    countryCode: 'TR',
    coordinates: { x: 525, y: 185 }
  }
];

// All work items (portfolio + map-only)
export const work: WorkItem[] = [
  // ===== PORTFOLIO ITEMS (showInPortfolio: true) =====
  {
    id: 'nft-co',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop',
    title: { en: 'NFT.Co Platform', ar: 'منصة NFT.Co' },
    client: { en: 'Unblocked Brands', ar: 'Unblocked Brands' },
    role: { en: 'Senior DevOps Consultant', ar: 'استشاري DevOps أول' },
    description: {
      en: 'Blockchain-based platform for NFT management and transactions. Maintained scalable Kubernetes production loads while significantly reducing AWS costs.',
      ar: 'منصة قائمة على البلوكتشين لإدارة ومعاملات NFT. صيانة أحمال إنتاج Kubernetes القابلة للتوسع مع تخفيض تكاليف AWS بشكل كبير.'
    },
    details: {
      en: 'Optimized CI/CD workflows reducing build times from 55+ mins to 8 mins. Reduced infrastructure costs from $900+ to $70/month through optimization. Implemented IaC with Terraform and CDK-Java for AWS deployments.',
      ar: 'تحسين سير عمل CI/CD مما قلل أوقات البناء من 55+ دقيقة إلى 8 دقائق. خفض تكاليف البنية التحتية من 900+ دولار إلى 70 دولار/شهر.'
    },
    tags: ['startups', 'devops'],
    year: '2024',
    locationIds: ['usa-west']
  },
  {
    id: 'souktel',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
    title: { en: 'Omnichannel/M&E Platforms', ar: 'منصات Omni/M&E' },
    client: { en: 'Souktel', ar: 'سوقتل' },
    role: { en: 'Deputy CTO', ar: 'قائد تقني' },
    description: {
      en: 'Digital platform development for Souktel, delivering innovative technology solutions for mobile and web applications.',
      ar: 'تطوير منصات Omni/M&E لسوقتل، تقديم حلول تقنية مبتكرة لتطبيقات الهاتف والويب.'
    },
    tags: ['startups', 'product', 'devops', 'ict4d', 'architecture'],
    year: '2022',
    locationIds: ['usa-east']
  },
  {
    id: 'aidkonekt',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=450&fit=crop',
    title: { en: 'AidKonekt Platform', ar: 'منصة AidKonekt' },
    client: { en: 'Konektid International', ar: 'Konektid International' },
    role: { en: 'Tech Lead & Scrum Master', ar: 'قائد تقني وسكرم ماستر' },
    description: {
      en: 'SaaS platform for aid delivery and humanitarian coordination. Oversaw technical implementation of product roadmap and release schedules.',
      ar: 'منصة SaaS لتقديم المساعدات والتنسيق الإنساني. الإشراف على التنفيذ التقني لخارطة طريق المنتج وجداول الإصدار.'
    },
    details: {
      en: 'Managed JIRA-organized sprints, validated code reviews, and debugged critical issues. Automated release processes and led tech team through feature prioritization and requirement triaging.',
      ar: 'إدارة سباقات JIRA المنظمة، والتحقق من مراجعات الكود، وتصحيح المشكلات الحرجة. أتمتة عمليات الإصدار وقيادة الفريق التقني.'
    },
    tags: ['product'],
    year: '2023',
    locationIds: ['usa-east']
  },
  {
    id: 'nnp-malawi',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop',
    title: { en: 'Strengthening The Teaching of Primary Schools', ar: 'تعزيز تدريس المدارس الابتدائية' },
    client: { en: 'Cambridge Education', ar: 'Cambridge Education' },
    role: { en: 'Senior Product & Project Manager', ar: 'مدير أول للمنتج والمشروع' },
    description: {
      en: 'Web and mobile platform for teacher observation, analysis, and professional development supporting over 20,000 teachers across Malawi.',
      ar: 'منصة ويب وموبايل لمراقبة المعلمين وتحليلهم وتطويرهم المهني تدعم أكثر من 20,000 معلم في ملاوي.'
    },
    details: {
      en: 'Led technical implementation of cloud-hosted platforms. Prioritized and resolved feature requests through cross-functional dev and QA teams. Managed client expectations and escalation processes.',
      ar: 'قيادة التنفيذ التقني للمنصات السحابية. تحديد أولويات وحل طلبات الميزات من خلال فرق التطوير وضمان الجودة.'
    },
    tags: ['edtech', 'product', 'ict4d', 'architecture'],
    year: '2023',
    locationIds: ['malawi', 'uk']
  },
  {
    id: 'ahlan-simsim',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=450&fit=crop',
    title: { en: 'Ahlan Simsim Platform', ar: 'منصة أهلاً سمسم' },
    client: { en: 'IRC / Sesame Street', ar: 'IRC / Sesame Street' },
    role: { en: 'DevOps Engineer', ar: 'مهندس DevOps' },
    description: {
      en: 'Mobile and web platform for promoting learning among young children across the Middle East with rich educational content.',
      ar: 'منصة موبايل وويب لتعزيز التعلم بين الأطفال الصغار في الشرق الأوسط بمحتوى تعليمي غني.'
    },
    details: {
      en: 'Designed and built AWS and Pantheon-based infrastructure. Implemented CI/CD pipelines via CircleCI. Architected WebOps infrastructure for high availability and scalability.',
      ar: 'تصميم وبناء بنية تحتية قائمة على AWS وPantheon. تنفيذ خطوط CI/CD عبر CircleCI.'
    },
    tags: ['edtech', 'cloud', 'ict4d', 'devops'],
    year: '2022',
    locationIds: ['jordan', 'syria', 'lebanon']
  },
  {
    id: 'iqvia-devsecops',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
    title: { en: 'IQVIA DevSecOps Modernization', ar: 'تحديث IQVIA DevSecOps' },
    client: { en: 'IQVIA (Healthcare/Pharma)', ar: 'IQVIA (الرعاية الصحية/الأدوية)' },
    role: { en: 'Senior DevOps Engineer', ar: 'مهندس DevOps' },
    description: {
      en: 'Enterprise-wide Docker image optimization and DevSecOps pipeline modernization for a global healthcare data company.',
      ar: 'تحسين صور Docker على مستوى المؤسسة وتحديث خطوط DevSecOps لشركة بيانات رعاية صحية عالمية.'
    },
    details: {
      en: 'Eliminated 80% of container image size and 90% of security vulnerabilities. Refactored CI pipeline into modular pipeline-as-code using Groovy, Maven, and Ant. Deployed Kubernetes clusters with Helm Charts.',
      ar: 'إزالة 80٪ من حجم صور الحاويات و90٪ من الثغرات الأمنية. إعادة هيكلة خط CI إلى كود معياري.'
    },
    tags: ['devops'],
    year: '2020',
    locationIds: ['uae']
  },
  {
    id: 'care-camm',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop',
    title: { en: 'CARE Mobile Messaging Platform (CaMM)', ar: 'منصة كير للرسائل المحمولة (CaMM)' },
    client: { en: 'CARE International', ar: 'منظمة كير الدولية' },
    role: { en: 'Senior Product & Project Manager', ar: 'مدير أول للمنتج والمشروع' },
    description: {
      en: 'MVP mobile messaging platform for COVID-19 health awareness and tracking with multi-channel communications capabilities in Bangladesh.',
      ar: 'منصة MVP للرسائل المحمولة للتوعية الصحية بكوفيد-19 والتتبع مع قدرات اتصال متعددة القنوات في بنغلاديش.'
    },
    details: {
      en: 'Successfully delivered MVP with mobile app and multi-channel comms. Integrated Twilio and Meta WhatsApp APIs for multi-channel outreach. Managed AWS cloud infrastructure for scalable deployment.',
      ar: 'تسليم MVP بنجاح مع تطبيق جوال واتصالات متعددة القنوات. دمج واجهات Twilio وMeta WhatsApp.'
    },
    tags: ['cloud', 'product', 'ict4d'],
    year: '2023',
    locationIds: ['bangladesh']
  },
  {
    id: 'yesa-emis',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    title: { en: 'Education Management Information System (EMIS)', ar: 'نظام معلومات إدارة التعليم (EMIS)' },
    client: { en: 'Abt Associates', ar: 'Abt Associates' },
    role: { en: 'Senior Product & Project Manager', ar: 'مدير أول للمنتج والمشروع' },
    description: {
      en: 'Web and mobile data collection and analysis platform supporting Malawi\'s National Reading Program through early-grade assessment.',
      ar: 'منصة ويب وموبايل لجمع البيانات وتحليلها تدعم برنامج القراءة الوطني في ملاوي.'
    },
    details: {
      en: 'Deployed platform supporting early-grade reading assessment across Malawi. Integrated RapidPro for data collection and SPSS for analysis. Created public dashboard for accessible data visualization.',
      ar: 'نشر منصة تدعم تقييم القراءة في المراحل المبكرة عبر ملاوي. دمج RapidPro لجمع البيانات وSPSS للتحليل.'
    },
    tags: ['edtech', 'ict4d', 'product'],
    year: '2022',
    locationIds: ['malawi']
  },
  {
    id: 'startup-systems',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
    title: { en: 'Early-Stage Startup Systems', ar: 'أنظمة الشركات الناشئة' },
    client: { en: 'Multiple Startups', ar: 'شركات ناشئة متعددة' },
    role: { en: 'Cloud & DevOps Architect', ar: 'مهندس السحابة' },
    description: {
      en: 'System architecture design and CI/CD automation for multiple early-stage platforms.',
      ar: 'تصميم هندسة الأنظمة وأتمتة CI/CD لمنصات ناشئة متعددة.'
    },
    details: {
      en: 'Designed and implemented scalable, secure cloud systems on AWS for 4+ startups. Architected automated development processes via CI/CD pipelines. Provided technical mentorship to startup engineering teams.',
      ar: 'تصميم وتنفيذ أنظمة سحابية قابلة للتوسع وآمنة على AWS لأكثر من 4 شركات ناشئة.'
    },
    tags: ['startups', 'cloud', 'architecture', 'devops'],
    year: '2022',
    locationIds: ['palestine', 'lebanon']
  },
  {
    id: 'ibtci-me',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    title: { en: 'Monitoring & Evaluation Platform', ar: 'منصة المتابعة والتقييم' },
    client: { en: 'IBTCI', ar: 'IBTCI' },
    role: { en: 'Technical Lead', ar: 'قائد تقني' },
    description: {
      en: 'Monitoring and Evaluation (M&E) platform supporting development programs across Tunisia and Libya.',
      ar: 'منصة المتابعة والتقييم (M&E) لدعم برامج التنمية في تونس وليبيا.'
    },
    details: {
      en: 'Built data collection and analysis tools for program monitoring. Implemented dashboards for real-time reporting and impact assessment across multiple country operations.',
      ar: 'بناء أدوات جمع البيانات والتحليل لمتابعة البرامج. تنفيذ لوحات معلومات للتقارير الفورية وتقييم الأثر.'
    },
    tags: ['ict4d', 'product'],
    year: '2023',
    locationIds: ['tunisia', 'libya']
  },
  {
    id: 'cnfa-agretech',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=450&fit=crop',
    title: { en: 'Agretech Platform', ar: 'منصة أجريتك' },
    client: { en: 'CNFA', ar: 'CNFA' },
    role: { en: 'Technical Lead', ar: 'قائد تقني' },
    description: {
      en: 'Agricultural technology platform supporting farmers and agribusinesses in Egypt with digital tools and market access.',
      ar: 'منصة تكنولوجيا زراعية تدعم المزارعين والشركات الزراعية في مصر بأدوات رقمية ووصول للأسواق.'
    },
    details: {
      en: 'Developed digital solutions for agricultural value chains. Implemented mobile-first tools for farmer engagement and market linkages.',
      ar: 'تطوير حلول رقمية لسلاسل القيمة الزراعية. تنفيذ أدوات محمولة لإشراك المزارعين والربط بالأسواق.'
    },
    tags: ['agritech', 'ict4d', 'product'],
    year: '2023',
    locationIds: ['egypt']
  },
  {
    id: 'dai-women-empowerment',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=450&fit=crop',
    title: { en: 'Women Empowerment Platform', ar: 'منصة تمكين المرأة' },
    client: { en: 'DAI', ar: 'DAI' },
    role: { en: 'Technical Lead', ar: 'قائد تقني' },
    description: {
      en: 'Digital platform supporting women empowerment initiatives and economic opportunities in Afghanistan.',
      ar: 'منصة رقمية لدعم مبادرات تمكين المرأة والفرص الاقتصادية في أفغانستان.'
    },
    details: {
      en: 'Built tools for skills development, job matching, and entrepreneurship support. Implemented secure, accessible solutions for women beneficiaries.',
      ar: 'بناء أدوات لتنمية المهارات والتوظيف ودعم ريادة الأعمال. تنفيذ حلول آمنة وسهلة الوصول للمستفيدات.'
    },
    tags: ['ict4d', 'product'],
    year: '2023',
    locationIds: ['afghanistan']
  },
  {
    id: 'edc-jobmatching',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=450&fit=crop',
    title: { en: 'Job Matching Platform', ar: 'منصة التوظيف' },
    client: { en: 'EDC', ar: 'EDC' },
    role: { en: 'Technical Lead', ar: 'قائد تقني' },
    description: {
      en: 'Job matching and workforce development platform connecting youth with employment opportunities in Rwanda.',
      ar: 'منصة التوظيف وتطوير القوى العاملة تربط الشباب بفرص العمل في رواندا.'
    },
    details: {
      en: 'Developed matching algorithms and employer engagement tools. Built mobile-accessible platform for youth job seekers and training programs.',
      ar: 'تطوير خوارزميات المطابقة وأدوات إشراك أصحاب العمل. بناء منصة متاحة عبر الهاتف للشباب الباحثين عن عمل.'
    },
    tags: ['edtech', 'product'],
    year: '2023',
    locationIds: ['rwanda']
  },
  {
    id: 'aba-legaltech',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop',
    title: { en: 'Legaltech Platform', ar: 'منصة التكنولوجيا القانونية' },
    client: { en: 'American Bar Association', ar: 'نقابة المحامين الأمريكية' },
    role: { en: 'Technical Lead', ar: 'قائد تقني' },
    description: {
      en: 'Legal technology platform supporting access to justice initiatives across Turkey, Lebanon, and Syria.',
      ar: 'منصة تكنولوجيا قانونية تدعم مبادرات الوصول إلى العدالة في تركيا ولبنان وسوريا.'
    },
    details: {
      en: 'Built digital tools for legal aid providers and beneficiaries. Implemented case management and legal resource platforms for multi-country operations.',
      ar: 'بناء أدوات رقمية لمقدمي المساعدة القانونية والمستفيدين. تنفيذ منصات إدارة القضايا والموارد القانونية.'
    },
    tags: ['ict4d', 'product'],
    year: '2023',
    locationIds: ['turkey', 'lebanon', 'syria']
  },
  {
    id: 'peanut-posse',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=450&fit=crop',
    title: { en: 'Peanut Posse Platform', ar: 'منصة Peanut Posse' },
    client: { en: 'Apricot International', ar: 'أبريكوت الدولية' },
    role: { en: 'Tech Project Manager', ar: 'مدير المشروع التقني' },
    description: {
      en: 'Led product management and delivery through vague requirements and complex stakeholder landscapes, ensuring on-time project completion and upgrading team velocity.',
      ar: 'قيادة إدارة المنتج والتسليم عبر متطلبات غامضة ومناظر أصحاب مصلحة معقدة، مع ضمان إكمال المشروع في الوقت المحدد وتحسين سرعة الفريق.'
    },
    tags: ['startups', 'product'],
    year: '2025',
    locationIds: ['usa-mid']
  },
  {
    id: 'hunter-douglas',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=450&fit=crop',
    title: { en: 'Enterprise Solutions', ar: 'حلول مؤسسية' },
    client: { en: 'Hunter Douglas', ar: 'هنتر دوغلاس' },
    role: { en: 'DevOps Consultant', ar: 'استشاري' },
    description: { en: 'Enterprise solutions and technology consulting.', ar: 'حلول مؤسسية واستشارات تقنية.' },
    tags: ['devops'],
    year: '2025',
    locationIds: ['usa-east']
  },
  {
    id: 'obi',
    showInPortfolio: false,
    showOnMap: true,
    image: '',
    title: { en: 'Digital Platforms for International Development', ar: 'منصات رقمية للتنمية الدولية' },
    client: { en: 'OBI International', ar: 'OBI الدولية' },
    role: { en: 'Technical Project & Product Manager', ar: 'مدير المشروع والمنتج التقني' },
    description: { en: 'Led product lifecycle for a suite of digital platforms serving international development programs.', ar: 'قيادة دورة حياة المنتج لمجموعة من المنصات الرقمية التي تخدم برامج التنمية الدولية.' },
    tags: ['gov', 'product'],
    year: '',
    locationIds: ['usa-east']
  },
  {
    id: 'unodc',
    showInPortfolio: false,
    showOnMap: true,
    image: '',
    title: { en: 'Policy Making Tech', ar: 'تقنية صنع السياسات' },
    client: { en: 'UNODC', ar: 'مكتب الأمم المتحدة المعني بالمخدرات والجريمة' },
    role: { en: 'Consultant', ar: 'استشاري' },
    description: { en: 'Policy making technology solutions.', ar: 'حلول تقنية صنع السياسات.' },
    tags: ['gov'],
    year: '',
    locationIds: ['austria']
  },
  {
    id: 'mercy-corps-wit',
    showInPortfolio: true,
    showOnMap: true,
    image: 'https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=800&h=450&fit=crop',
    title: { en: 'WIT - Water Irrigation Tech', ar: 'تقنية ري المياه' },
    client: { en: 'Mercy Corps', ar: 'ميرسي كوربس' },
    role: { en: 'Technical Consultant', ar: 'استشاري تقني' },
    description: { en: 'Water irrigation technology solutions.', ar: 'حلول تقنية ري المياه.' },
    tags: ['ict4d', 'product'],
    year: '2022',
    locationIds: ['jordan']
  },
  {
    id: 'bisan-systems',
    showInPortfolio: false,
    showOnMap: true,
    image: '',
    title: { en: 'Fintech Platform', ar: 'منصة التكنولوجيا المالية' },
    client: { en: 'Bisan Systems', ar: 'أنظمة بيسان' },
    role: { en: 'Technical Consultant', ar: 'استشاري تقني' },
    description: { en: 'Fintech platform development.', ar: 'تطوير منصة التكنولوجيا المالية.' },
    tags: [],
    year: '',
    locationIds: ['palestine']
  },
  {
    id: 'apricot-international',
    showInPortfolio: false,
    showOnMap: true,
    image: '',
    title: { en: 'Engineering Leadership', ar: 'قيادة الهندسة' },
    client: { en: 'Apricot International', ar: 'أبريكوت الدولية' },
    role: { en: 'Director of Engineering', ar: 'مدير الهندسة' },
    description: { en: 'Driving strategic business development and leading high-performing engineering teams to unlock the full potential of displaced MENA tech talent.', ar: 'قيادة تطوير الأعمال الاستراتيجية وقيادة فرق هندسية عالية الأداء لإطلاق الإمكانات الكاملة لمواهب التكنولوجيا من منطقة الشرق الأوسط وشمال أفريقيا.' },
    tags: [],
    year: '',
    locationIds: ['usa-west']
  }
];

// ===== HELPER FUNCTIONS =====

/**
 * Get all projects to display in portfolio grid
 */
export function getPortfolioProjects(): WorkItem[] {
  return work.filter(item => item.showInPortfolio);
}

/**
 * Get portfolio projects filtered by tag
 */
export function getPortfolioProjectsByTag(tag: ProjectTag | 'all'): WorkItem[] {
  const portfolio = getPortfolioProjects();
  if (tag === 'all') return portfolio;
  return portfolio.filter(item => item.tags.includes(tag));
}

/**
 * Get all unique tags from portfolio projects
 */
export function getAllPortfolioTags(): ProjectTag[] {
  return ['startups', 'product', 'architecture', 'cloud', 'saas', 'edtech', 'ict4d', 'agritech'];
}

/**
 * Map marker data for GlobalMap component
 */
export interface MapMarker {
  location: WorkLocation;
  projects: {
    client: BilingualText;
    title: BilingualText;
  }[];
}

/**
 * Get map markers grouped by location with their projects
 */
export function getMapMarkers(): MapMarker[] {
  const markerMap = new Map<string, MapMarker>();

  // Initialize all locations
  locations.forEach(loc => {
    markerMap.set(loc.id, { location: loc, projects: [] });
  });

  // Aggregate projects per location
  work
    .filter(item => item.showOnMap)
    .forEach(item => {
      item.locationIds.forEach(locId => {
        const marker = markerMap.get(locId);
        if (marker) {
          marker.projects.push({
            client: item.client,
            title: item.title,
          });
        }
      });
    });

  // Return only locations with at least one project
  return Array.from(markerMap.values())
    .filter(marker => marker.projects.length > 0);
}

/**
 * Get a single work item by ID
 */
export function getWorkById(id: string): WorkItem | undefined {
  return work.find(item => item.id === id);
}

/**
 * Get all work items for a specific location
 */
export function getWorkByLocation(locationId: string): WorkItem[] {
  return work.filter(item => item.locationIds.includes(locationId));
}
