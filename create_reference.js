const fs = require('fs');
const path = require('path');

const migrationData = JSON.parse(fs.readFileSync('image_migration_data.json', 'utf8'));

let markdown = '# Image Migration Reference Guide\n\n';
markdown += 'Use this guide to replace the auto-downloaded images with your own local images.\n\n';
markdown += 'All images are stored in `public/images/`.\n\n';
markdown += '| Local Filename | Original Unsplash URL | Used In Files |\n';
markdown += '| :--- | :--- | :--- |\n';

const urlMap = migrationData.urlMap;
const filesToUpdate = migrationData.filesToUpdate;

for (const [url, filename] of Object.entries(urlMap)) {
  const usedIn = [];
  for (const filePath of filesToUpdate) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(`/images/${filename}`)) {
      usedIn.push('`' + path.basename(filePath) + '`');
    }
  }
  
  if (usedIn.length > 0) {
    markdown += `| ${filename} | [View Original](${url}) | ${usedIn.join(', ')} |\n`;
  }
}

fs.writeFileSync('IMAGE_URLS_REFERENCE.md', markdown);
console.log('Reference guide created: IMAGE_URLS_REFERENCE.md');
