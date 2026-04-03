const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');
const publicImagesDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const fileExtensions = ['.tsx', '.ts', '.js', '.jsx', '.css', '.json'];
const unsplashRegex = /https:\/\/images\.unsplash\.com\/[^"'\s\)]+/g;

const urlMap = new Map();
let counter = 1;

function wander(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      wander(fullPath);
    } else if (fileExtensions.includes(path.extname(file))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(unsplashRegex);
      if (matches) {
        for (const url of matches) {
          if (!urlMap.has(url)) {
            const ext = '.jpg'; // Most Unsplash images are jpg, or we can just use .jpg as default
            const filename = `unsplash_${counter++}${ext}`;
            urlMap.set(url, filename);
          }
        }
      }
    }
  }
}

wander(srcDir);

const results = {
  urlMap: Object.fromEntries(urlMap),
  filesToUpdate: []
};

// Now find all files that need updating
function findFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findFiles(fullPath);
    } else if (fileExtensions.includes(path.extname(file))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (unsplashRegex.test(content)) {
        results.filesToUpdate.push(fullPath);
      }
    }
  }
}

findFiles(srcDir);

fs.writeFileSync('image_migration_data.json', JSON.stringify(results, null, 2));
console.log(`Found ${urlMap.size} unique Unsplash URLs across ${results.filesToUpdate.length} files.`);
