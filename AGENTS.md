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
- Preserve formatter-provided accessible link names and provider-owned icon
  assets. Each icon link keeps a 44-by-44 CSS-pixel target, a visible focus
  indicator, and a 24-pixel mark. The landmark label is `Social media`.
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

### Page-title ownership

- Keep exactly one Core `page_title_block` in the rendered document. Prefer
  the title in the main Content region so the document `h1` remains inside the
  main landmark; retain a Highlighted or Help title only when Content has none.
- Treat duplicate title placements as a migration/configuration defect. The
  render safeguard may omit later duplicate Page Title blocks, but it must not
  rewrite the route title, key off a consumer block ID, remove the only title,
  mutate active configuration, or hide arbitrary authored `h1` elements.
- Keep the safeguard generic across page bundles and fleet sites. Site owners
  remain responsible for deleting the redundant placement from configuration.

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

### Basic and Rich Text blocks

- Treat the `basic` content-block bundle and its `.ut-copy` output as the
  shared long-form editorial foundation, not as route-specific freeform HTML.
  Keep copy, links, headings, lists, media, captions, embeds, text format,
  cacheability, and Layout Builder placement under Drupal and editor control.
- Moody26 owns `css/components/rich-text.css`, the narrow Basic-block heading
  safeguard in `moody26_preprocess_block()`, and the idempotent new-window
  enhancement in `js/accessibility.js`. Do not replace the provider template,
  reconstruct a destination, use `|raw`, or alter stored body content.
- The page-title block owns the document `h1`. Render an authored Basic-block
  `h1` as `h2` while preserving its attributes and text. Keep every other
  heading level unchanged; editors remain responsible for a logical hierarchy
  below that first section level.
- Keep prose measured and flat. Lists use real browser semantics and a small
  burnt-orange marker; quotations use one start rule; figures retain authored
  proportions and captions; code may scroll inside its own frame. Do not turn
  paragraphs, lists, quotations, or media into cards.
- Preserve processed-text filtering and formatter-owned media. Images and
  video must stay within their region without a universal crop. Iframes keep
  their provider-owned height and title; the theme must not guess an embed
  title, caption, table header, image alternative, or missing media.
- An authored `target="_blank"` link receives an explicit `rel="noopener"`
  token without replacing any existing relationship. Add one translated,
  shared offscreen `Opens in new window.` description through
  `aria-describedby`, preserving any existing accessible name, title, and
  description references. The northeast visual mark is CSS-only and must not
  acquire its own accessible name or underline.
- Enhancement is progressive: without JavaScript every destination, target,
  visible label, and visual new-window signal remains usable. Drupal behaviors
  use `once()` so AJAX and Layout Builder cannot duplicate relationship tokens
  or description references.
- Never rewrite generic `Here`, `Click here`, `Read more`, or `Learn more`
  labels into invented copy. Report them as editorial debt and require an
  editor to supply destination-specific text. Do not silently repair missing
  table captions, header associations, alternatives, or heading context.
- Rich-text links may wrap between words or within a pasted URL at narrow
  widths; never clip, truncate, split surrounding prose, or widen the page.
  Keep visible focus immediate and retain default, visited, hover, active, and
  authored `aria-disabled` states. Inline prose links use the WCAG target-size
  exception; button-styled links continue to use the shared 44-pixel target.
- Basic and Rich Text content is static server-rendered editorial content. Do
  not add decorative reveal motion or fabricate loading, error, success, or
  disabled controls that the editor did not author.

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

### Student-story directories and profiles

- Treat `life_after_moody_explorer` and `life_after_moody_page` as one shared
  student-story journey: a filterable discovery index followed by a readable
  first-person profile. Do not solve either route with node IDs, individual
  profile paths, block UUIDs, Bootstrap grid assumptions, or stored-content
  changes.
- Keep View configuration, filtering, sort order, profile text, majors, media,
  Layout Builder overrides, and destinations under Drupal and editor control.
  Moody26 owns the targeted View templates, failure-safe directory media,
  profile title composition, and `student-stor*` presentation contract.
- Render the result set as one labelled semantic list with direct list items.
  Each entry is one article with one profile destination containing its
  decorative preview, visible major, `h3` name, and concise `View story` cue.
  Never restore the provider View’s separate linked image and linked title.
- Treat index portraits as decorative inside the already named profile link.
  Validate Media and File access and the physical source before output. A
  missing, inaccessible, invalid, or unrestored image becomes a
  content-derived initial without removing the real name, major, destination,
  or grid rhythm; never emit broken media or invented replacement art.
- Keep the exposed form visibly labelled and name it `Filter student stories`.
  Use `Search by name`, a native Major select, controls and action of equal
  height, immediate focus without border-width shift, and one-line `Update
  results` copy. Do not use instructional placeholder text or replace the
  native full-page GET workflow with speculative search-as-you-type behavior.
- Include an honest translated result count. A no-match response is a
  server-rendered status with the factual `No student stories matched`
  heading, a recovery instruction, and one `Clear filters` link. Do not add
  `aria-live` to the ordinary full-page response or preserve the provider’s
  duplicate generic empty copy.
- Start with one compact media-object track at narrow component widths, then
  use two, three, and four `minmax(0, 1fr)` tracks as the component grows.
  Mirror those breakpoints with a scoped media-query fallback when the browser
  does not support container queries.
  Long names and majors may wrap without clipping or document overflow. Keep
  all destinations at least 44 CSS pixels high with readable visited color,
  immediate focus, active feedback, an authored disabled treatment, and
  capability-gated hover.
- On a `life_after_moody_page`, remove the Page Title block’s legacy
  `visually-hidden` class and let its real route title own the only visible
  document `h1`. Suppress only a Moody Showcase headline that exactly repeats
  that node title; preserve unrelated Showcases. Validate the profile’s main
  Media before showing the lead track, retain an available external video,
  and collapse an unavailable migrated image without a broken-image gap.
- Preserve the authored interview, quotations, links, and Layout Builder
  sequence. The editorial story surface is static: no card lift, image zoom,
  scroll reveal, fabricated loading/error/success UI, or rewritten interview
  questions. The standalone preview may demonstrate all eight interaction
  states, but preview-only state attributes must never become production
  behavior.
- Keep `/students/life-after-moody` as the directory fixture and at least one
  legacy/default-layout profile plus one overridden profile as detail fixtures.
  Test the form, result count, one-link cards, missing-image initials,
  one-visible-`h1` ownership, source-order keyboard traversal, and 320, 375,
  414, 768, and wide CSS-pixel reflow.

### UTProf Profile Listings

- Treat the UTProf `utprof_profile_listing` content block as the compact,
  editor-curated sibling of the filterable people directory. Keep selection,
  ordering, Basic/Prominent/Name-only view modes, header and footer copy,
  responsive media, alternatives, links, emails, and Layout Builder placement
  under the UTProf provider and editor control.
- Moody26 owns
  `block--block-content--utprof-profile-listing.html.twig`,
  `field--node--field-utprof-designation.html.twig`, and the
  `.profile-listing` presentation contract. Do not edit the Composer-installed
  UTProf package, reconstruct profile output, use `|raw`, or replace its
  rendered list and cache metadata.
- Render each block as one labelled section. Its visible title is `h2`; each
  profile name remains `h3`. Designations are descriptive text values, not
  headings. Preserve the provider’s real semantic list and direct list items.
- Keep Basic, Prominent, and Name-only output readable without assuming that
  every profile has a portrait, designation, directory record, or public
  email. Never generate a missing role, contact method, image, or destination.
- Begin with one safe container-aware track. Honor the author’s one- through
  four-column Layout Builder classes only as the component grows, and use
  `minmax(0, 1fr)` for every image-bearing track. Long names, roles, and email
  addresses reflow without clipping or document overflow.
- Preserve authored portrait alternatives and intrinsic dimensions. A failed
  image hides only its media wrapper, adds the stable
  `utprof__profile-item--media-unavailable` state, and recomposes the complete
  text and links. Do not substitute initials or invented artwork in this
  provider-owned listing.
- Profile, UT Directory, and email links retain their formatter-owned labels
  and attributes, readable visited color, immediate focus, active feedback,
  authored-disabled treatment, and capability-gated hover. Directory and
  email targets remain at least 44 CSS pixels high; long standalone email
  addresses may wrap safely.
- The component is static server-rendered content. Do not add decorative
  motion or fabricate loading, error, success, or disabled controls that the
  formatter did not provide.
- Keep `/centers/entertainment-media-industries/people` as the integration
  fixture for multiple listings, heading order, failed portrait recovery,
  source-order keyboard traversal, and 320–1280 CSS-pixel reflow.

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
- Preserve source-order keyboard flow across component boundaries: the last
  Focus Area task must advance to the first Promo Unit link, and the last
  Promo Unit link must advance to the following Showcase action. Do not add
  positive `tabindex` values or component-local focus loops.
- Mini-navigation targets clear the sticky Moody26 header and Drupal’s
  optional displaced toolbar. Never allow an anchored component to land fully
  behind sticky chrome.
- Contact Info is a neutral editorial service band. Burnt orange remains a
  rule and focus signal; never restore the legacy full-width orange panel.
- A landing node referenced by the `Students` directory-structure term may use
  `moody26-directory-students` for its lead composition. Never use a node ID,
  block UUID, or authored headline as the styling contract.
- Scope that lead treatment to the first Basic block in the main Layout
  Builder region. A Basic block in the footer, header, or a later editorial
  section is not a resource-hub lead and must not inherit its rule or scale.
- Keep `/students` as the browser-level reference fixture for the complete
  resource-hub composition. Test its Hero, Basic lead, Focus Areas, Promo
  Units, Showcase, and Contact Info together at 320, 375, 414, 768, and 1280
  CSS pixels; component tests remain responsible for optional-field variants.

### Resource Groups

- Treat Moody Resource Groups and UT Drupal Kit Resources as two authoring
  providers for one shared editorial resource-ledger contract. Keep group and
  item headings, links, destinations, link options, responsive media,
  alternatives, ordering, view mode, block labels, and Layout Builder
  placement under Drupal and editor control.
- Moody26 owns `moody-resource-group.html.twig`, `utexas-resources.html.twig`,
  and the `resource-group__*` presentation vocabulary. Preserve every
  formatter-built link and media render array, including attributes,
  cacheability, and attachments. Never reconstruct an `href`, use `|raw`, or
  edit either Composer-managed provider.
- Render each non-empty component as a labelled `<section>`. A group headline
  is an `h2`; a UT item headline is `h3` beneath it and promotes to `h2` when
  the group headline is absent. A heading-free group uses the translated
  `Resources` landmark label. Never preserve either provider's unconditional
  `h3` or emit an empty heading.
- Use real `<ul role="list">` and `<li>` structures for both resource items
  and destinations. Keep DOM and keyboard order identical to author order;
  never add positive `tabindex`, a component-local focus loop, synthetic link
  text, a synthetic arrow, or a duplicate destination.
- Keep UT Drupal Kit Default responsive and Stacked deliberately linear. The
  default variant may form two safe `minmax(0, 1fr)` tracks when its own
  container reaches 54rem; `.stacked-display` must remain one column. Every
  image-bearing track and text wrapper needs `min-width: 0` protection.
