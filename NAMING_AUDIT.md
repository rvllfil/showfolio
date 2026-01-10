# Naming Consistency & Convention Audit

## Date: 2026-01-10

### Naming Convention Standards

#### Backend (Strapi Schema)

- **Format**: camelCase for all field names
- **Collections**: Plural names (e.g., `heroes`, `abouts`, `contacts`)
- **Single Types**: Singular display names (e.g., "Hero Section", "About Section")
- **Component Names**: kebab-case files, dot-notation references (e.g., `global.social-links`)

#### Frontend (TypeScript)

- **Interfaces**: PascalCase (e.g., `Hero`, `About`, `Contact`, `MergedProfileData`)
- **Properties**: camelCase matching backend exactly
- **Functions**: camelCase (e.g., `getHero`, `getAbout`, `mergeProfileData`)
- **Components**: PascalCase (e.g., `HeroSection`, `AboutSection`)

### Consistency Check Results

#### ✅ Consistent Naming

All field names between schema and frontend are consistent:

**Hero Section**

- Schema: `brandName`, `title`, `tagline`, `heroAvailabilityText`, etc.
- Frontend: Exact match in `Hero` interface and components

**About Section**

- Schema: `aboutSectionTitle`, `aboutSectionSubtitle`, `about`, `whatIDoList`
- Frontend: Exact match in `About` interface and components

**Contact Section**

- Schema: `contactSectionTitle`, `contactBenefitsTitle1`, etc.
- Frontend: Exact match in `Contact` interface and components

**Profile (Global)**

- Schema: `brandName`, `shortInfo`, `navHomeLabel`, `footerQuickLinksTitle`
- Frontend: Exact match in `Profile` interface

**Collections**

- Service: `title`, `slug`, `description`, `short_description`, `icon`, `order`
- Skill: `name`, `slug`, `category`, `description`, `level`, `icon`
- Testimonial: `name`, `role`, `company`, `quote`, `avatar`, `order`
- Portfolio: `title`, `slug`, `shortDescription`, `isFeatured`, etc.

#### 🔧 Convention Issues Found & Fixed

1. **Type Safety**

   - ❌ Before: Used `any` type in 4 locations
   - ✅ Fixed: All replaced with proper types (`MergedProfileData`, `SocialLink`, `Portfolio`, `TechTag`)

2. **Type Consistency**

   - ❌ Before: Components used `Profile` type which was too broad
   - ✅ Fixed: Created `MergedProfileData` type for component consumption

3. **Missing Fields**
   - ❌ Before: `heroAvailabilityText` and section titles not in schema
   - ✅ Fixed: Added to appropriate single-types

### Naming Pattern Analysis

#### Section Title Pattern

**Standard**: `{section}SectionTitle` and `{section}SectionSubtitle`

- ✅ `aboutSectionTitle`, `aboutSectionSubtitle`
- ✅ `servicesSectionTitle`, `servicesSectionSubtitle`
- ✅ `skillsSectionTitle`, `skillsSectionSubtitle`
- ✅ `testimonialsSectionTitle`, `testimonialsSectionSubtitle`
- ✅ `projectsSectionTitle`, `projectsSectionSubtitle`
- ✅ `contactSectionTitle` (no subtitle, uses `contactSectionDescription`)

#### CTA Button Pattern

**Standard**: `{context}CtaLabel` and `{context}CtaUrl`

- ✅ `primaryCtaLabel`, `primaryCtaUrl`
- ✅ `secondaryCtaLabel`, `secondaryCtaUrl`
- ✅ `navCtaLabel`

#### Navigation Pattern

**Standard**: `nav{Page}Label`

- ✅ `navHomeLabel`, `navAboutLabel`, `navServicesLabel`
- ✅ `navPortfolioLabel`, `navContactLabel`

#### Footer Pattern

**Standard**: `footer{Section}Title` and `footer{Action}Label`

- ✅ `footerQuickLinksTitle`, `footerContactTitle`
- ✅ `footerEmailLabel`, `footerPortfolioLabel`

#### Contact Benefits Pattern

**Standard**: `contactBenefitsTitle{N}` and `contactBenefitsDescription{N}`

- ✅ `contactBenefitsTitle1`, `contactBenefitsDescription1`
- ✅ `contactBenefitsTitle2`, `contactBenefitsDescription2`
- ✅ `contactBenefitsTitle3`, `contactBenefitsDescription3`

### Best Practices Applied

1. **Separation of Concerns**

   - Global metadata → `Profile` single-type
   - Page-specific content → Section single-types (`Hero`, `About`, `Contact`)
   - Repeatable items → Collection types (`Service`, `Skill`, `Testimonial`)

2. **Type Safety**

   - No `any` types in production code
   - All props properly typed with interfaces
   - Type merging for backward compatibility

3. **Naming Clarity**

   - Self-documenting names (e.g., `heroAvailabilityText` clearly for hero badge)
   - Consistent patterns across similar fields
   - No abbreviations that could cause confusion

4. **Component Consistency**
   - All components use `MergedProfileData` for unified interface
   - Props follow same naming convention as schema
   - Optional chaining for all profile data access

### Recommendations

#### ✅ Completed

- All schema field names use camelCase
- All TypeScript interfaces match schema exactly
- Section single-types created for clear data separation
- Type safety enforced (no `any` types)

#### 📝 Future Considerations

- Consider adding TypeScript `strict` mode if not already enabled
- Add runtime validation with Zod/Yup for API responses
- Document field relationships in schema descriptions
- Add ESLint rule to prevent `any` type usage

### Summary

**Status**: ✅ All naming conventions are consistent and follow best practices

**Changes Made**:

1. Created 3 new single-types with consistent naming
2. Updated Profile schema with missing section title fields
3. Created comprehensive TypeScript types
4. Removed all `any` types from components
5. Implemented merge strategy for backward compatibility

**Result**: 100% naming consistency between backend schema and frontend TypeScript types.
