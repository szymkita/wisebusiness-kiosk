export interface AIIdea {
  title: string;
  description: string;
  before: string;
  after: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

export interface AIResults {
  diagnosis: {
    core_process: string;
    insight: string;
  };
  ideas: AIIdea[];
  cta: string;
}

const SYSTEM_PROMPT = `Jesteś Inspiratorem Automatyzacji — kreatywnym konsultantem strategicznym specjalizującym się w automatyzacji core'owych procesów biznesowych i budowie dedykowanego oprogramowania.

Na podstawie danych użytkownika (branża, procesy, wyzwania, cel, skala firmy) generujesz spersonalizowaną diagnozę i 5 pomysłów na automatyzację.

ZASADY DIAGNOZY:
- Zidentyfikuj wspólne źródło wybranych problemów w kontekście wskazanych procesów
- Pokaż użytkownikowi, że jego pozornie odrębne problemy mają wspólne źródło — że to nie 5 problemów, a jeden systemowy
- Mów językiem biznesowym, konkretnym — zero żargonu IT
- 2-3 zdania z mocnym punchline'em, który rezonuje emocjonalnie ("to dlatego Twój zespół gasi pożary zamiast budować")
- Bądź specyficzny dla danej branży — nie pisz ogólników. Użyj nazewnictwa i sytuacji, które właściciel/manager tej branży natychmiast rozpozna

ZASADY POMYSŁÓW:
- 5 pomysłów na dedykowany software/system automatyzujący wskazane procesy
- Pomysły 1-2 (Quick Win): szybko wdrożyć, natychmiastowy efekt, niski koszt — coś co daje "aha, to mogliśmy mieć wczoraj"
- Pomysły 3-4 (Game Changer): głębsza transformacja procesu, wymierny ROI — zmiana reguł gry, nie kosmetyka
- Pomysł 5 (Wizja): jak firma działa gdy kluczowe procesy są w pełni zautomatyzowane — inspirujący obraz przyszłości
- Jeśli użytkownik wskazał wiele procesów, rozłóż pomysły między nimi
- Opisuj z perspektywy użytkownika — co się KONKRETNIE zmienia w jego poniedziałkowy poranek
- Podaj konkretne, realistyczne metryki efektu (czas, błędy, koszty, osoby) — nie zaokrąglaj do 90%, bądź precyzyjny
- Dopasuj ambicję i język do skali firmy (mała firma = prostsze rozwiązania, duża = enterprise)
- NIGDY nie używaj słów: API, webhook, middleware, pipeline, workflow engine, integracja, moduł
- Każdy pomysł musi być INNY — różne aspekty procesu, różne podejścia
- Bądź ODWAŻNY i ZASKAKUJĄCY w pomysłach — nie pisz oczywistych banalnych rzeczy typu "centralny system do zarządzania". Proponuj rozwiązania, które użytkownik sam by nie wymyślił, ale od razu widzi ich wartość. Myśl o procesach od końca: jaki efekt biznesowy chcemy osiągnąć?
- Opisuj SCENARIUSZE — "W piątek o 16:00 klient dzwoni z pilnym zleceniem. Dziś: szukasz handlowca, który pamięta cenę. Po wdrożeniu: klient sam składa zamówienie w panelu, cena kalkuluje się automatycznie, produkcja widzi zlecenie w poniedziałek o 6:00."
- Pole "before" i "after" — pisz jak mini-historie. Konkrety. Imię, godzina, sytuacja. Nie abstrakty.

FORMAT: Odpowiedz WYŁĄCZNIE poprawnym JSON-em, bez dodatkowego tekstu, bez markdown, bez backticks:

{
  "diagnosis": {
    "core_process": "Nazwa procesu (krótka, max 5 słów)",
    "insight": "2-3 zdania diagnozy"
  },
  "ideas": [
    {
      "title": "Chwytliwy nagłówek (max 6 słów)",
      "description": "2-3 zdania opisujące zmianę w codziennej pracy",
      "before": "Jak wygląda dziś (konkretny, bolesny scenariusz z detalami)",
      "after": "Jak wygląda po wdrożeniu (konkretny efekt, który można poczuć)",
      "impact": "Konkretna metryka, np. 'z 5 dni do 4 godzin'",
      "difficulty": "easy | medium | advanced"
    }
  ],
  "cta": "Jedno zdanie zachęcające do rozmowy — nawiąż do konkretnej branży użytkownika"
}`;

function buildUserPrompt(industry: string, context: string[], size: string, excludeIdeas?: string[]): string {
  const processLine = context[0];
  const problemLines = context.slice(1, -1);
  const goalLine = context[context.length - 1];

  const isOther = industry === 'Inna branża';

  let prompt = `Wygeneruj spersonalizowaną diagnozę i pomysły na automatyzację.

BRANŻA: ${industry}
${processLine}
PROBLEMY:
${problemLines.map(s => `- ${s}`).join('\n')}
${goalLine}
SKALA FIRMY: ${size}

WAŻNE:
- Nazwy procesów powyżej to specyficzne obszary${isOther ? '' : ` w branży "${industry}"`} — Twoje pomysły muszą się odnosić DOKŁADNIE do tych obszarów
${isOther ? '- Użytkownik wybrał "Inna branża" — generuj uniwersalne, ale konkretne pomysły. Odnoś się do wybranych procesów i problemów. Bądź praktyczny.' : `- Używaj nazewnictwa, sytuacji i przykładów typowych dla branży "${industry}"`}
- Pomysły muszą bezpośrednio adresować wskazane problemy i koszty
- NIE pisz ogólników. Każde zdanie powinno być tak konkretne, żeby czytelnik pomyślał "to o mojej firmie"
- Metryki efektu muszą być realistyczne dla firmy ${size}
- Opisuj rozwiązania jako dedykowane systemy/oprogramowanie, nie gotowe narzędzia z rynku
- Każdy pomysł powinien być REALNY do wdrożenia — nie sci-fi, ale też nie banał. Złoty środek: ambitne ale osiągalne
- W polach "before" i "after" pisz SCENARIUSZE — konkretna sytuacja, dzień tygodnia, kto robi co. Czytelnik musi poczuć "dokładnie tak to u nas wygląda"
- Unikaj powtarzania tych samych wzorców (np. "dashboard do X", "panel do Y"). Każdy pomysł powinien mieć INNĄ mechanikę`;

  if (excludeIdeas && excludeIdeas.length > 0) {
    prompt += `

WAŻNE: Wygeneruj 5 NOWYCH, INNYCH pomysłów niż te:
${excludeIdeas.map(t => `- ${t}`).join('\n')}
Szukaj zupełnie innych kątów i aspektów procesu.`;
  }

  return prompt;
}

function parseAIResponse(text: string): AIResults {
  let jsonStr = text.trim();
  jsonStr = jsonStr.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '');

  const parsed = JSON.parse(jsonStr);

  if (!parsed.diagnosis?.core_process || !parsed.diagnosis?.insight) {
    throw new Error('Missing diagnosis');
  }
  if (!Array.isArray(parsed.ideas) || parsed.ideas.length < 3) {
    throw new Error('Missing ideas');
  }

  return parsed as AIResults;
}

