/**
 * POST health-check to hyper-processor. Reads URL + anon key from .env.local or .env, or env HYPER_URL / HYPER_ANON_KEY.
 */
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function readEnvFile(name) {
  const p = resolve(root, name);
  if (!existsSync(p)) return '';
  return readFileSync(p, 'utf8');
}

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[k] = v;
  }
  return out;
}

const fromLocal = { ...parseEnv(readEnvFile('.env.local')), ...parseEnv(readEnvFile('.env')) };
const supabaseUrl = process.env.HYPER_URL || fromLocal.VITE_SUPABASE_URL;
const anonKey = process.env.HYPER_ANON_KEY || fromLocal.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  console.error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in .env.local (or .env), or set HYPER_URL and HYPER_ANON_KEY.');
  process.exit(1);
}

const base = supabaseUrl.replace(/\/$/, '');
const url = `${base}/functions/v1/hyper-processor`;

const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${anonKey}`,
    apikey: anonKey,
  },
  body: JSON.stringify({ type: 'health-check' }),
});

const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  body = text;
}

console.log(`URL: ${url}`);
console.log(`HTTP: ${res.status}`);
console.log(typeof body === 'string' ? body : JSON.stringify(body, null, 2));

if (!res.ok) process.exit(1);
if (body && typeof body === 'object' && body.status !== 'ok') process.exit(1);
if (body && typeof body === 'object' && body.ai_configured === false) {
  console.error('\nai_configured is false — set CLAUDE_API_KEY in Supabase Edge Function secrets and redeploy hyper-processor.');
  process.exit(1);
}

console.log('\nOK — hyper-processor health check passed.');
