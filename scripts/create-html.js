import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up directories
const clientDir = path.join(__dirname, '..', 'build', 'client');

// Read the manifest to get correct asset paths
const manifestPath = path.join(clientDir, '.vite', 'manifest.json');

let manifest = {};
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
} catch (error) {
  console.warn('Could not read manifest.json, using fallback asset detection');
}

// Find the entry client and root assets dynamically
const assets = fs.readdirSync(path.join(clientDir, 'assets'));
const entryClient = assets.find(f => f.startsWith('entry.client-') && f.endsWith('.js'));
const rootCss = assets.find(f => f.startsWith('root-') && f.endsWith('.css'));
const manifestJs = assets.find(f => f.startsWith('manifest-') && f.endsWith('.js'));

// Get base path from environment or use root
const basePath = process.env.BASE_PATH || '';

// Create index.html for deployment
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="RealtyVibe - Discover premium real estate properties with modern amenities and stunning locations. Your dream home awaits." />
  <meta name="keywords" content="real estate, luxury homes, properties, apartments, condos, houses for sale" />
  <meta name="author" content="RealtyVibe" />
  
  <meta property="og:type" content="website" />
  <meta property="og:title" content="RealtyVibe - Premium Real Estate" />
  <meta property="og:description" content="Discover premium real estate properties with modern amenities and stunning locations." />
  <meta property="og:image" content="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=630&fit=crop" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="RealtyVibe - Premium Real Estate" />
  <meta name="twitter:description" content="Discover premium real estate properties with modern amenities and stunning locations." />
  
  <meta name="theme-color" content="#0f172a" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" />
  <link rel="icon" type="image/svg+xml" href="${basePath}/favicon.svg" />
  
  ${manifestJs ? `<script src="${basePath}/assets/${manifestJs}"></script>` : ''}
  ${rootCss ? `<link rel="stylesheet" href="${basePath}/assets/${rootCss}" />` : ''}
  
  <title>RealtyVibe - Premium Real Estate</title>
</head>
<body>
  <div id="root"></div>
  ${entryClient ? `<script type="module" src="${basePath}/assets/${entryClient}"></script>` : ''}
</body>
</html>`;

// GitHub Pages 404.html with SPA redirect script
const githubPages404Html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="RealtyVibe - Discover premium real estate properties with modern amenities and stunning locations. Your dream home awaits." />
  <meta name="keywords" content="real estate, luxury homes, properties, apartments, condos, houses for sale" />
  <meta name="author" content="RealtyVibe" />
  
  <meta property="og:type" content="website" />
  <meta property="og:title" content="RealtyVibe - Premium Real Estate" />
  <meta property="og:description" content="Discover premium real estate properties with modern amenities and stunning locations." />
  <meta property="og:image" content="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=630&fit=crop" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="RealtyVibe - Premium Real Estate" />
  <meta name="twitter:description" content="Discover premium real estate properties with modern amenities and stunning locations." />
  
  <meta name="theme-color" content="#0f172a" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    // This script takes the current url and converts the path and query
    // string into just a query string, and then redirects the browser
    // to the new url with only a query string and hash fragment
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" />
  <link rel="icon" type="image/svg+xml" href="${basePath}/favicon.svg" />
  
  ${manifestJs ? `<script src="${basePath}/assets/${manifestJs}"></script>` : ''}
  ${rootCss ? `<link rel="stylesheet" href="${basePath}/assets/${rootCss}" />` : ''}
  
  <title>RealtyVibe - Premium Real Estate</title>
</head>
<body>
  <div id="root"></div>
  ${entryClient ? `<script type="module" src="${basePath}/assets/${entryClient}"></script>` : ''}
</body>
</html>`;

// Write index.html
fs.writeFileSync(path.join(clientDir, 'index.html'), indexHtml);

// Write 404.html with proper SPA routing support
fs.writeFileSync(path.join(clientDir, '404.html'), githubPages404Html);

// Create .nojekyll file to prevent GitHub Pages from processing with Jekyll
fs.writeFileSync(path.join(clientDir, '.nojekyll'), '');

console.log('Created index.html, 404.html, and .nojekyll for deployment');
console.log(`Base path: ${basePath || '(root)'}`);
console.log(`Assets found: entry=${entryClient}, css=${rootCss}, manifest=${manifestJs}`);