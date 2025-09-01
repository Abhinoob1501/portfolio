const https = require('https');
const fs = require('fs');
const path = require('path');

// Font URLs from Google Fonts
const fonts = [
  {
    name: 'Geist',
    url: 'https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap'
  },
  {
    name: 'Geist_Mono',
    url: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap'
  },
  {
    name: 'Orbitron',
    url: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap'
  },
  {
    name: 'VT323',
    url: 'https://fonts.googleapis.com/css2?family=VT323&display=swap'
  },
  {
    name: 'Press_Start_2P',
    url: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
  },
  {
    name: 'Pixelify_Sans',
    url: 'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&display=swap'
  }
];

async function downloadFont(fontInfo) {
  console.log(`Downloading ${fontInfo.name}...`);
  
  return new Promise((resolve, reject) => {
    https.get(fontInfo.url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Extract font URLs from CSS
        const fontUrls = data.match(/url\(([^)]+)\)/g);
        
        if (fontUrls) {
          console.log(`Found ${fontUrls.length} font files for ${fontInfo.name}`);
          
          // Create CSS file
          const cssPath = path.join(__dirname, 'public', 'fonts', `${fontInfo.name}.css`);
          fs.writeFileSync(cssPath, data);
          
          // Download each font file
          fontUrls.forEach((url, index) => {
            const fontUrl = url.match(/url\(([^)]+)\)/)[1];
            const fileName = `${fontInfo.name}-${index}.woff2`;
            const localPath = `/fonts/${fileName}`;
            
            // Update CSS to use local path
            data = data.replace(url, `url(${localPath})`);
            
            // Download the actual font file
            if (fontUrl.startsWith('http')) {
              https.get(fontUrl, (fontRes) => {
                const fontPath = path.join(__dirname, 'public', 'fonts', fileName);
                const file = fs.createWriteStream(fontPath);
                fontRes.pipe(file);
                
                file.on('finish', () => {
                  file.close();
                  console.log(`Downloaded ${fileName}`);
                });
              });
            }
          });
          
          // Save updated CSS
          fs.writeFileSync(cssPath, data);
        }
        
        resolve();
      });
    }).on('error', reject);
  });
}

async function downloadAllFonts() {
  console.log('Starting font download...');
  
  for (const font of fonts) {
    try {
      await downloadFont(font);
    } catch (error) {
      console.error(`Error downloading ${font.name}:`, error);
    }
  }
  
  console.log('Font download complete!');
  console.log('Next steps:');
  console.log('1. Update your layout.tsx to use local fonts');
  console.log('2. Import the CSS files in your globals.css');
}

downloadAllFonts();
