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
- Motion language: one coordinated entrance, one optional discovery reveal,
  and one disclosure-feedback primitive. Motion clarifies hierarchy and state;
  it is never a substitute for either.

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
- Keep one canonical header action bar. At 75rem and wider it belongs in the
  masthead; below 75rem move that same DOM node into the drawer before the
  primary menu in Search, Quick actions, Give order. Never clone the search
  form or create duplicate IDs and tab stops.
- `header_social_links_block` may select one published, reusable `social_links`
  content block by UUID. Render it through Drupal's entity view builder after
  translation and access checks; never copy social destinations or icon assets
  into theme configuration.
- On desktop, place the selected Social Links block at the trailing edge of the
  University bar. Below the 75rem navigation breakpoint, place it in the open
  primary-navigation drawer. Keep the inactive copy hidden from display and
  the accessibility tree.
- When a theme-selected Social Links block is available, suppress the legacy
  `header_tertiary` drawer fallback so the same destinations are not repeated.
- Preserve formatter-provided accessible link names and masks. Each icon link
  keeps a 44-by-44 CSS-pixel target, a visible focus indicator, and a 24-pixel
  mark. The landmark label is `Social media`.
- Missing, unpublished, non-reusable, inaccessible, wrong-bundle, or malformed
  selections fail closed without an empty landmark.
- Offset the sticky header with `--drupal-displace-offset-top` when Drupal’s
  administrative toolbar is present.
- At mobile widths, the closed drawer is `inert` and absent from the assistive
  technology reading order. The toggle exposes `aria-controls` and truthful
  `aria-expanded` state.
- The narrow drawer is an anchored overlay with its own bounded vertical
  scrolling. Opening and closing it must preserve the document scroll position
  and sticky-header position; never toggle body overflow to manage the drawer.

### Primary navigation

- Use native buttons for items that disclose submenus. Do not apply ARIA menu
  or menubar semantics to ordinary site navigation.
- Only the disclosure button owns `aria-expanded`; its panel is labelled by the
  button and uses the native `hidden` state when closed.
- `Tab` and `Shift+Tab` follow document order. Forward Tab on a closed top-level
  disclosure opens it before focus advances into the first destination.
- Reverse traversal is symmetric: Shift+Tab from a top-level disclosure opens
  the preceding disclosure and focuses its final destination. A preceding
  direct top-level link keeps the browser's native focus order.
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
- Opening the command palette from the mobile action group must leave the
  drawer state intact and return focus to the invoking element without scroll.
- Keep the palette explicitly centered and usable at 320 CSS pixels.

### Motion and animation

- Expose motion through Drupal’s native `Appearance → Settings → Moody 26`
  form. `motion_gsap_enabled` controls coordinated page sequences and
  `motion_anime_enabled` controls disclosure feedback. Keep both settings in
  install defaults and configuration schema.
- Treat an absent motion setting as enabled so an in-place theme update does
  not silently change an existing site. The administrator’s saved boolean is
  authoritative after that. When both settings are disabled, do not attach the
  optional motion library.
- Keep the visual-options form native to Drupal Form API and the active admin
  theme. Use semantic details, fieldsets, checkboxes, and plain descriptions;
  do not add motion, a custom control framework, or a second save path to the
  administration interface. Prefer stacked details over vertical tabs because
  the current fleet administration stack must reflow cleanly at 320 CSS pixels.
  Theme-owned settings CSS may only expand target size or repair a demonstrated
  host-theme defect; the active admin theme continues to own colors, focus,
  validation, loading, disabled, and success states.
- GSAP owns coordinated sequences only: the first-view header entrance and at
  most one discovery-group reveal per page. Anime.js owns short disclosure
  feedback only: submenu destinations and the first command-palette result
  set. Do not give both libraries responsibility for the same interaction.
- Use Anime.js’s tree-shaken WAAPI implementation. Do not add its full UMD
  bundle. Use GSAP core only; ScrollTrigger, ScrollSmoother, SplitText, text
  scrambling, physics, draggable, morphing, and premium plugins require a new,
  documented content need and accessibility review.
- Reuse a compatible page-provided `window.gsap` when available. Otherwise
  lazily load Moody26’s local GSAP fallback. Never load two GSAP runtimes and
  never load either motion library from a CDN.
- Motion is progressive enhancement. Navigation, dialogs, links, content,
  focus, and state changes must remain complete when JavaScript, Anime.js, or
  GSAP fails. Never hide readable content in the base CSS while waiting for an
  animation runtime.
- Animate only `transform` and `opacity`. Cap spatial travel at
  `--motion-distance`, individual duration at `--dur-long`, a sequence at
  500ms, and a page at three distinct motion primitives. Use one-shot effects;
  do not reanimate content during ordinary scrolling.
- Honor `prefers-reduced-motion: reduce` in both CSS and JavaScript. In reduced
  mode, skip spatial animation entirely and render the final state immediately.
  Also skip optional motion when the browser reports Save-Data.
