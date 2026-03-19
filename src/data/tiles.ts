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
    label: 'Co budujemy',
    icon: 'code',
    tiles: [
      { id: 'client-portal', name: 'Panele klienta', desc: 'Portale self-service, strefy klienta, statusy zamówień i dokumenty online', icon: 'globe', color: '#3b82f6' },
      { id: 'crm-custom', name: 'Dedykowane systemy CRM', desc: 'Pipeline sprzedaży, automatyzacja follow-upów, nurturing i scoring leadów', icon: 'users', color: '#f59e0b' },
      { id: 'dashboards', name: 'Dashboardy & BI', desc: 'Raporty KPI, wizualizacje danych, alerty i prognozy w czasie rzeczywistym', icon: 'bar-chart', color: '#8b5cf6' },
      { id: 'operations', name: 'Systemy operacyjne', desc: 'Zarządzanie produkcją (MES), zlecenia, harmonogramowanie, OEE', icon: 'settings', color: '#06b6d4' },
      { id: 'booking', name: 'Systemy rezerwacji', desc: 'Wizyty, grafiki, kalendarze zasobów, potwierdzenia SMS/email', icon: 'clock', color: '#10b981' },
      { id: 'workflow', name: 'Obieg dokumentów', desc: 'Faktury, akceptacje, podpisy elektroniczne, ścieżki audytowe', icon: 'file-text', color: '#ec4899' },
      { id: 'ecommerce-platform', name: 'Platformy e-commerce', desc: 'Sklepy B2C/B2B, marketplace, integracje z Allegro, Shopify', icon: 'shopping-cart', color: '#f97316' },
      { id: 'mobile-apps', name: 'Aplikacje mobilne', desc: 'iOS, Android, PWA — dla pracowników, klientów i w terenie', icon: 'smartphone', color: '#ef4444' },
      { id: 'wms', name: 'Systemy magazynowe', desc: 'Stany, picking, inwentaryzacja, integracja z ERP i e-commerce', icon: 'package', color: '#14b8a6' },
      { id: 'b2b-portals', name: 'Portale B2B', desc: 'Zamówienia hurtowe, portal dostawcy, awizacje, rozliczenia', icon: 'briefcase', color: '#6366f1' },
      { id: 'hr-systems', name: 'Systemy HR & kadry', desc: 'ATS, ewidencja czasu, portal pracownika, lista płac', icon: 'heart', color: '#e11d48' },
      { id: 'saas-platforms', name: 'Platformy SaaS', desc: 'Multi-tenant, billing, API, onboarding użytkowników', icon: 'cloud', color: '#0ea5e9' },
    ],
  },
];
