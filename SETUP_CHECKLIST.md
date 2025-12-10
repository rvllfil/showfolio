# 🎯 Services & Testimonials - Setup Checklist

Use this checklist to ensure proper setup of the new Services and Testimonials collections.

---

## ✅ Backend Setup (Strapi)

### 1. File Creation

- [x] Created `/server/src/api/service/content-types/service/schema.json`
- [x] Created `/server/src/api/service/controllers/service.ts`
- [x] Created `/server/src/api/service/routes/service.ts`
- [x] Created `/server/src/api/service/services/service.ts`
- [x] Created `/server/src/api/testimonial/content-types/testimonial/schema.json`
- [x] Created `/server/src/api/testimonial/controllers/testimonial.ts`
- [x] Created `/server/src/api/testimonial/routes/testimonial.ts`
- [x] Created `/server/src/api/testimonial/services/testimonial.ts`

### 2. Strapi Server

- [ ] Restart Strapi server: `cd server && npm run develop`
- [ ] Verify collections appear in admin panel
- [ ] Check console for registration messages:
  - `[INFO] Service collection registered: api::service.service`
  - `[INFO] Testimonial collection registered: api::testimonial.testimonial`

### 3. Permissions Configuration

- [ ] Open Strapi Admin: `http://localhost:1337/admin`
- [ ] Go to Settings → Users & Permissions → Roles → Public
- [ ] Services permissions:
  - [ ] Enable `find`
  - [ ] Enable `findOne`
- [ ] Testimonials permissions:
  - [ ] Enable `find`
  - [ ] Enable `findOne`
- [ ] Click **Save**

### 4. Test API Endpoints

```bash
# Test services API
curl http://localhost:1337/api/services?populate=*

# Test testimonials API
curl http://localhost:1337/api/testimonials?populate=*

# Should return JSON (empty array if no content yet)
```

- [ ] Services API responds (200 OK)
- [ ] Testimonials API responds (200 OK)
- [ ] No 403 Forbidden errors
- [ ] No 404 Not Found errors

---

## ✅ Content Creation (Strapi Admin)

### 5. Create Services (Minimum 3)

**Service 1: Web Development**

- [ ] Title: "Web Development"
- [ ] Short Description: "Custom web applications built with modern technologies"
- [ ] Description: (Rich text) Full description with technologies and benefits
- [ ] Icon: `code`
- [ ] Order: 1
- [ ] Featured: ✓ (checked)
- [ ] Image: (Optional) Upload service image
- [ ] **Status: Published** ⚠️ Important!

**Service 2: UI/UX Design**

- [ ] Title: "UI/UX Design"
- [ ] Short Description: "Beautiful, user-friendly interfaces"
- [ ] Description: (Rich text) Design approach and process
- [ ] Icon: `palette`
- [ ] Order: 2
- [ ] Featured: ✓
- [ ] **Status: Published**

**Service 3: Performance Optimization**

- [ ] Title: "Performance Optimization"
- [ ] Short Description: "Fast, efficient web experiences"
- [ ] Description: (Rich text) Optimization strategies
- [ ] Icon: `zap`
- [ ] Order: 3
- [ ] Featured: ✓
- [ ] **Status: Published**

**Service 4 (Optional): Backend Development**

- [ ] Title: "Backend Development"
- [ ] Short Description: "Robust server-side solutions"
- [ ] Icon: `layout`
- [ ] Order: 4
- [ ] **Status: Published**

### 6. Create Testimonials (Minimum 3)

**Testimonial 1**

- [ ] Name: "Sarah Johnson"
- [ ] Role: "Marketing Director"
- [ ] Company: "TechCorp Inc."
- [ ] Quote: (Rich text) Authentic client feedback (100-200 words)
- [ ] Avatar: Upload professional photo (300x300px minimum)
- [ ] Order: 1
- [ ] Featured: ✓
- [ ] **Status: Published** ⚠️ Important!

**Testimonial 2**

- [ ] Name: "Michael Rodriguez"
- [ ] Role: "CTO"
- [ ] Company: "StartupX"
- [ ] Quote: (Rich text) Specific feedback about project
- [ ] Avatar: Upload photo
- [ ] Order: 2
- [ ] Featured: ✓
- [ ] **Status: Published**

**Testimonial 3**

- [ ] Name: "Emily Chen"
- [ ] Role: "Product Manager"
- [ ] Company: "Innovation Labs"
- [ ] Quote: (Rich text) Results-focused testimonial
- [ ] Avatar: Upload photo
- [ ] Order: 3
- [ ] Featured: ✓
- [ ] **Status: Published**

**Testimonial 4 (Optional)**

- [ ] Add fourth testimonial
- [ ] **Status: Published**

---

## ✅ Frontend Setup (Next.js)

### 7. Type Definitions

- [x] Updated `/client/lib/types.ts` with Service interface
- [x] Updated `/client/lib/types.ts` with Testimonial interface
- [x] Types match Strapi v5 structure (documentId, blocks, etc.)

### 8. API Helpers

- [x] `getServices()` exists in `/client/lib/api.ts`
- [x] `getTestimonials()` exists in `/client/lib/api.ts`
- [x] Both include fallback handling for missing collections

### 9. Component Updates

- [x] Updated `/client/app/components/services-section.tsx`
  - [x] Handles Strapi blocks for description
  - [x] Icon mapping (code/layout/palette/zap)
  - [x] Uses short_description field
- [x] Updated `/client/app/components/testimonials-section.tsx`
  - [x] Handles Strapi blocks for quote
  - [x] Removed rating field
  - [x] Avatar rendering for StrapiMedia
  - [x] Uses profileData for section titles

### 10. Environment Variables