- Preserve the Moody provider's blue, gray, green, and orange values only as
  migration classes. All four map to the same neutral paper-and-ink treatment
  with exact burnt orange limited to the rule and focus signal; do not restore
  legacy color slabs or burnt-orange tints.
- Preserve authored image alternatives and responsive-image output. Add
  intrinsic dimensions from the formatter-owned source when readable. A failed
  image hides its wrapper, adds `resource-media--unavailable` to that item, and
  recomposes the remaining heading and destinations without invented artwork.
- Resource links are at least 44 CSS pixels high and expose explicit default,
  visited, immediate focus, active, authored disabled, and capability-gated
  hover states. Long CMS-authored labels may wrap between words at 320 CSS
  pixels; never clip, truncate, split ordinary words, or cause page overflow.
- Resource Groups are static server-rendered navigation. Do not add decorative
  reveal motion or fabricate loading, error, empty, success, or disabled
  controls that the providers do not supply. Test the published Moody and UTDK
  fixtures without route IDs, node IDs, block UUIDs, or headline selectors in
  the runtime contract.

### Flex Tabs

- Treat Moody Flex Tabs as one shared progressive content index, not as
  route-specific navigation, a carousel, or a Bootstrap-dependent effect.
  Keep titles, processed panel content, ordering, active choices, field
  attributes, cacheability, and Layout Builder placement under Drupal and
  editor control.
- Moody26 owns `field--moody-flex-tabs.html.twig`, `flex-tabs__*` presentation,
  stored-state normalization in `moody26_preprocess_field()`, and the
  idempotent behavior in `js/accessibility.js`. Do not edit the
  Composer-installed provider or duplicate the interaction in another
  library.
- Preserve a complete no-JavaScript fallback: titles are ordinary fragment
  links and every usable panel remains visible in document flow. Add
  `tablist`, `tab`, `tabpanel`, `aria-selected`, roving `tabindex`, and hidden
  inactive panels only after JavaScript can manage the entire state model.
- Normalize authored state defensively. The first usable marked-active item
  wins; when none is marked, the first usable item becomes active. Omit an item
  with no meaningful panel content instead of creating a dead control. Keep
  meaningful untitled content visible outside the tab interaction rather than
  hiding it or inventing a title.
- Support automatic activation with Left Arrow and Right Arrow, wrap at each
  end, support Home and End, and keep direction-aware behavior for RTL. Tab
  enters the selected panel; Shift+Tab returns to the one sequentially
  focusable tab. Keyboard activation must use `preventScroll` and must not
  create a page-position jump.
- Keep tab labels as one-line affordances in a component-owned horizontal
  scroller at narrow widths. The document itself must not overflow. Each tab
  and panel requires immediate visible focus, tabs require at least a 44
  CSS-pixel target, and selected state must use weight plus a burnt-orange rule
  so color is never the only signal.
- Panel content remains ordinary editorial flow with processed links and
  headings intact. Do not add duplicate panel headings, synthetic arrows,
  forced height, lateral content slides, or decorative animation. Flex Tabs
  have no asynchronous work, so do not fabricate loading, error, or success
  states.

### UT Drupal Kit Flex Lists

- Treat the UT Drupal Kit `utexas_flex_list` Default, Accordion, and Horizontal
  Tabs view modes as three presentations of one shared structured-content
  contract. Keep headers, processed bodies, ordering, field attributes,
  cacheability, view-mode choice, and Layout Builder placement under Drupal
  and editor control.
- Moody26 owns `field--utexas-flex-list.html.twig`, its Accordion and `htabs`
  suggestions, and the `flex-list__*` adapter vocabulary. Do not edit the
  Composer-managed provider, reconstruct processed text, use `|raw`, or attach
  Bootstrap’s tab controller.
- Render Default as a real list whose authored headers are scannable labels,
  not fixed document headings. The provider’s configured `h5` must not create
  a heading skip when the block’s visible title is `h2` or when Layout Builder
  moves the component to another context.
- Reuse the theme’s native `.moody-accordion` contract for complete Accordion
  pairs and the existing progressive `.flex-tabs` behavior for complete
  Horizontal Tab pairs. Do not create a second disclosure or tab controller.
- Preserve incomplete historical content honestly. A header-only or body-only
  item stays visible as a static entry and must not become an empty disclosure
  or dead tab. Omit only structurally empty items; never invent a title or
  replacement body.
- Horizontal Tabs retain ordinary fragment links and visible labelled panels
  before JavaScript. ARIA Tabs semantics, inactive-panel hiding, and roving
  `tabindex` appear only after the existing behavior can manage the complete
  interaction.
- Default uses one safe column on narrow component containers and may become
  an asymmetric `minmax(0, 4fr) minmax(0, 8fr)` ledger when its own container
  reaches 48rem. Long authored headers and processed links must reflow without
  clipping, ordinary-word splitting, or document overflow.
- Flex Lists are synchronous server-rendered content. Do not add decorative
  reveal motion or fabricate loading, error, success, or disabled controls.
  Honor a formatter-supplied `aria-disabled="true"` link when one is present.

### Moody Contact Info

- Treat Moody Contact Info as a shared page-bundle-independent service band,
  not a landing-, standard-, Students-, or route-specific exception. Keep the
  block’s content and placement under Layout Builder and editor control.
- Moody26 owns `moody-contact-info.html.twig` and the `contact-info__*`
  presentation contract. Preserve formatter-rendered processed copy, CTA
  markup, link attributes, cacheability, and attachments; never reconstruct a
  destination or use `|raw`.
- Headline, copy, subheadline, and CTA are independently optional. Never emit
  an empty heading and never make one authored field conditional on another.
  The headline is `h2`; a subheadline is `h3` when the headline exists and `h2`
  when it is the component’s first heading.
- Use a flat neutral service band with a burnt-orange top rule. Stack details
  and supporting content with a horizontal divider at narrow container widths;
  use a safe asymmetric 7/5 split and vertical divider only when the component
  itself has room. Do not restore the legacy orange panel or dark nested card.
- Keep formatter-owned CTAs on one line with a 44 CSS-pixel minimum target,
  immediate visible focus, active feedback, and capability-gated hover. Long
  standalone email links must remain scannable at 320 and 375 CSS pixels
  without causing horizontal overflow.
- Contact Info is server-rendered and static. Do not add decorative reveal
  motion or fabricate loading, error, success, or disabled controls. Honor an
  authored `aria-disabled="true"` destination when one is supplied.

### Call to Action blocks

- Treat the UT Drupal Kit `call_to_action` block as a shared formatter-owned
  action rule, not a route-specific button or a second CTA system. Keep its
  label, destination, link options, block label, and Layout Builder placement
  under Drupal and editor control.
- Style the stable `.block-bundle-call-to-action` wrapper and formatter-owned
  `.ut-btn` output without replacing the block template, rebuilding an `href`,
  or adding JavaScript navigation. Preserve external/new-window classes,
  attributes, accessible-name qualifiers, cacheability, and attachments.
- Use a flat exact-burnt-orange rule and one compact action surface. The link
  has a 44 CSS-pixel minimum target, vertically centered text, immediate focus,
  active feedback, an authored `aria-disabled` treatment, and capability-gated
  hover whose text remains burnt orange.
- Prefer concise, descriptive one-line labels. When a formatter-owned label
  cannot fit its narrow Layout Builder region, wrap it between words rather
  than clipping, truncating, splitting a word, or hiding part of its accessible
  name. Empty stored blocks must not acquire decorative spacing or a rule.
- Call to Action blocks are static server-rendered links. Do not add decorative
  motion, synthetic arrows, invented copy, or fabricated loading, error, or
  success states.

### Moody Newsletter destination bands

- Treat Moody Newsletter as a shared compact destination band, not a form,
  route-specific promotion, or subscription workflow. Keep the headline, CTA
  text, destination, link options, block label, and Layout Builder placement
  under Drupal and editor control.
- Moody26 owns `moody-newsletter.html.twig` and the `newsletter__*`
  presentation contract. Preserve the formatter-built CTA, its attributes,
  cacheability, and attachments; never reconstruct an `href`, use `|raw`, or
  edit the Composer-managed provider.
- Render a non-empty authored headline as `h2` and omit empty output. The
  provider currently treats the headline as the field’s presence signal, but
  the theme must still render headline and CTA independently and never invent
  a missing label or destination.
- Preserve blue, gray, green, and orange values only as
  `newsletter--legacy-*` migration classes. All use one neutral paper-and-ink
  treatment with exact burnt orange limited to the rule and focus signal; do
  not restore competing color slabs, cards, or burnt-orange tints.
- Stack title and action in narrow component containers. At 34rem, a complete
  pair may use a safe `minmax(0, 5fr) auto` composition. Keep the formatter CTA
  on one line, vertically centered in a 44 CSS-pixel target, with readable
  visited color, immediate focus, active feedback, authored disabled treatment,
  and capability-gated hover. Editors must shorten a CTA that cannot fit a
  narrow region rather than allowing clipping or document overflow.
- Moody Newsletter is static server-rendered navigation. Do not add JavaScript,
  decorative motion, a synthetic arrow, or fabricated form, loading, error,
  success, or disabled controls.

### UT Drupal Kit Quick Links

- Treat UT Drupal Kit Quick Links as a shared navigation ledger, not a card
  grid, CTA collection, route-specific table of contents, or replacement menu.
  Keep headlines, processed copy, link labels, destinations, link options,
  ordering, block labels, and Layout Builder placement under Drupal and editor
  control.
- Moody26 owns `utexas-quick-links.html.twig` and the `quick-links__*`
  presentation contract. Preserve formatter-built `Link` objects, target and
  rel attributes, icon-option classes, accessible-name qualifiers,
  cacheability, and attachments; never reconstruct an `href`, use `|raw`, or
  edit the UT Drupal Kit provider.
- Omit malformed legacy link arrays without a destination and empty rendered
  links. Render an optional non-empty headline as a page-safe `h2`, use it to
  label the navigation landmark, and omit empty processed-copy wrappers. A
  link-only group gets the translated `Quick links` landmark name; copy-only
  output remains a non-navigation container.
- Render destinations as one semantic list with a 44 CSS-pixel minimum target,
  readable visited color, immediate focus, active feedback, an authored
  `aria-disabled` treatment, and capability-gated hover. Preserve fragment,
  internal, entity, and external destinations without changing keyboard or
  browser behavior. Editors must pair every fragment destination with a real,
  unique, stable target ID on the same rendered page; the theme must not guess,
  fabricate, or silently redirect a missing content anchor.
- Use one safe column in narrow component containers, two columns at 36rem,
  and three at 60rem. Long editor-owned academic and event resource names may
  wrap between words; never clip, truncate, split a word, shrink below the body
  type floor, or create document overflow merely to force a single-line label.
- Quick Links are static server-rendered navigation. Do not add JavaScript,
  decorative motion, generated numbering, synthetic arrows, invented copy, or
  fabricated loading, error, success, or disabled controls.

### UT Drupal Kit Social Links

- Treat every `utexas_social_link_field` as a compact shared destination rail,
  not a route-specific promotion, icon cloud, or replacement menu. Keep the
  optional headline, configured networks, link ordering, destinations, icon
  size, block label, and Layout Builder placement under Drupal and editor
  control.
