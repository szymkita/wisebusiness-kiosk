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
      { id: 'client-portal', name: 'Panele klienta', desc: 'Strefy self-service, statusy zleceń, dokumenty — klient nie musi dzwonić', icon: 'user', color: '#8b5cf6', demoId: 'client-portal' },
      { id: 'custom-crm', name: 'Dedykowane CRM', desc: 'Pipeline sprzedaży, kontakty, follow-upy — CRM szyty na miarę procesu', icon: 'users', color: '#ec4899', demoId: 'custom-crm' },
      { id: 'dashboards', name: 'Dashboardy i analityka', desc: 'KPI, trendy, alerty w czasie rzeczywistym — decyzje oparte na danych', icon: 'bar-chart', color: '#3b82f6', demoId: 'dashboards' },
      { id: 'operations-os', name: 'Systemy operacyjne firm', desc: 'Jedno centrum na procesy, ludzi i dane — zamiast rozsypki narzędzi', icon: 'layers', color: '#10b981', demoId: 'operations-os' },
      { id: 'workflow-auto', name: 'Automatyzacja procesów', desc: 'Zlecenia, akceptacje, eskalacje — procesy jadą same, bez maili', icon: 'git-merge', color: '#f59e0b', demoId: 'workflow-auto' },
      { id: 'helpdesk', name: 'Systemy obsługi zgłoszeń', desc: 'Kolejki, SLA, eskalacje, powiadomienia — zero zgubionych spraw', icon: 'inbox', color: '#f97316', demoId: 'helpdesk' },
      { id: 'integrations', name: 'Hub integracji', desc: 'ERP, CRM, magazyn, księgowość — dane przepływają automatycznie', icon: 'share-2', color: '#06b6d4', demoId: 'integrations' },
      { id: 'hr-onboarding', name: 'Systemy HR i onboarding', desc: 'Onboarding, grafiki, wnioski, dokumenty — HR bez papierologii', icon: 'user-plus', color: '#6366f1', demoId: 'hr-onboarding' },
    ],
  },
];
