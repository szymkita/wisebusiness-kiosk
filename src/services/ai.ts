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
- Pokaż użytkownikowi, że jego pozornie odrębne problemy mają wspólne źródło
- Mów językiem biznesowym, konkretnym — zero żargonu IT
- 2-3 zdania z mocnym punchline'em
- Bądź specyficzny dla danej branży — nie pisz ogólników

ZASADY POMYSŁÓW:
- 5 pomysłów na dedykowany software/system automatyzujący wskazane procesy
- Pomysły 1-2 (Quick Win): szybko wdrożyć, natychmiastowy efekt, niski koszt
- Pomysły 3-4 (Game Changer): głębsza transformacja procesu, wymierny ROI
- Pomysł 5 (Wizja): jak firma działa gdy kluczowe procesy są w pełni zautomatyzowane
- Jeśli użytkownik wskazał wiele procesów, rozłóż pomysły między nimi
- Opisuj z perspektywy użytkownika — co się zmienia w jego codziennej pracy
- Podaj konkretne, realistyczne metryki efektu (czas, błędy, koszty, osoby)
- Dopasuj ambicję i język do skali firmy (mała firma = prostsze rozwiązania, duża = enterprise)
- NIGDY nie używaj słów: API, webhook, middleware, pipeline, workflow engine, integracja, moduł
- Każdy pomysł musi być INNY — różne aspekty procesu, różne podejścia
- Bądź konkretny i zaskakujący — nie pisz banalnych pomysłów

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
      "before": "Jak wygląda dziś (konkretny, bolesny przykład)",
      "after": "Jak wygląda po wdrożeniu (konkretny efekt)",
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

  let prompt = `Wygeneruj spersonalizowaną diagnozę i pomysły na automatyzację.

BRANŻA: ${industry}
${processLine}
PROBLEMY:
${problemLines.map(s => `- ${s}`).join('\n')}
${goalLine}
SKALA FIRMY: ${size}

WAŻNE:
- Nazwy procesów powyżej to specyficzne obszary w branży "${industry}" — Twoje pomysły muszą się odnosić DOKŁADNIE do tych obszarów
- Używaj nazewnictwa, sytuacji i przykładów typowych dla branży "${industry}"
- Pomysły muszą bezpośrednio adresować wskazane problemy i koszty
- NIE pisz ogólników. Każde zdanie powinno być tak konkretne, żeby czytelnik pomyślał "to o mojej firmie"
- Metryki efektu muszą być realistyczne dla firmy ${size}
- Opisuj rozwiązania jako dedykowane systemy/oprogramowanie, nie gotowe narzędzia z rynku`;

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