- Adopt WCAG 2.3.3 as a Moody26 design requirement even though it is Level AAA:
  interaction-triggered motion must be suppressible through the user’s reduced
  motion preference unless it is essential. No Moody26 motion is essential.
- Do not ship parallax, smooth scrolling, scroll scrubbing, cursor followers,
  animated focus rings, auto-rotating carousels, animated approved marks,
  flashing, bouncing, elastic overshoot, or infinite decorative motion.
- Automatic motion must finish well inside five seconds. Anything that moves,
  blinks, scrolls, or auto-updates for longer requires a nearby persistent
  pause, stop, or hide control. Content must never flash more than three times
  in one second.
- Keyboard state changes and focus restoration happen before any visual
  feedback. A motion timeline must never delay focus, alter DOM order, change
  accessible names, add live-region chatter, or make a control unavailable.
- Drupal behaviors attach with `once()`. Observers, media-query contexts, and
  animation instances must be scoped and reversible so AJAX and Layout Builder
  do not create duplicate listeners or stale inline transforms.

### People directories

- Treat the shared `faculty_bio_view` as the reference people-directory
  implementation, not as a one-page CSS exception. Future directory Views add
  targeted template suggestions and reuse the `people-directory__*` component
  vocabulary.
- Keep View configuration, filters, sort order, profile content, and image
  ownership in the consuming Drupal site. The theme owns presentation and
  semantic markup only.
- Render results as a real labelled list whose entries are articles. Each
  person name is an `h2`, and each entry has one clear profile link containing
  the portrait, name, position, and department.
- Treat a linked directory portrait as decorative because the visible person
  name provides the link purpose. Preserve editor-authored alternatives on the
  full profile and other contexts where the image carries content.
- Use Drupal image styles with intrinsic dimensions and lazy loading. Missing
  portraits render a content-derived initial tile and must not remove the name,
  destination, or grid rhythm.
- Keep exposed-filter labels visible, controls equal in height, and the action
  reachable at 320 CSS pixels. Filtered results include a translated honest
  count and a useful empty state.
- Use one compact media-object column on narrow screens, then two, three, and
  four safe `minmax(0, 1fr)` tracks as the component container grows. Do not
  rely on Bootstrap grid classes supplied by legacy View configuration.
- The Active/Emeritus switcher is a labelled navigation landmark and identifies
  its exact-path destination with `aria-current="page"`.
- Profile hover styling is capability-gated and has a keyboard focus
  equivalent. Keep the card flat with a hairline rule; do not add repeated
  rounded containers, image zoom, or decorative scroll animation.

### Resource hubs

- Treat Moody Focus Areas, UTDK Promo Units, Moody Showcase, Moody Hero, and
  Moody Contact Info as a shared resource-hub vocabulary, not a Students-page
  CSS exception. Keep block content, placement, destinations, and media under
  Layout Builder and editor control.
- Render Focus Areas as a semantic list. Each linked item has one accessible
  name from its visible heading; remove duplicate visually hidden labels and
  hide the supporting icon from the accessibility tree.
- Render Promo Unit groups as semantic lists of resource entries. Keep each
  descriptive destination discrete and keyboard reachable; supporting index
  photography is decorative because the headings and links carry the task.
- Failed Focus Area or Promo Unit media collapses without a broken-image glyph,
  empty grid track, missing heading, or lost destination.
- Use one compact column on narrow screens, two safe tracks when the component
  allows, and asymmetric 12-track layouts at wide container sizes. Do not rely
  on legacy Bootstrap or base-theme layout CSS.
- Keep content links at least 44 CSS pixels high with immediate focus. Hover
  feedback is capability-gated and has a visible keyboard equivalent.
- Mini-navigation targets clear the sticky Moody26 header and Drupal’s
  optional displaced toolbar. Never allow an anchored component to land fully
  behind sticky chrome.
- Contact Info is a neutral editorial service band. Burnt orange remains a
  rule and focus signal; never restore the legacy full-width orange panel.
- A landing node referenced by the `Students` directory-structure term may use
  `moody26-directory-students` for its lead composition. Never use a node ID,
  block UUID, or authored headline as the styling contract.

### Newsroom components

- Treat the `news_filtered` View’s `block_filtered` display as the reference
  latest-stories implementation. Future news indexes add targeted template suggestions and
  reuse the `news-index__*` and `news-teaser__*` vocabulary.
- Keep story selection, sort order, dates, topics, summaries, images, and
  Layout Builder placement in the consuming site. The theme owns semantic
  teaser markup and presentation, not editorial content or View configuration.
- Render the latest-stories index as a labelled list of article entries. Each
  story title is an `h2`; the publication value is a real `time` element; and
  the title, summary, and teaser image share one clear story destination.
- Keep topic links outside the story link and give them 44-pixel targets. A
  teaser image is decorative inside the already-labelled story destination;
  preserve its authored alternative in Drupal for full-story contexts.
