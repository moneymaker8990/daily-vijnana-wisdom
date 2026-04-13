import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const strict = process.argv.includes('--strict');

function readText(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return '';
  }
}

const requiredFiles = [
  'store-assets/SUBMISSION_CHECKLIST.md',
  'store-assets/SUBMISSION_RUNBOOK.md',
  'store-assets/REVIEW_EVIDENCE_PACK.md',
  'store-assets/DEVICE_QA_MATRIX.md',
  'store-assets/SMOKE_TEST_LOG.md',
  'store-assets/APP_STORE_METADATA.md',
  'scripts/take-screenshots.mjs',
];

const requiredEnvKeys = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const recommendedEnvKeys = ['VITE_SENTRY_DSN', 'VITE_BILLING_MODE'];
const securityEnvKeys = ['VITE_APP_BASE_URL'];
const revenueCatEnvKeys = [
  'VITE_REVENUECAT_API_KEY_IOS',
  'VITE_REVENUECAT_API_KEY_ANDROID',
  'VITE_REVENUECAT_ENTITLEMENT_ID',
  'VITE_REVENUECAT_OFFERING_ID',
];

const envLocalPath = resolve(root, '.env.local');
const envPath = resolve(root, '.env');
const envText = readText(envLocalPath) || readText(envPath);

let failed = false;

console.log('MindVanta release preflight');
console.log(`Mode: ${strict ? 'strict' : 'standard'}`);
console.log('');

for (const rel of requiredFiles) {
  const full = resolve(root, rel);
  const ok = existsSync(full);
  console.log(`${ok ? 'OK' : 'MISSING'}  ${rel}`);
  if (!ok) failed = true;
}

console.log('');
for (const key of requiredEnvKeys) {
  const ok = envText.includes(`${key}=`);
  console.log(`${ok ? 'OK' : 'MISSING'}  env:${key}`);
  if (!ok) failed = true;
}

for (const key of recommendedEnvKeys) {
  const ok = envText.includes(`${key}=`);
  console.log(`${ok ? 'OK' : 'WARN'}  env:${key}`);
}

const billingModeMatch = envText.match(/^VITE_BILLING_MODE=(.+)$/m);
const billingMode = billingModeMatch?.[1]?.trim();
if (billingMode === 'revenuecat') {
  console.log('');
  for (const key of revenueCatEnvKeys) {
    const ok = envText.includes(`${key}=`);
    console.log(`${ok ? 'OK' : 'MISSING'}  env:${key}`);
    if (!ok) failed = true;
  }
}

if (strict) {
  console.log('');
  for (const key of securityEnvKeys) {
    const ok = envText.includes(`${key}=`);
    console.log(`${ok ? 'OK' : 'MISSING'}  env:${key}`);
    if (!ok) failed = true;
  }

  const scaffoldMode = billingMode === 'scaffold';
  console.log(`${scaffoldMode ? 'BLOCKED' : 'OK'}  billing_mode:${billingMode || '(unset)'}`);
  if (scaffoldMode) failed = true;
}

if (strict) {
  console.log('');
  const filesForPlaceholderScan = [
    'store-assets/REVIEW_EVIDENCE_PACK.md',
    'store-assets/SUBMISSION_RUNBOOK.md',
    'store-assets/DEVICE_QA_MATRIX.md',
    'store-assets/SMOKE_TEST_LOG.md',
  ];

  for (const rel of filesForPlaceholderScan) {
    const text = readText(resolve(root, rel));
    const hasPlaceholder = /TBD|ASSIGN_REQUIRED|REQUIRED_BEFORE_SUBMISSION/.test(text);
    console.log(`${hasPlaceholder ? 'PLACEHOLDER' : 'OK'}  ${rel}`);
    if (hasPlaceholder) failed = true;
  }
}

console.log('');
if (failed) {
  console.error('Release preflight failed. Resolve missing items before submission.');
  process.exit(1);
}

console.log('Release preflight passed.');
