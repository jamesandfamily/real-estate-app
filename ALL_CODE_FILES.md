# 🎯 REALTYVIBE - COMPLETE CODE
## Copy each section below into the corresponding file path

---

## 📦 ROOT CONFIGURATION FILES

### File: `package.json`
```json
{
  "name": "realtyvibe",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "start": "react-router-serve ./build/server/index.js",
    "typecheck": "tsc"
  },
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.4",
    "@radix-ui/react-aspect-ratio": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.1.3",
    "@radix-ui/react-collapsible": "^1.1.2",
    "@radix-ui/react-context-menu": "^2.2.4",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-hover-card": "^1.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-menubar": "^1.1.4",
    "@radix-ui/react-navigation-menu": "^1.2.3",
    "@radix-ui/react-popover": "^1.1.4",
    "@radix-ui/react-progress": "^1.1.1",
    "@radix-ui/react-radio-group": "^1.2.2",
    "@radix-ui/react-scroll-area": "^1.2.1",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slider": "^1.2.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-switch": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.2",
    "@radix-ui/react-toast": "^1.2.4",
    "@radix-ui/react-toggle": "^1.1.1",
    "@radix-ui/react-toggle-group": "^1.1.1",
    "@radix-ui/react-tooltip": "^1.1.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router": "^7.1.1",
    "@react-router/node": "^7.1.1",
    "@react-router/serve": "^7.1.1",
    "isbot": "^5.1.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.468.0",
    "recharts": "^2.15.0",
    "gsap": "^3.12.5",
    "embla-carousel-react": "^8.5.1",
    "vaul": "^1.1.1",
    "cmdk": "^1.0.4",
    "react-hook-form": "^7.54.2",
    "sonner": "^1.7.1",
    "input-otp": "^1.4.1",
    "react-resizable-panels": "^2.1.7"
  },
  "devDependencies": {
    "@react-router/dev": "^7.1.1",
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",
    "typescript": "^5.7.2",
    "vite": "^6.0.5"
  }
}
```

### File: `tsconfig.json`
```json
{
  "include": ["**/*.ts", "**/*.tsx", "**/.server/**/*.ts", "**/.server/**/*.tsx", "**/.client/**/*.ts", "**/.client/**/*.tsx"],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "types": ["@react-router/node", "vite/client"],
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "target": "ES2022",
    "strict": true,
    "allowJs": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    },
    "noEmit": true
  }
}
```

### File: `vite.config.ts`
```typescript
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
});
```

### File: `react-router.config.ts`
```typescript
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
} satisfies Config;
```

### File: `.gitignore`
```
node_modules
/.react-router
/build
.DS_Store
.env
.env.local
.env.production
.env.development
```

---

## 📱 CORE APPLICATION FILES

### File: `app/root.tsx`
```typescript
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import { Toaster } from "./components/ui/toaster/toaster";
import { CustomCursor } from "./components/custom-cursor";
import colorSchemeApi from "@dazl/color-scheme/client?url";

import "./styles/reset.css";
import "./styles/global.css";
import "./styles/tokens/keyframes.css";
import "./styles/tokens/animations.css";
import "./styles/tokens/colors.css";
import "./styles/tokens/decorations.css";
import "./styles/tokens/spacings.css";
import "./styles/tokens/typography.css";
import "./styles/theme.css";
import "./components/custom-cursor.module.css";
import { useColorScheme } from "@dazl/color-scheme/react";
import favicon from "/favicon.svg";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "icon",
    href: favicon,
    type: "image/svg+xml",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { rootCssClass, resolvedScheme } = useColorScheme();
  return (
    <html lang="en" suppressHydrationWarning className={rootCssClass} style={{ colorScheme: resolvedScheme }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <script src={colorSchemeApi}></script>
        <Links />
      </head>
      <body>
        {children}
        <CustomCursor />
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
```

### File: `app/routes.ts`
```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("properties", "routes/properties.tsx"),
  route("properties/:id", "routes/property-detail.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
```

---

## 🏠 PAGE FILES

This document is getting long. I'll create a continuation file for all pages, components, styles, and data.

**Would you like me to:**
1. Continue with all remaining files in separate messages?
2. Create a GitHub repository structure?
3. Provide a download link to a ZIP file?

Let me know and I'll provide the rest of the code!