- Moody26 owns `field--utexas-social-link-field.html.twig` and the
  `social-links__*` presentation contract. Preserve the formatter-built Link
  render arrays, accessible names, network classes, URL options, cacheability,
  attachments, and provider-managed SVG files. Never reconstruct an `href`,
  use `|raw`, copy icon files into the theme, or edit the UT Drupal Kit
  provider.
- Render an optional non-empty headline as a page-safe `h2` and use it to label
  the group. A link-only rail receives the translated `Social media` name.
  Render valid destinations as one semantic list and omit empty formatter
  output without inventing a headline or label from block administration text.
- `moody26_preprocess_social_links_field()` may expose only the URL of an
  existing icon returned by `UTexasSocialLinkOptions::getIcons()`. Validate the
  provider file, preserve the formatter-owned `Url` object, and use the asset
  as a direct background image; the current black-square SVG files become
  featureless squares when treated only as alpha masks.
- Keep a 44 CSS-pixel minimum target, a 24-pixel minimum visible mark, readable
  visited color, immediate focus, active feedback, an authored
  `aria-disabled` treatment, and capability-gated hover. Medium and large
  authoring sizes may expand only when the component's own container can
  support them. Rails may wrap, but they must remain horizontal, avoid
  document overflow, and never be covered by a following legacy negative-margin
  block.
- Preserve the same field semantics in Layout Builder, footer blocks, and the
  optional responsive header placement. Header-specific CSS may change only
  placement and scale. Social Links are static server-rendered navigation; do
  not add JavaScript, motion, synthetic glyphs, generated copy, or fabricated
  loading, error, or success states.

### Moody Anchor galleries

- Treat `moody_anchors_block` as a shared portrait image gallery despite its
  legacy name. It is not page navigation, a mini-nav, a card grid, or a place
  to synthesize section anchors. Keep media, alternative text, item order,
  optional destinations, link options, block labels, and Layout Builder
  placement under Drupal and editor control.
- Moody26 owns
  `field--block-content--field-anchor-image--moody-anchors-block.html.twig`,
  `moody26_anchor_gallery_item()`, and the `anchor-gallery__*` presentation
  contract. Preserve the formatter-owned responsive-image and Link values,
  cacheability, and attachments. Do not edit the Composer-installed provider,
  reconstruct an image or `href`, use `|raw`, or copy source media into the
  theme.
- Omit a media item when its original source URI is empty or unavailable. Keep
  a valid optional action independently; when neither valid media nor action
  remains anywhere in the field, hide the block label, field output, and block
  wrapper together. Never expose the generic `Anchor Image` field label, an
  empty administrative block label, a broken-image placeholder, replacement
  art, or generated copy. Restored migrated files become visible after Drupal
  caches are rebuilt. Keep the empty block reachable on `layout_builder.*`
  routes so editors can repair it, and preserve the route cache context that
  prevents editor/public state from crossing cache entries.
- Render retained items as one translated `Image gallery` `<ul role="list">`
  with direct `<li>` children. Preserve image alternative text and intrinsic
  dimensions from the provider’s responsive formatter. Use one safe portrait
  column in narrow component containers, two columns at 30rem, and four
  `minmax(0, 1fr)` columns at 60rem; the wide alternating offset may not change
  DOM, reading, or keyboard order.
- Optional actions need a 44 CSS-pixel minimum target, concise editor-owned text
  that remains on one line at 320 CSS pixels, readable visited color, immediate
  focus, active feedback, an authored `aria-disabled` treatment, and
  capability-gated hover. Require editors to shorten an oversized label; never
  rewrite or truncate it in the theme. The decorative arrow is CSS-only,
  inherits current color, and must never receive its own underline or
  accessible name. The gallery is static server-rendered content; do not add
  JavaScript, animation, fabricated loading, error, or success UI.

### Moody image galleries

- Treat `moody_image_gallery_block` as an interactive shared media collection,
  distinct from the static legacy Moody Anchor field. Drupal and the provider
  module own image selection, focal points, alternative text, captions, order,
  JSON serialization, modal state, keyboard trap, Left/Right navigation,
  Escape close, focus restoration, cacheability, and Layout Builder placement.
  Do not edit or duplicate the Composer-installed provider in Moody26.
- Preserve the provider's semantic image buttons and modal `role="dialog"`,
  `aria-modal`, label, description, close/previous/next controls, and source
  order. The initial dialog-container focus is intentional because it announces
  the dialog name and current caption before Tab reaches Close. Any enhancement
  must be idempotent through Drupal behaviors and `once()`.
- Safari does not focus a button after pointer activation by default. Preserve
  the capture-phase opener focus with `preventScroll` so the provider records a
  stable return target before its bubble-phase click handler opens the dialog.
  Keyboard and assistive-technology activation must follow the same return path.
- Give every image button and lightbox control at least a 44 CSS-pixel target,
  immediate visible focus, active feedback, a truthful disabled treatment, and
  capability-gated hover. Do not remove focus outlines, hide controls until
  hover, create pointer-only navigation, or make color the only state signal.
- Use one safe image track in narrow containers and the provider's 60/40/full
  rhythm only after the component reaches 40rem. Keep every image-bearing grid
  track `minmax(0, …)`, preserve editor focal positions, allow captions to wrap,
  and prevent document overflow at 320, 375, 414, 768, and 1280 CSS pixels. Keep
  the restrained viewport fallback for browsers that predate container queries.
- Keep the lightbox fixed without changing page scroll position. At narrow
  widths put the image above the previous/next controls; at wide widths place
  those controls beside it without changing their DOM or keyboard order. Keep
  Close first in the focus cycle and restore focus to the invoking tile.
- Add `role="status"`, `aria-live="polite"`, and `aria-atomic="true"` to the
  provider caption so keyboard image changes are announced while focus remains
  on a control. Do not add a second competing live region or move focus on
  previous/next activation.
- A failed thumbnail becomes visible translated `Image unavailable` text and a
  disabled tile whose accessible name may retain its authored alternative. A
  failed full-size source keeps the dialog, counter, and authored description
  with a truthful translated error. Never insert placeholder art, inferred
  captions, synthetic destinations, or a retry promise the component cannot
  fulfill.
- Keep dialog motion to one bounded entrance using named duration/easing
  tokens. Under `prefers-reduced-motion`, allow only a short opacity change.
  Maintain a standalone preview for all eight Hallmark states; loading and
  success are regression fixtures, not fabricated production lifecycle UI.

### Moody Scroll Reveal Media

- Treat `moody_scroll_reveal_media_block` as a shared authored media sequence,
  not permission to force viewport panels or scroll-driven reading. Keep the
  headline, eyebrow, title, processed body, media, overlay position, order,
  alternatives, cacheability, and Layout Builder placement under Drupal and
  editor control. Do not edit the Composer-installed provider.
- Moody26 owns `moody-scroll-reveal-media.html.twig` and the
  `moody26-scroll-media__*` presentation contract. Render one semantic ordered
  list in source order; a supplied section headline is `h2` and makes item
  titles `h3`, while title-led sequences without a section headline use `h2`
  item titles. Do not generate visible numbering or generic reveal labels.
- Do not attach the provider’s public scroll-scrub library in Moody26. Its
  forced viewport geometry, scroll listener, reduced-motion gap, and second
  GSAP owner conflict with the theme’s motion settings and reading contract.
  Keep the provider’s separate administration library available to editors.
- Use one safe column in narrow component containers and a 7/5 media-copy split
  only when the component reaches 52rem. Media-only entries may vary width on
  wide containers without changing DOM, reading, or keyboard order. Every
  image-bearing track uses `minmax(0, …)` and images retain intrinsic aspect.
- Playback is visitor-controlled. Direct video uses native controls without
  autoplay or looping. Vimeo embeds retain fullscreen and picture-in-picture
  but normalize autoplay, background mode, and looping off while restoring
  controls. Give every video a descriptive name derived from editor content,
  never its stored slide delta.
- Overlay copy uses an opaque ink plate with exact burnt-orange rule so text
  contrast does not depend on a video frame or photograph. Preserve the
  editor’s nine-position choice only when the component is wide enough; narrow
  overlays use the safe lower-start position.
- A failed image or direct video hides only that media node, keeps authored
  text, and exposes translated `Media unavailable` or `Video unavailable`
  status text. Never insert placeholder art, infer copy, or promise retry.
- The production component is static. Hover is capability-gated, focus is
  immediate, links retain visited/active/authored-disabled states, and no
  decorative motion survives. Maintain an eight-state preview; loading and
  success remain regression fixtures rather than fabricated production states.

### Moody Focal Point

- Treat `moody_focal_point_block` as an authored image-detail narrative, not
  permission to make reading depend on scroll position. Keep image selection,
  alternative text, focal-point order and geometry, processed captions, slide
  counter preference, marker preference, cacheability, and Layout Builder
  placement under Drupal and editor control. Do not edit the Composer-installed
  provider.
- Moody26 owns `moody-focal-point.html.twig` and the
  `moody26-focal-point__*` presentation contract. Render one labelled section,
  one full-context figure, and one semantic ordered detail list. The translated
  section heading may be visually hidden; authored point titles are subordinate
  `h3` headings and body-only points remain readable list items.
- Do not attach the provider public focal-point library in Moody26. Its forced
  viewport footprint, sticky scroll listener, caption visibility changes, and
  second GSAP owner conflict with the theme motion and reading contracts. Keep
  the provider’s separate administration library and visual crop editor intact.
- Use the stored x/y coordinates and bounded area size to position each static
  detail crop. A configured focus square may remain on the overview, but render
  it with the exact burnt-orange token rather than the provider’s unrestricted
  stored color. Caption position and rounded-border values may survive as
  migration hooks without forcing overlay geometry into responsive layouts.
- Use one safe column in narrow containers. Detail figures may use a 2/3 split
  at 34rem, and the full overview may become a sticky 5/7 companion only at a
  60rem component width. The sticky offset must clear the site header and any
  Drupal displacement; never use a second `top: 0` sticky layer.
- Every point must be present in DOM and reading order without JavaScript. Do
  not hide captions behind scroll progress, invent carousel controls, announce
  ordinary scrolling, or duplicate alternative text on decorative crop images.
- If the source image fails, hide overview and detail media, retain every
  authored caption, and expose one translated `Media unavailable` status that
  includes the authored alternative when available. Do not fabricate retry UI,
  placeholder art, or inferred descriptions.
- Caption links need default, visited, capability-gated hover, immediate focus,
  active, and authored-disabled states. Maintain an eight-state preview;
  loading and success are regression fixtures, not fabricated public lifecycle
  messaging. `/technology/new-components` is the browser fixture.

### Moody Flip Image Grid

- Treat `moody_flip_things_flip_image_grid` as an editor-curated people
  narrative, not permission to make content depend on hover or animation. Keep
  section heading, item order, media selection, authored alternatives and
  titles, processed body, optional destinations, cacheability, and Layout
  Builder placement under Drupal and editor control. Do not edit the
  Composer-installed provider.
- Moody26 owns `moody-flip-things-image-grid.html.twig` and the
  `moody26-people-grid__*` presentation contract. Render one labelled section,
  one semantic list with direct list items, and one article per item. The
  section heading is `h2`; authored item titles are subordinate `h3` headings.
- Do not attach the provider’s public Flip Image Grid library in Moody26. Its
  hover-only jQuery flip runtime, transforms, circular crops, duplicate raw SVG
  arrows, and reduced-motion failure conflict with the theme’s reading and
  motion contracts. Keep the provider’s administration integration available
  to editors.
