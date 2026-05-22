دليل استخدام مشروع Nexora Estates

---

العربية

**عنوان:** دليل استخدام مشروع Nexora Estates

**مقدمة قصيرة:**
هذا المستند يشرح خطوات تشغيل المشروع محلياً، نشره، وإرشادات إدارة المحتوى الأساسية (عقارات، مالك، ومدونة) باللغتين العربية والإنجليزية.

1) المتطلبات الأساسية
- Node.js (النسخة 16+ موصى بها)
- npm أو pnpm

2) التثبيت وتشغيل محلي
- انسخ المستودع ثم نفّذ:

```bash
npm install
npm run dev
```

- الموقع سيعمل عادة على `http://localhost:5173` أو المنفذ المحدد.

3) إعداد المتغيرات والبيئة
- تحقق من إعدادات المشروع في `src/config/env.js` لتعديل متغيرات البيئة (نقاط النهاية، مفاتيح API، إعدادات البريد).
- لإضافة إعدادات نشر، عدّل ملفات البيئة في بيئة الخادم أو إعدادات استضافة الخدمة.

4) أوامر مفيدة
- تشغيل التطوير: `npm run dev`
- بناء للإنتاج: `npm run build`
- معاينة البناء: `npm run preview`

5) إضافة/تحديث عقار
- واجهة العرض (ملفات العرض والتكويد) توجد في مجلدات `src/pages` و`src/components/property`.
- بيانات العينات أو المحتوى الثابت قد تكون في `src/assets/data.js` أو `src/assets/blogs` للمحتوى المدعوم.
- لتحميل صور عقار جديدة، اتبع نفس بنية رفع الصور الموجودة في لوحة المالك أو استخدم مجلد الصور المخصص ضمن `public/` ثم حدّث مسارات الصور في السجل.

6) إدارة لوحة المالك
- صفحات وواجهات المالك في `src/pages/owner` و`src/components/owner`.
- لتمكين المالك من رفع صور وتعديل القوائم، تأكد من أن واجهة الرفع مُوصولة بنقطة النهاية الخلفية المناسبة أو الخدمة التخزينية.

7) المدونة والمحتوى
- المقالات المبدئية موجودة في `src/assets/blogs` بصيغة MDX.
- لإضافة مقالة جديدة، انسخ قالب ملف MDX وأضفها إلى المجلد، ثم حدّث أي فهرسة أو قائمة منشورات إن وُجدت.

8) تعدد اللغات (EN/AR)
- النصوص الثابتة قد تكون داخل المكونات أو ملفات المحتوى. لتعديل الترجمات، ابحث عن النصوص في `src/components` و`src/pages` وغيّر النصوص المناسبة.
- إن كان المشروع يستخدم مكتبة i18n، راجع ملفات اللغة المخصصة (قد توجد تحت `src/i18n` أو ملفات مشابهة).

9) النشر
- استخدم مزود الاستضافة المفضل لديك (Vercel، Netlify، أو خادم VPS) مع إعدادات البناء التالية:

```bash
npm run build
# ثم اتبع تعليمات مزود الاستضافة لنشر مجلد البناء
```

10) الدعم والصيانة
- لصيانة سريعة: افحص سجلات الأخطاء في المتصفح وConsole الخادم. تأكد من مراقبة أداء الصور وCache.
- لأي تغييرات كبيرة في النطاق، احرص على توثيق تغييرات واجهات API وإبلاغ فريق التطوير.

---

English

**Title:** Nexora Estates — User Guide

**Quick intro:**
This guide explains how to run the project locally, deploy it, and manage core content (properties, owner dashboard and blog).

1) Prerequisites
- Node.js (v16+ recommended)
- npm or pnpm

2) Install & run locally

```bash
npm install
npm run dev
```

- Site runs on `http://localhost:5173` by default (or configured port).

3) Environment & configuration
- Check `src/config/env.js` to update environment variables (API endpoints, mail settings, keys).
- Add environment variables in your hosting provider settings for production.

4) Useful scripts
- Dev: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

5) Adding/updating a property
- Frontend files for listings and detail pages live in `src/pages` and `src/components/property`.
- Sample/static data may be in `src/assets/data.js` or similar.
- For images, follow the owner upload flow or place images under `public/` and update image paths.

6) Owner dashboard management
- Owner pages/components: `src/pages/owner` and `src/components/owner`.
- Ensure upload endpoints are connected to backend/storage for persistent image uploads.

7) Blog & content
- Blog posts are in `src/assets/blogs` as MDX files.
- Add a new MDX file and update any post index if needed.

8) Bilingual content (EN/AR)
- Static strings are in components/pages. Edit text in `src/components` and `src/pages`.
- If i18n is used, check for a `src/i18n` folder or language files.

9) Deployment

```bash
npm run build
# Follow hosting provider steps to serve the production build
```

10) Support & maintenance
- Inspect browser console and server logs for errors. Monitor images and caching.
- Document API changes and inform the dev team for major scope adjustments.

---

إذا بدك، أقدر أحول هذا الملف إلى PDF أو مستند Word وأضيفه في المجلد `docs/`.