#!/usr/bin/env node

/**
 * Minimal static site build script
 * Zero dependencies - just Node.js
 * 
 * Usage: node build.js
 * 
 * Supports:
 *   {{> partialName}}  - Include a partial from src/partials/
 *   {{variable}}       - Replace with data (e.g., {{year}})
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const PAGES_DIR = path.join(SRC_DIR, 'pages');
const PARTIALS_DIR = path.join(SRC_DIR, 'partials');
const OUT_DIR = path.join(__dirname, 'dist');

// Static files/folders to copy from src/ to dist/
const STATIC_FILES = [
  'style.css',
  'script.js',
  'site.webmanifest',
  '404.html',
];
const STATIC_DIRS = ['assets', '.well-known'];

// Root files to copy (GitHub Pages config)
const ROOT_FILES = ['CNAME'];

// Data available in templates
const data = {
  year: new Date().getFullYear(),
};

// Cache for partials
const partials = {};

/**
 * Copy a file
 */
function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
  console.log(`  📋 Copied: ${path.basename(src)}`);
}

/**
 * Recursively copy a directory
 */
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  console.log(`  📁 Copied: ${path.basename(src)}/`);
}

/**
 * Copy static assets to dist
 */
function copyStatic() {
  // Copy static files from src/
  for (const file of STATIC_FILES) {
    const src = path.join(SRC_DIR, file);
    if (fs.existsSync(src)) {
      copyFile(src, path.join(OUT_DIR, file));
    }
  }
  // Copy static directories from src/
  for (const dir of STATIC_DIRS) {
    const src = path.join(SRC_DIR, dir);
    if (fs.existsSync(src)) {
      copyDir(src, path.join(OUT_DIR, dir));
    }
  }
  // Copy root config files (CNAME, .nojekyll)
  for (const file of ROOT_FILES) {
    const src = path.join(__dirname, file);
    if (fs.existsSync(src)) {
      copyFile(src, path.join(OUT_DIR, file));
    }
  }
}

/**
 * Load all partials from src/partials/
 */
function loadPartials() {
  if (!fs.existsSync(PARTIALS_DIR)) {
    console.warn('⚠️  No partials directory found at', PARTIALS_DIR);
    return;
  }

  const files = fs.readdirSync(PARTIALS_DIR);
  for (const file of files) {
    if (file.endsWith('.html')) {
      const name = path.basename(file, '.html');
      const content = fs.readFileSync(path.join(PARTIALS_DIR, file), 'utf-8');
      partials[name] = content;
      console.log(`  📄 Loaded partial: ${name}`);
    }
  }
}

/**
 * Process template - replace partials and variables
 */
function processTemplate(content) {
  // Replace partials: {{> partialName}}
  content = content.replace(/\{\{>\s*(\w+)\s*\}\}/g, (match, name) => {
    if (partials[name]) {
      // Recursively process partials (they might contain variables)
      return processTemplate(partials[name]);
    }
    console.warn(`  ⚠️  Partial not found: ${name}`);
    return match;
  });

  // Replace variables: {{variableName}}
  content = content.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name) => {
    if (data[name] !== undefined) {
      return data[name];
    }
    console.warn(`  ⚠️  Variable not found: ${name}`);
    return match;
  });

  return content;
}

/**
 * Build all pages
 */
function buildPages() {
  if (!fs.existsSync(PAGES_DIR)) {
    console.error('❌ No pages directory found at', PAGES_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(PAGES_DIR);
  let count = 0;

  for (const file of files) {
    if (file.endsWith('.html')) {
      const srcPath = path.join(PAGES_DIR, file);
      const outPath = path.join(OUT_DIR, file);

      const content = fs.readFileSync(srcPath, 'utf-8');
      const processed = processTemplate(content);

      fs.writeFileSync(outPath, processed);
      console.log(`  ✅ Built: ${file}`);
      count++;
    }
  }

  return count;
}

/**
 * Main build function
 */
function build() {
  console.log('\n🔨 Building Curio TCG website...\n');
  
  // Ensure dist directory exists
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  
  console.log('Loading partials...');
  loadPartials();
  console.log('\nBuilding pages...');
  const count = buildPages();
  console.log('\nCopying static files...');
  copyStatic();
  console.log(`\n✨ Done! Built ${count} pages to dist/\n`);
}

// Run build
build();
