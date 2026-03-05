/**
 * Icon Generation Script for MindVanta
 *
 * This script generates all required icon sizes for iOS, Android, and PWA.
 *
 * Prerequisites:
 *   npm install sharp
 *
 * Usage:
 *   node scripts/generate-icons.js
 *
 * The script reads public/icon.svg and generates PNG icons in various sizes.
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('Sharp not installed. Install it with: npm install sharp --save-dev');
  console.log('\nAlternatively, you can manually create the following PNG icons from public/icon.svg:\n');

  const requiredIcons = [
    // PWA Icons
    { size: 72, path: 'public/icons/icon-72x72.png' },
    { size: 96, path: 'public/icons/icon-96x96.png' },
    { size: 128, path: 'public/icons/icon-128x128.png' },
    { size: 144, path: 'public/icons/icon-144x144.png' },
    { size: 152, path: 'public/icons/icon-152x152.png' },
    { size: 192, path: 'public/icons/icon-192x192.png' },
    { size: 384, path: 'public/icons/icon-384x384.png' },
    { size: 512, path: 'public/icons/icon-512x512.png' },

    // Android Launcher Icons (mipmap)
    { size: 48, path: 'android/app/src/main/res/mipmap-mdpi/ic_launcher.png' },
    { size: 72, path: 'android/app/src/main/res/mipmap-hdpi/ic_launcher.png' },
    { size: 96, path: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png' },
    { size: 144, path: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png' },
    { size: 192, path: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png' },

    // Android Foreground Icons (for adaptive icons)
    { size: 108, path: 'android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png' },
    { size: 162, path: 'android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png' },
    { size: 216, path: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png' },
    { size: 324, path: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png' },
    { size: 432, path: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png' },

    // iOS App Icon
    { size: 1024, path: 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png' },

    // Google Play Feature Graphic
    { size: '1024x500', path: 'store-assets/feature-graphic.png', note: 'Create separately' },
  ];

  console.log('Required Icons:');
  console.log('===============\n');

  requiredIcons.forEach(icon => {
    const sizeStr = typeof icon.size === 'number' ? `${icon.size}x${icon.size}` : icon.size;
    console.log(`  ${sizeStr.padEnd(12)} -> ${icon.path}${icon.note ? ` (${icon.note})` : ''}`);
  });

  console.log('\nTip: Use tools like:');
  console.log('  - https://www.pwabuilder.com/imageGenerator');
  console.log('  - https://realfavicongenerator.net/');
  console.log('  - https://appicon.co/');

  process.exit(0);
}

const SOURCE_SVG = path.join(__dirname, '../public/icon.svg');
const PUBLIC_ICONS_DIR = path.join(__dirname, '../public/icons');

// Ensure directories exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// PWA icon sizes
const PWA_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// Android mipmap sizes
const ANDROID_SIZES = {
  'mdpi': 48,
  'hdpi': 72,
  'xhdpi': 96,
  'xxhdpi': 144,
  'xxxhdpi': 192,
};

// Android foreground sizes (for adaptive icons - need extra padding)
const ANDROID_FOREGROUND_SIZES = {
  'mdpi': 108,
  'hdpi': 162,
  'xhdpi': 216,
  'xxhdpi': 324,
  'xxxhdpi': 432,
};

async function generateIcons() {
  console.log('Generating icons from', SOURCE_SVG, '...\n');

  // Ensure public/icons directory exists
  ensureDir(PUBLIC_ICONS_DIR);

  // Generate PWA icons
  console.log('Generating PWA icons...');
  for (const size of PWA_SIZES) {
    const outputPath = path.join(PUBLIC_ICONS_DIR, `icon-${size}x${size}.png`);
    await sharp(SOURCE_SVG)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`  Created ${outputPath}`);
  }

  // Generate Android launcher icons
  console.log('\nGenerating Android launcher icons...');
  for (const [density, size] of Object.entries(ANDROID_SIZES)) {
    const outputDir = path.join(__dirname, `../android/app/src/main/res/mipmap-${density}`);
    ensureDir(outputDir);

    const outputPath = path.join(outputDir, 'ic_launcher.png');
    await sharp(SOURCE_SVG)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`  Created ${outputPath}`);

    // Also create round version
    const roundOutputPath = path.join(outputDir, 'ic_launcher_round.png');
    await sharp(SOURCE_SVG)
      .resize(size, size)
      .png()
      .toFile(roundOutputPath);
    console.log(`  Created ${roundOutputPath}`);
  }

  // Generate Android foreground icons
  console.log('\nGenerating Android foreground icons...');
  for (const [density, size] of Object.entries(ANDROID_FOREGROUND_SIZES)) {
    const outputDir = path.join(__dirname, `../android/app/src/main/res/mipmap-${density}`);
    ensureDir(outputDir);

    const outputPath = path.join(outputDir, 'ic_launcher_foreground.png');
    // For foreground, we need to resize smaller and add padding for the safe zone
    const iconSize = Math.floor(size * 0.6); // 60% of total size for safe zone
    const padding = Math.floor((size - iconSize) / 2);

    await sharp(SOURCE_SVG)
      .resize(iconSize, iconSize)
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
    console.log(`  Created ${outputPath}`);
  }

  // Generate iOS app icon
  console.log('\nGenerating iOS app icon...');
  const iosOutputPath = path.join(__dirname, '../ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png');
  await sharp(SOURCE_SVG)
    .resize(1024, 1024)
    .png()
    .toFile(iosOutputPath);
  console.log(`  Created ${iosOutputPath}`);

  console.log('\n✓ All icons generated successfully!');
  console.log('\nNote: You still need to manually create:');
  console.log('  - Google Play Feature Graphic (1024x500)');
  console.log('  - App Store screenshots');
}

generateIcons().catch(console.error);
