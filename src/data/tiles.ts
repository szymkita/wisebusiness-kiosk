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
      { id: 'operations-os', name: 'Systemy operacyjne firm', desc: 'Jedno miejsce na procesy, ludzi i dane — zamiast 15 narzędzi sklejonych taśmą', icon: 'layers', color: '#10b981', demoId: 'ops' },
      { id: 'workflow-auto', name: 'Automatyzacja workflow', desc: 'Zlecenia, akceptacje, eskalacje — procesy jadą same, bez maili i Exceli', icon: 'git-merge', color: '#3b82f6', demoId: 'workflow' },
      { id: 'integrations', name: 'Integracje systemowe', desc: 'Łączymy ERP, CRM, magazyn, księgowość — dane przepływają bez kopiuj-wklej', icon: 'share-2', color: '#8b5cf6', demoId: 'integrations' },
      { id: 'ops-dashboards', name: 'Panele zarządzania', desc: 'KPI, bottlenecki, obłożenie zespołu — widzisz stan firmy w czasie rzeczywistym', icon: 'bar-chart', color: '#f59e0b', demoId: 'ops' },
      { id: 'task-flow', name: 'Obieg zadań i akceptacji', desc: 'Kto robi co, do kiedy, kto zatwierdza — zero zgubień i zero "nie wiedziałem"', icon: 'check-square', color: '#06b6d4', demoId: 'workflow' },
      { id: 'sales-auto', name: 'Automatyzacja sprzedaży', desc: 'Lead wpada, oferta się generuje, follow-up leci sam — handlowiec zamyka', icon: 'trending-up', color: '#ec4899', demoId: 'ops' },
      { id: 'ticketing', name: 'Systemy obsługi zgłoszeń', desc: 'Zgłoszenia od klientów, SLA, kolejki, powiadomienia — nic nie ginie', icon: 'inbox', color: '#f97316', demoId: 'workflow' },
      { id: 'billing-auto', name: 'Rozliczenia i fakturowanie', desc: 'Automatyczne faktury z realizacji, rozliczenia projektowe, kontrola marż', icon: 'file-text', color: '#14b8a6', demoId: 'integrations' },
      { id: 'resource-mgmt', name: 'Zarządzanie zasobami', desc: 'Grafiki, dostępność zespołu, alokacja na projekty — koniec z "kto jest wolny?"', icon: 'calendar', color: '#ef4444', demoId: 'ops' },
      { id: 'client-onboard', name: 'Onboarding klientów', desc: 'Checklisty, dokumenty, dostępy, powitania — nowy klient nie czeka tygodnia', icon: 'user-plus', color: '#6366f1', demoId: 'workflow' },
      { id: 'reporting', name: 'Raportowanie operacyjne', desc: 'Rentowność projektów, czas realizacji, obciążenie — decyzje na danych, nie na czuja', icon: 'pie-chart', color: '#e11d48', demoId: 'integrations' },
      { id: 'logistics', name: 'Systemy logistyczne', desc: 'Trasy, awizacje, statusy przesyłek, rozliczenia kierowców — logistyka pod kontrolą', icon: 'truck', color: '#0ea5e9', demoId: 'ops' },
    ],
  },
];
