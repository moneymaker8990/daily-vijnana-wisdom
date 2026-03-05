import { spawnSync } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const urlFlagIndex = process.argv.indexOf('--url');
const appUrl = urlFlagIndex !== -1 ? process.argv[urlFlagIndex + 1] : undefined;
const skipScreenshots =
  process.argv.includes('--skip-screenshots') ||
  process.env.npm_config_skip_screenshots === 'true' ||
  process.env.SKIP_SCREENSHOTS === '1';

function runStep(command, args) {
  const printable = `${command} ${args.join(' ')}`;
  console.log(`\n=== ${printable} ===`);
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    throw new Error(`Step failed: ${printable}`);
  }
}

function screenshotArgs(platform, clean) {
  const args = ['./scripts/take-screenshots.mjs', '--platform', platform];
  if (clean) args.push('--clean');
  if (appUrl) {
    args.push('--url', appUrl);
  }
  return args;
}

try {
  console.log('MindVanta release prep starting...');
  runStep('npm', ['run', 'release:check:strict']);
  runStep('npm', ['run', 'build']);

  if (!skipScreenshots) {
    runStep('node', screenshotArgs('ios', true));
    runStep('node', screenshotArgs('android', false));
  } else {
    console.log('\nSkipping screenshots due to --skip-screenshots flag.');
  }

  console.log('\nRelease prep complete.');
} catch (error) {
  console.error('\nRelease prep failed.');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
