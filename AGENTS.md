# Moody26 Theme Agent Guide

## Purpose and ownership

Moody26 is the standalone, accessible Drupal theme for sites under the Moody
College umbrella. Its deliberate audience includes prospective and current
students, faculty, staff, families, alumni, industry partners, and visitors.
Different units may emphasize film, journalism, advertising, communication
studies, speech and hearing, research, events, or public service, but they must
share one UT/Moody interaction language.

This directory is the complete portable package intended for
`moody-college/moody26`. Its Drupal declaration is `base theme: false`.
Moody26 must not require the legacy `moody` theme, Speedway, a consumer-site
file, or a CDN at runtime. It may style markup produced by UT Drupal Kit content
modules, but it owns every critical shell, asset, and interaction needed to
render a usable site.

## Design contract

- Hallmark macrostructure: Ecosystem Index.
- Landing composition: Split Studio. Pair content-owned media with editorial
  copy, then use an irregular discovery index, proof strip, or quote room only
  when the content supports it. Do not force every page into one sequence.
- Genre and tone: playful editorial with academic restraint.
- Theme axes: light paper / roman-serif display / warm accent.
- Navigation archetype: N11 Mega-menu, implemented as a two-level disclosure
  pattern owned entirely by Moody26.
- Footer archetype: Ft1 Mast-headed.
- Enrichment: real, content-owned photography and media. Never ship invented
  stock images, decorative AI imagery, fabricated metrics, or fake proof.

`tokens.css` is the source of truth for every color, font, spacing, type,
motion, rule, radius, target, container, shadow, and z-index value. Component
CSS consumes named tokens. Raw hex, RGB, HSL, OKLCH, and font-family values do
not belong outside the token and font declaration files.

## Shell and interaction requirements

### University bar and identity

- Preserve the University bar and a clear link to UT Austin.
- The optional parent-unit link is desktop-only, 14px, title case, white, and
  set in Charis SIL. It must align with the content edge and be vertically
  centered.
- Identify the parent organization on every site.
- Use only approved, unaltered University or CSU artwork. Never typeset a
  substitute wordmark, recolor the artwork, stretch it, or change its internal
  spacing.
- The bundled `logo.svg` is the approved Moody CSU mark used as the default
  branding-block fallback. A site-specific approved mark may replace it through
  Drupal’s standard logo setting.

### Header shell

- Keep one limestone masthead above one continuous charcoal navigation rail.
- Center the approved mark’s rendered box vertically with the masthead actions.
- Keep search compact with a visually hidden, accurate label; search is not a
  required field.
- Keep the visible Quick actions button and optional Give link aligned to the
  same control height.
- Offset the sticky header with `--drupal-displace-offset-top` when Drupal’s
  administrative toolbar is present.
- At mobile widths, the closed drawer is `inert` and absent from the assistive
  technology reading order. The toggle exposes `aria-controls` and truthful
  `aria-expanded` state.

### Primary navigation

- Use native buttons for items that disclose submenus. Do not apply ARIA menu
  or menubar semantics to ordinary site navigation.
- Only the disclosure button owns `aria-expanded`; its panel is labelled by the
  button and uses the native `hidden` state when closed.
- `Tab` and `Shift+Tab` follow document order. Forward Tab on a closed top-level
  disclosure opens it before focus advances into the first destination.
- `Enter` and `Space` toggle the disclosure. `Escape` closes the current layer
  and restores focus to its trigger. Leaving the complete menu item closes its
  submenu without trapping focus.
- Pointer hover may open a desktop submenu only when the device reports fine
  pointer and hover capability. Keyboard and touch never depend on hover.
- Mega-menu rows use symmetric inline padding and content-sized flex items that
  center sparse final rows. Labels remain one line; the layout changes before
  labels wrap or create horizontal overflow.
- Preserve Safari’s standard Option+Tab link-navigation path when full webpage
  keyboard navigation is disabled.

### Quick actions

- Expose `Command+K` and `Control+K` with truthful `aria-keyshortcuts`.
- Use native `<dialog>`, combobox, listbox, option, live-result, arrow-key,
  Enter, Escape, backdrop-dismiss, and focus-return behavior.
- Generate actions from the rendered Drupal menu, branding link, Give link,
  and search form. Never maintain a second destination registry.
- Never intercept the shortcut from an input, textarea, select, or
  contenteditable editor, including CKEditor.
- Keep the palette explicitly centered and usable at 320 CSS pixels.

### Footer

- Render real site identity and navigation before the legal row.
- Always provide UT Austin Home, Emergency Information, Site Policies, Digital
  Accessibility Policy, and Web Privacy Policy. If a consuming site places the
  UT required-links block in `footer_right`, do not duplicate those links.
- Supply the copyright year dynamically in PHP.
- Keep every link keyboard reachable with a visible focus state and a usable
  touch target.

## University requirements

Re-check these official sources before every release because University and
legal requirements can change:

- https://umac.utexas.edu/brand-center/visual-identity/website-guidelines/
- https://compliance.utexas.edu/programs/iaa/digital-accessibility/digital-accessibility-policy-and-procedures
- https://umac.utexas.edu/brand-center/university-csu-wordmarks/
- https://umac.utexas.edu/brand-center/colors/
- https://umac.utexas.edu/brand-center/typography/

The non-negotiable floor is WCAG 2.1 Level AA and the standards incorporated by
UT Austin’s Digital Accessibility Policy, including applicable Section 508 and
Texas requirements. The current University compliance date is March 1, 2026.

### Brand

- Official burnt orange is exactly `#bf5700` or its exact color-space
  equivalent. Never create burnt-orange tints.