- Validate Media and File view access, translation, image source, physical file,
  and image validity before output. Preserve authored alternative and title
  text, intrinsic dimensions, lazy loading, cacheability, and the available
  image style. Never invent replacement art, a person name, role, metric,
  destination, or image description.
- Begin with one safe source-ordered track, allow two tracks at a 42rem
  component width, and adopt a three-item 12-column portrait triptych only at
  64rem. A restrained offset may distinguish the middle item without changing
  DOM, reading, or keyboard order. Every image-bearing track uses
  `minmax(0, …)` and long content must reflow at 320 CSS pixels.
- When server validation or a browser load fails, hide only the affected
  figure, keep title, processed copy, and destination, and expose one translated
  `Image unavailable` status that includes the authored alternative when it is
  available. Do not promise retry or remove the complete item.
- Optional destinations use an explicit visible `Learn more` label and a
  destination-specific accessible name. Preserve default, visited,
  capability-gated hover, immediate focus, active, and authored-disabled
  states with a 44 CSS-pixel target. The CSS-drawn arrow is decorative and must
  never receive its own accessible name or underline.
- The production component is static. Do not restore flipping, perspective,
  image zoom, scroll reveal, or content visibility tied to pointer position.
  Maintain an eight-state preview; loading and success remain regression
  fixtures rather than fabricated production messaging. `/` is the browser
  fixture.

### Moody Dynamic Flip Grid

- Treat `moody_flip_things_dynamic_flip_grid` as an editor-authored sequence
  of paired media, not as a hover widget. Keep the heading, pair and side order,
  media selections, authored alternatives, optional headings, processed copy,
  formatter-owned CTAs, author-selected column count, cacheability, and Layout
  Builder placement under Drupal control. Do not edit the Composer-installed
  provider.
- Moody26 owns `moody-dynamic-flip-grid.html.twig` and the
  `moody26-pair-grid__*` contract. Render one labelled section, an ordered pair
  list, one article per pair, and an ordered side list. Both sides must remain
  visible in DOM and source order. Side titles are subordinate `h3` headings;
  when absent, use concise translated structural labels rather than fabricated
  public copy.
- Do not attach the provider’s public Dynamic Flip Grid library. Its hover-only
  jQuery Flip runtime, 3D transforms, CSS background images, duplicate raw SVG
  arrows, and reduced-motion failure conflict with the theme contract. Provider
  administration behavior must remain available to editors.
- Validate Media and File view access, contextual translation, source field,
  physical file, and image validity. Output a real responsive image with
  intrinsic dimensions, lazy loading, the authored alternative and title, the
  scale-only `utexas_image_style_600w` style, and complete cacheability. Never
  crop text-bearing migrated artwork or invent missing words or images.
- Allow only the stored `round`, `square`, or `rectangle` migration style and
  one through four pair columns; these values may control allow-listed classes,
  never raw CSS. Begin with one safe track, add requested pair tracks only when
  the component has room, and place the two sides beside each other only when
  their own pair container reaches 30rem. Every image-bearing track uses
  `minmax(0, …)` and must reflow without horizontal scrolling at 320 CSS pixels.
- When server validation or browser loading fails, hide only the affected
  figure and expose one translated `Image unavailable` status containing the
  complete authored alternative when available. Retain side headings, copy,
  CTA, the companion side, and the pair’s position. Do not promise a retry.
- Formatter-owned actions need 44 CSS-pixel targets, non-wrapping labels,
  default and visited treatment, capability-gated hover, immediate visible
  focus, active, and authored-disabled behavior. Keep an eight-state preview;
  loading and success are test fixtures rather than invented public state.
  `/test123` is the browser integration fixture.

### Moody Image Grid

- Treat `moody_image_grid_image_grid` as a shared editor-curated destination
  index, not as permission to place heading text over background images. Keep
  the section heading, item order, media selections, authored alternatives and
  titles, destinations, cacheability, and Layout Builder placement under
  Drupal and editor control. Do not edit the Composer-installed provider.
- Moody26 owns `moody-image-grid.html.twig` and the
  `moody26-destination-grid__*` contract. Render one labelled section, one
  semantic list with direct list items, and one article per non-empty item.
  The section heading is `h2`; item names are subordinate `h3` headings.
- Do not attach the provider’s public Moody Image Grid library in Moody26. Its
  Bootstrap-dependent columns, CSS background images, text overlays,
  repeating orange tint, and viewport-based padding conflict with the theme’s
  responsive, media, and brand contracts. Keep its Layout Builder editor form
  available.
- Validate Media and File view access, contextual translation, source field,
  physical file, and image validity. Output a real lazy-loaded image with
  intrinsic dimensions, authored alternative and title, cacheability, and the
  provider’s available `moody_image_style_560w_x_315h` style. The provider does
  not expose its stored image-style selector to the theme hook; do not claim
  that unused setting controls output until upstream passes it through.
- Begin with one safe source-ordered track and use two safe tracks only after
  the component reaches 48rem. At 64rem, use a balanced 7/5 then 5/7 editorial
  rhythm without changing DOM, reading, or keyboard order. Every image-bearing
  track uses `minmax(0, …)` and long names must reflow without horizontal
  scrolling at 320 CSS pixels and 200% text zoom.
- Keep long authored item names as non-interactive headings. Give each supplied
  destination one separate, single-line `Visit site` action with a destination-
  specific accessible name, a 44 CSS-pixel target, default and visited
  treatment, capability-gated hover, immediate focus, active, and authored-
  disabled states. Its CSS-drawn arrow is decorative and never underlined.
- When server validation or browser loading fails, hide only the affected
  figure, preserve the title and destination, and expose one translated
  `Image unavailable` status containing the authored alternative when
  available. Never invent replacement art, a retry promise, a school name,
  destination, metric, or description.
- The production component is static. Do not add card lift, image zoom,
  scroll reveal, parallax, or text visibility tied to hover. Maintain an
  eight-state preview; loading and success remain regression fixtures rather
  than fabricated public lifecycle messaging. `/` is the browser fixture.

### Moody Showcases

- Treat Moody Showcase as a shared editorial media ledger, not a route-specific
  diptych, card stack, or scroll effect. Keep headlines, processed copy,
  responsive media, alternatives, destinations, link options, ordering, view
  modes, media options, block labels, and Layout Builder placement under
  Drupal and editor control.
- Moody26 owns `field--moody-showcase.html.twig`, `moody-showcase.html.twig`,
  and the `showcase__*` presentation contract. Preserve the formatter's
  processed text, responsive image or external-video render array, link render
  array and attributes, cacheability, and upstream attachments. Do not edit the
  Composer-installed formatter or rebuild its media and links in JavaScript or
  PHP.
- Render each non-empty collection as one `<ul role="list">` with direct
  `<li>` children and one article per retained item. Item headlines are `h2`
  headings because most published blocks hide their administrative label;
  never emit an empty heading or preserve the formatter's unconditional `h3`.
  A visible field label remains an `h2` without changing editor copy.
- Omit structurally empty stored items while preserving an item with any real
  media, headline, copy, or CTA. Missing headlines remain honest heading-free
  entries; never invent a title, replacement copy, media, or destination.
- Preserve Default, 33/66, 66/33, and Marketing view modes through stable
  migration classes. Use one safe column on narrow component containers and
  asymmetric media-copy tracks only when the component reaches 56rem. Alternate
  the media edge to create an editorial reading rhythm without changing DOM or
  keyboard order. Every image-bearing track uses `minmax(0, …)`.
- Preserve responsive source dimensions and authored alternatives without a
  universal crop. Only an editor-selected full-media or pinned-media option may
  use `object-fit: cover`. External video remains responsive and retains the
  accessible name and playback behavior supplied by its media formatter.
- Sticky and pinned choices may keep the media in view on wide component
  containers, but they remain static and text-first. Do not add scroll
  scrubbing, parallax, reveal transforms, `100vh` geometry, or a second GSAP
  owner. Narrow and reduced-motion paths stay in ordinary document flow.
- A failed image hides only its media wrapper, adds the stable
  `showcase--media-unavailable` state, and recomposes the row without removing
  headline, copy, rich-text links, or CTA. Never replace failed media with
  invented artwork.
- Rich-text links and the formatter-owned CTA require readable default and
  visited colors, immediate visible focus, active feedback, capability-gated
  hover, and a 44 CSS-pixel minimum target. Keep CTA text on one line and fix
  overlong editor labels at the source. Do not append a synthetic arrow or
  duplicate a destination.
- Showcase content is server rendered. Do not fabricate disabled, loading,
  error, or success states that cannot occur; the only supported disabled state
  is a formatter-supplied `aria-disabled="true"` destination.

### Ambient-video heroes

- Treat `ambient_video` as an authored media lead, not a decorative animation.
  Keep the provider-owned URL, poster, description track, headline, CTA, mask,
  text position, short-height choice, and fixed-scroll behavior intact. Do not
  edit the Composer-installed `moody_ambient_video` module or duplicate its
  source-loading logic in the theme.
- The provider may replace the play/pause button’s entire icon subtree after
  activation. Moody26 must preserve a translated, truthful “Play background
  video” or “Pause background video” accessible name, `aria-controls`, and a
  decorative non-focusable icon after every replacement.
- Keep the control at least 44 by 44 CSS pixels with immediate focus, active
  feedback, authored-disabled treatment, and hover only on fine pointers.
  The action name describes the next action; do not add contradictory
  `aria-pressed` state.
- Below the provider’s video breakpoint, render the authored poster as the
  primary media. A missing poster falls back to the ink surface without
  obscuring the headline or manufacturing replacement imagery.
- On video or source failure, pause playback, remove autoplay, hide and disable
  the unusable control, hide the video wrapper, and retain the poster/text
  composition through `moody26-ambient-video--fallback`.
- `prefers-reduced-motion: reduce` must remove autoplay before the provider
  loads its source, pause active playback, hide the irrelevant control, and
  expose the static fallback. A later preference change may reveal a truthful
  Play control but must never restart playback automatically.
- Keep one Ambient Video lead per page while the upstream provider uses global
  element IDs and page-level Drupal settings. Supporting multiple instances
  requires an upstream provider refactor, not duplicate theme controls.

### Moody Heroes

- Treat Moody Hero as a shared editorial page lead, not a route-specific
  billboard or a set of visually unrelated formatter styles. Keep headings,
  summaries, responsive media, background-image sources, alternatives,
  captions, credits, destinations, positions, view modes, block labels, and
  Layout Builder placement under Drupal and editor control.
- Moody26 owns `moody-hero.html.twig`, its thin formatter wrappers, and the
  `moody26-hero__*` presentation contract. Preserve processed values, media and
  CTA render arrays, link attributes, cacheability, and upstream attachments.
  Do not edit the Composer-installed formatter or reconstruct media and links.
- Render a real authored hero heading as `h2` and a summary as a paragraph.
  Never emit an empty heading or preserve the formatter's `div`/`h3` heading
  skips. Background media with a meaningful authored alternative uses
  `role="img"` and `aria-label`; decorative background media is
  `aria-hidden="true"`. Intrinsic media retains its formatter-owned alternative.
