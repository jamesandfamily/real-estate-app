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
        {/* Character encoding */}
        <meta charSet="utf-8" />
        
        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="RealtyVibe - Discover premium real estate properties with modern amenities and stunning locations. Your dream home awaits." />
        <meta name="keywords" content="real estate, luxury homes, properties, apartments, condos, houses for sale" />
        <meta name="author" content="RealtyVibe" />
        
        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RealtyVibe - Premium Real Estate" />
        <meta property="og:description" content="Discover premium real estate properties with modern amenities and stunning locations." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=630&fit=crop" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RealtyVibe - Premium Real Estate" />
        <meta name="twitter:description" content="Discover premium real estate properties with modern amenities and stunning locations." />
        
        {/* Theme Color for mobile browsers */}
        <meta name="theme-color" content="#0f172a" />
        
        {/* Apple Touch Icon */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Structured Data (Schema.org) - Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "RealtyVibe",
            "description": "Discover premium real estate properties with modern amenities and stunning locations. Your dream home awaits.",
            "url": typeof window !== "undefined" ? window.location.origin : "https://realtyvibe.com",
            "logo": typeof window !== "undefined" ? `${window.location.origin}/favicon.svg` : "https://realtyvibe.com/favicon.svg",
            "telephone": "+1-555-123-4567",
            "email": "info@realtyvibe.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Luxury Lane",
              "addressLocality": "Beverly Hills",
              "addressRegion": "CA",
              "postalCode": "90210",
              "addressCountry": "US"
            },
            "areaServed": "United States",
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500"
            }
          })
        }} />
        
        {/* React Router Meta component */}
        <Meta />
        
        {/* Color scheme script */}
        <script src={colorSchemeApi}></script>
        
        {/* Stylesheets and fonts */}
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
