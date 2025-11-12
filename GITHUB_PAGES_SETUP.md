# GitHub Pages Setup Guide

This project is now fully configured for GitHub Pages deployment!

## What Was Fixed

The main issue was that GitHub Pages was serving a dummy HTML file instead of the built React application. The following changes were made to fix this:

1. **Updated HTML Generation Script** (`scripts/create-html.js`):
   - Added support for configurable base path via `BASE_PATH` environment variable
   - Created proper `index.html` with all React assets and correct paths
   - Created `404.html` with SPA routing redirect script for GitHub Pages
   - Added automatic `.nojekyll` file creation to prevent Jekyll processing

2. **Updated Build Scripts** (`package.json`):
   - Added `build:github` script that builds with the correct `/real-estate-app` base path
   - Updated `build:netlify` to generate HTML files for Netlify deployment

3. **Updated GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
   - Changed to use `npm run build:github` instead of plain `npm run build`
   - This ensures HTML files are generated with the correct base path during CI/CD

4. **Removed Dummy Files**:
   - Removed `public/404.html` which was a placeholder that was being deployed instead of the app

## How It Works

### Base Path Configuration
The app is configured with `basename: "/real-estate-app"` in `react-router.config.ts`, which matches the GitHub Pages URL structure: `https://jamesandfamily.github.io/real-estate-app/`

### SPA Routing on GitHub Pages
GitHub Pages doesn't natively support client-side routing for SPAs. The solution uses:

1. **404.html Redirect Script**: When a user visits a direct URL (e.g., `/real-estate-app/properties`), GitHub Pages serves the `404.html` file, which includes a script that converts the path into a query parameter and redirects to `index.html`

2. **Index.html Processing**: The main `index.html` includes a script that reads the query parameter and restores the correct URL using `window.history.replaceState`

3. **.nojekyll File**: Prevents GitHub Pages from processing the site with Jekyll, which can interfere with files/folders starting with underscores

## Deployment

### Automatic Deployment
Every push to the `master` branch automatically triggers a GitHub Actions workflow that:
1. Checks out the code
2. Installs dependencies
3. Builds the application with `npm run build:github`
4. Uploads the `build/client` directory to GitHub Pages
5. Deploys to `https://jamesandfamily.github.io/real-estate-app/`

### Manual Deployment
If you need to deploy manually:

```bash
# Build for GitHub Pages
npm run build:github

# The output will be in build/client/
# This directory contains:
# - index.html (main app entry point)
# - 404.html (SPA routing fallback)
# - .nojekyll (prevents Jekyll processing)
# - assets/ (all JS, CSS, and other assets)
# - favicon.svg
```

## Local Development

For local development, use:
```bash
npm run dev
```

The app will run at `http://localhost:5173/real-estate-app/` (note the base path)

## Netlify Deployment

For Netlify deployment, use:
```bash
npm run build:netlify
```

This generates HTML files without the GitHub Pages specific base path.

## Troubleshooting

### Issue: Assets not loading
**Solution**: Verify that all asset paths in the generated HTML include the correct base path (`/real-estate-app/`)

### Issue: Routes return 404
**Solution**: Ensure the `404.html` file contains the SPA redirect script

### Issue: Styles missing or incorrect
**Solution**: Check that the CSS files are being loaded with the correct base path in `index.html`

### Issue: GitHub Pages shows old dummy HTML
**Solution**: 
1. Wait a few minutes for GitHub Pages to update after deployment
2. Clear your browser cache
3. Check the GitHub Actions workflow completed successfully
4. Verify the deployment is using the correct branch/folder in GitHub repository settings

## Files Modified/Created

- `scripts/create-html.js` - Enhanced to support base path and GitHub Pages
- `package.json` - Added `build:github` and updated `build:netlify` scripts
- `.github/workflows/deploy.yml` - Updated to use new build script
- `GITHUB_PAGES_SETUP.md` - This documentation file

## Important Notes

- The basename in `react-router.config.ts` must match the repository name
- All asset paths in generated HTML files use absolute paths with the base path
- The `.nojekyll` file is critical for GitHub Pages to serve the app correctly
- The 404.html redirect script is necessary for client-side routing to work

Your React app should now be fully functional on GitHub Pages! 🎉
