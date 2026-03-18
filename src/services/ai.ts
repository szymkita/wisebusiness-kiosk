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

Na podstawie danych użytkownika (branża, symptomy, skala firmy) generujesz spersonalizowaną diagnozę i 3 pomysły na automatyzację.

ZASADY DIAGNOZY:
- Zidentyfikuj JEDEN proces core'owy będący źródłem wszystkich wybranych symptomów
- Pokaż użytkownikowi, że jego pozornie odrębne problemy to jeden brak systemu
- Mów językiem biznesowym, emocjonalnym, konkretnym — zero żargonu IT
- Pokaż łańcuch przyczynowo-skutkowy
- 2-3 zdania z mocnym punchline'em

ZASADY POMYSŁÓW:
- 3 pomysły na dedykowany software/system automatyzujący core'owy proces
- Pomysł 1: Quick win — szybko wdrożyć, natychmiastowy efekt
- Pomysł 2: Game changer — głębsza transformacja procesu
- Pomysł 3: Wizja — jak firma działa gdy kluczowy proces jest w pełni zautomatyzowany
- Każdy pomysł opisuj z perspektywy użytkownika, nie technicznie
- Używaj "wyobraź sobie", "zamiast", "koniec z"
- Podaj konkretne metryki efektu (czas, błędy, osoby)
- Dopasuj ambicję do skali firmy
- NIGDY nie używaj słów: API, webhook, middleware, pipeline, workflow engine, integracja
- Bądź zaskakujący — nie generuj banalnych pomysłów typu "automatyzuj maile"

FORMAT: Odpowiedz WYŁĄCZNIE poprawnym JSON-em, bez dodatkowego tekstu, bez markdown, bez backticks:

{
  "diagnosis": {
    "core_process": "Nazwa procesu (krótka, zrozumiała)",
    "insight": "2-3 zdania diagnozy"
  },
  "ideas": [
    {
      "title": "Chwytliwy nagłówek bez żargonu",
      "description": "2-3 zdania jak to zmienia codzienną pracę",
      "before": "Jak wygląda dziś (boleśnie konkretne)",
      "after": "Jak wygląda po wdrożeniu",
      "impact": "Konkretna metryka, np. 'z 5 dni do 4 godzin'",
      "difficulty": "easy | medium | advanced"
    }
  ],
  "cta": "Jedno zdanie zachęcające do rozmowy"
}`;

function buildUserPrompt(industry: string, symptoms: string[], size: string, excludeIdeas?: string[]): string {
  let prompt = `Wygeneruj spersonalizowaną inspirację automatyzacyjną:

BRANŻA: ${industry}
SYMPTOMY:
${symptoms.map(s => `- ${s}`).join('\n')}
SKALA FIRMY: ${size}`;

  if (excludeIdeas && excludeIdeas.length > 0) {
    prompt += `

