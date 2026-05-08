import fs from 'node:fs';
import path from 'node:path';

function matchOrEmpty(source, pattern) {
  const match = source.match(pattern);
  return match ? match[1].trim() : '';
}

function absolutizeLegacyLinks(content) {
  return content
    .replace(/(href|src)=["']\.\.\//g, '$1="/')
    .replace(/(href|src)=["']\.\//g, '$1="/');
}

export function loadLegacyPage(relativePath) {
  const fullPath = path.join(process.cwd(), 'public', relativePath);
  const source = fs.readFileSync(fullPath, 'utf-8');

  return {
    title: matchOrEmpty(source, /<title>([^<]+)<\/title>/i),
    description: matchOrEmpty(source, /<meta\s+name="description"\s+content="([^"]*)"/i),
    bodyClass: matchOrEmpty(source, /<body[^>]*class="([^"]*)"/i),
    content: absolutizeLegacyLinks(matchOrEmpty(source, /<main id="main">([\s\S]*?)<\/main>/i)),
  };
}

export function listLegacyPages(relativeDir) {
  const fullDir = path.join(process.cwd(), 'public', relativeDir);
  return fs.readdirSync(fullDir)
    .filter((name) => name.endsWith('.html') && name !== 'index.html')
    .map((name) => path.basename(name, '.html'))
    .sort();
}