- [ ] Check `/client/.env.local` exists
- [ ] Verify `NEXT_PUBLIC_API_URL=http://localhost:1337`
- [ ] No trailing slash in URL

---

## ✅ Testing & Verification

### 11. Build Test

```bash
cd client
npm run build
```

- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No compilation errors
- [ ] See message: "✓ Compiled successfully"

### 12. Development Test

```bash
# Terminal 1: Strapi
cd server
npm run develop

# Terminal 2: Next.js
cd client
npm run dev
```

- [ ] Strapi running on `http://localhost:1337`
- [ ] Next.js running on `http://localhost:3000`
- [ ] No errors in either console

### 13. Visual Verification

Open `http://localhost:3000` in browser:

**Services Section:**

- [ ] Section visible on homepage
- [ ] Shows YOUR services (not default placeholders)
- [ ] Icons display correctly (code/layout/palette/zap)
- [ ] Service titles match Strapi
- [ ] Descriptions render properly
- [ ] Images display if uploaded
- [ ] Hover effects work

**Testimonials Section:**

- [ ] Section visible on homepage
- [ ] Shows YOUR testimonials (not placeholders)
- [ ] Client names match Strapi
- [ ] Quotes display correctly
- [ ] Avatars show if uploaded
- [ ] Company names appear
- [ ] Layout is grid (2 columns on desktop)

### 14. Browser Console Check

Open DevTools (F12) → Console:

- [ ] No 403 Forbidden errors
- [ ] No 404 Not Found errors
- [ ] No "Failed to fetch" errors
- [ ] No TypeScript warnings

### 15. Network Tab Verification

DevTools → Network → Filter: Fetch/XHR:

- [ ] Request to `/api/services?...` - Status 200
- [ ] Request to `/api/testimonials?...` - Status 200
- [ ] Response contains your data (not empty arrays)

---

## ✅ Documentation

### 16. Files Created

- [x] `/SERVICES_TESTIMONIALS_SETUP.md` - Comprehensive setup guide
- [x] `/IMPLEMENTATION_COMPLETE.md` - Implementation summary
- [x] `/API_QUICK_REFERENCE.md` - API usage reference
- [x] `/SETUP_CHECKLIST.md` - This checklist

### 17. Documentation Review

- [ ] Read `SERVICES_TESTIMONIALS_SETUP.md` for detailed instructions
- [ ] Review `API_QUICK_REFERENCE.md` for API usage examples
- [ ] Check `IMPLEMENTATION_COMPLETE.md` for technical details

---

## ✅ Production Readiness

### 18. Final Checks

- [ ] All services published (not draft)
- [ ] All testimonials published (not draft)
- [ ] Images optimized (reasonable file sizes)
- [ ] Content proofread (no typos)
- [ ] Links tested (if any in descriptions)
- [ ] Professional photos used for avatars
- [ ] Order values set correctly (1, 2, 3...)

### 19. Performance

- [ ] Build size reasonable (`npm run build` output)
- [ ] Images under 500KB each
- [ ] No console warnings in production build
- [ ] Lighthouse score acceptable (>90)

### 20. Security

- [ ] Sensitive data not exposed in testimonials
- [ ] Client permission obtained for testimonials
- [ ] No API keys in frontend code
- [ ] Permissions properly configured (Public role only)

---

## 🎉 Launch Checklist

Before going live:

- [ ] All 20 sections above completed
- [ ] Strapi and Next.js both running without errors
- [ ] At least 3 services created and published
- [ ] At least 3 testimonials created and published
- [ ] Frontend displays Strapi data (not fallbacks)
- [ ] Images loading correctly
- [ ] No console errors in browser
- [ ] Mobile responsive (test on phone)
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Content reviewed and approved
- [ ] Backup created (if modifying existing site)

---

## 🚨 Troubleshooting Quick Reference

### Problem: Collections don't appear in Strapi

**Solution:** Restart Strapi server

### Problem: 403 Forbidden errors

**Solution:** Enable permissions in Settings → Users & Permissions → Public

### Problem: Frontend shows placeholders

**Solution:** Publish content (not just save), verify permissions

### Problem: Images not loading

**Solution:** Check NEXT_PUBLIC_API_URL, verify image uploads in Strapi

### Problem: Build fails

**Solution:** Check `get_errors` output, review TypeScript errors

---

## 📊 Success Metrics

You'll know setup is complete when:

✅ **Strapi Admin:**

- Services and Testimonials appear in sidebar
- You can create/edit/publish entries
- API endpoints return 200 status

✅ **Frontend:**

- Services section shows your data
- Testimonials section shows your data
- No placeholder content visible
- All images load correctly

✅ **Build:**

- `npm run build` succeeds
- No TypeScript errors
- No compilation warnings

✅ **Performance:**

- Page loads quickly (<3 seconds)
- Smooth animations
- Responsive on all devices

---

## 📝 Notes

- **Publishing is REQUIRED** - Content must be published, not draft
- **Permissions are REQUIRED** - Enable Public find/findOne access
- **Restart is REQUIRED** - Strapi must restart to load new schemas
- **Images are OPTIONAL** - Services and testimonials work without images
- **Order matters** - Set order values to control display sequence

---

**Status Tracking:**

- [ ] Backend setup complete (Sections 1-4)
- [ ] Content created (Sections 5-6)
- [ ] Frontend verified (Sections 7-15)
- [ ] Documentation reviewed (Sections 16-17)
- [ ] Production ready (Sections 18-20)

**Completion Date:** ******\_\_\_******

**Completed By:** ******\_\_\_******

---

**For detailed instructions, see:**

- Setup: `SERVICES_TESTIMONIALS_SETUP.md`
- API Reference: `API_QUICK_REFERENCE.md`
- Implementation: `IMPLEMENTATION_COMPLETE.md`
