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
- A failed intrinsic image hides only its media wrapper, adds
  `moody26-hero--media-unavailable`, and recomposes the authored content.
  Background images retain an ink fallback. Do not invent placeholder art.
- Heroes are static server-rendered content. Do not add parallax, scroll
  scrubbing, reveal motion, viewport-forced panels, or fabricated loading,
  error, success, or disabled states.

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
- `css/components/theme-settings.css`: narrowly scoped 44-pixel target support
  for the native Drupal visual-options form.
- `css/components/landing-hero.css`: semantic Moody Hero overlay/split system
  and restrained ambient-video composition.
- `css/components/editorial-sections.css`: shared editorial pairings, proof,
  CTA, and form treatments for Layout Builder output not yet promoted to a
  dedicated component contract.
- `css/components/discovery-index.css`: irregular grids for news, programs,
  people, Focus Areas, Promo Units, and other discovery surfaces.
- `css/components/accordion.css`: native disclosure layout, state, focus, and
  responsive typography for shared Moody Accordion fields.
- `css/components/featured-highlight.css`: resilient media, text-only, variant,
  link-state, and container-aware Featured Highlight presentation.
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