- Normalize styles 2, 3, 6, 6-short, 7, and 8 into one readable photographic
  overlay. Normalize styles 1, 4, and 5 into one neutral media-copy split that
  changes from one safe column to `minmax(0, 7fr) minmax(0, 5fr)` only at a
  60rem component width. Legacy variant and position values remain migration
  classes, not separate design systems.
- Cover every page bundle that can place the block, including subsite pages.
  Never scope the shared component to a route, node ID, bundle whitelist,
  block UUID, or editor-authored heading.
- Keep exact UT burnt orange as a rule, border, and focus signal; never restore
  a large orange hero slab, tint, or competing headline color. Overlay text
  stays white over the tokenized dark scrim; split content stays ink on paper.
- Formatter-owned CTA links require readable default and visited colors,
  immediate focus with a paper halo, active feedback, capability-gated hover,
  an `aria-disabled` treatment, a 44 CSS-pixel minimum target, and a one-line
  label. Do not add a synthetic arrow, destination, or replacement label.
- A failed intrinsic image or provider-set CSS background hides only its media
  wrapper, adds `moody26-hero--media-unavailable`, and recomposes the authored
  content on paper. Probe the resolved background URL because CSS backgrounds
  do not expose native error events. Do not invent placeholder art.
- Heroes are static server-rendered content. Do not add parallax, scroll
  scrubbing, reveal motion, viewport-forced panels, or fabricated loading,
  error, success, or disabled states.

### UT Drupal Kit Heroes

- Treat `utexas_hero` as a second provider of the shared Moody26 editorial
  hero contract, not as a separate design system. The Default and five numbered
  view modes must use thin `utexas-hero*.html.twig` adapters that pass the
  formatter output unchanged into `moody-hero.html.twig`.
- Preserve formatter-owned responsive media and preload attachments,
  background identifiers and inline source rules, authored alternatives,
  headings, summaries, captions, credits, CTA render arrays, link attributes,
  cacheability, anchor choices, view modes, and Layout Builder placement. Do
  not edit the Composer-managed UT Drupal Kit module or reconstruct its media
  and links.
- The upstream Default and style 4 formatters omit intrinsic image dimensions.
  Keep the narrow `moody26_preprocess_utexas_hero*()` correction that reads the
  formatter URI and, when that local source is readable, supplies width and
  height on the existing render array; never replace the media, its responsive
  style, or its cache metadata.
- Preserve the formatter’s source-selector compatibility hooks only where its
  generated responsive background rules require them: `hero-img` for style 1,
  `hero--photo-gradient` for style 2, `ut-hero` for style 3, and an ancestor
  `hero--half-n-half` for style 5. These are source metadata, not permission to
  restore the legacy wrappers or their visual CSS.
- Map Default to the intrinsic media plate; styles 2 and 3 to the readable
  photographic overlay; and styles 1, 4, and 5 to the neutral media-copy split.
  Keep the formatter style and anchor as migration classes so re-enabling an
  existing author choice remains safe.
- Apply the contract anywhere `.block-bundle-utexas-hero` or
  `.field--type-utexas-hero` is rendered. Never bind the implementation to a
  route, node ID, block UUID, bundle whitelist, or authored phrase.
- Use the shared `h2`/paragraph semantics, meaningful-background naming,
  decorative-background suppression, tokenized scrim, one-line 44-pixel CTA,
  immediate focus, and visited, hover, active, and truthful disabled states.
  At 320, 375, 414, and 768 CSS pixels, media-bearing tracks remain safe and
  headings can wrap within long words without causing horizontal overflow.
- A failed intrinsic image or CSS background collapses through the shared
  `moody26-hero--media-unavailable` state and leaves the authored content
  readable on paper. Never insert placeholder art or duplicate a destination.

### UT Drupal Kit Hero Carousels

- Treat `utexas_hero_carousel` as a progressive wrapper around the shared UT
  Drupal Kit Hero contract. Preserve slide order, Hero render arrays, media
  alternatives, destinations, preload and responsive-background attachments,
  autoplay, speed, fade, cacheability, and Layout Builder placement. Do not edit
  the Composer-managed provider or reconstruct slide content.
- Remove only `utexas_hero_carousel/formatter` and its block-local settings in
  `moody26_preprocess_block()`. Strip the provider’s Bootstrap presentation
  classes, retain its unique root ID, and never suppress field-level media or
  preload attachments.
- The no-JavaScript contract is every authored slide in document order with the
  controls hidden. Enhancement may expose one slide at a time only after it can
  also mark inactive slides `aria-hidden="true"` and inert. Never hide fallback
  content in Twig or require Bootstrap to restore it.
- Name the root as a carousel region from the reusable block label. Name each
  slide with its current position and total, and expose Previous, Play/Pause,
  Next, and a concise live position status. Do not generate one button per slide
  or restore the provider’s full-height overlay controls.
- Editor-enabled autoplay must pause while a pointer is within the component
  and while the document is hidden. Keyboard focus stops automatic rotation
  until an explicit Play action. Reduced motion prevents automatic startup and
  removes fades; only an explicit Play action may opt in. Manual navigation
  announces position without moving focus or scroll.
- Keep every control at least 44 CSS pixels, with one-line labels, immediate
  visible focus, non-color active feedback, capability-gated hover, and honest
  disabled treatment. The synchronous controller does not fabricate loading,
  error, or success states.
- Verify 320, 375, 414, 768, and wide layouts; keyboard traversal; focus and
  pointer pausing; Play/Pause state; wraparound navigation; hidden-document and
  reduced-motion behavior; no-JavaScript reading order; and long carousels that
  do not create an indicator rail or document overflow.

### UT Drupal Kit Photo Content Areas

- Treat `utexas_photo_content_area` as a shared editorial media-and-copy
  component, not a homepage-only split or a route-specific selector. Keep
  responsive media, alternatives, photo credits, headlines, processed copy,
  links and their options, ordering, view mode, cacheability, block labels, and
  Layout Builder placement under Drupal and editor control.
- Moody26 owns `utexas-photo-content-area.html.twig` and the
  `photo-content__*` presentation contract. Preserve formatter-built media and
  link render arrays, attributes, cacheability, and attachments. Do not edit
  the profile-managed provider, rebuild a destination, use `|raw`, or depend on
  a consumer route or page bundle.
- Omit a structurally empty stored item. Render an authored headline as `h2`,
  the image and its optional credit as `figure` and `figcaption`, processed copy
  as ordinary editorial flow, and destinations as one real list. Never invent
  a heading, credit, CTA, arrow, image, or replacement link.
- Preserve responsive source dimensions, authored alternatives, and the
  intrinsic media proportion. Do not apply a universal aspect ratio,
  `object-fit: cover`, or overflow crop to this provider because active content
  includes images whose full frame can carry meaning.
- Keep Default in one safe column until the component reaches 48rem, then use
  a `minmax(0, 5fr) minmax(0, 7fr)` split. Keep the provider's Stacked display
  deliberately one column at every size. Text-only and failed-media content
  recomposes without an empty image track; failed media-only content collapses.
- Links need readable default and visited color, immediate visible focus,
  active feedback, an authored `aria-disabled` treatment, capability-gated
  hover, and a 44 CSS-pixel minimum target. Long formatter-owned labels may
  wrap between words rather than clip, truncate, split ordinary words, or
  widen the document.
- Photo Content Areas are static server-rendered content. Do not add decorative
  motion or fabricate loading, error, success, or disabled controls that the
  provider does not supply. Verify content-rich, media-only, text-only, linked,
  stacked, empty, and failed-media states without using route IDs, node IDs,
  block UUIDs, or authored phrases in the runtime contract.

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

### Feature stories

- Treat every published `moody_feature_page` node as one shared Long Document
  article system, not as a route-specific News page. Never scope its runtime
  contract to a node ID, component UUID, headline, or component position.
- The page-title block remains the sole document `h1`. Add
  `moody26-feature-story--long-title` only when the authored title exceeds 90
  characters; step it down to the shared heading scale rather than clipping,
  truncating, or rewriting it.
- Derive lede, date, body, and credit classes from their Layout Builder field
  plugin IDs in preprocess. Preserve each field’s formatter, render array,
  cacheability, content, and editor-controlled ordering.
- Keep the narrative in one 45–75-character reading column. Use a real `time`
  element for the publication date, retain semantic heading order, and keep
  lists, quotations, tables, inline media, captions, and links usable at 320,
  375, 414, 768, and 1280 CSS pixels and at 200% zoom.
- Theme-owned feature-credit markup must expose a translated assistive “By”
  label, the supplied contributor name, and the optional supplied role. Group
  the field as “Story credits”; never invent a contributor or job title.
- Preserve editor-owned inline media and captions without a universal crop.
  Missing media leaves the prose and credits intact and does not introduce
  placeholder art, replacement copy, or an empty media track.
- Feature stories remain static server-rendered articles. Do not add parallax,
  scroll reveals, sticky reading progress, fabricated related links, or
  article-only JavaScript.

### Shorthand stories

- Treat `moody_shorthand_zip_shorthand_zip_story` as a shared integration
  boundary, never as a route-, node-, title-, component-UUID-, or position-
  specific exception.
- Preserve non-empty provider markup, attachments, and cacheability unchanged.
  Do not parse arbitrary export HTML in Twig, reconstruct its destinations,
  restyle its internal sections as Moody26 components, or apply global motion
  to it.
- When the provider returns empty markup, render one translated, labelled
  `section` in ordinary document flow with “Story unavailable” and the factual
  recovery instruction “The embedded story did not load. Try this page again
  later.” Do not add a live region, spinner, disabled button, placeholder image,
  fabricated story summary, or guessed destination.
- Keep the unavailable state flat, left aligned, and container-aware. Use exact
  burnt orange only for its leading rule, keep body copy at 16 CSS pixels or
  larger, and preserve reflow at 320, 375, 414, and 768 CSS pixels and 200%
  zoom. The static boundary adds no interactive or motion states.
- The consuming site owns Shorthand exports and their asset migration. Before
  production, the provider module must resolve and validate its configured
  directory before reading `index.html`; a theme fallback cannot suppress a
  provider PHP warning or restore missing files.
- Prefer a Drupal stream-wrapper URI or a location resolved through the file
  system service. Never persist environment-specific absolute filesystem paths
  as the portable Layout Builder contract, and keep the browser asset base
  separate from the server path used to read the export.
- Review every available export independently for heading order, landmarks,
  keyboard reachability, visible focus, touch targets, reflow, contrast,
  descriptive links, media alternatives, captions or transcripts, reduced
  motion, and UT brand compliance. The outer theme cannot certify arbitrary
  exported HTML.
- Test both a complete export and an empty provider result. The complete state
  must retain the provider output; the empty state must expose one semantic
  fallback, contain no interactive controls, and create no horizontal overflow.

### PDF documents

- Treat `moody_flipbook_pdf_flipbook` as a shared PDF document boundary, never
  as a route-, node-, title-, component-UUID-, or position-specific exception.
- Do not render or attach the legacy DFlip canvas runtime in Moody26. Its
  document-wide Left/Right listener, mouse-only `<div>` controls, sub-44-pixel
  targets, and optional WebGL page motion do not meet the theme’s keyboard,
  target-size, and reduced-motion contracts. Do not attempt a cosmetic CSS-only
  repair or recreate those controls in theme JavaScript.
