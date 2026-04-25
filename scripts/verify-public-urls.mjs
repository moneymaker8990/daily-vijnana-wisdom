#!/usr/bin/env node
/**
 * Verify that the public legal URLs required for App Store / Play submission
 * return HTTP 200 over HTTPS.
 *
 * Usage:
 *   node scripts/verify-public-urls.mjs
 *   node scripts/verify-public-urls.mjs --base https://mindvanta.io
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function readEnvBaseUrl() {
  for (const name of ['.env.local', '.env']) {
    try {
      const text = readFileSync(resolve(root, name), 'utf8');
      const match = text.match(/^VITE_APP_BASE_URL=(.+)$/m);
      if (match) return match[1].trim().replace(/^"|"$/g, '');
    } catch {}
  }
  return null;
}

const cliBaseIndex = process.argv.indexOf('--base');
const cliBase = cliBaseIndex >= 0 ? process.argv[cliBaseIndex + 1] : null;
const base = cliBase || readEnvBaseUrl() || 'https://mindvanta.io';

const paths = ['/privacy-policy.html', '/terms-of-service.html'];

let failed = false;

for (const p of paths) {
  const url = `${base}${p}`;
  try {
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) {
      failed = true;
      console.log(`FAIL ${response.status}  ${url}`);
      continue;
    }
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      failed = true;
      console.log(`FAIL non-html content-type "${contentType}"  ${url}`);
      continue;
    }
    console.log(`OK   ${response.status}  ${url}`);
  } catch (err) {
    failed = true;
    console.log(`FAIL ${err?.message || err}  ${url}`);
  }
}

if (failed) {
  console.error('\nOne or more required public URLs are not reachable. Host them before submitting.');
  process.exit(1);
}

console.log('\nAll required public URLs are reachable.');
