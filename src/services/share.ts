import type { AIResults } from './ai';

export interface SharedData {
  industry: string;
  processes: string[];
  goal: string;
  size: string;
  results: AIResults;
}

export function encodeResults(data: SharedData): string {
  const json = JSON.stringify(data);
  // Unicode-safe base64 encoding
  const encoded = btoa(unescape(encodeURIComponent(json)));
  return `${window.location.origin}/r#${encoded}`;
}

export function decodeResults(hash: string): SharedData | null {
  try {
    const encoded = hash.startsWith('#') ? hash.slice(1) : hash;
    if (!encoded) return null;
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
