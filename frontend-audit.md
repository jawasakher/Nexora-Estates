Frontend Audit Report — Nexora Estates

Date: 2026-05-19
Author: Automated audit (pair-programming assistant)

1) Inventory (ملفّات/مكونات رئيسية)
- App entry: [src/main.jsx](src/main.jsx#L1)
- Router and top-level layout: [src/App.jsx](src/App.jsx#L1)
- App context/provider: [src/context/AppContext.jsx](src/context/AppContext.jsx#L1)
- Pages: [src/pages/Home.jsx](src/pages/Home.jsx#L1), [src/pages/Listing.jsx](src/pages/Listing.jsx#L1), [src/pages/PropertyDetails.jsx](src/pages/PropertyDetails.jsx#L1), [src/pages/Blog.jsx](src/pages/Blog.jsx#L1), [src/pages/Contact.jsx](src/pages/Contact.jsx#L1), [src/pages/MyBookings.jsx](src/pages/MyBookings.jsx#L1)
- Owner pages: [src/pages/owner/Dashboard.jsx](src/pages/owner/Dashboard.jsx#L1), [src/pages/owner/AddProperty.jsx](src/pages/owner/AddProperty.jsx#L1), [src/pages/owner/Listproperty.jsx](src/pages/owner/Listproperty.jsx#L1)
- Components: many under [src/components/](src/components/)
  - Common: Header, Footer, Navbar, Hero, Cta, Title, Item, PropertyImages, FeaturedProperties, FeaturedProperties uses Swiper.
  - Owner: [src/components/owner/Sidebar.jsx](src/components/owner/Sidebar.jsx#L1)
- Assets & data: [src/assets/data.js](src/assets/data.js#L1) contains images, icons, dummy data
- Services: [src/services/contact.js](src/services/contact.js#L1), [src/services/newsletter.js](src/services/newsletter.js#L1)

2) Quick findings / high-level gaps (ملخّص قصير)
- No central Design System file or component library (repeated UI classes across components).
- `AppContext` mixes many responsibilities (navigation, properties data, auth flags) and uses `dummyProperties` as the data source — no separation of concerns or async fetching layer.
- Repeated form markup, inputs, and validation logic across multiple pages (Contact, Cta modal, AddProperty) — no shared Form components or validation strategy.
- Image handling: images loaded directly from `assets` and property images assumed present; no image optimization, no srcset, no lazy-loading attributes in many places.
- No route-based code splitting or lazy loading for heavy pages/components (e.g., Owner routes, Listing with Swiper).
- No i18n: all text is static (some Arabic planned), no `react-i18next` or similar present.
- Accessibility: forms and interactive elements lack ARIA roles/labels consistency; contrast and keyboard focus checks not validated.
- Performance: large bundle risk due to Swiper + many images + no React.lazy; no caching strategy (e.g., React Query) found.
- Error handling: many components assume data presence (`properties.map` or `user.properties`) without defensive checks.
- Tests: no tests or test setup detected.
- SEO & structured data: no JSON-LD or dynamic meta tags for property pages.

3) Concrete code issues spotted (مثاليات من الشفرة)
- `AppContext.jsx` sets `properties` from `dummyProperties` inside useEffect — no fetch abstraction and no error state.
- `Listproperty.jsx` uses `user.properties` directly — risk of undefined: `setProperties(user.properties)` without safe checks.
- Several imports use `.jsx` and others omit extension — works but inconsistent.
- Repeated CSS class strings across inputs/buttons — candidate for shared `Button`/`Input` components.
- `PropertyImages.jsx` always returns null when images length is 0 — okay, but no placeholder/EmptyState component used.

4) Recommended next actions (أولوية عالية → منخفضة)
High (immediate, 1–7 days):
- Create an audit report file (this file) and share for review. (done)
- Introduce a `src/components/ui/` folder and extract `Button`, `Input`, `FormField`, `Modal`, `Card`, `EmptyState` components.
- Refactor `AppContext` into smaller providers: `AuthProvider`, `PropertiesProvider`, `UIProvider`.
- Add defensive checks where data may be undefined (guard `user?.properties`, `properties?.map`).
- Add `react-query` or `swr` for data fetching and caching; replace dummyProperties with async fetch via `services/`.
- Add basic Route lazy-loading for heavy pages (React.lazy + Suspense).

Medium (1–3 weeks):
- Create a Design System: Tailwind tokens, color scale, spacing scale, typography scale; optionally Storybook.
- Add image optimization pipeline (Cloudinary/Imgix) and use `srcset`/`loading="lazy"`/WebP.
- Implement search & filters API contract and client-side hooks.
- Add basic i18n scaffold (`react-i18next`) and externalize strings.
- Add simple unit tests for core utils/components; add E2E smoke tests later.

Low (3–6 weeks):
- Map integration (Mapbox, clustering, server-side search endpoints).
- Advanced features (360 tours, payment flows, paid listings).
- Full A/B testing, personalization, analytics funnels via GA4/Amplitude.

5) Suggested folder structure (proposed minimal change)
src/
 ├── components/
 │   ├── ui/        # Button, Input, Modal, Form components
 │   ├── layout/    # Header, Footer, Navbar
 │   ├── property/  # Item, PropertyImages, FeaturedProperties
 │   └── owner/     # Sidebar and owner-specific components
 ├── pages/
 ├── features/      # feature folders: search/, listing/, property/
 ├── context/       # providers split
 ├── hooks/         # custom hooks (useProperties, useAuth, useSearch)
 ├── services/      # API services
 ├── assets/
 ├── styles/
 └── utils/

6) Suggested quick fixes (PR-sized tasks)
- Add safe access in `Listproperty.jsx`: `setProperties(user?.properties ?? [])` and guard `properties.map` with `properties?.length`.
- Replace direct `fetch` usage with a small wrapper to centralize error handling (create `lib/api.js`).
- Extract repeated className for inputs into a `baseInput` constant or `Input` component.
- Add `loading="lazy"` to `<img>` tags for lists and galleries.

7) Deliverables I can implement now (اختر ما تريد أبدأ به)
- Create this audit file in the repo (done).
- Open-sourceable PRs:
  - Safety guards + small bug fixes across 5 files.
  - Extract `Button` and `Input` components and replace usages in header/contact forms.
  - Implement `react-query` skeleton and replace `AppContext` properties loading.

8) Risks
- Without API backend, search and map features will be mocked.
- Clips of UI depend on many images in `assets` — sizes may be large causing slow local dev.

9) Next immediate step (اقتراح تنفيذي)
- I can create small PRs to: (A) add defensive guards across pages, (B) extract simple `Input` and `Button` in `src/components/ui/` and update a few components, and (C) add `loading="lazy"` to list images. Choose one and I start coding.


---

If you want، أبدأ الآن بعمل أحد البنرات التالية:
- "Fix guards" — أضيف إصلاحات صغيرة للبقاء الآمن في كل صفحات التي تستخدم `properties` و`user`.
- "UI primitives" — أستخرج `Button` و`Input` في `src/components/ui/` وأحدّث بعض الأماكن.
- "React Query skeleton" — أعدّل `AppContext` ليستخدم `react-query` لجلب الـ properties بدلاً من `dummyProperties`.

اختر: "Fix guards" أو "UI primitives" أو "React Query skeleton" أو أعطني توجيه خاص آخر.