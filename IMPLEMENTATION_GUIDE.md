# Schema Implementation Guide

## 🎉 Implementation Complete

All schema changes have been implemented successfully. This guide explains what was done and how to apply the changes to your running Strapi instance.

---

## 📋 What Was Changed

### New Schema Files Created

1. **Hero Section** (Single-type)

   - Location: `server/src/api/hero/content-types/hero/schema.json`
   - Fields: `brandName`, `title`, `tagline`, `heroAvailabilityText`, CTAs, `profileImage`, `portfolioNumber`

2. **About Section** (Single-type)

   - Location: `server/src/api/about/content-types/about/schema.json`
   - Fields: `aboutSectionTitle`, `aboutSectionSubtitle`, `about`, `whatIDoList`, `portfolioNumber`, `socialLinks`

3. **Contact Section** (Single-type)
   - Location: `server/src/api/contact/content-types/contact/schema.json`
   - Fields: All contact section content (titles, benefits, CTA, social)

### Updated Schema Files

1. **Profile** (Single-type)
   - Location: `server/src/api/profile/content-types/profile/schema.json`
   - Added: Section title fields (`servicesSectionTitle`, `skillsSectionTitle`, etc.)
   - Kept: Global metadata (nav labels, footer labels, logos, favicon)

### Frontend Changes

1. **Type Definitions** (`client/lib/types.ts`)

   - Added: `Hero`, `About`, `Contact` interfaces
   - Updated: `Profile` interface (removed section-specific fields)
   - Created: `MergedProfileData` type for backward compatibility

2. **API Functions** (`client/lib/api.ts`)

   - Added: `getHero()`, `getAbout()`, `getContact()`, `mergeProfileData()`
   - Includes fallback handling when single-types don't exist yet

3. **Page Updates** (`client/app/page.tsx`)

   - Fetches all section single-types
   - Merges data for component consumption

4. **Component Updates** (All components)
   - Removed all `any` types
   - Updated to use `MergedProfileData` type
   - Full type safety enforced

---

## 🚀 How to Apply Changes

### Option 1: Development Mode (Recommended for Testing)

Run Strapi in development mode to automatically detect new schemas:

```bash
# Stop any running containers
docker compose down

# Start development compose (builds from source)
docker compose -f docker-compose.dev.yml up --build

# Or start only Strapi server in dev mode
docker compose -f docker-compose.dev.yml up --build server
```

**What happens:**

- Strapi detects new schema files in `server/src/api/`
- New content-types appear in Admin UI automatically
- You can add content via `/admin` interface

### Option 2: Production Mode

For production deployment, rebuild images:

```bash
# Build new images with updated schemas
docker compose -f docker-compose.build.yml build

# Push to Docker Hub (optional)
docker compose -f docker-compose.build.yml push

# Pull and restart production
docker compose pull
docker compose up -d
```

### Option 3: Local Development (Without Docker)

```bash
cd server
npm install
npm run develop
```

---

## 📝 After Strapi Starts

### 1. Access Admin Panel

Navigate to `http://localhost:1337/admin`

### 2. Create Content for New Single-Types

You'll see three new single-types in Content Manager:

- **Hero Section**
- **About Section**
- **Contact Section**

### 3. Populate Data

#### Hero Section Example:

```
Brand Name: Your Name
Title: Full-Stack Developer
Tagline: Building exceptional web experiences
Hero Availability Text: Available for hire
Primary CTA Label: View My Work
Primary CTA URL: #portfolio
Secondary CTA Label: Get in Touch
Secondary CTA URL: #contact
Profile Image: [Upload]
Portfolio Numbers: [Add stats like "5+ Years", "50+ Projects"]
```

#### About Section Example:

```
About Section Title: About Me
About Section Subtitle: Passionate developer crafting digital solutions
About: [Rich text content about yourself]
What I Do List: [Bullet points starting with "-"]
Portfolio Numbers: [Stats for About section]
Social Links: [Your social profiles]
```

#### Contact Section Example:

```
Contact Section Title: Let's Work Together
Contact Section Description: Have a project in mind?
Benefits: [Fill in benefit titles and descriptions 1-3]
CTA: [Fill in CTA title and description]
Button Labels: [Primary and secondary labels]
Social: [Title and description for social section]
Social Links: [Contact methods]
```

### 4. Test Frontend

Visit `http://localhost:3000` and verify:

- ✅ Hero section displays data from Hero single-type
- ✅ About section displays data from About single-type
- ✅ Contact section displays data from Contact single-type
- ✅ All sections have fallback content if single-types are empty
- ✅ No TypeScript errors

---

## 🔄 Data Migration (Optional)

If you have existing data in Profile content-type:

### Manual Migration:

1. Open existing Profile in Admin
2. Copy field values
3. Paste into corresponding single-types (Hero/About/Contact)
4. Save and publish each single-type

### Automated Migration:

A migration script could be created if needed. For now, manual copy-paste is recommended since it's a one-time operation.

---

## ✅ Verification Checklist

- [ ] Strapi starts without errors
- [ ] Three new single-types appear in Admin UI
- [ ] Can create/edit content in new single-types
- [ ] Frontend displays merged data correctly
- [ ] Fallbacks work when single-types are empty
- [ ] No TypeScript compilation errors
- [ ] No console warnings about missing fields

---

## 📚 Documentation

Created documentation files:

1. `NAMING_AUDIT.md` - Naming consistency audit report
2. `SCHEMA_VERIFICATION.md` - Schema usage verification
3. This file - Implementation guide

---

## 🐛 Troubleshooting

### Issue: New single-types don't appear in Admin

**Solution:**

```bash
# Rebuild Strapi and clear cache
cd server
rm -rf .cache build
npm run build
npm run develop
```

### Issue: TypeScript errors in frontend

**Solution:**

```bash
cd client
npm install
npm run dev
```

### Issue: Data not showing on frontend

**Check:**

1. Single-types are published in Strapi Admin
2. Browser console for API errors
3. Network tab for API responses
4. Fallback data is working (should show default text)

---

## 🎯 Next Steps

### Immediate:

1. ✅ Start Strapi in dev mode
2. ✅ Add content to new single-types
3. ✅ Test frontend display

### Future Enhancements:

- Implement `heroBackgroundMedia` in hero component
- Add content preview in Strapi Admin
- Create backup/restore scripts for content
- Add localization support

---

## 📞 Summary

**What Changed:**

- 3 new single-types for section content
- Profile schema updated with section titles
- Full type safety in frontend (no `any` types)
- Merge layer for backward compatibility

**Benefits:**

- Clear separation of concerns
- Better editorial experience
- Type-safe frontend
- Backward compatible (works with or without new single-types)

**To Apply:**

```bash
docker compose -f docker-compose.dev.yml up --build
```

That's it! Your schema implementation is complete and ready to use. 🚀
