# Logo Component Documentation

## Overview

The `Logo` component adalah komponen yang dapat digunakan kembali (reusable) untuk menampilkan logo brand dengan dukungan theme-aware (light/dark mode). Component ini menggantikan implementasi logo yang duplikat di navbar dan hero section.

## Features

- ✅ **Theme-aware**: Automatically switches between light and dark logos based on current theme
- ✅ **Responsive sizing**: Supports different size variants for different use cases
- ✅ **Loading states**: Shows loading placeholder while fetching data
- ✅ **Error handling**: Graceful fallback to brand name when logo fails to load
- ✅ **Customizable**: Flexible props for different use cases
- ✅ **Optimized**: Uses Next.js Image optimization for better performance

## Props

| Prop                    | Type           | Default     | Description                                           |
| ----------------------- | -------------- | ----------- | ----------------------------------------------------- |
| `size`                  | `"sm" \| "lg"` | `"sm"`      | Size variant - "sm" for navbar, "lg" for hero section |
| `className`             | `string`       | `undefined` | Additional CSS classes to apply                       |
| `fallbackProfile`       | `Profile`      | `undefined` | Fallback profile data if API call fails               |
| `showLoading`           | `boolean`      | `true`      | Whether to show loading state                         |
| `showBrandNameFallback` | `boolean`      | `true`      | Whether to show brand name when logo is not available |

## Size Variants

### Small (`size="sm"`)

- Used in navbar
- Dimensions: `w-auto h-10`
- Uses Next.js Image component for optimization
- Example: `<Logo size="sm" />`

### Large (`size="lg"`)

- Used in hero section
- Dimensions: `w-40 h-40 mx-auto md:w-56 md:h-56`
- Uses regular img tag for better responsive control
- Example: `<Logo size="lg" fallbackProfile={profileData} />`

## Usage Examples

### Basic Usage (Navbar)

```tsx
import { Logo } from "@/app/components/ui/logo";

function Navbar() {
  return (
    <header>
      <Link href="/">
        <Logo size="sm" />
      </Link>
    </header>
  );
}
```

### Advanced Usage (Hero Section)

```tsx
import { Logo } from "@/app/components/ui/logo";

function HeroSection({ profileData }) {
  return (
    <section>
      <Logo
        size="lg"
        fallbackProfile={profileData}
        showLoading={true}
        showBrandNameFallback={true}
      />
    </section>
  );
}
```

### Custom Styling

```tsx
<Logo size="sm" className="custom-logo-class" showLoading={false} />
```

## Theme Logic

The component automatically determines which logo to show based on the current theme:

```typescript
const isDarkMode = resolvedTheme === "dark";
const logoToUse =
  mounted && isDarkMode ? profile?.lightLogo : profile?.darkLogo;
```

- **Light theme**: Shows `darkLogo` (dark logo on light background)
- **Dark theme**: Shows `lightLogo` (light logo on dark background)

## Fallback Strategy

1. **Primary**: Show theme-appropriate logo image
2. **Secondary**: Show alternative logo if primary is not available
3. **Tertiary**: Show brand name as text (if `showBrandNameFallback` is true)
4. **Final**: Return null if no fallback should be shown

## API Integration

The component automatically fetches profile data from the Strapi API:

- Endpoint: `getProfile()` from `@/lib/api`
- Returns: Profile data with `lightLogo` and `darkLogo` media fields
- Error handling: Falls back to provided `fallbackProfile` or default values

## File Structure

```
app/components/ui/
└── logo.tsx           # Main Logo component
```

## Migration Guide

### Before (Duplicate Logic)

```tsx
// In navbar.tsx and hero-section.tsx
const logoToUse =
  mounted && isDarkMode ? profile?.lightLogo : profile?.darkLogo;
// Duplicate LogoImage components
// Duplicate loading states
// Duplicate error handling
```

### After (Reusable Component)

```tsx
// In navbar.tsx
<Logo size="sm" />

// In hero-section.tsx
<Logo size="lg" fallbackProfile={profileData} />
```

## Benefits

1. **DRY Principle**: Eliminates code duplication between navbar and hero section
2. **Maintainability**: Single source of truth for logo logic
3. **Consistency**: Ensures same behavior across all logo instances
4. **Performance**: Optimized image loading with Next.js Image
5. **Flexibility**: Easy to add new logo instances with consistent behavior
6. **Type Safety**: Full TypeScript support with proper interfaces

## Dependencies

- `next-themes`: For theme detection
- `next/image`: For optimized image loading
- `@/lib/api`: For profile data fetching
- `@/lib/types`: For TypeScript interfaces