- Burnt orange is the primary brand signal, not an indiscriminate large
  surface. Secondary colors are sparse, intentional, and never compete with
  it. Avoid red or purple beside burnt orange.
- Charis SIL fills the approved digital serif role; Libre Franklin fills the
  approved digital sans-serif role. Georgia and Arial are fallbacks, not new
  brand voices. Do not condense, expand, or synthesize missing font styles.
- The theme bundles the required font files locally under the SIL Open Font
  License. Keep the OFL text with the binaries.

### Accessibility

- Test semantics, keyboard-only operation, visible focus, 200% zoom, reflow,
  screen-reader names, color contrast, reduced motion, touch targets, forms,
  error recovery, and non-color state cues.
- Every touch-reachable control is at least 44 by 44 CSS pixels.
- Focus is immediate, 2px or stronger, offset from the control, and at least
  3:1 against adjacent surfaces. Never remove the browser outline without an
  equivalent `:focus-visible` treatment.
- Form labels are visible unless a compact, familiar search control has an
  accurate visually hidden label. Placeholders are examples, never labels.
- Borders keep the same width across default, hover, focus, error, disabled,
  loading, and success states. State is never communicated by color alone.
- Use descriptive links and useful image alternatives. Decorative images use
  empty alternative text.
- Video captions are synchronized and accurate. Audio-only content has a
  complete transcript. Essential visual information has audio description or
  an equivalent text treatment.
- Automated checks are required but do not replace manual keyboard and
  assistive-technology review.

### Content and browser support

- Organize navigation and content around audience tasks and knowledge, not the
  University’s organization chart. If the audience is unknown, target roughly
  an eighth-grade reading level.
- Empower Drupal content owners. Layout Builder and CKEditor must remain
  understandable and maintainable.
- Support the latest release minus two major versions of Chrome, Firefox, and
  Safari on desktop and mobile. Give extra attention to contact, event, search,
  and other high-mobile-use paths.
- Images need useful `alt`, intrinsic dimensions, and responsive delivery. The
  LCP image is not lazy-loaded.

## Responsive and state contract

- Build mobile-first and verify 320, 375, 414, and 768 CSS-pixel widths.
- `html` and `body` use `overflow-x: clip`, never `hidden` as an overflow fix.
- Never use `width: 100vw`, forced `100vh` panels, or device-sniffing layout.
- Image-bearing grids use `minmax(0, 1fr)` tracks.
- Headings use `overflow-wrap: anywhere` and remain within their container.
- Primary controls, navigation labels, breadcrumbs, tabs, and CTA labels stay
  on one line. Reflow the parent or collapse navigation before labels wrap.
- Hover rules live inside `(hover: hover) and (pointer: fine)` queries.
- Motion communicates change, uses property-specific transitions, and has a
  truthful `prefers-reduced-motion` path.
- Every interactive component accounts for default, hover, focus, active,
  disabled, loading, error, and success where those states can occur.

## Architecture

- `moody26.info.yml`: standalone metadata, stable regions, and global library.
- `moody26.theme`: page variables, branding metadata, and search-form
  integration.
- `theme-settings.php` and `config/`: portable Give and parent-unit settings.
- `logo.svg`: approved default Moody CSU artwork.
- `fonts/`, `LICENSES/`, `css/fonts.css`: locally hosted approved digital fonts
  and their license.
- `tokens.css`: locked design-system values and exact UT color equivalents.
- `css/moody26.css`: foundation, shell, controls, navigation, Drupal content
  compatibility, and footer.
- `css/components/quick-actions.css`: complete command-palette treatment and
  eight-state preview support.
- `css/components/landing-hero.css`: Split Studio photographic and ambient
  media leads.
- `css/components/editorial-sections.css`: shared editorial pairings, proof,
  CTA, and form treatments for Layout Builder output.
- `css/components/discovery-index.css`: irregular grids for news, programs,
  people, and other discovery surfaces.
- `templates/`: theme-owned document, page, shell, block, and menu markup.
- `js/navigation.js`: the sole drawer and disclosure state owner.
- `js/quick-actions.js`: dependency-free command discovery and native-dialog
  behavior.
- `js/accessibility.js`: narrow, progressive safeguards for rendered content
  modules; it must not repair a base theme.
- `scripts/verify.mjs`: self-contained architecture, brand, accessibility, and
  Hallmark guardrails.
- `.hallmark/`: design preflight and diversification memory.

Prefer native HTML, CSS, JavaScript, Drupal behaviors, and core render
structures. Do not add a bundler, Sass layer, component framework, icon set,
utility-CSS framework, or motion library without a demonstrated requirement the
platform cannot meet.

## Change and validation workflow

Run the smallest relevant checks while iterating:

```sh
npm run check --prefix web/themes/custom/moody26
ddev drush theme:enable moody26 -y
ddev drush cr
BASE_URL=https://moody-core.ddev.site:33001 npx playwright test tests/moody26.spec.js
```

For a release candidate, also run the visual route matrix and opt-in browser
matrix from Moody Core:

```sh
BASE_URL=https://moody-core.ddev.site:33001 npm run test:moody26
BROWSER_MATRIX=1 BASE_URL=https://moody-core.ddev.site:33001 npx playwright test tests/moody26.spec.js
```

Use Moody Core only as an integration fixture; the theme verifier must pass in
a standalone clone. Since the current integration environment is
pre-production, it may be re-enabled or temporarily switched during metadata
changes. Do not export broad configuration from a stale database.

Before production, inspect every changed visual baseline, manually test
keyboard and screen-reader paths, zoom/reflow, reduced motion and color vision,
then request an Acquia Optimize scan or Digital Accessibility Center review.