- Failed teaser or Showcase media must collapse without a broken-image glyph,
  invented placeholder art, missing title, lost destination, or grid gap.
- Media Mentions use the descriptive headline as the sole external
  destination. Hide the redundant generic `Read More` link from visual and
  accessibility trees rather than adding a second tab stop to the same URL.
- A landing node referenced by the `News` directory-structure term receives a
  portable `moody26-directory-news` class. Never scope the composition to a
  node ID, block UUID, or editor-authored headline.
- Normalize a nested authored `h1` in the News lead to `h2`; the page-title
  block remains the sole document `h1`. Do not change the author’s wording.
- Use one column on narrow screens, two safe tracks when the component allows,
  and an asymmetric 12-track ledger at wide container sizes. Keep cards flat,
  motion static by default, hover capability-gated, and focus immediate.

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
- Do not apply a body scroll lock for the mobile drawer; contain scrolling in
  the anchored navigation overlay.
- Never use `width: 100vw`, forced `100vh` panels, or device-sniffing layout.
- Image-bearing grids use `minmax(0, 1fr)` tracks.
- Headings use `overflow-wrap: anywhere` and remain within their container.
- Primary controls, navigation labels, breadcrumbs, tabs, and CTA labels stay
  on one line. Reflow the parent or collapse navigation before labels wrap.
- Hover rules live inside `(hover: hover) and (pointer: fine)` queries.
- Motion communicates change, uses property-specific transitions, and has a
  truthful `prefers-reduced-motion` path.
- Optional scripted motion also respects Save-Data, never starts below 40rem
  for scroll-triggered reveals, and cannot affect document or focus order.
- Every interactive component accounts for default, hover, focus, active,
  disabled, loading, error, and success where those states can occur.

## Architecture

- `moody26.info.yml`: standalone metadata, stable regions, and global library.
- `moody26.theme`: page variables, branding metadata, and search-form
  integration.
- `theme-settings.php` and `config/`: portable Give, parent-unit, and reusable
  Social Links block settings. They also own the independently configurable
  GSAP and Anime.js motion switches and their upgrade-safe defaults.
- `logo.svg`: approved default Moody CSU artwork.
- `fonts/`, `LICENSES/`, `css/fonts.css`: locally hosted approved digital fonts
  and their license.
- `tokens.css`: locked design-system values and exact UT color equivalents.
- `css/moody26.css`: foundation, shell, controls, navigation, Drupal content
  compatibility, and footer.
- `css/components/quick-actions.css`: complete command-palette treatment and
  eight-state preview support.
- `css/components/header-social.css`: responsive placement, targets, icon
  scale, and interaction states for formatter-owned Social Links output.
- `css/components/theme-settings.css`: narrowly scoped 44-pixel target support
  for the native Drupal visual-options form.
- `css/components/landing-hero.css`: Split Studio photographic and ambient
  media leads.
- `css/components/editorial-sections.css`: shared editorial pairings, proof,
  CTA, and form treatments for Layout Builder output.
- `css/components/discovery-index.css`: irregular grids for news, programs,
  people, Focus Areas, Promo Units, and other discovery surfaces.
- `css/components/people-directory.css`: responsive filters, semantic people
  indexes, linked profile treatments, current-directory state, and empty-state
  presentation.
- `css/components/newsroom.css`: semantic news ledgers, source mentions,
  directory-aware landing composition, resilient media, and shared newsroom
  support components.
- `templates/`: theme-owned document, page, shell, block, menu, shared
  component, and targeted View markup.
- `js/navigation.js`: the sole drawer and disclosure state owner.
- `js/quick-actions.js`: dependency-free command discovery and native-dialog
  behavior.
- `js/accessibility.js`: narrow, progressive safeguards for rendered content
  modules; it must not repair a base theme.
- `js/motion.js`: source for the narrow GSAP/Anime.js progressive-enhancement
  layer; it owns no functional UI state.
- `js/dist/motion.min.js`: committed, tree-shaken Anime.js WAAPI integration.
- `js/vendor/gsap.min.js`: committed local GSAP core fallback, loaded only when
  a compatible global is absent.
- `scripts/build.mjs`: deterministic motion build and GSAP fallback sync.
- `scripts/verify.mjs`: self-contained architecture, brand, accessibility, and
  Hallmark guardrails.
- `.hallmark/`: design preflight and diversification memory.

Prefer native HTML, CSS, JavaScript, Drupal behaviors, and core render
structures. The approved build exception is esbuild for the narrow Anime.js
integration and deterministic GSAP fallback. Do not add Sass, a component
framework, icon set, utility-CSS framework, another motion library, or another
build layer without a demonstrated requirement the platform cannot meet.

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
For motion changes, test both `reducedMotion: reduce` and `no-preference`, verify
that a failed motion bundle leaves all content visible, and confirm no optional
animation survives a live preference change. Also test all four setting
combinations: both enabled, GSAP only, Anime.js only, and both disabled. The
last combination must omit the motion asset while navigation and Quick actions
remain operable.
