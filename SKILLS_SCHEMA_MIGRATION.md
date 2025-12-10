# Skills Schema Migration Guide

## 🎯 Overview

The `skills` collection has been updated with new fields and revised categories to better organize technical skills.

---

## 📊 Schema Changes

### New Fields Added

| Field    | Type                   | Description                               |
| -------- | ---------------------- | ----------------------------------------- |
| `slug`   | UID (from name)        | URL-friendly unique identifier            |
| `level`  | Integer (0-100)        | Skill proficiency level for progress bars |
| `icon`   | String                 | Icon key for frontend rendering           |
| `status` | Enum (active/inactive) | Control which skills are displayed        |

### Updated Fields

| Field         | Old Type         | New Type         | Notes                          |
| ------------- | ---------------- | ---------------- | ------------------------------ |
| `description` | Text             | Rich Text        | Now supports formatted content |
| `category`    | Enum (5 options) | Enum (6 options) | Revised categories             |

### Category Changes

**OLD Categories:**

- `backend`
- `frontend`
- `cms`
- `ecommerce`
- `tool`

**NEW Categories:**

- `frontend` ✅
- `backend` ✅
- `uiux` 🆕 (for design skills)
- `mobile` 🆕 (for mobile development)
- `devops` 🆕 (for infrastructure)
- `tools` (renamed from `tool`)

---

## 🔄 Migration Steps

### Step 1: Restart Strapi

After schema changes, Strapi needs to restart:

```bash
cd server
npm run develop
```

**Expected:** You should see the new fields in the Strapi admin panel when editing skills.

### Step 2: Add Slug Field

For **existing skills**, you need to generate slugs:

1. Open each skill in Strapi admin
2. The `slug` field should auto-generate from the `name`
3. Save each skill to persist the slug

**Tip:** Slugs are auto-generated, so just opening and saving should work.

### Step 3: Update Categories

Map old categories to new ones:

| Old Category           | New Category | Action              |
| ---------------------- | ------------ | ------------------- |
| `frontend`             | `frontend`   | No change           |
| `backend`              | `backend`    | No change           |
| `cms`                  | `tools`      | Update manually     |
| `ecommerce`            | `tools`      | Update manually     |
| `tool`                 | `tools`      | Update manually     |
| Design skills (if any) | `uiux`       | Add as new category |
| Mobile skills (if any) | `mobile`     | Add as new category |
| DevOps skills (if any) | `devops`     | Add as new category |

**Action Required:**

1. Open skills with old categories (`cms`, `ecommerce`, `tool`)
2. Change category to appropriate new value
3. Save

### Step 4: Set Status Field

All skills should have a `status`:

- **active** - Skill will be displayed on frontend
- **inactive** - Skill hidden from frontend

**Default:** New schema sets default to `active`, but existing records need updating:

1. Open each skill
2. Set `status` to `active` or `inactive`
3. Save

### Step 5: Optional - Add Level and Icon

For better UI representation:

**Level (0-100):**

- 90-100: Expert
- 70-89: Advanced
- 50-69: Intermediate
- 30-49: Basic
- 0-29: Learning

**Icon:**

- Leave blank for now (future feature)
- Or add icon keys like: "react", "node", "figma"

---

## 📝 SQL Migration Script (Optional)

If you prefer SQL migration for bulk updates:

```sql
-- Update old 'tool' category to 'tools'
UPDATE skills
SET category = 'tools'
WHERE category = 'tool';

-- Update cms category to tools
UPDATE skills
SET category = 'tools'
WHERE category = 'cms';

-- Update ecommerce category to tools
UPDATE skills
SET category = 'tools'
WHERE category = 'ecommerce';

-- Set default status for existing skills
UPDATE skills
SET status = 'active'
WHERE status IS NULL;
```

**Note:** This assumes direct database access. Test in development first!

---

## 🎨 Frontend Changes

### TypeScript Types

The `Skill` interface now includes:

```typescript
export interface Skill {
  id: number;
  documentId: string;
  name: string;
  slug: string; // NEW
  category: SkillCategory; // Updated enum
  description?: string; // Optional, rich text
  level?: number; // NEW: 0-100
  icon?: string; // NEW: icon key
  status: SkillStatus; // NEW: active/inactive
  order?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
```

### Category Display

The frontend now supports 6 categories with icons:

| Category | Icon       | Color  |
| -------- | ---------- | ------ |
| Frontend | Code2      | Blue   |
| Backend  | Server     | Green  |
| UI/UX    | Palette    | Pink   |
| Mobile   | Smartphone | Orange |
| DevOps   | Cloud      | Cyan   |
| Tools    | Wrench     | Purple |

**Behavior:**

- Only categories with skills are displayed
- Only `active` skills are shown
- Empty categories are automatically hidden

---

## ✅ Verification Checklist

After migration:

- [ ] Strapi restarted successfully
- [ ] New fields visible in admin panel
- [ ] All skills have `slug` field populated
- [ ] All skills have `status` set (active/inactive)
- [ ] Old categories updated to new ones
- [ ] No skills using removed categories (cms, ecommerce, tool)
- [ ] Frontend build succeeds (`npm run build`)
- [ ] Skills section displays correctly
- [ ] Only active skills shown on frontend
- [ ] Categories display appropriate icons/colors

---

## 🧪 Testing

### Test in Strapi Admin

1. Create a new skill with all new fields
2. Verify dropdown shows 6 categories
3. Verify status dropdown shows active/inactive
4. Verify slug auto-generates from name
5. Verify level accepts 0-100
6. Verify description supports rich text

### Test on Frontend

1. Visit the skills section
2. Verify only active skills display
3. Verify categories show with correct icons
4. Verify empty categories are hidden
5. Verify skills grouped correctly

---

## 🐛 Troubleshooting

### Issue: "Category not recognized"

**Cause:** Old category values in database

**Fix:** Update skills to use new categories (frontend, backend, uiux, mobile, devops, tools)

### Issue: "Slug field missing"

**Cause:** Strapi hasn't regenerated slugs

**Fix:**

1. Open each skill in admin
2. Save without changes (triggers slug generation)

### Issue: "Skills not showing on frontend"

**Cause:** Skills have `status: inactive` or not published

**Fix:**

1. Check skill status is `active`
2. Verify skill is published (not draft)

### Issue: "Build errors about Skill type"

**Cause:** TypeScript cache

**Fix:**

```bash
cd client
rm -rf .next
npm run build
```

---

## 📚 Example Skill Entries

### Frontend Skill

```
Name: React
Slug: react (auto-generated)
Category: frontend
Description: "Modern JavaScript library for building user interfaces"
Level: 90
Icon: react
Status: active
Order: 1
```

### Backend Skill

```
Name: Node.js
Slug: nodejs (auto-generated)
Category: backend
Description: "JavaScript runtime for server-side development"
Level: 85
Icon: nodejs
Status: active
Order: 2
```

### UI/UX Skill

```
Name: Figma
Slug: figma (auto-generated)
Category: uiux
Description: "Collaborative design tool for UI/UX"
Level: 75
Icon: figma
Status: active
Order: 3
```

---

## 🚀 Rollout Plan

1. **Development Environment:**

   - Apply schema changes
   - Migrate existing data
   - Test thoroughly

2. **Staging Environment:**

   - Deploy updated schema
   - Run migration script
   - Verify all skills display correctly

3. **Production Environment:**
   - Backup database
   - Apply schema changes during low-traffic period
   - Run migration
   - Monitor for issues

---

**Status:** Schema updated and ready for data migration.

**Next Steps:**

1. Restart Strapi
2. Update existing skill entries
3. Verify frontend display
