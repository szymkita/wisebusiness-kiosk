export interface TileData {
  id: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  demoId?: string;
}

export interface TabData {
  id: string;
  label: string;
  icon: string;
  tiles: TileData[];
}

export const tabs: TabData[] = [
  {
    id: 'industries',
    label: 'Branże',
    icon: 'grid',
    tiles: [
      { id: 'finance', name: 'Finanse', desc: 'Bankowość, ubezpieczenia, fintech', icon: 'dollar-sign', color: '#10b981', demoId: 'finance' },
      { id: 'logistics', name: 'Logistyka', desc: 'Transport, łańcuch dostaw, magazyny', icon: 'truck', color: '#3b82f6', demoId: 'logistics' },
      { id: 'ecommerce', name: 'E-commerce', desc: 'Sklepy online, marketplace, omnichannel', icon: 'shopping-cart', color: '#f59e0b', demoId: 'ecommerce' },
      { id: 'healthcare', name: 'Healthcare', desc: 'Medycyna, telemedycyna, pharma', icon: 'activity', color: '#ef4444', demoId: 'healthcare' },
      { id: 'education', name: 'Edukacja', desc: 'E-learning, LMS, platformy szkoleniowe', icon: 'book-open', color: '#8b5cf6' },
      { id: 'manufacturing', name: 'Produkcja', desc: 'Automatyzacja, Industry 4.0, MES', icon: 'layers', color: '#06b6d4' },
      { id: 'realestate', name: 'Nieruchomości', desc: 'PropTech, zarządzanie, smart building', icon: 'home', color: '#ec4899' },
      { id: 'horeca', name: 'HoReCa', desc: 'Gastronomia, hotelarstwo, turystyka', icon: 'coffee', color: '#f97316' },
    ],
  },
  {
    id: 'software',
    label: 'Typy oprogramowania',
    icon: 'code',
    tiles: [
      { id: 'webapp', name: 'Aplikacje webowe', desc: 'SPA, PWA, dashboardy, portale', icon: 'globe', color: '#3b82f6' },
      { id: 'mobile', name: 'Aplikacje mobilne', desc: 'iOS, Android, cross-platform', icon: 'smartphone', color: '#8b5cf6' },
      { id: 'saas', name: 'Platformy SaaS', desc: 'Multi-tenant, subskrypcje, API', icon: 'cloud', color: '#06b6d4' },
      { id: 'erp', name: 'Systemy ERP', desc: 'Zarządzanie zasobami, procesy biznesowe', icon: 'monitor', color: '#10b981' },
      { id: 'crm', name: 'Systemy CRM', desc: 'Relacje z klientami, sprzedaż, marketing', icon: 'users', color: '#f59e0b' },
      { id: 'ecommerce-platform', name: 'Platformy e-commerce', desc: 'Sklepy, marketplace, integracje', icon: 'trending-up', color: '#ec4899' },
      { id: 'iot', name: 'IoT', desc: 'Czujniki, monitoring, smart devices', icon: 'user', color: '#ef4444' },
      { id: 'ai', name: 'AI / ML', desc: 'Sztuczna inteligencja, automatyzacja, dane', icon: 'cpu', color: '#f97316' },
    ],
  },
];
