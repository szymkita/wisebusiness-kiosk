import type { AIResults } from './ai';

export interface SharedData {
  industry: string;
  processes: string[];
  goal: string;
  size: string;
  results: AIResults;
}

function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function fromBase64(b64: string): string {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function encodeResults(data: SharedData): string {
  try {
    const json = JSON.stringify(data);
    const encoded = toBase64(json);
    return `${window.location.origin}/r#${encoded}`;
  } catch (err) {
    console.error('Failed to encode results:', err);
    return '';
  }
}

export function decodeResults(hash: string): SharedData | null {
  try {
    const encoded = hash.startsWith('#') ? hash.slice(1) : hash;
    if (!encoded) return null;
    const json = fromBase64(encoded);
    return JSON.parse(json);
  } catch (err) {
    console.error('Failed to decode results:', err);
    return null;
  }
}