WAŻNE: Wygeneruj 3 NOWE, INNE pomysły niż te:
${excludeIdeas.map(t => `- ${t}`).join('\n')}
Bądź bardziej kreatywny i zaskakujący. Szukaj nieoczywistych kątów.`;
  }

  return prompt;
}

function parseAIResponse(text: string): AIResults {
  // Try to extract JSON from the response
  let jsonStr = text.trim();

  // Remove markdown code blocks if present
  jsonStr = jsonStr.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '');

  const parsed = JSON.parse(jsonStr);

  // Validate structure
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
  symptoms: string[],
  size: string,
  excludeIdeas?: string[],
  retryCount = 0,
): Promise<AIResults> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.warn('No ANTHROPIC_API_KEY set, using fallback');
    return getFallback(industry);
  }

  const userPrompt = buildUserPrompt(industry, symptoms, size, excludeIdeas);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch('/api/anthropic/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        temperature: 0.8,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    const text = data.content?.[0]?.text;
    if (!text) throw new Error('Empty response');

    return parseAIResponse(text);
  } catch (err) {
    console.error('AI call failed:', err);
    if (retryCount < 2) {
      return generateIdeas(industry, symptoms, size, excludeIdeas, retryCount + 1);
    }
    return getFallback(industry);
  }
}

/* ── Fallback data ── */
function getFallback(industry: string): AIResults {
  const fallbacks: Record<string, AIResults> = {
    'Produkcja': {
      diagnosis: {
        core_process: 'Zarządzanie zleceniami produkcyjnymi',
        insight: 'Twoje problemy mają jedno źródło: brak centralnego systemu, który prowadzi zlecenie od zamówienia klienta do wysyłki. Każdy etap żyje w osobnym świecie — a ludzie biegają między nimi z kartkami i telefonami.',
      },
      ideas: [
        {
          title: 'Tablica zleceń na żywo',
          description: 'Wyobraź sobie, że każdy na hali widzi na ekranie co jest do zrobienia, w jakiej kolejności i do kiedy. Koniec z pytaniami "co teraz?" — system sam podpowiada.',
          before: 'Brygadzista rano drukuje plan, który do południa jest nieaktualny',
          after: 'Cyfrowa tablica aktualizuje się automatycznie — każda zmiana widoczna natychmiast',
          impact: 'z 2h planowania dziennie do 10 minut',
          difficulty: 'easy',
        },
        {
          title: 'Automatyczny strażnik jakości',
          description: 'System wymusza kontrolę jakości w kluczowych punktach procesu. Zamiast łapać błędy na końcu, wychwytuje je u źródła — zanim staną się kosztowne.',
          before: 'Reklamacje odkrywane po wysyłce, koszt naprawy x10',
          after: 'System blokuje przejście do następnego etapu bez potwierdzenia jakości',
          impact: 'redukcja reklamacji o 70%',
          difficulty: 'medium',
        },
        {
          title: 'Fabryka, która się uczy',
          description: 'Wyobraź sobie, że system sam analizuje ile czasu zajmują poszczególne operacje, gdzie powstają przestoje i jak je eliminować. Co tydzień jest lepiej — bez żadnych spotkań.',
          before: 'Nikt nie wie ile naprawdę trwa produkcja jednej sztuki',
          after: 'Pełna analityka w czasie rzeczywistym — wiesz wszystko, decydujesz na danych',
          impact: 'wzrost wydajności o 25% w 6 miesięcy',
          difficulty: 'advanced',
        },
      ],
      cta: 'To dopiero początek — porozmawiajmy o Twojej produkcji i pokażmy Ci, ile czasu i pieniędzy tracisz każdego dnia.',
    },
    'default': {
      diagnosis: {
        core_process: 'Obsługa klienta end-to-end',
        insight: 'Wszystkie Twoje bolączki prowadzą do jednego: brak spójnego systemu, który prowadzi klienta od pierwszego kontaktu do finalizacji. Ludzie improwizują, Excel pęka w szwach, a wiedza żyje w głowach zamiast w systemie.',
      },
      ideas: [
        {
          title: 'Centrum dowodzenia w jednym oknie',
          description: 'Wyobraź sobie, że otwierasz jedną aplikację i widzisz wszystko: kto czeka na odpowiedź, co jest w toku, gdzie się pali. Koniec z szukaniem informacji w 5 miejscach.',
          before: 'Informacje rozsiane po mailach, Excelach i karteczkach',
          after: 'Jeden widok — pełna kontrola nad każdą sprawą',
          impact: 'z 30 minut szukania do 10 sekund',
          difficulty: 'easy',
        },
        {
          title: 'Klient wie wszystko — sam',
          description: 'Zamiast odpowiadać na 50 telefonów dziennie "jaki jest status?", daj klientowi panel, w którym sam zobaczy. Twój zespół skupia się na pracy, nie na raportowaniu.',
          before: '50 telefonów i maili dziennie z pytaniem o status',
          after: 'Klient sam sprawdza postęp w dedykowanym panelu',
          impact: 'oszczędność 3h dziennie na obsłudze pytań',
          difficulty: 'medium',
        },
        {
          title: 'Firma na autopilocie',
          description: 'Wyobraź sobie, że nowy pracownik od pierwszego dnia wie co robić — system prowadzi go krok po kroku. Procesy działają tak samo, niezależnie kto je wykonuje.',
          before: 'Miesiąc wdrożenia, wiedza odchodzi z ludźmi',
          after: 'System jest mózgiem firmy — procesy działają niezależnie od rotacji',
          impact: 'wdrożenie nowej osoby z 4 tygodni do 3 dni',
          difficulty: 'advanced',
        },
      ],
      cta: 'Te pomysły to dopiero iskra — wyobraź sobie, co wymyślimy gdy naprawdę poznamy Twoje procesy.',
    },
  };

  return fallbacks[industry] || fallbacks['default'];
}
