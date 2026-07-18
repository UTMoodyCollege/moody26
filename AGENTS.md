# Moody26 Theme Agent Guide

## Purpose and ownership

Moody26 is an accessible, youth-aware, editorial Drupal theme for all sites
under the Moody College umbrella. Its audience deliberately includes
prospective and current students, faculty, staff, families, alumni, industry
partners, and visitors. Different units may emphasize film, journalism,
advertising, communication studies, speech and hearing, research, or events,
but they must share one UT/Moody interaction language.

This directory is tracked in `moody-core` while the theme is incubated. It is
designed to become the root of a standalone `moody-college/moody26` Composer
project. Keep it self-contained and never import files from the consumer site.
The current base theme is `moody` for template and content-model compatibility;
do not edit the Composer-installed parent theme from here.

## Design contract

- Hallmark macrostructure: Ecosystem Index.
- Landing-page composition: Split Studio. The homepage and primary menu
  destinations pair content-owned media with editorial copy, then use an
  irregular discovery index, proof strip, or quote room as the content
  requires. Do not force every page into the same sequence.
- Genre and tone: playful editorial, with academic restraint.
- Navigation archetype: N11 Mega-menu, implemented through the parent's
  accessible nested menu behavior rather than a second JavaScript menu system.
- Header shell: one limestone masthead over one full-bleed charcoal menu rail.
  Keep the approved Moody wordmark visually primary, keep sitewide search
  compact with a visually hidden and accurate label, and never mark it as
  required. Center the approved wordmark's rendered box vertically within the
  masthead and align it with the search/actions row without translating,
  redrawing, or altering the asset. When Drupal's administrative toolbar is
  present, offset the sticky header with `--drupal-displace-offset-top` and keep
  contextual controls clear of the wordmark.
- Expanded primary navigation: keep the charcoal rail visually continuous.
  Signal disclosure with the existing chevron rotation and a restrained burnt-
  orange rule, not a second full-block surface. Mega-menu panels use symmetric
  inline padding and content-sized flex rows that center sparse final rows,
  reduce their column count as space tightens, and keep destination labels on
  one line without horizontal overflow. Native `Tab` and `Shift+Tab` follow
  document order from each top-level button through its destinations and on to
  the next top-level button. `Enter` and `Space` toggle a disclosure; leaving
  its complete menu item closes it without trapping focus; `Escape` closes it
  and returns focus to its trigger. Preserve this contract on desktop and in
  the mobile drawer. Safari must also preserve its standard `Option+Tab` link-
  navigation path when full webpage keyboard navigation is disabled.
- Quick actions: expose one visible header button and the truthful `Cmd+K` or
  `Ctrl+K` shortcut for a native `<dialog>` command palette. Build its actions
  from the rendered Drupal primary menu, branding link, Give link, and search
  form; never maintain a second destination registry. Preserve combobox,
  listbox, live-result, arrow-key, Enter, Escape, backdrop-dismiss, and
  focus-return behavior. Never intercept the shortcut from an input, textarea,
  select, or contenteditable editor, including CKEditor.
- Footer archetype: Ft1 Mast-headed, preserving the required UT links and
  dynamic copyright supplied by UTDK.
- Theme axes: light paper / roman-serif display / warm accent.
- Enrichment: content-owned photography or media only. The theme must not ship
  invented stock images, decorative AI imagery, or fabricated proof.

`tokens.css` is the source of truth for every color, font, spacing, type,
motion, rule, radius, target, container, and z-index value. CSS declarations in
`css/moody26.css` must consume tokens; do not improvise hex, rgb, hsl, OKLCH, or
font-family values outside the token file.

## University requirements

Re-check these official sources before a release:

- https://umac.utexas.edu/brand-center/visual-identity/website-guidelines/
- https://compliance.utexas.edu/programs/iaa/digital-accessibility/digital-accessibility-policy-and-procedures
- https://umac.utexas.edu/brand-center/university-csu-wordmarks/
- https://umac.utexas.edu/brand-center/colors/
- https://umac.utexas.edu/brand-center/typography/

