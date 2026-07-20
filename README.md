# Moody 26

Moody 26 is the standalone Drupal theme for the University of Texas at
Austin’s Moody College of Communication site fleet. It pairs the University’s
visual identity with an accessible, editorial system that can serve academic,
research, film, journalism, advertising, alumni, event, and public-facing
sites without requiring the legacy Moody or Speedway themes.

> **Project status:** pre-release (`0.21.1`). The theme is being validated in
> [Moody Core](https://github.com/UTMoodyCollege/moody-core) before its first
> stable tag. Pin an exact commit when evaluating the `main` branch.

## Highlights

- A theme-owned University bar, Moody masthead, responsive navigation, page
  shell, and compliant footer.
- An approved Moody CSU mark and locally hosted Charis SIL and Libre Franklin
  web fonts—no third-party font request and no base-theme asset dependency.
- Keyboard- and touch-operable disclosure navigation with native document tab
  order, visible focus, Escape handling, and a scroll-preserving mobile drawer
  that leaves the tab order when closed.
- A task-first mobile action group that places Search, Quick actions, and Give
  above the primary menu without duplicating forms, IDs, or tab stops.
- A `Command+K` / `Control+K` quick-action dialog generated from the site’s
  rendered navigation, home link, search form, and Give link.
- An optional, theme-selected Social Links content block that uses the site’s
  existing accessible link names and official UT Drupal Kit icon formatter.
- Shared tokens for University colors, typography roles, spacing, type scale,
  focus, motion, target sizes, responsive containers, and elevation.
- Layout Builder-friendly landing heroes, editorial pairings, calls to action,
  forms, proof treatments, and discovery grids.
- Shared resource hubs with compact Focus Area shortcuts, asymmetric Promo
  Unit ledgers, sticky-header-safe anchors, and a reusable contact close.
- Shared Featured Highlights with resilient image and video handling,
  text-only composition, editor-owned links, and normalized legacy variants.
- Shared UT Promo Lists with semantic list structure, page-safe headings,
  compact responsive media, and one- or two-column resource layouts.
- Shared UT Flex Content Areas with semantic editorial entries, resilient
  media, and container-aware one- through four-column authoring variants.
- Shared UT Image Links with formatter-owned responsive media, intrinsic
  proportions, reliable accessible names, and useful unavailable-media links.
- Shared Moody Flex Color Blocks with semantic list structure, full-row link
  targets, honest non-linked content, and migration-safe legacy color data.
- Shared Moody Quotations with real quotation and attribution semantics,
  restrained editorial composition, optional media and CTA, and safe media
  failure recovery.
- Shared Moody Flex Grids with one semantic list contract across standard,
  circular, promo, rectangular, card, and legacy flip authoring modes.
- Shared Moody Impact Facts with semantic list structure, optional authored
  headings, tabular figures, and migration-aware responsive compositions.
- Shared Moody Heroes with one page-safe heading contract, named background
  media, resilient image handling, and container-aware overlay or split layouts.
- Shared Moody Contact Info with independent optional fields, page-safe heading
  levels, narrow-screen-safe contact links, and page-bundle-independent styling.
- Shared Call to Action blocks with formatter-owned destinations, compact
  branded action rules, complete link states, and narrow-region-safe labels.
- Shared people directories with semantic list and heading structure,
  accessible linked profiles, responsive filters, honest result counts, and a
  useful empty state.
- A shared newsroom layer with semantic story lists, one descriptive story
  link per teaser, separate topic destinations, resilient media, compact media
  mentions, and reusable Layout Builder callouts.
- Native shared accordions with truthful browser-owned disclosure state,
  44-pixel controls, visible focus, and no runtime JavaScript dependency.
- A restrained GSAP + Anime.js motion layer with no CDN requests, no functional
  dependency on animation, and immediate reduced-motion fallbacks.
- Matching CKEditor 5 styles and a standalone structural verifier.

Moody 26 provides presentation and interaction—not site content, menu items,
Drupal block placement, editorial policy, or a substitute for testing the
content published by a consuming site.

## Requirements

| Requirement | Supported version or role |
| --- | --- |
| Drupal | 10 or 11 |
| PHP | A version supported by the installed Drupal release |
| Composer | 2.x recommended |
| Node.js | 20 or newer for development checks only |
| Browsers | Latest minus two major Chrome, Firefox, and Safari releases |
| Base theme | None (`base theme: false`) |

The theme targets Composer-based Drupal projects. A `web/` document root is
conventional but not required by the package itself. DDEV is supported for
local development and is not a runtime dependency.

## Installation

Until a tagged package is published, register the repository as a Composer VCS
source and require the development branch from the Drupal project root:

```sh
composer config repositories.moody26 vcs https://github.com/UTMoodyCollege/moody26.git
composer require moody-college/moody26:dev-main
```

Commit the resulting `composer.lock`; it records the exact theme revision used
by the consuming site.

For a temporary development checkout:

```sh
git clone https://github.com/UTMoodyCollege/moody26.git web/themes/custom/moody26
```

Enable the theme, make it the default only when the site is ready to switch,
and rebuild caches:

```sh
vendor/bin/drush theme:enable moody26 -y
vendor/bin/drush config:set system.theme default moody26 -y
vendor/bin/drush cache:rebuild
```

With DDEV, replace `vendor/bin/drush` with `ddev drush`. Changing the default
theme is a Drupal configuration change; export and review it through the
consuming project’s normal deployment workflow.

## Site setup

Place blocks in these stable regions after enabling the theme:

| Area | Regions |
| --- | --- |
| University bar | `utility_nav` |
| Masthead | `header_primary`, `header_secondary`, `header_tertiary` |
| Navigation | `primary_menu` |
| Notices | `site_announcement`, `breadcrumb`, `highlighted`, `help` |
| Main page | `content`, `sidebar_first`, `sidebar_second` |
| Footer | `footer_left`, `footer_middle`, `footer_right` |
| System | `hidden`, `page_top`, `page_bottom` |

A typical configuration uses:

- Site branding in `header_primary` and `footer_left`.
- The site search block in `header_secondary`.
- The primary two-level menu in `primary_menu`.
- Footer navigation in `footer_middle`.
- The UT required-links block in `footer_right`. When that region is empty,
  Moody 26 renders the four required University links itself.

The quick-action dialog reads the rendered header; it does not maintain a
second destination registry. Menu, search, home, and Give changes are reflected
after Drupal’s normal cache rebuild.

The 75rem navigation breakpoint moves the one rendered header action bar
between the desktop masthead and the mobile drawer. The drawer is an anchored,
internally scrollable overlay, so opening or closing it does not reflow the page
or change the reader’s scroll position. Its order is Search, Quick actions,
Give, primary navigation, utility destinations, and Social Links when those
optional sources are available.

### Theme settings

`Appearance → Settings → Moody 26` exposes:

- **Give link:** leave empty to remove the header action.
- **Parent-unit label and URL:** optional for subsidiary sites. The link is
  displayed in the University bar at desktop sizes only.
- **Header social links:** selects one published, reusable Social Links content
  block. Its links appear in the University bar on desktop and in the primary
  navigation drawer on smaller screens. When selected, it replaces the legacy
  `header_tertiary` mobile fallback so destinations are not duplicated. Leave
  the setting empty to omit them.
- **Coordinated page motion (GSAP):** enables the one-shot masthead entrance
  and first eligible discovery-group reveal.
- **Interface motion (Anime.js):** enables brief submenu and first-open Quick
  actions feedback.
- Drupal’s standard logo controls. The bundled approved Moody CSU SVG is used
  when the default logo is selected.

The motion options are independent and enabled by default. Existing
installations that predate these settings retain the enabled behavior until an
administrator saves different choices. Reduced-motion and Save-Data preferences
always take precedence. Disabling both options keeps every interaction
functional and prevents the optional motion library from being attached. The
settings use native Drupal controls and preserve 44-pixel label targets without
replacing the active administration theme’s focus and validation states.

The header social setting stores the selected block’s UUID so configuration is
portable between environments. Create and publish the Social Links block in
the consuming site, keep it reusable, then select it under the Moody 26 header
settings. Moody 26 renders the block through Drupal’s entity view builder, so
formatter-provided icon assets, accessible names, access checks, translations,
and cache metadata remain authoritative. If the selected block becomes
unpublished, non-reusable, inaccessible, or unavailable, the header omits the
social landmark instead of rendering stale links.

### Shared people directories

Moody26 treats the `faculty_bio_view` View as the reference implementation for
shared people directories. The theme keeps the View and its content under
Drupal configuration and editorial control while providing semantic list
markup, one clear profile link per person, responsive portrait delivery, a
content-derived initial when a portrait is unavailable, a compact filter band,
a translated result count, and a useful no-results state.

The component is mobile-first: entries use a compact media-object layout at
narrow widths, then become a two-, three-, and four-column editorial index as
their own container grows. Future fleet directory Views should reuse the
`people-directory__*` vocabulary and add a targeted template suggestion rather
than broadening selectors to every Drupal View.

### Shared resource hubs

Moody26 treats Focus Areas, UTDK Promo Units, Moody Hero, and Moody Contact
Info as one reusable resource-hub vocabulary. Focus Areas render
as a semantic task list with inline decorative icons and one clear link per
item. Promo Units remain editor-owned groups of descriptive links, but render
as a semantic, container-aware resource ledger instead of an oversized image
stack. Failed supporting media collapses without removing a heading or link.

The component layer uses one column at narrow widths, two safe tracks when its
container allows, and an asymmetric 12-track composition on wide containers.
Mini-navigation anchors clear both the sticky site header and Drupal’s optional
administration toolbar. Contact Info closes the path with a neutral service
band; official burnt orange remains a rule and focus signal rather than a
large background fill. The `Students` directory term supplies the portable
`moody26-directory-students` lead composition without relying on node IDs.
That lead is limited to the first Basic block in the main Layout Builder
region, so shared footer and later editorial Basic blocks remain untouched.

The `/students` route is the reference integration fixture for the complete
resource-hub sequence: Moody Hero, Basic lead, Focus Areas, Promo Units, Moody
Showcase, and Moody Contact Info. Its browser check covers the five required
responsive widths, semantic lists and headings, 44-pixel targets, text and
focus contrast, failed media, sticky-anchor clearance, non-wrapping action
labels, source-order keyboard movement across components, and page reflow.

### Shared Moody Contact Info

Moody26 overrides the Moody Contact Info formatter with one semantic service
band that works in landing, standard, subsite, and future page bundles. The
headline, processed copy, subheadline, and formatter-owned CTA are all
independently optional: omitting a headline never emits an empty heading, and
omitting a CTA never hides an authored subheadline. A subheadline is `h3` below
an authored headline and promotes to `h2` when it is the component’s first
heading.

The component is mobile-first and container-aware. Details and supporting
content stack with a horizontal divider at narrow widths, then form an
asymmetric 7/5 composition with a vertical divider when the component itself
has room. Long email destinations stay as one scannable affordance at 320 and
375 CSS pixels without causing horizontal overflow. Processed editor copy and
link attributes remain formatter-owned; the theme does not reconstruct URLs,
append decorative arrows, or invent states the server-side formatter cannot
produce.

### Shared Call to Action blocks

Moody26 styles the UT Drupal Kit `call_to_action` block through its stable
Layout Builder wrapper and formatter-owned `.ut-btn` link. Drupal continues to
own the visible label, destination, link options, external/new-window context,
block placement, cacheability, and attachments; the theme does not replace the
block template or rebuild its URL.

The component uses a flat exact-burnt-orange rule and compact action surface
instead of a card or oversized color band. The target is at least 44 CSS pixels
high, the label is vertically centered, focus is immediate, and hover reverses
the surface while keeping the text burnt orange. Concise labels remain on one
line; long formatter-owned labels wrap between words in narrow Layout Builder
regions rather than being clipped or truncated. Empty stored blocks remain
visually empty, and the static link does not fabricate loading, error, or
success states.

### Shared Moody Showcases

Moody26 promotes Moody Showcase into a dedicated semantic media-ledger
component used by its Default, 33/66, 66/33, and Marketing view modes. Each
non-empty collection renders as a real list, each item keeps one editorial
article, and item headlines become `h2` headings instead of the formatter's
unconditional `h3`. Headlines, processed copy, responsive images, external
video, alternatives, links, ordering, and authoring choices remain owned by
Drupal.

The component is single-column in narrow Layout Builder regions, then adopts
an asymmetric media-copy rhythm only when its own container reaches 56rem.
Media alternates edges visually without changing DOM or keyboard order.
Intrinsic image proportions remain intact unless an editor deliberately chose
full or pinned media. Sticky and pinned options stay static and avoid scroll
scrubbing, parallax, or viewport-forced panels.

Formatter-owned CTAs keep 44-pixel targets, visible focus, active feedback,
capability-gated hover, and one-line labels. A failed image hides only its media
wrapper and recomposes the row around the remaining headline, copy, and links;
the theme never invents replacement art or text.

### Shared Moody Heroes

Moody26 renders every Moody Hero formatter variant through one semantic,
theme-owned component. Authored hero headings are `h2` elements, summaries are
ordinary paragraphs, and formatter-owned responsive media, captions, credits,
CTA markup, attributes, alternatives, and destinations stay under Drupal and
editor control. A background hero becomes a named image when its authored
alternative is meaningful and is removed from the accessibility tree when it
is decorative.

Legacy styles 2, 3, 6, 7, and 8 share a readable photographic overlay; styles
1, 4, and 5 share a neutral media-and-copy split that becomes a safe 7/5 grid
only when its component container reaches 60rem. The component works across
landing, standard, and subsite page bundles without route or node selectors.
Burnt orange stays a rule and focus signal rather than a large panel.

Formatter-owned CTA links keep 44-pixel targets, one-line labels, complete
keyboard states, and a paper halo around visible focus over photography. A
failed inline image removes only its media wrapper and recomposes the remaining
content; background media always retains an ink fallback. Heroes remain static
and never add parallax, scroll scrubbing, or fabricated actions.

### Shared newsroom components

The `news_filtered` View’s `block_filtered` display is the reference
latest-stories index. Moody26 renders its rows as a labelled list of articles with an `h2` story
title, machine-readable publication date, one descriptive story destination,
and separate topic links. Teaser images keep their editor-authored alternative
text in Drupal, but are decorative inside the already-labelled story link.
Missing media collapses cleanly without removing the title or destination.

The same layer gives Media Mentions a source-led editorial ledger and removes
the duplicate generic “Read More” tab stop in favor of the descriptive
headline link. It also aligns Moody Hero with the theme’s flat, token-governed
Layout Builder system while the dedicated Showcase contract handles newsroom
placements. A
landing page whose `field_moody_url_generator` term is `News` receives the
portable `moody26-directory-news` composition class—never a node-ID selector.

### Shared Featured Highlights

Moody26 provides theme-owned markup and presentation for the UT Drupal Kit
Featured Highlight field. The Default, Bluebonnet, and Charcoal authoring
choices all use the theme’s neutral paper and ink system so secondary colors
do not compete with official burnt orange. The authoring choice remains in
Drupal configuration for migration compatibility.

Highlights render as a single editorial column on narrow containers. At wider
component widths, image or video content shares a safe 5/7 grid with the copy;
text-only highlights use an asymmetric 4/8 composition. Headline, date, rich
text, media alternative, and CTA remain editor-owned. Linked headlines stay
the primary keyboard destination, while the formatter’s redundant visible CTA
retains its existing assistive-technology suppression.

Responsive image source sets and alternatives remain owned by Drupal’s media
formatter. Failed images collapse without a broken-image glyph or an empty
media track, and external video iframes remain responsive. A failed image never
removes the headline, copy, or destination.

### Shared Promo Lists

Moody26 gives the UT Drupal Kit Promo List a semantic editorial-ledger
treatment without changing its editor workflow. Each visible collection is a
real list, each entry is a list item, and group headings establish an `h2`
before item-level `h3` headings. When a group heading is omitted, item headings
become `h2` so the component does not skip directly from the page title to an
`h3`.

The default and stacked authoring modes remain one-column lists. The responsive
mode becomes two safe tracks only when the component itself has enough room,
and the two-lists mode arranges its groups side-by-side under the same
container rule. Existing headlines, processed copy, link options, media
alternatives, source sets, view modes, and Layout Builder placement stay under
Drupal and editor control.

Images remain compact because the formatter intentionally supplies square
64–85 pixel derivatives. A failed image collapses its media cell and leaves the
heading, copy, and links intact. Long editorial headline links may wrap as
prose rather than overflow or be truncated; their visible focus target remains
at least 44 CSS pixels high.

### Shared Flex Content Areas

Moody26 presents the UT Drupal Kit Flex Content Area as a semantic editorial
media dossier without changing its editor workflow. Each collection is a real
list and each item is a list entry containing an article. The upstream
formatter continues to own filtered headlines, processed copy, destinations,
link options, responsive image output, external video, and cacheability.

The default and two-column authoring modes gain two safe tracks when their own
container is at least 38rem wide. Three- and four-column modes progressively
reach their authored track count only when the component can support it. The
one-column mode becomes a 5/7 media-and-copy band at 52rem, while remaining a
single readable column in narrower Layout Builder regions. Images use their
native 3:2 derivatives; external video uses a CSS-owned 16:9 ratio, making the
legacy one-time iframe height script inert.

When a linked headline exists, its formatter-provided `aria-hidden` CTA is
also removed visually so one destination does not appear twice. A standalone
CTA remains an accessible typographic link. Failed images collapse only their
media wrapper, leaving every headline, paragraph, and destination available.

The upstream item headline remains an `h3` because real placements occur both
under authored section `h2` headings and under visible block labels. Editors
must give a multi-item area a meaningful visible block label or introduce it
with a preceding `h2`; administrative block labels must not be published as
content headings.

### Shared Image Links

Moody26 presents the UT Drupal Kit Image Link as a flat linked-media plate
without changing its field widget or formatter. Drupal continues to own the
destination, link options, responsive source set, media alternative, and cache
metadata. The theme adds one stable target class and uses the formatter’s link
text—or the media alternative when older content has no link text—as the
accessible name.

Images retain their intrinsic proportions. This matters because current fleet
content mixes tall report covers, square podcast artwork, and wide event
graphics whose essential content would be lost by a universal crop. Visible
block labels use compact page-safe display typography, and each linked image is
a full-width target with immediate focus, active feedback, and
capability-gated hover styling.

When an image file is unavailable, the image is removed from presentation and
its alternative becomes a visible, underlined text link with a 44 CSS-pixel
minimum target. The destination and its external/new-window context remain
available. An unlinked failed image collapses instead of leaving a broken-image
glyph. No placeholder art, caption, or call to action is invented.

### Shared Flex Color Blocks

Moody26 turns the legacy Moody Flex Color Blocks field into a semantic
editorial task ledger without changing its four-item editor workflow. Each
collection is a real list with direct list items. A linked item is one full-row
destination; an item without a destination remains visibly non-interactive.
Headlines are descriptive link labels rather than repeated section headings,
so a visible Layout Builder block label remains the collection heading and
document outlines do not acquire a heading for every shortcut.

The component begins as one readable column. Once its own Layout Builder block
has at least 48rem, two safe tracks become available; an odd first item spans
both tracks so three items form a deliberate lead-plus-pair composition rather
than a generic three-card grid. One-item calls to action retain a stronger
typographic scale without becoming a large color tile. Long editor-authored
titles and explanatory text wrap without splitting words or causing page
overflow.

Stored orange, gray, blue, and green choices remain on stable migration classes
but do not create competing brand surfaces. Exact UT burnt orange is reserved
for the collection rule, link underline, and focus signal. Drupal continues to
own sanitized text, URL objects, block labels, placement, and cacheability. The
component adds no JavaScript, synthetic arrow, invented CTA, or fabricated
loading, disabled, error, or success state.

### Shared Moody Quotations

Moody26 renders every Moody Quotation as one semantic `<figure>` containing a
real `<blockquote>` and, when authored, a `<figcaption>`. Authors remain plain
attribution text rather than `<cite>` elements, because HTML citation markup
names a work rather than a person. Drupal continues to own processed quote and
attribution text, responsive media, alternatives, CTA destinations and link
options, placement, and cacheability.

The visual treatment is a flat editorial figure instead of a testimonial card
or full-width dark band. Charis SIL gives the quotation an approved University
serif voice, while a narrow exact-burnt-orange rule supplies the only brand
accent. Short, medium, and long authored text receive measured type scales;
the content stays within a readable 65-character measure and is biased toward
the trailing edge in wide text-only placements rather than centered by
default.

Media appears above the quotation in narrow Layout Builder regions and moves
to a safe 5/7 media-and-copy composition only when the component itself reaches
52rem. Responsive sources, intrinsic dimensions, and editor-authored
alternative text remain untouched. If an image fails, only the media wrapper
is hidden and the figure recomposes as text; the quotation, attribution, and
CTA remain available.

Stored `default`, `orange`, `grey`, and `feature` values remain as stable
migration classes but no longer create competing color surfaces or alternate
semantics. Optional CTAs remain formatter-owned typographic links with a 44
CSS-pixel target, immediate focus, active feedback, and capability-gated
hover. Long labels wrap between words when a narrow component cannot contain
them on one line. The theme invents no quote marks, author copy,
placeholder imagery, motion, or proof claims; placeholder or incomplete quote
copy remains an editorial review responsibility.

### Shared Moody Flex Grids

Moody26 gives every Moody Flex Grid formatter mode one semantic editorial
directory contract. Standard, circular, promo, rectangular, card, and legacy
flip output all use a real `<ul>` with direct `<li>` children and one `<article>`
per stored item. An authored group headline is an `h2` and establishes `h3`
item headings; without that group headline, item headings become `h2` so the
component does not skip directly from the page title to an `h3`.

Linked entries expose exactly one destination. A grid item without authored
button text is one full-entry link; an item with authored button text remains
plain article content followed by one formatter-owned CTA. Moody26 does not
generate “View,” repeat a linked image, add a hidden duplicate name, or create
JavaScript navigation. The unused flip mode deliberately renders as static
content because its upstream formatter supplies a URL rather than accessible
responsive image markup.

The component starts with one safe track, adds two tracks when its own
Layout Builder container reaches 38rem, and progressively allows three or four
tracks for authoring modes that request them. Every image-bearing track uses
`minmax(0, 1fr)`. Circular people imagery retains its established circular
treatment; other responsive media keeps formatter-owned source sets,
dimensions, and alternatives without a new crop. Failed media hides only its
wrapper and leaves the article text and destination intact.

Stored column count, alignment, headline color, rounded-edge, and overlay
choices remain as stable migration classes, not competing visual systems.
Exact UT burnt orange is limited to the collection rule, link underline, and
focus signal. Links provide readable default and visited color, immediate
visible focus, active feedback, an `aria-disabled` treatment, capability-gated
hover, and a minimum 44 CSS-pixel target. Authored CTAs remain single-line
affordances; editors should shorten a label that cannot fit its narrowest
placement. The static component adds no decorative motion or fabricated
loading, error, success, or editorial content.

### Shared Moody Impact Facts

Moody26 renders Impact Facts as one semantic `<ul>` of authored statements
instead of presenting every value and description as nested headings. An
optional formatter-owned group headline is restored as an `h2`; individual
facts remain ordinary list content so numeric values, application dates, and
`WHAT` / `WHEN` / `WHERE` entries do not distort the document outline. Empty
stored entries are omitted without inventing a replacement value or claim.

The component begins with one safe track and adds two tracks when its own
Layout Builder container reaches 42rem. At 64rem it honors the existing two-,
three-, and four-per-row choices as migration classes. Three-item rows use a
measured 5/3/4 composition rather than a generic equal-card grid; every track
uses `minmax(0, 1fr)`, and long authored values or descriptions may wrap
without splitting words or creating horizontal overflow.

Charis SIL supplies the fact value, Libre Franklin supplies its context, and
tabular figures keep dates and measurements steady. Exact UT burnt orange is
limited to the collection rule. Drupal continues to own values, descriptions,
order, block labels, placement, and cacheability; editors remain responsible
for verifying rankings, dates, outcomes, and other published claims. The
static component adds no links, JavaScript, decorative motion, placeholder
figures, or fabricated loading, error, success, and disabled states.

### Shared accordions

Moody26 overrides the Moody Accordion field with native `<details>` and
`<summary>` markup. The browser owns disclosure state and keyboard behavior;
the component does not require Alpine, Bootstrap, or theme JavaScript. Block
headings, questions, answers, links, and placement remain under Drupal and
editor control.

Answers are closed initially, and readers may keep multiple answers open for
comparison. Each summary has a 44 CSS-pixel minimum target, immediate visible
focus, and a plus-to-minus state signal that does not rely on color. Hover is
limited to devices that support it, and reduced-motion preferences remove the
indicator transition. Answer content remains ordinary document flow and is
never animated, clipped, or removed from search indexing.

## Accessibility and University identity

Moody 26 is designed and tested toward WCAG 2.1 Level AA and the standards
incorporated by UT Austin’s Digital Accessibility Policy. This is an
engineering baseline, not a certification. Each production site remains
responsible for content review, keyboard and assistive-technology testing,
automated scanning, and institutional accessibility review.

The theme enforces or documents these release gates:

- Use official burnt orange exactly as `#bf5700`; never create burnt-orange
  tints.
- Preserve approved University and CSU marks without redrawing, stretching,
  or typesetting replacements.
- Use Charis SIL for the digital serif role and Libre Franklin for the digital
  sans-serif role.
- Keep keyboard focus immediate and visible, with 44-by-44 CSS-pixel minimum
  targets for touch controls.
- Support keyboard operation, 200% zoom, reflow, reduced motion, useful
  accessible names, and non-color state cues.
- Suppress all optional spatial animation for `prefers-reduced-motion: reduce`
  and Save-Data; never delay focus, reading, or interaction for an effect.
- Keep UT Austin Home, Emergency Information, Site Policies, Digital
  Accessibility Policy, and Web Privacy Policy available in the footer, with
  a dynamic copyright year.
- Provide useful image alternatives, synchronized and accurate captions,
  audio transcripts, and descriptions of essential visual information.

Authoritative sources:

- [UT Austin website guidelines](https://umac.utexas.edu/brand-center/visual-identity/website-guidelines/)
- [Digital Accessibility Policy and Procedures](https://compliance.utexas.edu/programs/iaa/digital-accessibility/digital-accessibility-policy-and-procedures)
- [University and CSU wordmarks](https://umac.utexas.edu/brand-center/university-csu-wordmarks/)
- [University colors](https://umac.utexas.edu/brand-center/colors/)
- [University typography](https://umac.utexas.edu/brand-center/typography/)

## Development

Runtime assets are committed, so production installations do not need Node.js.
Theme development uses a small esbuild step to tree-shake Anime.js and sync the
local GSAP fallback. Install exact development dependencies, build, and run the
structural verifier from the theme root:

```sh
npm ci
npm run build
npm run check
```

`npm run check` rebuilds the motion artifact before verifying it. When GSAP
motion is enabled, Moody26 reuses an existing compatible `window.gsap` when a
content module provides one; on other pages and sites it lazily loads its own
local GSAP core. Anime.js feedback runs only when its separate option is
enabled. The theme never loads a motion library from a CDN.

In a Drupal host project, rebuild caches and exercise the installed theme:

```sh
vendor/bin/drush theme:enable moody26 -y
vendor/bin/drush cache:rebuild
```

Moody Core provides the current browser integration suite:

```sh
BASE_URL=https://moody-core.ddev.site npx playwright test tests/moody26.spec.js
BROWSER_MATRIX=1 BASE_URL=https://moody-core.ddev.site npx playwright test tests/moody26.spec.js
```

Before release, review at 320, 375, 414, and 768 CSS pixels; keyboard through
navigation and forms; test 200% zoom and reflow; inspect landmarks and heading
order; and verify reduced-motion behavior. Automated checks complement rather
than replace manual assistive-technology review.

## Project structure

| Path | Purpose |
| --- | --- |
| `moody26.info.yml` | Standalone Drupal theme metadata and regions |
| `moody26.theme` | Theme-owned preprocess and search-form integration |
| `theme-settings.php` | Native Drupal header and visual options |
| `tokens.css` | Brand, type, spacing, motion, focus, and layout tokens |
| `css/fonts.css` | Local approved digital font declarations |
| `css/moody26.css` | Global foundation, shell, navigation, forms, and footer |
| `css/components/` | Header social, Moody Hero, editorial, discovery, resource-hub, accordion, Featured Highlight, Promo List, Flex Content Area, Image Link, Flex Color Block, Moody Quotation, Moody Flex Grid, Impact Facts, Contact Info, Call to Action, people-directory, newsroom, quick-action, and settings components |
| `js/navigation.js` | Drawer and disclosure navigation state |
| `js/quick-actions.js` | Native dialog and rendered-destination discovery |
| `js/accessibility.js` | Progressive safeguards for rendered content components |
| `js/motion.js` | GSAP orchestration and Anime.js WAAPI source |
| `js/dist/motion.min.js` | Committed tree-shaken motion artifact |
| `js/vendor/gsap.min.js` | Local GSAP core fallback |
| `templates/` | Theme-owned HTML, page, shell, block, menu, shared component, and View markup |
| `scripts/build.mjs` | Deterministic motion build and fallback sync |
| `scripts/verify.mjs` | Standalone brand, accessibility, and architecture gates |
| `AGENTS.md` | Maintainer design and compliance contract |

## Customization

- Add reusable values to `tokens.css`; component styles should consume named
  tokens instead of introducing raw colors or font families.
- Keep the package portable. Site-specific content, configuration, and custom
  business behavior belong in the consuming Drupal project.
- Prefer native HTML, CSS, JavaScript, and Drupal behaviors over new
  frameworks, bundlers, and component dependencies.
- Preserve Layout Builder and CKEditor usability when changing front-end
  presentation.
- Treat accessibility and University identity requirements as release gates,
  not optional polish.

## Contributing

Issues and pull requests are welcome. Keep changes focused and include:

1. A concise description of the user-facing problem and solution.
2. The relevant verifier and browser-test results.
3. Before-and-after screenshots for visual changes at desktop and mobile sizes.
4. Keyboard, focus, reflow, and reduced-motion notes when interaction changes.

Do not commit credentials, database exports, uploaded files, generated test
artifacts, or site-specific content.

## License and trademarks

Theme source code is licensed under
[GPL-2.0-or-later](LICENSE).
The bundled Charis SIL and Libre Franklin font files are distributed under the
[SIL Open Font License 1.1](LICENSES/OFL-1.1.txt).
[Anime.js](LICENSES/ANIMEJS-MIT.txt) is included under the MIT License. GSAP is
included under GreenSock’s [Standard “no charge” License](LICENSES/GSAP-NOTICE.txt).

The code license does not grant permission to use University of Texas at Austin
or Moody College names, wordmarks, logos, or other trademarks. Their use
remains subject to University policies and approval.
