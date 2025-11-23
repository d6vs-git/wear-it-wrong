#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const root = path.join(__dirname, '..');
const assetsDir = path.join(root, 'public', 'assets');
const srcDir = path.join(root, 'src');

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function grepFiles(pattern, dir) {
  const results = [];
  async function walk(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        if (e.name === 'node_modules' || e.name === '.git') continue;
        await walk(full);
      } else {
        const ext = path.extname(e.name).toLowerCase();
        if (['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.md'].includes(ext)) {
          const txt = await fs.readFile(full, 'utf8');
          let m;
          const re = new RegExp(pattern, 'ig');
          while ((m = re.exec(txt))) {
            results.push({ file: full, match: m[0], index: m.index, context: txt.substring(Math.max(0, m.index-200), m.index+200) });
          }
        }
      }
    }
  }
  await walk(dir);
  return results;
}

async function findGenericImages() {
  // match filenames like image123.webp or image-123.webp or image240.webp
  const pattern = '/assets/[^"\\s]*?image[0-9\-]*\\.webp';
  const occurrences = await grepFiles(pattern, srcDir);
  const map = new Map();
  for (const occ of occurrences) {
    const matchPath = occ.match.replace(/\"/g, '');
    const parts = matchPath.split('/');
    const filename = parts[parts.length-1];
    // source references use /assets/... but files live under public/assets
    const fullAssetPath = path.join(root, 'public', matchPath.replace(/^\//, ''));
    if (!map.has(filename)) map.set(filename, { assetPath: fullAssetPath, usages: [] });
    map.get(filename).usages.push(occ);
  }
  return map;
}

async function extractAltFromContext(context) {
  // Deprecated
  return null;
}

function extractAltFromFile(content, matchIndex) {
  // 1) Try JSX <img ...> or <Image ...> tag containing the match
  const before = Math.max(0, matchIndex - 2000);
  const after = Math.min(content.length, matchIndex + 2000);
  const slice = content.substring(before, after);
  // look for <img ... filename ... >
  const imgTagRe = /<\s*(img|Image|picture)[\s\S]*?>/ig;
  let m;
  while ((m = imgTagRe.exec(slice))) {
    const tag = m[0];
    if (tag.includes('image') && tag.includes('.webp')) {
      const altMatch = tag.match(/alt\s*=\s*(?:\{\s*)?["'`]([^"'`<>]{1,200})["'`]\s*(?:\})?/i);
      if (altMatch) return altMatch[1].trim();
    }
  }

  // 2) Try to find enclosing object literal { ... } near the match
  const left = content.lastIndexOf('{', matchIndex);
  const right = content.indexOf('}', matchIndex);
  if (left !== -1 && right !== -1 && right > left) {
    const obj = content.substring(left, right + 1);
    // look for alt: '...' or "alt": '...'
    const altProp = obj.match(/(?:alt|\"alt\"|\'alt\')\s*[:=]\s*(?:\{\s*)?["'`]([^"'`]{1,300})["'`]\s*(?:\})?/i);
    if (altProp) return altProp[1].trim();
  }

  // 3) Fallback: search nearby for alt= or "alt": or aria-label
  const nearby = content.substring(Math.max(0, matchIndex - 1000), Math.min(content.length, matchIndex + 1000));
  const altNearby = nearby.match(/alt\s*[:=]\s*(?:\{\s*)?["'`]([^"'`]{1,300})["'`]\s*(?:\})?/i);
  if (altNearby) return altNearby[1].trim();
  const ariaNearby = nearby.match(/aria-label\s*[:=]?\s*["'`]([^"'`]{1,300})["'`]/i);
  if (ariaNearby) return ariaNearby[1].trim();
  const titleNearby = nearby.match(/title\s*[:=]?\s*["'`]([^"'`]{1,300})["'`]/i);
  if (titleNearby) return titleNearby[1].trim();
  return null;
}

async function renameAndReplace() {
  const map = await findGenericImages();
  const replacements = [];
  for (const [filename, info] of map.entries()) {
    const usages = info.usages;
    // try to find an alt among usages
    let alt = null;
    for (const u of usages) {
      try {
        const content = await fs.readFile(u.file, 'utf8');
        const a = extractAltFromFile(content, u.index);
        if (a) { alt = a; break; }
      } catch (e) {
        // ignore
      }
    }
    if (!alt) {
      // skip if we can't determine a descriptive name
      console.log('Skipping', filename, '- no alt/title/aria-label found in usages');
      continue;
    }
    const slug = slugify(alt) || 'image';
    const dir = path.dirname(info.assetPath);
    let newName = `${slug}.webp`;
    let counter = 1;
    while (true) {
      try {
        await fs.access(path.join(dir, newName));
        // exists, append suffix
        newName = `${slug}-${counter}.webp`;
        counter++;
      } catch (e) {
        break;
      }
    }
    const newPath = path.join(dir, newName);
      try {
        await fs.rename(info.assetPath, newPath);
        console.log('Renamed', path.relative(root, info.assetPath), '->', path.relative(root, newPath));
        const oldRef = '/' + path.relative(path.join(root, 'public'), info.assetPath).replace(/\\\\/g, '/');
        const newRef = '/' + path.relative(path.join(root, 'public'), newPath).replace(/\\\\/g, '/');
        replacements.push({ old: oldRef, new: newRef });
      } catch (err) {
      console.error('Failed to rename', info.assetPath, err.message || err);
    }
  }

  // update references across source files
  if (replacements.length === 0) {
    console.log('No renames performed.');
    return;
  }
  async function walkAndReplace(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        if (e.name === 'node_modules' || e.name === '.git') continue;
        await walkAndReplace(full);
      } else {
        const ext = path.extname(e.name).toLowerCase();
        if (['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.md'].includes(ext)) {
          let content = await fs.readFile(full, 'utf8');
          let original = content;
          for (const r of replacements) {
            const ro = r.old.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
            const re = new RegExp(ro, 'g');
            content = content.replace(re, r.new);
          }
          if (content !== original) {
            await fs.writeFile(full, content, 'utf8');
            console.log('Updated refs in', path.relative(root, full));
          }
        }
      }
    }
  }

  await walkAndReplace(srcDir);
  await walkAndReplace(path.join(root, 'public'));
  console.log('Renaming and reference update complete.');
}

(async () => {
  try {
    await renameAndReplace();
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
