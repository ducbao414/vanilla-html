// watch-public.js
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const parcelCacheDir = path.resolve(__dirname, '.parcel-cache');
const srcDir = path.resolve(__dirname, 'public');
const destDir = path.resolve(__dirname, 'dist');

const isOnce = process.argv.includes('--once');

function getDestPath(filePath) {
  return path.join(destDir, path.relative(srcDir, filePath));
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(filePath) {
  const destPath = getDestPath(filePath);
  ensureDir(destPath);
  fs.copyFileSync(filePath, destPath);
  console.log(`[copy]     ${path.relative(__dirname, filePath)} → ${path.relative(__dirname, destPath)}`);
}

function deleteFile(filePath) {
  const destPath = getDestPath(filePath);
  if (fs.existsSync(destPath)) {
    fs.unlinkSync(destPath);
    console.log(`[delete]   ${path.relative(__dirname, destPath)}`);
  }
}

function copyDir(dirPath) {
  const destPath = getDestPath(dirPath);
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
    console.log(`[mkdir]    ${path.relative(__dirname, destPath)}`);
  }
}

function deleteDir(dirPath) {
  const destPath = getDestPath(dirPath);
  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true, force: true });
    console.log(`[rmdir]    ${path.relative(__dirname, destPath)}`);
  }
}

function cleanUpAndCopy() {

  if (fs.existsSync(parcelCacheDir)) {
    fs.rmSync(parcelCacheDir, { recursive: true, force: true });
    console.log(`[clean] ${parcelCacheDir}`);
  }

  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
    console.log(`[clean] ${destDir}`);
  }

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const srcPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcPath);
        walk(srcPath);
      } else {
        copyFile(srcPath);
      }
    }
  };
  walk(srcDir);
}

cleanUpAndCopy();

if (isOnce) {
  process.exit(0);
}

const watcher = chokidar.watch(srcDir, {
  ignoreInitial: false,
  persistent: true
});

watcher
  .on('add', copyFile)
  .on('change', copyFile)
  .on('unlink', deleteFile)
  .on('addDir', copyDir)
  .on('unlinkDir', deleteDir)
  .on('ready', () => {
    console.log('[watch] public/ → dist/ syncing started...');
  });
