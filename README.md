# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 CSS Modules for styling
- 📖 [React Router docs](https://reactrouter.com/)

### Styling & Theming

- This project uses CSS modules as the styling solution, Radix as the component library, and Open Props for styling tokens and theming
- Project theme is defined in `app/styles/theme.css`, used as a design system for all UI building
- Base design tokens are defined in `app/styles/tokens/<token-type>.css`, used as an immutable base design system for all the theme and all UI

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173/real-estate-app/`.

## Building for Production

Create a production build:

```bash
npm run build
```

### Build for GitHub Pages

Build with GitHub Pages configuration:

```bash
npm run build:github
```

### Build for Netlify

Build with Netlify configuration:

```bash
npm run build:netlify
```

## Deployment

### GitHub Pages (Automatic)

This project is configured for automatic deployment to GitHub Pages. Every push to the `master` branch triggers a deployment workflow.

The live site is available at: `https://jamesandfamily.github.io/real-estate-app/`

For detailed setup information, see [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)

### Netlify Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for Netlify deployment instructions.

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```
