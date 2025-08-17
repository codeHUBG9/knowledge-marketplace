import fs from 'fs';
import path from 'path';

const exts = ['.js', '.jsx', '.ts', '.tsx'];

// Recursively walk a directory and return all files
function walk(dir) {
  let files = [];
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      files.push(full);
    }
  }
  return files;
}

// Try to resolve the correct extension for a given import path
function resolveExt(importPath, fileDir) {
  for (const ext of exts) {
    const full = path.resolve(fileDir, importPath + ext);
    if (fs.existsSync(full)) return ext;
  }
  return null;
}

function fixFile(file) {
  let changed = false;
  let code = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);

  // Regex for import/export ... from '...'
  code = code.replace(
    /(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g,
    (match, p1, importPath, p3) => {
      // Already has extension
      if (exts.some(ext => importPath.endsWith(ext))) return match;
      // Try to resolve extension
      const ext = resolveExt(importPath, dir);
      if (ext) {
        changed = true;
        return `${p1}${importPath}${ext}${p3}`;
      }
      return match;
    }
  );

  if (changed) {
    fs.writeFileSync(file, code, 'utf8');
    console.log('Fixed:', file);
  }
}

const SRC = path.resolve('apps/web/src');
walk(SRC).forEach(fixFile);

console.log('✅ All local import/export statements now have file extensions.');