export async function generateIdeas(
  industry: string,
  challenges: string[],
  size: string,
  excludeIdeas?: string[],
  retryCount = 0,
): Promise<AIResults> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('No GEMINI_API_KEY set, using fallback');
    return getFallback();
  }

  const userPrompt = buildUserPrompt(industry, challenges, size, excludeIdeas);
  const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 2500,
          },
        }),
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`API error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response');

    return parseAIResponse(text);
  } catch (err) {
    console.error('AI call failed:', err);
    if (retryCount < 2) {
      return generateIdeas(industry, challenges, size, excludeIdeas, retryCount + 1);
    }
    return getFallback();
  }
}

function getFallback(): AIResults {
  return {
    diagnosis: {
      core_process: 'Brak centralnego systemu',
      insight: 'Nie udało się połączyć z AI — ale na podstawie doświadczenia wiemy, że większość firm boryka się z brakiem jednego spójnego systemu, który łączy ludzi, dane i procesy. Porozmawiaj z nami, żebyśmy mogli przygotować spersonalizowaną diagnozę.',
    },
    ideas: [
      {
        title: 'Jedno źródło prawdy',
        description: 'System, w którym wszystkie informacje są w jednym miejscu — koniec z szukaniem danych w mailach, Excelach i na karteczkach.',
        before: 'Informacje rozsiane po wielu narzędziach, nikt nie ma pełnego obrazu',
        after: 'Jeden dashboard — pełna kontrola nad każdą sprawą w firmie',
        impact: 'z 30 minut szukania do 10 sekund',
        difficulty: 'easy',
      },
      {
        title: 'Procesy, które pilnują się same',
        description: 'Wyobraź sobie, że system sam przypomina o terminach, eskaluje problemy i pilnuje, żeby nic nie umknęło.',
        before: 'Rzeczy się gubią, terminy pękają, ktoś musi wszystko pamiętać',
        after: 'System automatycznie pilnuje kolejnych kroków — zero rzeczy "wpadających w szczelinę"',
        impact: 'redukcja pomyłek o 80%',
        difficulty: 'medium',
      },
      {
        title: 'Firma odporna na rotację',
        description: 'Nowy pracownik od pierwszego dnia wie co robić — system prowadzi go krok po kroku przez każdy proces.',
        before: 'Miesiąc wdrożenia, wiedza odchodzi z ludźmi',
        after: 'Wdrożenie w 3 dni — procesy działają niezależnie od rotacji',
        impact: 'wdrożenie nowej osoby z 4 tygodni do 3 dni',
        difficulty: 'advanced',
      },
    ],
    cta: 'Te pomysły to dopiero początek — porozmawiaj z nami, żebyśmy mogli je dopasować do Twojej firmy.',
  };
}
