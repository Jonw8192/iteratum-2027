# Iteratum Phase 1 — Contact Page CTO Review

Date: 2026-10-01
Scope: `/contact/` plus integration with the existing Phase 1 homepage, Opening Risk Review, and Opening-Day Technology Scorecard.

## Release decision

**Ready for staging / production from a site-code perspective.**

The contact experience is intentionally calendar-led rather than pretending a web form is wired to a backend that has not been provided. The page qualifies the conversation, tells a prospect what to bring, identifies who is and is not a fit, and routes them into the existing Cal.com booking flow.

Before public release, confirm that the production Cal.com URL, LinkedIn company URL, privacy URL, and terms URL are the intended live destinations.

## What changed

- Added `/contact/index.html` with dedicated SEO metadata, canonical URL, Open Graph/Twitter metadata, and `ContactPage` JSON-LD.
- Added Contact to the global navigation/footer of the homepage, Risk Review, and Scorecard pages.
- Changed the global header CTA on those three pages to route through `/contact/`; high-intent CTAs inside page content still link directly to Cal.com.
- Added `/contact/` to `sitemap.xml` with the current last-modified date.
- Extended the existing shared stylesheet instead of introducing a page-specific CSS file.
- Kept the page to five sections after the visual/content review to avoid a long, repetitive contact experience.

## Contact page information architecture

1. **Hero** — tells the visitor exactly what the conversation is for.
2. **What to bring** — opening date, current footprint, planned openings, known risks.
3. **Best fit / not the right fit** — qualifies prospects without forcing a form.
4. **Two starting paths** — schedule a conversation or self-assess with the Scorecard.
5. **Final CTA** — schedule or review the commercial offer.

This keeps `/contact/` distinct from the homepage and Risk Review page. It does not re-sell the entire business.

## Technical checks completed

- Local static site launched with an HTTP server.
- HTTP 200 confirmed for:
  - `/`
  - `/opening-risk-review/`
  - `/resources/opening-day-technology-scorecard/`
  - `/contact/`
  - shared CSS
  - shared JavaScript
  - logo asset
  - `robots.txt`
  - `sitemap.xml`
- All four HTML pages contain exactly one H1.
- JSON-LD parses successfully on all pages.
- Internal asset and page references resolve locally; no missing relative paths were found.
- `site.js` passes `node --check` syntax validation.
- The contact page uses the existing responsive navigation and the same 860px/620px breakpoint system as the reviewed Phase 1 site.
- No inline event handlers or page-specific JavaScript were added.

## Visual / UX review and fixes

### 1. Contact page was initially too long

The first composition repeated the same idea in separate “good first conversation” and “what to expect” sections. Those sections were removed. The final page is substantially tighter and better suited to a high-intent visitor.

### 2. Do not fake a form submission

A conventional contact form would require a real server, CRM endpoint, or form service. None was supplied. Shipping a form with a fake success state or dead action would be a production defect and undermine trust.

The current implementation uses the already-established Cal.com booking path and clearly tells the user which qualifying details to have ready. This is also consistent with the Phase 1 strategy of keeping the funnel small.

If a real contact form is desired later, connect it to an approved endpoint first, then add server-side spam protection, validation, success/error handling, privacy disclosure, and analytics events.

### 3. Contact should be discoverable without replacing strong conversion links

The global header CTA now leads to `/contact/`, which gives the visitor context and qualification. High-intent CTAs on the Risk Review and Scorecard can still go directly to scheduling, avoiding unnecessary friction for visitors who are already convinced.

### 4. Shared CSS retained

The page uses the existing premium professional-services system: `page-hero`, `section`, `case-file`, `grid`, `btn`, dark/light surfaces, shared footer, shared navigation, and shared reveal behavior. Only a small contact-page extension was added for the four-item preparation list and the two starting-path panels.

### 5. Accessibility

- Skip link retained.
- One semantic H1.
- Navigation has an accessible label and controlled mobile-menu state.
- External scheduling links use `rel="noopener"`.
- CTAs are real links and remain usable without JavaScript.
- Contact information is presented as HTML text rather than only in graphics.
- Existing reduced-motion behavior is inherited from the shared stylesheet.

## SEO / machine readability

- Unique title and meta description.
- Canonical: `https://iteratum.com/contact/`.
- Open Graph and Twitter metadata use the existing Iteratum social image.
- `ContactPage` structured data is linked to the existing Iteratum organization entity.
- The copy explicitly states the commercial context: upcoming location opening, technology readiness, Opening Risk Review, location count, planned openings, vendors, and known risks.
- The page is included in the sitemap and linked from the other Phase 1 pages.

## Operational recommendation

Keep the Phase 1 public site at these four core routes:

- `/`
- `/opening-risk-review/`
- `/resources/opening-day-technology-scorecard/`
- `/contact/`

Do not add a generic contact-form backend simply because most websites have one. The current scheduling flow is simpler and more reliable for the current sales motion.

## Production confirmations still owned by the business

These are external destinations, not code defects:

- Verify `https://cal.com/jonwoods` is the desired public booking page.
- Verify `https://linkedin.com/company/iteratum` is correct.
- Verify `https://iteratum.com/privacy.html` exists and contains the desired policy.
- Verify `https://iteratum.com/terms.html` exists and contains the desired terms.
- Confirm Simple Analytics should remain enabled on all public pages.

No unsupported client metrics, invented staff, fabricated case studies, or fake form-success behavior were added.
