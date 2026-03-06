export type BrandSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface Brand {
  id: string;
  name: string;
  logo: string;
  url: string;
  size: BrandSize;
}

export const brands: Brand[] = [
  {
    id: 'apricot',
    name: 'Apricot International',
    logo: 'https://logo.clearbit.com/apricot.com',
    url: 'https://apricotinternational.org',
    size: 'lg'
  },
  {
    id: 'unblocked',
    name: 'Unblocked Brands',
    logo: 'https://logo.clearbit.com/nft.co',
    url: 'https://www.nftco.com',
    size: 'sm'
  },
  {
    id: 'obi',
    name: 'OBI Digital',
    logo: 'https://logo.clearbit.com/obidigital.com',
    url: 'https://www.obidigital.org',
    size: 'md'
  },
  {
    id: 'mercycorps',
    name: 'Mercy Corps',
    logo: 'https://logo.clearbit.com/mercycorps.org',
    url: 'https://www.mercycorps.org',
    size: 'xxl'
  },
  {
    id: 'dtglobal',
    name: 'DT Global',
    logo: 'https://logo.clearbit.com/dt-global.com',
    url: 'https://dt-global.com',
    size: 'sm'
  },
  {
    id: 'care',
    name: 'CARE International',
    logo: 'https://logo.clearbit.com/care.org',
    url: 'https://www.care.org',
    size: 'lg'
  },
  {
    id: 'irc',
    name: 'IRC',
    logo: 'https://logo.clearbit.com/rescue.org',
    url: 'https://www.rescue.org',
    size: 'lg'
  },
  {
    id: 'hunter-douglas',
    name: 'Hunter Douglas North America',
    logo: 'https://logo.clearbit.com/hunterdouglas.com',
    url: 'https://www.hunterdouglas.com',
    size: 'md'
  },
  {
    id: 'cambridge',
    name: 'Cambridge Education',
    logo: 'https://logo.clearbit.com/camb-ed.com',
    url: 'https://www.camb-ed.com',
    size: 'lg'
  },
  {
    id: 'abt',
    name: 'Abt Associates',
    logo: 'https://logo.clearbit.com/abtassociates.com',
    url: 'https://www.abtassociates.com',
    size: 'sm'
  },
  {
    id: 'dai',
    name: 'DAI',
    logo: 'https://logo.clearbit.com/dai.com',
    url: 'https://www.dai.com',
    size: 'lg'
  },
  {
    id: 'souktel',
    name: 'Souktel',
    logo: 'https://logo.clearbit.com/souktel.com',
    url: 'https://www.souktel.org',
    size: 'xxl'
  },
  {
    id: 'konektid',
    name: 'Konektid',
    logo: 'https://logo.clearbit.com/konektid.com',
    url: 'https://www.konektid.com',
    size: 'md'
  },
  {
    id: 'cnfa',
    name: 'CNFA',
    logo: 'https://logo.clearbit.com/cnfa.org',
    url: 'https://www.cnfa.org',
    size: 'md'
  },
  {
    id: 'unodc',
    name: 'UNODC',
    logo: 'https://logo.clearbit.com/unodc.org',
    url: 'https://www.unodc.org',
    size: 'lg'
  },
  {
    id: 'ibtci',
    name: 'IBTCI',
    logo: 'https://logo.clearbit.com/ibtci.com',
    url: 'https://www.ibtci.com',
    size: 'xs'
  },
  {
    id: 'iqvia',
    name: 'IQVIA',
    logo: 'https://logo.clearbit.com/iqvia.com',
    url: 'https://www.iqvia.com',
    size: 'xs'
  }
];
