#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const assetsDir = path.join(root, 'public', 'assets');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      await convert(full);
    }
  }
}

async function convert(filePath) {
  try {
    const outPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
    // Skip if output already exists and is newer
    try {
      const [inStat, outStat] = await Promise.all([
        fs.stat(filePath),
        fs.stat(outPath).catch(() => null),
      ]);
      if (outStat && outStat.mtimeMs >= inStat.mtimeMs) {
        console.log('Skipping (up-to-date):', outPath);
        return;
      }
    } catch (e) {
      // ignore
    }

    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(outPath);
    console.log('Converted:', path.relative(root, filePath), '->', path.relative(root, outPath));
  } catch (err) {
    console.error('Failed to convert', filePath, err.message || err);
  }
}

(async () => {
  try {
    console.log('Converting images under', assetsDir);
    await walk(assetsDir);
    console.log('Conversion complete.');
  } catch (err) {
    console.error('Error scanning assets:', err.message || err);
    process.exit(1);
  }
})();
