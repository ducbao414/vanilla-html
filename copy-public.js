// copy-public.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const src = path.join(__dirname, 'public');
const dest = path.join(__dirname, 'dist');

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

execSync(`cp -r ${src}/* ${dest}/`, { stdio: 'inherit' });
