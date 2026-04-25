#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const appVersion = pkg.version;

if (!/^\d+\.\d+\.\d+$/.test(appVersion)) {
  console.error(`package.json version must be semver X.Y.Z, got: ${appVersion}`);
  process.exit(1);
}

const bumpBuild = process.argv.includes('--bump-build');

let failed = false;

const androidGradlePath = resolve(root, 'android/app/build.gradle');
if (existsSync(androidGradlePath)) {
  const gradle = readFileSync(androidGradlePath, 'utf8');
  const versionCodeMatch = gradle.match(/versionCode\s+(\d+)/);
  if (!versionCodeMatch) {
    console.error('Could not find versionCode in android/app/build.gradle');
    failed = true;
  } else {
    const currentCode = parseInt(versionCodeMatch[1], 10);
    const nextCode = bumpBuild ? currentCode + 1 : currentCode;
    const updated = gradle
      .replace(/versionCode\s+\d+/, `versionCode ${nextCode}`)
      .replace(/versionName\s+"[^"]*"/, `versionName "${appVersion}"`);
    writeFileSync(androidGradlePath, updated);
    console.log(`android: versionName="${appVersion}" versionCode=${nextCode}`);
  }
} else {
  console.warn('android/app/build.gradle not found; skipping Android sync');
}

const pbxprojPath = resolve(root, 'ios/App/App.xcodeproj/project.pbxproj');
if (existsSync(pbxprojPath)) {
  const pbx = readFileSync(pbxprojPath, 'utf8');
  const currentBuildMatches = [...pbx.matchAll(/CURRENT_PROJECT_VERSION\s*=\s*(\d+)/g)];
  const currentBuild = currentBuildMatches.length
    ? Math.max(...currentBuildMatches.map((m) => parseInt(m[1], 10)))
    : 1;
  const nextBuild = bumpBuild ? currentBuild + 1 : currentBuild;
  const updated = pbx
    .replace(/MARKETING_VERSION\s*=\s*[^;]+;/g, `MARKETING_VERSION = ${appVersion};`)
    .replace(/CURRENT_PROJECT_VERSION\s*=\s*\d+;/g, `CURRENT_PROJECT_VERSION = ${nextBuild};`);
  writeFileSync(pbxprojPath, updated);
  console.log(`ios: MARKETING_VERSION=${appVersion} CURRENT_PROJECT_VERSION=${nextBuild}`);
} else {
  console.warn('ios/App/App.xcodeproj/project.pbxproj not found; skipping iOS sync');
}

if (failed) process.exit(1);

console.log('\nVersions synced from package.json. Run `npx cap sync` next.');
