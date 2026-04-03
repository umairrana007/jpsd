const fs = require('fs');
const path = require('path');
const https = require('https');

const migrationData = JSON.parse(fs.readFileSync('image_migration_data.json', 'utf8'));
const publicImagesDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(publicImagesDir, filename);
    
    // Check if already downloaded
    if (fs.existsSync(filePath)) {
      console.log(`Already exists: ${filename}`);
      return resolve(true);
    }

    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle Unsplash redirect
        downloadImage(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filePath);
        console.error(`Failed to get image ${filename} (URL: ${url}): Status ${response.statusCode}`);
        resolve(false); // Resolve with false to indicate failure but keep going
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve(true);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      console.error(`Error downloading ${filename}: ${err.message}`);
      resolve(false);
    });
  });
}

async function startMigration() {
  const urlMap = migrationData.urlMap;
  const entries = Object.entries(urlMap);
  
  console.log(`Starting download of ${entries.length} images...`);
  
  const results = {};
  const chunkSize = 5;
  for (let i = 0; i < entries.length; i += chunkSize) {
    const chunk = entries.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(chunk.map(async ([url, filename]) => {
      const success = await downloadImage(url, filename);
      return { url, filename, success };
    }));
    for (const res of chunkResults) {
      results[res.url] = res;
    }
  }

  console.log('\nDownloads completed. Now updating code...');

  for (const filePath of migrationData.filesToUpdate) {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found, skipping: ${filePath}`);
      continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Sort URLs by length descending to avoid partial replacements
    const sortedEntries = entries.sort((a, b) => b[0].length - a[0].length);
    
    for (const [url, filename] of sortedEntries) {
      if (results[url] && results[url].success) {
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapeRegex(url), 'g');
        if (regex.test(content)) {
          content = content.replace(regex, `/images/${filename}`);
          updated = true;
        }
      }
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${path.relative(process.cwd(), filePath)}`);
    } else {
      console.log(`No changes for: ${path.relative(process.cwd(), filePath)}`);
    }
  }

  console.log('\nMigration complete!');
}

startMigration().catch(console.error);
