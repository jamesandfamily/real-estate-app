# RealtyVibe Theme Customization Guide

## Available Themes

RealtyVibe includes 6 professionally designed color themes that users can switch between using the floating theme switcher button (palette icon in the bottom-right corner).

### Theme Options

1. **Teal Elegance** (Default)
   - Accent: Sophisticated teal
   - Neutral: Slate gray
   - Best for: Modern, professional real estate feel

2. **Indigo Luxury**
   - Accent: Rich indigo blue
   - Neutral: Slate gray
   - Best for: Premium, high-end property showcase

3. **Golden Hour**
   - Accent: Warm amber gold
   - Neutral: Sand beige
   - Best for: Warm, inviting atmosphere

4. **Crimson Elite**
   - Accent: Bold crimson red
   - Neutral: Mauve gray
   - Best for: Luxury, high-impact presentation

5. **Jade Garden**
   - Accent: Fresh jade green
   - Neutral: Sage gray
   - Best for: Natural, eco-friendly properties

6. **Violet Dream**
   - Accent: Royal violet purple
   - Neutral: Slate gray
   - Best for: Creative, unique property listings

## How Theme Switching Works

The theme switcher uses CSS custom properties to dynamically update the application's color palette. When a user selects a theme:

1. The accent color scale (1-12 steps) is updated
2. The neutral color scale (1-12 steps) is updated
3. The selection is saved to localStorage for persistence
4. All components automatically reflect the new colors

## Technical Implementation

Themes are defined in `/app/components/theme-switcher.tsx` and modify CSS variables in the document root:

```typescript
--color-accent-1 through --color-accent-12
--color-accent-contrast
--color-neutral-1 through --color-neutral-12
--color-neutral-contrast
```

The color scales are based on the project's comprehensive color system defined in `/app/styles/tokens/colors.css`.
