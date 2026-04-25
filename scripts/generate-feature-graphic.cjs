/**
 * Generate Google Play feature graphic (1024x500) and App Store promo assets.
 *
 * Usage:
 *   node scripts/generate-feature-graphic.cjs
 *
 * Outputs:
 *   store-assets/feature-graphic.png       (1024x500, Play Store)
 *   store-assets/promo-graphic.png         (180x120,  Play Store small promo)
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Sharp not installed. Run: npm install');
  process.exit(1);
}

const OUT_DIR = path.join(__dirname, '../store-assets');
const ICON_SVG = path.join(__dirname, '../public/icon.svg');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildBackground(width, height) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <radialGradient id="glow" cx="30%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.85"/>
          <stop offset="55%" stop-color="#3b0764" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e1b4b"/>
        </linearGradient>
        <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <rect width="${width}" height="${height}" fill="url(#glow)"/>
      <g opacity="0.08" filter="url(#soften)">
        <circle cx="${width - 160}" cy="80" r="180" fill="#fafaf9"/>
        <circle cx="${width - 90}" cy="${height - 70}" r="110" fill="#fafaf9"/>
      </g>
    </svg>
  `);
}

function buildWordmark(width, height) {
  const title = 'MindVanta';
  const subtitle = 'Ancient Wisdom for Modern Seekers';
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <style>
        .title { font: 700 132px -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, system-ui, sans-serif; fill: #fafaf9; letter-spacing: -2px; }
        .sub { font: 500 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, system-ui, sans-serif; fill: #e9d5ff; letter-spacing: 0.5px; }
      </style>
      <text x="0" y="210" class="title">${title}</text>
      <text x="4" y="272" class="sub">${subtitle}</text>
    </svg>
  `);
}

async function generateFeatureGraphic() {
  ensureDir(OUT_DIR);

  const width = 1024;
  const height = 500;

  const iconSize = 320;
  const iconPng = await sharp(ICON_SVG).resize(iconSize, iconSize).png().toBuffer();

  const backgroundPng = await sharp(buildBackground(width, height)).png().toBuffer();
  const wordmarkPng = await sharp(buildWordmark(640, 320)).png().toBuffer();

  const output = path.join(OUT_DIR, 'feature-graphic.png');
  await sharp(backgroundPng)
    .composite([
      { input: iconPng, top: Math.floor((height - iconSize) / 2), left: 60 },
      { input: wordmarkPng, top: 95, left: 420 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log(`Wrote ${output} (${width}x${height})`);

  const promoOutput = path.join(OUT_DIR, 'promo-graphic.png');
  await sharp(output).resize(180, 120, { fit: 'cover' }).png().toFile(promoOutput);
  console.log(`Wrote ${promoOutput} (180x120)`);
}

generateFeatureGraphic().catch((err) => {
  console.error(err);
  process.exit(1);
});
