import type { ComponentType } from 'react';
import { FinanceDemo } from './FinanceDemo';
import { LogisticsDemo } from './LogisticsDemo';
import { EcommerceDemo } from './EcommerceDemo';
import { HealthcareDemo } from './HealthcareDemo';
import { HrDemo } from './HrDemo';

export interface DemoEntry { title: string; icon: string; color: string; component: ComponentType; }

export const demos: Record<string, DemoEntry> = {
  finance:    { title: 'Panel Finansowy',         icon: 'dollar-sign',   color: '#00CD77', component: FinanceDemo },
  logistics:  { title: 'Zarządzanie Logistyką',   icon: 'truck',         color: '#3b82f6', component: LogisticsDemo },
  ecommerce:  { title: 'Platforma E-commerce',    icon: 'shopping-cart', color: '#f59e0b', component: EcommerceDemo },
  healthcare: { title: 'System Medyczny',          icon: 'activity',      color: '#ef4444', component: HealthcareDemo },
  hr:         { title: 'Panel Klienta HR',         icon: 'users',         color: '#6366f1', component: HrDemo },
};