- Keep the editor-selected Media entity as the source of truth. Resolve legacy
  scalar or widget-array configuration, check Media and File view access,
  require a PDF MIME type or `.pdf` filename, verify the physical stream-wrapper
  source, and bubble entity and access cacheability before exposing a URL.
- Render one labelled `section` with the authored block label or document title.
  A valid source gets one descriptive native “Open PDF” link whose accessible
  name includes the document title. Do not force a new window, claim that the
  PDF itself is accessible, add autoplay, or invent metadata or destinations.
- A missing, inaccessible, or non-PDF source gets “Document unavailable” and
  “The PDF could not be loaded. Try this page again later.” in ordinary document
  flow. Do not emit the provider seed, a live region, spinner, disabled action,
  placeholder preview, or broken link. Keep physical-file failures uncacheable
  because restoring a file alone may not invalidate an entity cache tag.
- Keep the boundary flat, left aligned, token governed, and container-aware.
  The action remains at least 44 by 44 CSS pixels, on one line, with visible
  non-animated focus and complete static-link states. Verify 320, 375, 414, and
  768 CSS pixels, 200% zoom, keyboard order, and no horizontal overflow.
- Treat each PDF as independently authored content. Before production, validate
  its tags, title, language, reading order, headings, link names, tables, image
  alternatives, and contrast with a document accessibility tool and manual
  review; the outer HTML boundary cannot certify the file.

### Event details

- Treat every published `moody_event` node as one shared fleet event-detail
  system. Never scope it to a node ID, route, title, component UUID, or stored
  field position.
- The page-title block remains the sole document `h1`. Add
  `moody26-event--long-title` only when the authored title exceeds 90
  characters, and step down to the shared heading scale rather than clipping,
  truncating, or rewriting it.
- Moody26 owns `templates/content/node--moody-event.html.twig`. Keep Event
  details at `h2`, express available date, location, host, audience, and tag
  facts with `dl`, `dt`, and `dd`, and preserve Drupal’s formatter render
  arrays, cache metadata, and semantic `time` output.
- Hide only redundant field labels in preprocess. Do not flatten formatter
  output into unescaped strings, rebuild links, invent absent metadata, or
  change field configuration in the theme.
- Event fact links and the external source action need a 44 CSS-pixel minimum
  target, complete static link states, descriptive names, and immediate visible
  focus. The source action must announce that it is an external link.
- Preserve the event image’s editor-authored alternative, actual source
  dimensions, and natural aspect ratio. Do not apply a universal crop. Validate
  the source file server-side and omit missing or invalid media without a
  broken-image glyph, placeholder art, or empty media track.
- Date, location, host, audience, tags, status, body, action, and media are
  independently optional. Empty facts collapse individually; missing media
  recomposes the lead while body, action, and available details remain intact.
  When no facts exist, omit the details heading, list, region, and wide track.
- Event details remain static and server rendered. Do not add event-only
  JavaScript, parallax, scroll reveals, a sticky details panel, or fabricated
  loading, error, success, disabled, or availability states.
- Test representative events at 320, 375, 414, 768, and 1280 CSS pixels,
  including a title longer than 90 characters, a missing source image, optional
  facts, keyboard focus, heading order, 200% zoom, and horizontal reflow.

### Upcoming event listings

- Treat every `moody_events_moody_events_v2` placement as one shared
  API-backed events ledger. Never scope it to `/alumni`, a block UUID, label,
  department, event ID, or Layout Builder position.
- The provider module continues to own remote retrieval, filtering, limits,
  cache lifetime, image visibility, event data, and its attached library.
  Moody26 owns `templates/components/moody-events-v2-block.html.twig` and the
  `moody-events-v2__*` presentation contract. Do not copy the HTTP client,
  rebuild provider URLs, or edit the Composer-managed module.
- Require a visible block label before the list so each event can use `h3`
  without skipping a heading level. Render the collection as `ul`/`li`, each
  event as an `article`, and the supplied start value as a `time` with its
  provider-owned ISO `datetime` value.
- Give each event at most one destination. The title names that link; the
  pointer target may cover its event surface, but date, description, and the
  decorative “Event details” cue must not create duplicate links or inflate the
  accessible name. Events without a URL remain readable non-interactive
  articles and must not receive a guessed destination.
- Remote listing thumbnails duplicate the adjacent event title because the
  provider exposes no independent editorial alternative. Render them with an
  empty alternative, reserved dimensions, lazy decoding, and the existing
  `js/accessibility.js` failure boundary. A failed image hides only its media
  rail, adds `moody-events-v2__item--media-unavailable`, and preserves the
  event’s title, date, description, and destination.
- An empty or unavailable provider response must say “No upcoming events are
  available from the Moody calendar right now.” Keep the full-calendar and
  submission destinations available as a labelled navigation region. Never
  fabricate events, dates, availability, or distinguish an empty feed from a
  provider failure when the provider supplies no error state.
- Keep the ledger flat and left aligned. Begin with one safe content track and
  add the 5/7 media-content split only at a 42rem component width; use the same
  viewport fallback when container queries are unavailable. Action labels stay
  on one line, reflow into separate rows at narrow widths, retain 44 CSS-pixel
  targets, and expose immediate visible focus.
- Production listings are static and server rendered. Disabled, loading,
  error, and success examples belong only in
  `css/components/events-listing.preview.html`; do not add feed polling,
  decorative reveal motion, scripted repeat announcements, or event-list-only
  navigation JavaScript.
- Test events-present, feed-empty, missing-image, missing-URL, image-hidden,
  long-title, and long-description cases at 320, 375, 414, 768, and 1280 CSS
  pixels, plus keyboard order, heading order, 200% zoom, reduced motion, and
  horizontal reflow.

### Faculty profiles

- Treat every published `moody_faculty_bio` node as one shared fleet profile
  dossier. Never scope presentation or behavior to a faculty name, node ID,
  route, department, component UUID, or current field order.
- The page-title block remains the sole document `h1`. Moody26 owns
  `templates/content/node--faculty-bio.html.twig`; position and department form
  the identity lead, Contact and Related links use `h2`, and every available
  dossier panel begins with an `h2` matching its section index label.
- Preserve Drupal formatter render arrays for position, departments, email,
  telephone, office, personal links, social destinations, assistants, and all
  profile sections. Hide only redundant field labels. Never flatten processed
  text, entity labels, or links into unescaped strings.
- Express email address, phone number, and office with `dl`, `dt`, and `dd`.
  Keep personal link titles descriptive and wrapping; reserve one-line button
  treatment for the concise “Download CV (PDF)” and “View UT directory”
  actions. All actionable controls require immediate focus and a minimum 44
  CSS-pixel target where the inline-target exception does not apply.
- Preserve the existing `faculty_bio_image` image style and editor-authored
  alternative. Validate its source server-side before rendering. Validate the
  referenced PDF before exposing the CV action. Missing media and files must
  recompose without a broken glyph, placeholder artwork, disabled control, or
  empty track; position, contacts, links, and sections remain available.
- Normalize Biography, Degrees, Expertise, Courses, Affiliations, Assistants,
  and custom content into the existing progressive `.flex-tabs` contract.
  Custom content without a title receives the translated fallback “More” so
  historical editor content is not lost.
- Preserve the complete no-JavaScript reading order: section labels remain
  ordinary fragment links and every section remains visible. The shared tab
  controller alone may add ARIA Tabs state, inactive-panel hiding, roving
  `tabindex`, Arrow, Home, and End behavior after it can manage every pair.
- Profiles remain static and server rendered. Do not add Bootstrap tabs,
  profile-only JavaScript, sticky identity rails, placeholder biographies,
  fabricated credentials, decorative motion, or asynchronous states.
- Test representative complete and missing-file profiles at 320, 375, 414,
  768, and 1280 CSS pixels, including long names, long personal-link labels,
  keyboard section navigation, heading order, 200% zoom, and reflow.

### Featured Highlights

- Treat the UT Drupal Kit Featured Highlight as a shared fleet component, not
  a page-specific card. Keep headline, date, copy, media, link text,
  destination, view mode, and Layout Builder placement under Drupal and editor
  control.
- Moody26 owns the `utexas-featured-highlight.html.twig` override and its
  layout. Preserve the formatter’s `media_identifier`, `attributes`, headline
  link, responsive media render array, processed-text format, and CTA access
  attributes; do not duplicate formatter logic in JavaScript or PHP.
- Normalize Default, Bluebonnet, and Charcoal view modes to the theme’s neutral
  paper and ink treatment. The legacy choice remains stored for migration, but
  secondary full-bleed colors must not compete with official burnt orange.
- Use one safe column on narrow component containers, a 5/7 media-content grid
  for wide highlights, and a 4/8 text-only composition. Tracks containing
  media must use `minmax(0, …)`, and the component must recompose when media
  fails.
- Keep linked headlines as the primary keyboard destination. Preserve the
  formatter’s existing `aria-hidden="true"` and `tabindex="-1"` on a redundant
  visible CTA; when there is no headline link, the formatter keeps the CTA
  accessible. Never create two keyboard stops for one destination.
- Provide immediate focus, capability-gated hover, active feedback, readable
  link contrast, and a 44-pixel minimum CTA target. Long editor-authored link
  text may wrap rather than overflow or be truncated; editors should still use
  concise, descriptive labels and never “Click here.”
- Preserve image alternatives and the formatter’s responsive source output.
  Failed image output hides only the media wrapper and retains the content.
  External video remains responsive; its accessible name and playback behavior
  remain owned by the UT Drupal Kit media formatter.
- Do not invent dates, headings, or CTA text, and do not silently rewrite rich
  text heading levels. Content editors remain responsible for keeping headings
  in document order and supplying descriptive alternatives and destinations.

### Moody Promotions

- Treat Moody Promotion as a shared fleet component, not a route-specific
  marketing panel. Keep media, date, headline, processed copy, CTA text,
  destination, link options, and Layout Builder placement under Drupal and
  editor control.
- Moody26 owns `moody-promotion.html.twig` and reuses the
  `featured-highlight__*` Editorial Signal Band presentation contract. Preserve
  every formatter-rendered field and link attribute; never rebuild an `href`,
  use `|raw`, duplicate formatter logic, or attach a second component library.
- Headline, date, copy, media, and CTA are independently optional. Emit the
  headline as a page-safe `h2`, omit empty wrappers, and emit no component for
  a completely empty stored placement.
- Use the same neutral paper, burnt-orange rule, single-column narrow layout,
  safe 5/7 media-content grid, and asymmetric 4/8 text-only layout as Featured
  Highlight. Never restore the legacy turquoise panel or introduce a nested
  card.
- Formatter-owned CTA links retain their target, relationship, classes, and
  accessible names. Provide a 44 CSS-pixel minimum target, readable visited
  color, immediate visible focus, active and authored disabled feedback, and
  capability-gated hover. Editors should replace generic “Click here” labels
  with destination-specific copy when content is next revised.
- Failed image output hides only the media wrapper, recomposes to the text-only
  layout, and preserves all remaining content. Empty placements must not create
  spacing, rules, landmarks, or headings.
- Moody Promotion is static server-rendered content. Do not add decorative
  motion or fabricate loading, error, or success states.

### Promo Lists

- Treat the UT Drupal Kit Promo List as a shared content collection, not a
  page-specific card grid. Keep group headings, item headlines, processed copy,
  destinations, link options, images, view modes, ordering, and Layout Builder
  placement under Drupal and editor control.
