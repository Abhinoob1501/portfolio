const fs = require('fs');
const https = require('https');
const path = require('path');
const { URL } = require('url');

async function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

async function processFontCSS() {
  const fontsDir = './public/fonts';
  const cssFiles = fs.readdirSync(fontsDir).filter(file => file.endsWith('.css'));
  
  for (const cssFile of cssFiles) {
    console.log(`Processing ${cssFile}...`);
    const cssPath = path.join(fontsDir, cssFile);
    let cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Find all font URLs in the CSS
    const fontUrls = cssContent.match(/url\(([^)]+)\)/g);
    
    if (fontUrls) {
      let urlIndex = 0;
      
      for (const urlMatch of fontUrls) {
        const url = urlMatch.match(/url\(([^)]+)\)/)[1];
        
        if (url.startsWith('http')) {
          // Generate local filename
          const fontName = cssFile.replace('.css', '');
          const extension = url.includes('.woff2') ? '.woff2' : '.woff';
          const fileName = `${fontName}-${urlIndex}${extension}`;
          const localPath = `/fonts/${fileName}`;
          const outputPath = path.join(fontsDir, fileName);
          
          try {
            console.log(`Downloading ${fileName}...`);
            await downloadFile(url, outputPath);
            
            // Replace the URL in CSS with local path
            cssContent = cssContent.replace(urlMatch, `url(${localPath})`);
            
            console.log(`Downloaded ${fileName}`);
          } catch (error) {
            console.error(`Error downloading ${fileName}:`, error.message);
          }
          
          urlIndex++;
        }
      }
      
      // Write the updated CSS file
      fs.writeFileSync(cssPath, cssContent);
      console.log(`Updated ${cssFile} with local paths`);
    }
  }
  
  console.log('All fonts processed!');
}

processFontCSS().catch(console.error);