The non-negotiable floor is WCAG 2.1 AA and current UT policy. Preserve the UT
brand bar, approved unaltered marks, parent identification, the exact burnt
orange `#bf5700` equivalent, approved Charis SIL/Libre Franklin roles, required
footer links for UT Austin Home, Emergency Information, Site Policies, Digital
Accessibility Policy, and Web Privacy Policy, plus a dynamic copyright year.
Burnt orange is a signal, not a large surface; do not tint it. Secondary colors
are sparse and intentional.

All interactions need keyboard and touch parity, visible instant focus,
44-by-44 CSS-pixel targets, non-color state cues, reduced-motion behavior, and
useful accessible names. Forms retain visible labels, stable borders, helpful
errors, and semantic disabled/loading/error/success states. Headings are roman,
ordered, and never all-caps paragraphs. Links describe their destination.

Support current and previous two major releases of Chrome, Firefox, and Safari.
Verify no horizontal scrolling and no wrapped primary affordances at 320, 375,
414, and 768 CSS pixels. Images need `alt`, intrinsic dimensions, and responsive
delivery; the LCP image is never lazy-loaded. Video needs accurate captions;
audio-only material needs a transcript.

## Architecture

- `moody26.info.yml`: Drupal metadata, base theme, and stable regions.
- `moody26.libraries.yml`: token layer first, theme layer second.
- `tokens.css`: locked design-system values and exact UT color equivalents.
- `css/moody26.css`: progressive visual override of inherited Moody/UTDK markup.
- `css/components/quick-actions.css`: complete eight-state header trigger and
  native command-palette treatment.
- `css/components/quick-actions.preview.html`: disposable Hallmark state sheet;
  it is not attached to Drupal.
- `css/components/landing-hero.css`: H6 photographic and ambient-video leads.
- `css/components/editorial-sections.css`: shared Split Studio pairings, proof,
  CTA, and form treatments for existing Layout Builder blocks.
- `css/components/discovery-index.css`: irregular editorial grids for news,
  programs, people, and other multiple-entry discovery surfaces.
- `templates/menus/menu--primary-menu.html.twig`: semantic submenu buttons.
- `js/accessibility.js`: narrow repairs for inherited component metadata.
- `js/navigation.js`: the minimum state bridge for inherited navigation logic.
- `js/quick-actions.js`: dependency-free command discovery and keyboard/dialog
  behavior using the live rendered header as its source.
- `scripts/verify.mjs`: dependency-free structural and compliance guardrails.
- `tests/moody26.visual.spec.js`: deterministic viewport snapshots for the
  homepage and one representative route from every primary menu group.
- `.hallmark/`: design pre-flight and diversification memory.

Prefer native HTML, CSS, Drupal behaviors, and inherited UTDK capabilities.
Do not add a bundler, Sass layer, component framework, icon set, or motion
library unless a demonstrated requirement cannot be met by the platform.

## Change and validation workflow

```sh
npm run check --prefix web/themes/custom/moody26
ddev drush theme:enable moody26 -y
ddev drush cr
BASE_URL=https://moody-core.ddev.site:33001 npx playwright test tests/moody26.spec.js
BASE_URL=https://moody-core.ddev.site:33001 npm run test:moody26
BASE_URL=https://moody-core.ddev.site:33001 npm run test:moody26:visual:update
BROWSER_MATRIX=1 BASE_URL=https://moody-core.ddev.site:33001 npx playwright test tests/moody26.spec.js
```

Visual baselines cover `/`, `/about`, `/students`, `/academics`,
`/home/research`, `/alumni`, and `/news` at desktop and mobile viewport sizes.
Update snapshots only for an intentional design change, inspect every changed
image, and commit the baseline with the component change that caused it. Set
`BROWSER_MATRIX=1` on the smoke spec for the Chromium, Firefox, and WebKit
release gate; the reviewed pixel baselines remain Chromium-only.

Use a temporary local theme switch for visual evaluation, then restore the
previous default unless activation is explicitly requested. Never export broad
configuration changes from a stale database. Before production, add manual
keyboard, screen-reader, zoom/reflow, reduced-motion, color-vision, and Acquia
Optimize/Digital Accessibility Center review.