- Moody26 owns the `utexas-promo-list.html.twig` override and its layout.
  Preserve formatter-provided filtered text, processed-text render arrays,
  headline link attributes, responsive image output, and field attributes; do
  not duplicate formatter logic in JavaScript or PHP.
- Render every non-empty collection as a semantic list and every entry as a
  list item. A visible group heading is an `h2` and its item headings are `h3`.
  Without a group heading, item headings become `h2`; never skip directly from
  the page `h1` to an item `h3`.
- Ignore structurally empty stored entries rather than rendering blank rows.
  Never invent replacement headings, copy, destinations, or media.
- Keep default and stacked modes in one column. Add two safe tracks for the
  responsive mode and the two-lists mode only when the component container is
  at least 52rem wide. Every image-bearing track must use `minmax(0, …)`.
- Keep the formatter’s 64–85 pixel square image derivatives compact. Preserve
  editor-authored alternatives and intrinsic dimensions. Failed images hide
  only their media wrapper and recompose the item without removing its text or
  links.
- Headline and rich-text links need readable contrast, immediate visible
  focus, active feedback, and capability-gated hover. Long editorial headline
  links may wrap rather than overflow or be truncated; this is prose-link
  behavior, not a button or CTA exception. Editors should still use concise,
  descriptive text and never “Click here.”
- The Promo List is static server-rendered content. Do not fabricate disabled,
  loading, error, or success states, add decorative motion, or turn the whole
  item into a duplicate link target.

### Flex Content Areas

- Treat the UT Drupal Kit Flex Content Area as a shared editorial media
  dossier, not a page-specific card grid. Keep headlines, processed copy,
  destinations, secondary links, CTAs, media, ordering, author variants, and
  Layout Builder placement under Drupal and editor control.
- Preserve the upstream formatter’s filtering, link attributes, processed-text
  render arrays, responsive image output, external video, CTA accessibility
  attributes, and cacheability. Twig owns semantic structure and CSS owns
  presentation; do not duplicate formatter logic in JavaScript or PHP.
- Render each collection as a semantic list and each entry as a list item
  containing an article. Preserve the upstream item headline as `h3`: real
  placements occur under both authored section `h2` headings and visible block
  labels. Editors must provide one of those meaningful `h2` group headings;
  never publish an administrative block label or add route-specific heading
  heuristics in the theme.
- Keep one safe track by default. At component widths of 38rem, allow the
  default and two-column modes to use two tracks. Allow three- and four-column
  modes to reach three tracks at 54rem and four tracks at 68rem. At 52rem, the
  one-column mode may use a safe 5/7 media-copy band. Every track must use
  `minmax(0, …)` and remain readable in narrow Layout Builder regions.
- Preserve intrinsic responsive-image dimensions and editor-authored
  alternatives. Use a 3:2 image frame and CSS-owned 16:9 external-video frame;
  do not depend on the legacy one-time jQuery iframe height calculation.
  Failed images hide only their media wrapper and recompose the item without
  removing content or destinations.
- A linked headline is the primary keyboard destination. Suppress the
  formatter’s redundant `aria-hidden="true"` CTA visually as well as from the
  accessibility tree. Keep a standalone CTA accessible, descriptive, and at
  least 44 CSS pixels high; never add two stops for one destination.
- Provide immediate focus, active feedback, readable link contrast, and
  capability-gated hover. Long prose and link text may wrap without splitting
  ordinary words, overflowing, truncating, or being converted to controls.
- The Flex Content Area is static server-rendered content. Do not fabricate
  disabled, loading, error, or success states or add decorative motion.

### Image Links

- Treat the UT Drupal Kit Image Link as a shared linked-media component, not a
  route-specific card or a generic image selector. Keep its destination, link
  text, link options, responsive image, media alternative, block label, and
  Layout Builder placement under Drupal and editor control.
- Moody26 owns the `utexas-image-link.html.twig` override and
  `image-link__*` presentation hooks. Preserve the formatter’s rendered image,
  URL object, attributes, responsive sources, and cacheability; never recreate
  its link or media-loading logic in PHP or raw Twig markup.
- Give each linked image an accessible name from the formatter’s descriptive
  link text. For migrated content without link text, use the media alternative
  instead of allowing the upstream external-link enhancement to create an
  empty label. Preserve truthful external and new-window qualifiers, but remove
  a stale external-link class from same-origin destinations.
- Preserve the responsive image’s intrinsic ratio and dimensions. Active
  content includes portrait report covers, square artwork, and wide graphics;
  never add a universal `aspect-ratio`, `object-fit: cover`, or overflow crop
  that can remove essential image text.
- The full linked image is the target. It must have a 44 CSS-pixel minimum,
  immediate visible focus, active feedback, readable link contrast, and
  capability-gated hover. Compact visible block labels may wrap without
  splitting words or escaping narrow Layout Builder regions.
- If linked media fails, hide the broken picture and expose its alternative as
  a visible, underlined text link while retaining the destination and
  accessible name. If unlinked media fails, collapse it. Never invent
  placeholder art, captions, CTA text, or a second destination.
- Image Links are static server-rendered content. Do not add decorative motion
  or fabricate disabled, loading, error, or success states.

### Flex Color Blocks

- Treat Moody Flex Color Blocks as a shared task collection, not route-specific
  color tiles or a generic card grid. Keep headlines, subheadlines,
  destinations, block labels, ordering, and Layout Builder placement under
  Drupal and editor control.
- Moody26 owns the specific field and item Twig overrides plus the
  `flex-color-blocks__*` presentation contract. Preserve sanitized formatter
  text, its URL object, field/item attributes, and cacheability. Never rebuild
  a destination with a raw `href` or add JavaScript navigation.
- Render every collection as a real `<ul role="list">` with direct `<li>`
  children. Item titles are descriptive link text, not repeated headings. The
  visible Layout Builder block label or surrounding authored heading owns the
  section level.
- A linked item is one full-row target with a 44 CSS-pixel minimum, immediate
  visible focus, active feedback, readable contrast, and capability-gated
  hover. An item without a destination must remain plain content with no fake
  pointer, role, tabindex, arrow, or other interactive styling.
- Use one safe track at narrow component widths and two safe tracks only when
  the block container reaches 48rem. For an odd item count, let the first item
  span both tracks; never restore an equal three-card grid. Long titles and
  subheadlines may wrap without splitting words, truncating, or overflowing.
- Keep stored orange, gray, blue, and green values only as migration classes.
  Do not render them as large surfaces or invent tints. Exact UT burnt orange
  remains a rule, underline, and focus signal; secondary colors must not
  compete with it.
- Flex Color Blocks are static server-rendered content. Do not add decorative
  motion, generated arrow text, invented calls to action, or fabricated
  disabled, loading, error, or success states.

### Moody Quotations

- Treat Moody Quotations as shared authored editorial figures, not
  route-specific testimonials, cards, or full-width color bands. Keep quote
  text, author, attribution, media, alternative text, CTA, link options,
  ordering, and Layout Builder placement under Drupal and editor control.
- Moody26 owns `moody-quotation.html.twig` and the `moody-quotation__*`
  presentation contract. Preserve the formatter's processed text, responsive
  media render array, URL and link attributes, cacheability, and attached
  upstream library. Do not recreate a destination with raw Twig or duplicate
  formatter behavior in JavaScript or PHP.
- Render one query-container wrapper around one `<figure>` with one
  `<blockquote>` and, when author or attribution exists, one `<figcaption>`.
  The wrapper must remain outside the figure so its container query can
  respond to the actual Layout Builder region width. Keep `<figcaption>` as
  the figure's direct last child, with an optional formatter-owned CTA inside
  it. Put the rendered quotation in a paragraph. An author is not the title of
  a cited work, so do not use `<cite>` for a person's name. Do not add generated
  quote-mark content that may be announced or duplicate punctuation already
  present in editor copy.
- Retain `default`, `orange`, `grey`, and `feature` values only as stable
  `moody-quotation--legacy-*` migration classes. They must not change the
  semantic structure, create burnt-orange tints, restore large color surfaces,
  or compete with exact UT burnt orange. Use the accent only for rules,
  underlines, and focus.
- Use a readable 45–75 character measure and approved roman Charis SIL for the
  quotation. Derived short, medium, and long classes may tune the type scale,
  but must never truncate, split ordinary words, or alter editor content.
  Text-only figures may be trailing-edge biased at wide widths instead of
  centered by default.
- Keep media above the copy in narrow containers and allow a safe 5/7
  media-copy grid only when the component reaches 52rem. Both image-bearing
  tracks must use `minmax(0, …)`. Preserve responsive source dimensions and
  authored alternatives without a new crop. A failed image hides only its
  media wrapper and recomposes the figure without removing quote, attribution,
  or CTA.
- A CTA remains the formatter's one descriptive destination. Keep concise
  labels on one line; when an authored label cannot fit a narrow component,
  wrap it between words instead of clipping, truncating, or splitting words.
  Give it at least a 44 CSS-pixel target and provide readable default and
  visited color, immediate visible focus, active feedback, an `aria-disabled`
  treatment, and capability-gated hover. Never add a synthetic arrow or
  second link.
- Quotations are static server-rendered content. Do not add decorative motion,
  invented authors, placeholder art, proof claims, or fabricated loading,
  error, or success states. Placeholder or incomplete stored copy is editorial
  debt and must not be silently rewritten by the theme.

### Moody Flex Grids

- Treat Moody Flex Grids as shared editorial directories, not route-specific
  cards or effects. Keep group headlines, item headlines, titles, processed
  copy, media, alternatives, destinations, CTA labels, ordering, column
  choice, and Layout Builder placement under Drupal and editor control.
- Moody26 owns all six active formatter templates through one shared
  `moody-flex-grid-standard.html.twig` implementation and the
  `flex-grid__*` presentation contract. Preserve formatter-owned responsive
  render arrays, processed text, URL objects, cacheability, and upstream
  attachments. Do not edit the Composer-installed formatter, reconstruct raw
  `href` attributes, add JavaScript navigation, or duplicate markup among
  view modes.
- Render every collection as one `<ul role="list">` with direct `<li>`
  children and one `<article>` per item. When the formatter supplies a group
  headline, render it as `h2` and its item headlines as `h3`. Without an
  internal group headline, render item headlines as `h2` so a hidden or absent
  Layout Builder label cannot force an `h1`-to-`h3` skip. Do not expose hidden
  administrative labels or silently repair malformed editor copy.
- A linked item without authored CTA text is one full-entry destination. An
  item with authored CTA text is ordinary article content followed by one
  formatter-owned CTA. Never restore separate image, card, empty, hidden-name,
  generated “View,” or “View more” links to the same destination.
- Retain standard, circular, promo, rectangular, card, and flip variants.
  Keep column count, alignment, headline color, rounded-edge, and overlay
  values only as stable `flex-grid--legacy-*` migration hooks. Only the
  circular variant may keep its established circular crop. The dormant flip
  mode must remain static and text-first because its upstream formatter does
  not provide accessible responsive image output; do not restore hover,
  pointer, keyboard, or JavaScript flip behavior.
