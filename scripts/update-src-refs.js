#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const root = path.join(__dirname, '..');
const srcDirs = [path.join(root, 'src')];
// also include some top-level files that may reference assets
const extraFiles = [path.join(root, 'components.json')];

const exts = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.md'];

async function walkAndUpdate(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      await walkAndUpdate(full);
    } else {
      if (exts.includes(path.extname(entry.name))) {
        await updateFile(full);
      }
    }
  }
}

async function updateFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    const original = content;

    // 1) Replace occurrences of /assets/... .png/.jpg/.jpeg
    content = content.replace(/(\/(?:assets|public)\/[^"'`\s>]+?)\.(png|jpe?g)/ig, '$1.webp');

    // 2) Replace any string literal that ends with .png/.jpg/.jpeg inside quotes
    content = content.replace(/(["'`])([^"'`\n]*?)\.(png|jpe?g)\1/ig, (m, q, t) => `${q}${t}.webp${q}`);

    if (content !== original) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log('Updated refs in', path.relative(root, filePath));
    }
  } catch (err) {
    console.error('Failed to update', filePath, err.message || err);
  }
}

(async () => {
  try {
    for (const dir of srcDirs) {
      await walkAndUpdate(dir);
    }
    for (const f of extraFiles) {
      try {
        await updateFile(f);
      } catch(e) {}
    }
    console.log('Reference updates complete.');
  } catch (err) {
    console.error('Error updating refs:', err.message || err);
    process.exit(1);
  }
})();