- Use one safe track by default, two tracks at a 38rem component width, three
  at 58rem where authored, and four at 76rem where authored. Every
  image-bearing track must use `minmax(0, 1fr)`. Long headings, titles, copy,
  and full-entry heading links may wrap between words without truncating,
  splitting ordinary words, or causing horizontal overflow. CTA labels remain
  one-line affordances; shorten editor copy when a label cannot fit its narrow
  component rather than clipping or wrapping it.
- Preserve formatter-owned media alternatives and intrinsic dimensions. A
  failed image must hide only its media wrapper, add the stable
  `flex-grid__article--media-unavailable` state, and leave headings, copy,
  titles, and destinations intact.
- Full-entry links and CTAs require readable default and visited color,
  immediate visible focus, active feedback, an `aria-disabled` treatment,
  capability-gated hover, and a 44 CSS-pixel minimum target. Exact UT burnt
  orange remains a collection rule, underline, and focus signal—not a large
  tile, overlay, tint, or competing headline color.
- Flex Grids are static server-rendered content. Do not add decorative motion,
  synthetic arrows, invented calls to action, placeholder imagery, or
  fabricated loading, error, or success states.

### Moody Impact Facts

- Treat Moody Impact Facts as shared authored proof ledgers, not route-specific
  stat cards, heading grids, or decorative claims. Keep group headlines, fact
  values, descriptions, ordering, column choice, block labels, and Layout
  Builder placement under Drupal and editor control.
- Moody26 owns `moody-impact-facts.html.twig` and the `impact-facts__*`
  presentation contract. Preserve formatter-owned content, migration values,
  cacheability, and upstream attachments. Do not edit the Composer-installed
  formatter or duplicate its data mapping in PHP or JavaScript.
- Render every non-empty collection as one `<ul role="list">` with direct
  `<li>` children. Render an authored group headline as `h2`; values and
  descriptions remain ordinary paragraph content, not repeated headings.
  This structure must support numeric facts, dates and deadlines, and authored
  `WHAT` / `WHEN` / `WHERE` statements without changing the page outline.
- Omit structurally empty stored entries while preserving any authored value
  or description that is present. Never invent a missing pair, placeholder
  metric, ranking, deadline, outcome, or explanatory label. Editors remain
  responsible for validating every published claim and date.
- Use one safe track by default and two tracks at a 42rem component width. At
  64rem, preserve two-, three-, and four-per-row choices as migration layout
  classes; use safe `minmax(0, 1fr)` tracks and a deliberate asymmetric
  composition for three-item rows. Long content may wrap between words without
  truncating, splitting ordinary words, or causing horizontal overflow.
- Use approved Charis SIL for prominent values, Libre Franklin for context,
  and tabular numerals for data. Keep exact UT burnt orange to the collection
  rule rather than a large surface, tint, or competing headline color. Stored
  orange/grey style choices remain migration classes and do not alter color.
- Impact Facts are static server-rendered content with no destinations. Do not
  add JavaScript, decorative motion, synthetic icons, fake interaction, or
  fabricated disabled, loading, error, or success states.

### Accordions

- Treat Moody Accordion blocks as one shared component used across the fleet,
  not as page-specific FAQ styling. Keep questions, answers, links, headings,
  and Layout Builder placement under Drupal and editor control.
- Use native `<details>` and `<summary>` for disclosure state and keyboard
  behavior. Do not add Alpine, Bootstrap collapse, custom JavaScript state,
  or manually duplicated `aria-expanded` and `aria-controls` attributes.
- Keep every block heading in the surrounding document hierarchy. A question
  is the accessible name of its native summary control, not a fake heading.
- Answers start closed, and multiple answers may remain open so readers can
  compare instructions. Keep answer prose and links in ordinary document flow;
  do not animate, absolutely position, or height-clip the content panel.
- Give each summary at least a 44 CSS-pixel target and immediate visible focus.
  Capability-gate hover and provide a plus-to-minus expanded signal that does
  not depend on color. The decorative indicator stays out of the accessibility
  tree and its transform transition is removed for reduced motion.
- Preserve native Enter and Space operation, sequential Tab order, 320-pixel
  reflow, long-question wrapping without split words, and link contrast in
  every consuming context.

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
- Primary controls, navigation labels, breadcrumbs, tabs, and compact CTA
  labels stay on one line. Reflow the parent or collapse navigation before
  those labels wrap; long formatter-owned editorial link labels may wrap
  between words when that is the only way to preserve their complete text.
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
- `css/components/social-links.css`: semantic container-aware Social Links
  rails, provider-asset presentation, static link states, and legacy-spacing
  collision protection for content and footer placements.
- `css/components/anchor-gallery.css`: semantic container-aware Moody Anchor
  portrait galleries, optional static action states, wide editorial offset,
  and missing-content-safe presentation.
- `templates/components/field--block-content--field-anchor-image--moody-anchors-block.html.twig`:
  theme-owned list semantics around provider-owned responsive media and links.
- `css/components/theme-settings.css`: narrowly scoped 44-pixel target support
  for the native Drupal visual-options form.
- `css/components/landing-hero.css`: semantic Moody Hero overlay/split system
  plus mobile-first, reduced-motion-safe ambient-video composition and control
  states.
- `css/components/hero-carousel.css`: progressively enhanced UT Drupal Kit
  Hero Carousel viewport, compact controls, no-JavaScript flow, and motion
  preference safeguards.
- `css/components/photo-content.css`: semantic, container-aware UT Drupal Kit
  Photo Content Areas with uncropped media, real credits, static link states,
  explicit stacked display, optional-content layouts, and failure recovery.
- `css/components/editorial-sections.css`: shared editorial pairings, proof,
  CTA, and form treatments for Layout Builder output not yet promoted to a
  dedicated component contract.
- `css/components/discovery-index.css`: irregular grids for news, programs,
  people, Focus Areas, Promo Units, and other discovery surfaces.
- `css/components/accordion.css`: native disclosure layout, state, focus, and
  responsive typography for shared Moody Accordion fields.
- `css/components/featured-highlight.css`: resilient media, text-only, variant,
  link-state, and container-aware Featured Highlight and Moody Promotion signal
  bands.
- `css/components/promo-list.css`: semantic resource-ledger lists, page-safe
  headings, compact media fallbacks, and container-aware authoring variants.
- `css/components/flex-content.css`: semantic editorial media lists,
  container-aware author variants, responsive media, and failure recovery.
- `css/components/image-link.css`: intrinsic linked-media plates, compact
  labels, accessible target states, and honest unavailable-media recovery.
- `css/components/flex-color-blocks.css`: semantic task ledgers, linked and
  non-linked states, migration-safe legacy classes, and asymmetric reflow.
- `css/components/quotation.css`: semantic authored figures, responsive media,
  migration-safe legacy style classes, CTA states, and failure recovery.
- `css/components/flex-grid.css`: one semantic media-directory contract across
  six migration-safe formatter variants, link states, and media recovery.
- `css/components/impact-facts.css`: semantic proof-ledger lists, tabular
  figures, restored authored headings, and migration-aware responsive tracks.
- `css/components/showcase.css`: semantic editorial media ledgers, intrinsic
  media, migration-aware view modes, resilient CTA states, and static sticky
  media options.
- `css/components/scroll-reveal-media.css`, its eight-state preview, and
  `templates/components/moody-scroll-reveal-media.html.twig`: semantic static
  media sequences, user-controlled playback, intrinsic media, and truthful
  media failure recovery without the provider scroll-scrub runtime.
- `css/components/focal-point.css`, its eight-state preview, and
  `templates/components/moody-focal-point.html.twig`: semantic overview/detail
  image narratives, bounded editor-owned crops, and truthful source failure
  recovery without the provider scroll-scrub runtime.
- `css/components/flip-image-grid.css`, its eight-state preview, and
  `templates/components/moody-flip-things-image-grid.html.twig`: semantic
  source-ordered portrait triptychs that keep every people narrative readable
  without the provider’s hover-only flip runtime.
- `css/components/image-grid.css`, its eight-state preview, and
  `templates/components/moody-image-grid.html.twig`: semantic destination
  indexes with real editor-owned images, explicit site actions, responsive
  asymmetric rhythm, and honest missing-media recovery without provider CSS.
- `css/components/contact-info.css`: page-safe, container-aware editorial
  service bands with independently optional authored fields.
- `css/components/call-to-action.css`: portable formatter-owned action rules,
  responsive long-label handling, and complete static link states.
- `css/components/newsletter.css`: semantic, container-aware Moody Newsletter
  destination bands with neutral migration styles and complete static links.
- `css/components/quick-links.css`: semantic UT Drupal Kit navigation ledgers,
  optional-content resilience, responsive index tracks, and static link states.
- `css/components/people-directory.css`: responsive filters, semantic people
  indexes and UTProf Profile Listings, linked profile treatments,
  current-directory state, failed-media reflow, and empty-state presentation.
- `templates/blocks/block--block-content--utprof-profile-listing.html.twig` and
  `templates/components/field--node--field-utprof-designation.html.twig`:
  semantic provider-preserving profile sections and designation text.
- `css/components/newsroom.css`: semantic news ledgers, source mentions,
  directory-aware landing composition, resilient media, and shared newsroom
  support components.
- `css/components/feature-story.css`: length-aware story mastheads, measured
  long-form fields, inline editorial media, tables, and explicit credits.
- `templates/components/moody-feature-credit.html.twig`: translated byline,
  supplied contributor name, and optional supplied role.
- `css/components/shorthand-story.css` and
  `templates/blocks/block--moody-shorthand-zip-shorthand-zip-story.html.twig`:
  provider-preserving Shorthand integration boundary and semantic unavailable
  state for empty exports.
- `css/components/pdf-document.css`, its eight-state preview, and
  `templates/blocks/block--moody-flipbook-pdf-flipbook.html.twig`: native-link
  PDF document boundary with provider-asset removal and truthful failure state.
- `css/components/event-detail.css`: length-aware event mastheads, uncropped
  media, responsive Split Studio layout, and semantic attendance-fact ledger.
- `templates/content/node--moody-event.html.twig`: event body, external source
  action, resilient image output, and page-safe `h2`/definition-list details.
- `css/components/events-listing.css`, its eight-state preview, and
  `templates/components/moody-events-v2-block.html.twig`: semantic API-backed
  event ledgers, truthful feed-empty recovery, one destination per event, and
  remote-image failure reflow.
- `css/components/faculty-profile.css`: Index-First profile mastheads, semantic
  contact ledgers, resilient portrait reflow, actions, and dossier sections.
- `templates/content/node--faculty-bio.html.twig`: formatter-preserving profile
  overview and progressive keyboard-complete section index.
- `templates/`: theme-owned document, page, shell, block, menu, shared
  component, and targeted View markup.
- `js/navigation.js`: the sole drawer and disclosure state owner.
- `js/quick-actions.js`: dependency-free command discovery and native-dialog
  behavior.
- `js/accessibility.js`: narrow, progressive safeguards for provider media
  controls and rendered content modules; it must not repair a base theme.
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
BASE_URL=https://moody-core.ddev.site npx playwright test tests/moody26.spec.js
```

For a release candidate, also run the visual route matrix and opt-in browser
matrix from Moody Core:

```sh
BASE_URL=https://moody-core.ddev.site npm run test:moody26
BROWSER_MATRIX=1 BASE_URL=https://moody-core.ddev.site npx playwright test tests/moody26.spec.js
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
