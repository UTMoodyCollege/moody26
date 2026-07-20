#!/usr/bin/env node

import { readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const themeRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const files = {
  readme: 'README.md',
  agents: 'AGENTS.md',
  package: 'package.json',
  packageLock: 'package-lock.json',
  composer: 'composer.json',
  info: 'moody26.info.yml',
  libraries: 'moody26.libraries.yml',
  settings: 'config/install/moody26.settings.yml',
  schema: 'config/schema/moody26.schema.yml',
  theme: 'moody26.theme',
  themeSettings: 'theme-settings.php',
  fontsCss: 'css/fonts.css',
  tokens: 'tokens.css',
  css: 'css/moody26.css',
  headerSocialCss: 'css/components/header-social.css',
  quickActionsCss: 'css/components/quick-actions.css',
  quickActionsPreview: 'css/components/quick-actions.preview.html',
  landingHero: 'css/components/landing-hero.css',
  editorialSections: 'css/components/editorial-sections.css',
  featuredHighlightCss: 'css/components/featured-highlight.css',
  promoListCss: 'css/components/promo-list.css',
  flexContentCss: 'css/components/flex-content.css',
  imageLinkCss: 'css/components/image-link.css',
  flexColorBlocksCss: 'css/components/flex-color-blocks.css',
  quotationCss: 'css/components/quotation.css',
  flexGridCss: 'css/components/flex-grid.css',
  discoveryIndex: 'css/components/discovery-index.css',
  accordionCss: 'css/components/accordion.css',
  peopleDirectory: 'css/components/people-directory.css',
  newsroom: 'css/components/newsroom.css',
  motionCss: 'css/components/motion.css',
  settingsCss: 'css/components/theme-settings.css',
  accessibility: 'js/accessibility.js',
  navigation: 'js/navigation.js',
  quickActions: 'js/quick-actions.js',
  motion: 'js/motion.js',
  motionBundle: 'js/dist/motion.min.js',
  gsapFallback: 'js/vendor/gsap.min.js',
  motionBuild: 'scripts/build.mjs',
  html: 'templates/html.html.twig',
  page: 'templates/pages/page.html.twig',
  brandbar: 'templates/partials/brandbar.html.twig',
  header: 'templates/partials/header.html.twig',
  footer: 'templates/partials/footer.html.twig',
  brandingBlock: 'templates/blocks/block--system-branding-block.html.twig',
  menuBlock: 'templates/blocks/block--system-menu-block--primary-menu.html.twig',
  menu: 'templates/menus/menu--primary-menu.html.twig',
  peopleDirectoryView: 'templates/views/views-view--faculty-bio-view.html.twig',
  peopleDirectoryRows: 'templates/views/views-view-unformatted--faculty-bio-view.html.twig',
  peopleDirectoryFields: 'templates/views/views-view-fields--faculty-bio-view.html.twig',
  newsRows: 'templates/views/views-view-unformatted--news-filtered--block-filtered.html.twig',
  newsFields: 'templates/views/views-view-fields--news-filtered--block-filtered.html.twig',
  focusAreas: 'templates/components/moody-focus-areas.html.twig',
  promoUnits: 'templates/components/utexas-promo-unit.html.twig',
  featuredHighlightTemplate: 'templates/components/utexas-featured-highlight.html.twig',
  promoListTemplate: 'templates/components/utexas-promo-list.html.twig',
  flexContentFieldTemplate: 'templates/components/field--block-content--field-block-fca--utexas-flex-content-area.html.twig',
  flexContentTemplate: 'templates/components/utexas-flex-content-area.html.twig',
  imageLinkTemplate: 'templates/components/utexas-image-link.html.twig',
  flexColorBlocksFieldTemplate: 'templates/components/field--block-content--field-block-flex-color-blocks--moody-flex-color-blocks.html.twig',
  flexColorBlocksTemplate: 'templates/components/moody-flex-color-blocks.html.twig',
  quotationTemplate: 'templates/components/moody-quotation.html.twig',
  flexGridStandardTemplate: 'templates/components/moody-flex-grid-standard.html.twig',
  flexGridCircularTemplate: 'templates/components/moody-flex-grid-circular.html.twig',
  flexGridPromoTemplate: 'templates/components/moody-flex-grid-promo.html.twig',
  flexGridRectangularTemplate: 'templates/components/moody-flex-grid-rectangular.html.twig',
  flexGridFlipTemplate: 'templates/components/moody-flex-grid-flip.html.twig',
  flexGridCardTemplate: 'templates/components/moody-flex-grid-card.html.twig',
  accordionTemplate: 'templates/components/field--moody-accordion.html.twig',
  logo: 'logo.svg',
  sourceLicense: 'LICENSE',
  fontLicense: 'LICENSES/OFL-1.1.txt',
  animeLicense: 'LICENSES/ANIMEJS-MIT.txt',
  gsapLicense: 'LICENSES/GSAP-NOTICE.txt',
  preflight: '.hallmark/preflight.json',
  log: '.hallmark/log.json',
};

const fonts = [
  'fonts/charis-sil-regular.woff2',
  'fonts/charis-sil-bold.woff',
  'fonts/libre-franklin-regular.woff2',
  'fonts/libre-franklin-italic.woff2',
  'fonts/libre-franklin-medium.woff2',
  'fonts/libre-franklin-semibold.woff2',
  'fonts/libre-franklin-bold.woff2',
  'fonts/libre-franklin-black.woff2',
];

const errors = [];
const contents = {};

for (const [name, relativePath] of Object.entries(files)) {
  try {
    contents[name] = readFileSync(resolve(themeRoot, relativePath), 'utf8');
  }
  catch {
    errors.push(`Missing required ${name} file: ${relativePath}`);
  }
}

for (const font of fonts) {
  try {
    if (statSync(resolve(themeRoot, font)).size < 10_000) {
      errors.push(`Bundled font looks incomplete: ${font}`);
    }
  }
  catch {
    errors.push(`Missing bundled font: ${font}`);
  }
}

const requireText = (file, needle, message) => {
  if (!contents[file]?.includes(needle)) {
    errors.push(message);
  }
};

const requirePattern = (file, pattern, message) => {
  if (!pattern.test(contents[file] ?? '')) {
    errors.push(message);
  }
};

const forbidText = (file, needle, message) => {
  if (contents[file]?.includes(needle)) {
    errors.push(message);
  }
};

try {
  const packageJson = JSON.parse(contents.package ?? '');
  if (packageJson.version !== '0.16.0') {
    errors.push('The Moody Flex Grid release must remain versioned as 0.16.0.');
  }
  for (const [dependency, version] of [
    ['animejs', '4.5.0'],
    ['gsap', '3.15.0'],
    ['esbuild', '0.28.1'],
  ]) {
    if (packageJson.devDependencies?.[dependency] !== version) {
      errors.push(`${dependency} must remain exactly pinned to ${version}.`);
    }
  }
  if (packageJson.scripts?.check !== 'npm run build && npm run verify') {
    errors.push('npm run check must rebuild motion before verification.');
  }
  const packageLock = JSON.parse(contents.packageLock ?? '');
  if (packageLock.packages?.['']?.version !== packageJson.version) {
    errors.push('package-lock.json must match the package version.');
  }
}
catch {
  errors.push('package.json and package-lock.json must contain valid JSON.');
}

try {
  const composer = JSON.parse(contents.composer ?? '');
  if (composer.name !== 'moody-college/moody26') {
    errors.push('Composer package name must remain moody-college/moody26.');
  }
  if (composer.require?.['moody-college/moody']) {
    errors.push('Moody26 must not require the legacy Moody theme.');
  }
}
catch {
  errors.push('composer.json must contain valid JSON.');
}

requireText('info', 'base theme: false', 'Moody26 must remain a standalone Drupal theme.');
forbidText('info', 'base theme: moody', 'Moody26 must not inherit the legacy Moody theme.');
requireText('info', 'core_version_requirement: ^10 || ^11', 'Drupal 10 and 11 support must remain declared.');
requireText('libraries', 'css/fonts.css: { weight: 90 }', 'Local fonts must load before design tokens.');
requireText('libraries', 'tokens.css: { weight: 100 }', 'Tokens must load before component CSS.');
requireText('libraries', 'js/navigation.js', 'Theme-owned navigation behavior must remain attached.');
requireText('libraries', 'js/quick-actions.js', 'Quick actions must remain attached.');
requireText('libraries', 'css/components/motion.css', 'Motion safeguards must remain attached.');
requireText('libraries', 'css/components/header-social.css', 'Responsive header social styles must remain attached.');
requireText('libraries', 'css/components/people-directory.css', 'Shared people-directory styles must remain attached.');
requireText('libraries', 'css/components/newsroom.css', 'Shared newsroom styles must remain attached.');
requireText('libraries', 'css/components/accordion.css', 'Shared accordion styles must remain attached.');
requireText('libraries', 'css/components/featured-highlight.css', 'Shared Featured Highlight styles must remain attached.');
requireText('libraries', 'css/components/promo-list.css', 'Shared Promo List styles must remain attached.');
requireText('libraries', 'css/components/flex-content.css', 'Shared Flex Content Area styles must remain attached.');
requireText('libraries', 'css/components/image-link.css', 'Shared Image Link styles must remain attached.');
requireText('libraries', 'css/components/flex-color-blocks.css', 'Shared Flex Color Block styles must remain attached.');
requireText('libraries', 'css/components/quotation.css', 'Shared Moody Quotation styles must remain attached.');
requireText('libraries', 'css/components/flex-grid.css', 'Shared Moody Flex Grid styles must remain attached.');
requireText('libraries', 'js/dist/motion.min.js', 'The built motion integration must remain attached.');
requireText('libraries', 'version: 0.16.0', 'The Drupal asset version must match the Moody Flex Grid release.');
forbidText('info', '- moody26/motion', 'Optional motion must be attached from theme settings rather than globally.');

requireText('settings', "header_social_links_block: ''", 'Header social links must be optional for new installs.');
requirePattern('schema', /header_social_links_block:[\s\S]*?type: string/, 'Header social links must have portable string configuration schema.');
requireText('themeSettings', "'#type' => 'select'", 'Header social links must use Drupal’s native select control.');
requireText('themeSettings', 'moody26_social_links_block_options()', 'The header setting must discover eligible Social Links blocks.');
requireText('themeSettings', '->accessCheck(TRUE)', 'The Social Links selection query must enforce entity-query access.');
requireText('themeSettings', "->condition('type', 'social_links')", 'Only Social Links blocks may be selected.');
requireText('themeSettings', "->condition('status', 1)", 'Only published Social Links blocks may be selected.');
requireText('themeSettings', "->condition('reusable', 1)", 'Only reusable Social Links blocks may be selected.');
requireText('themeSettings', '$options[$block->uuid()]', 'Header Social Links configuration must store portable UUIDs.');
requireText('theme', 'Uuid::isValid($social_links_uuid)', 'Runtime Social Links selection must reject malformed UUIDs.');
requireText('theme', "'type' => 'social_links'", 'Runtime Social Links loading must enforce the bundle.');
requireText('theme', "'status' => 1", 'Runtime Social Links loading must enforce published state.');
requireText('theme', "'reusable' => 1", 'Runtime Social Links loading must enforce reusable state.');
requireText('theme', "getTranslationFromContext($block)", 'Header Social Links must honor the current content language.');
requireText('theme', "$block->access('view', NULL, TRUE)", 'Header Social Links must enforce view access with cacheability.');
requireText('theme', "getViewBuilder('block_content')", 'Header Social Links must use Drupal’s entity view builder.');
requireText('theme', "$view_builder->view($block, 'full')", 'Header Social Links must preserve formatter output and attachments.');
requireText('theme', "CacheableMetadata::createFromObject(\\Drupal::config('moody26.settings'))", 'Header Social Links must vary with theme configuration.');
requireText('theme', 'CacheableMetadata::createFromObject($access)', 'Header Social Links must bubble access cacheability.');

for (const setting of ['motion_gsap_enabled', 'motion_anime_enabled']) {
  requireText('settings', `${setting}: true`, `${setting} must default to enabled for new installs.`);
  requirePattern('schema', new RegExp(`${setting}:[\\s\\S]*?type: boolean`), `${setting} must have boolean configuration schema.`);
  requireText('themeSettings', `'${setting}'`, `${setting} must be exposed in the theme settings form.`);
  requireText('theme', `theme_get_setting('${setting}') ?? TRUE`, `${setting} must remain enabled when upgrading an existing installation.`);
}
requireText('themeSettings', "'#type' => 'details'", 'Moody26 settings must use Drupal’s responsive native details elements.');
requireText('themeSettings', "'#title' => t('Visual options')", 'The theme settings form must expose a Visual options area.');
requireText('themeSettings', "'#type' => 'checkbox'", 'Motion choices must use native checkboxes.');
requireText('themeSettings', "'#title' => t('Accessibility safeguards')", 'Visual options must explain their non-negotiable accessibility behavior.');
requireText('themeSettings', "'#input' => FALSE", 'Display-only accessibility guidance must not create configuration.');
requireText('themeSettings', "'moody26/settings'", 'The native settings form must attach its target-size enhancement.');
requireText('themeSettings', "'moody26-motion-options'", 'Motion controls need a narrowly scoped settings hook.');
requireText('libraries', 'css/components/theme-settings.css', 'The settings library must include its scoped stylesheet.');
requireText('settingsCss', 'component: theme visual options', 'Settings CSS must retain its Hallmark component contract.');
requireText('settingsCss', 'min-block-size: var(--moody26-settings-target-min);', 'Settings labels must preserve a 44 CSS-pixel target.');
requireText('settingsCss', '.moody26-header-options,', 'Header settings must inherit the native-control target token.');
requireText('theme', "$variables['#attached']['library'][] = 'moody26/motion';", 'PHP must attach motion only when an option is enabled.');
requireText('theme', "setAttribute('data-moody26-motion-gsap'", 'The document must expose the resolved GSAP option.');
requireText('theme', "setAttribute('data-moody26-motion-anime'", 'The document must expose the resolved Anime.js option.');
requireText('theme', "$motion_enabled ? 'pending' : 'disabled'", 'The document must expose a truthful disabled motion state.');

requireText('tokens', '--color-ut-burnt-orange: #bf5700;', 'Use exact UT burnt orange #bf5700.');
requireText('tokens', '--font-display: "CharisSil", Georgia, serif;', 'Use the approved UT digital serif role.');
requireText('tokens', '--font-body: "LibreFrank", Arial, Helvetica, sans-serif;', 'Use the approved UT digital sans-serif role.');
requireText('tokens', '--target-min: 2.75rem;', 'Interactive targets must retain the 44 CSS-pixel floor.');
requireText('tokens', '--color-accent-ink:', 'Accent surfaces need a verified text-color pair.');
requireText('tokens', '--focus-outline:', 'Visible focus must use a named token.');
requireText('tokens', '--motion-distance: 0.75rem;', 'Spatial motion must retain its capped distance token.');
requireText('tokens', '--motion-stagger: 48ms;', 'Motion stagger must remain tokenized.');
requireText('tokens', '--motion-stagger-tight: 28ms;', 'Disclosure stagger must remain tokenized.');
requireText('tokens', '--media-portrait-ratio: 1;', 'People imagery must use the shared portrait-ratio token.');

for (const weight of ['400', '500', '600', '700', '900']) {
  requireText('fontsCss', `font-weight: ${weight};`, `Local font CSS must include weight ${weight}.`);
}
requireText('fontLicense', 'SIL OPEN FONT LICENSE Version 1.1', 'Bundled fonts must include their OFL license.');
requireText('animeLicense', 'The MIT License', 'Bundled Anime.js code must retain its MIT license.');
requireText('gsapLicense', 'https://gsap.com/standard-license/', 'Bundled GSAP must retain its license notice.');
requireText('sourceLicense', 'GNU GENERAL PUBLIC LICENSE', 'Theme source must include the declared GPL license.');
requireText('logo', 'viewBox=', 'The approved Moody mark must remain a scalable SVG.');
requirePattern('logo', /#bf5700/i, 'The approved Moody mark must retain exact burnt orange.');
requirePattern('logo', /#333f48/i, 'The approved Moody mark must retain UT charcoal.');

requireText('html', 'href="#main-content"', 'The HTML shell needs a skip link.');
requireText('page', '<main{{ main_content_attributes }}>', 'The page shell must own the main landmark.');
requireText('page', 'highlighted_content|striptags|trim', 'Empty rendered utility regions must not create layout gaps.');
requireText('header', 'id="moody26-header"', 'The theme must own its header shell.');
requireText('header', 'aria-controls="moody26-primary-navigation"', 'The drawer button must identify its navigation.');
requireText('header', 'data-moody26-mobile-actions', 'The mobile drawer must provide a canonical site-actions position.');
requireText('header', "'Site actions'|t", 'The mobile action group needs an accessible name.');
requireText('brandbar', 'https://www.utexas.edu/', 'The University bar must link to UT Austin.');
requireText('brandbar', 'ut-parent-entity', 'The optional parent-unit hook must remain available.');
requireText('brandbar', 'header_social_links_desktop', 'The University bar must expose the selected desktop Social Links block.');
requireText('brandbar', "'Social media'|t", 'Desktop Social Links need an accessible landmark name.');
requireText('header', 'header_social_links_mobile', 'The navigation drawer must expose the selected mobile Social Links block.');
requireText('header', 'page.header_tertiary and not header_social_links_mobile', 'Selected Social Links must replace the legacy mobile utility fallback without duplicates.');
requireText('header', "'Social media'|t", 'Mobile Social Links need an accessible landmark name.');
requireText('footer', 'Emergency Information', 'Footer must provide Emergency Information.');
requireText('footer', 'Site Policies', 'Footer must provide Site Policies.');
requireText('footer', 'Digital Accessibility Policy', 'Footer must provide Digital Accessibility Policy.');
requireText('footer', 'Web Privacy Policy', 'Footer must provide Web Privacy Policy.');
requireText('footer', '{{ copyright_year }}', 'Footer copyright year must be dynamic.');
requireText('theme', "$variables['copyright_year'] = date('Y');", 'PHP must supply the current footer year.');
requireText('brandingBlock', "active_theme_path() ~ '/logo.svg'", 'Branding must fall back to the bundled approved mark.');

requireText('menu', '<button', 'Submenu disclosures must use native buttons.');
requireText('menu', 'aria-controls="{{ submenu_id }}"', 'Submenu buttons must identify their panels.');
requireText('menu', 'aria-labelledby="{{ panel_id }}-trigger"', 'Submenu panels must be labelled by their button.');
requireText('menu', 'hidden', 'Closed submenu links must leave the tab order.');
forbidText('menu', 'aria-haspopup="true"', 'Disclosure navigation must not claim ARIA menu semantics.');

requireText('navigation', "once('moody26-navigation', '#moody26-header'", 'Navigation must attach only to the Moody26 shell.');
requireText('navigation', "event.key === 'Tab' && !event.shiftKey", 'Forward Tab must open a submenu before focus advances.');
requireText('navigation', 'firstDestination.focus({ preventScroll: true })', 'Forward Tab must move into the newly opened submenu deterministically.');
requireText('navigation', 'event.key === \'Tab\' && event.shiftKey && event.target === firstDestination', 'Reverse Tab from the first submenu link must return to its disclosure button.');
requireText('navigation', 'event.relatedTarget && item.contains(event.relatedTarget)', 'Submenus must remain open while focus moves between their links.');
requireText('navigation', "event.key !== 'Escape'", 'Escape must close the current navigation layer.');
requireText('navigation', "document.addEventListener('keydown'", 'Escape handling must support Safari click-focus behavior.');
requireText('navigation', 'navigation.inert =', 'A closed mobile drawer must leave the tab order.');
requireText('navigation', "window.matchMedia('(min-width: 75rem)')", 'Navigation must switch at the content-driven desktop breakpoint.');
requireText('navigation', 'mobileActions.append(actionBar)', 'Mobile navigation must move the canonical action bar into the drawer.');
requireText('navigation', 'insertBefore(actionBar, desktopActionsMarker)', 'Desktop navigation must restore the canonical action bar without cloning it.');
forbidText('navigation', 'moody26-drawer-open', 'Drawer state must not change body scrolling or break the sticky header.');

requireText('quickActions', "'aria-keyshortcuts': 'Meta+K Control+K'", 'Quick actions must advertise both platform shortcuts.');
requireText('quickActions', "role: 'combobox'", 'Quick-action search must expose combobox semantics.');
requireText('quickActions', "role: 'listbox'", 'Quick-action results must expose listbox semantics.');
requireText('quickActions', "role: 'option'", 'Quick-action destinations must expose option semantics.');
requireText('quickActions', "'aria-activedescendant'", 'Arrow-key selection must be announced.');
requireText('quickActions', "'aria-live': 'polite'", 'Result counts must use a polite live region.');
requireText('quickActions', 'dialog.showModal()', 'Quick actions must use a native modal dialog.');
requireText('quickActions', '.moody26-submenu__link[href]', 'Quick actions must discover the rendered Drupal menu.');
requireText('quickActions', "target.closest('input, textarea, select, [contenteditable]", 'Editor shortcuts must remain untouched.');
requireText('quickActions', 'returnFocus = document.activeElement', 'Quick actions must preserve the invoking control or destination.');
requireText('quickActions', 'returnFocus.focus({ preventScroll: true })', 'Quick actions must return focus without scrolling the drawer.');
requireText('accessibility', "icon.removeAttribute('tabindex')", 'Decorative scroll hints must stay out of the tab order.');
requireText('navigation', "new CustomEvent('moody26:reveal'", 'Submenus must expose a progressive motion hook.');
requireText('quickActions', "detail: { kind: 'quick-actions' }", 'Quick actions must expose a first-open motion hook.');

requireText('motion', "from 'animejs/waapi'", 'Use Anime.js’s tree-shaken WAAPI integration.');
requireText('motion', "from 'animejs/utils'", 'Anime.js stagger must use its modular utility import.');
requireText('motion', 'dataset.moody26MotionGsap', 'The motion runtime must honor the GSAP theme option.');
requireText('motion', 'dataset.moody26MotionAnime', 'The motion runtime must honor the Anime.js theme option.');
requireText('motion', 'if (!animeEnabled || !motionAllowed()', 'Anime.js feedback must stop when its theme option is disabled.');
requireText('motion', 'if (!gsapEnabled)', 'GSAP loading must stop when its theme option is disabled.');
requireText('motion', "window.gsap", 'Motion must reuse a compatible page-provided GSAP runtime.');
requireText('motion', "new URL('../vendor/gsap.min.js'", 'Motion must retain its local GSAP fallback.');
requireText('motion', 'gsap.matchMedia()', 'GSAP motion must be scoped to responsive media conditions.');
requireText('motion', 'IntersectionObserver', 'Discovery motion must use IntersectionObserver rather than scroll listeners.');
requireText('motion', "'(prefers-reduced-motion: reduce)'", 'Scripted motion must detect reduced-motion preference.');
requireText('motion', 'navigator.connection?.saveData === true', 'Optional motion must honor Save-Data.');
requireText('motion', "markMode('reduced')", 'Reduced motion must render a truthful document state.');
requireText('motion', 'animation.revert()', 'Anime.js effects must clean up their inline state.');
forbidText('motion', 'ScrollTrigger', 'Moody26 motion must not ship ScrollTrigger.');
forbidText('motion', 'ScrollSmoother', 'Moody26 motion must not ship smooth scrolling.');
forbidText('motion', "addEventListener('scroll'", 'Motion must not attach scroll event listeners.');
requireText('motionCss', '@media (prefers-reduced-motion: reduce)', 'Motion CSS must expose an immediate reduced-motion state.');
requireText('motionCss', 'opacity: 1 !important;', 'Reduced motion must never leave animated content hidden.');
forbidText('motionCss', 'opacity: 0', 'Base motion CSS must never hide readable content before JavaScript.');
requireText('motionBuild', "legalComments: 'eof'", 'The motion build must retain third-party legal comments.');
requireText('motionBuild', "target: ['chrome110', 'firefox109', 'safari15.6']", 'The motion bundle must preserve the compatibility floor.');
requireText('motionBundle', 'Anime.js', 'The committed motion bundle must retain its Anime.js attribution.');
requireText('gsapFallback', 'GSAP 3.15.0', 'The committed local fallback must remain GSAP 3.15.0.');

for (const [path, maximum] of [
  ['js/dist/motion.min.js', 30_000],
  ['js/vendor/gsap.min.js', 80_000],
]) {
  try {
    if (statSync(resolve(themeRoot, path)).size > maximum) {
      errors.push(`${path} exceeds its ${maximum}-byte performance budget.`);
    }
  }
  catch {
    errors.push(`Missing built motion asset: ${path}`);
  }
}

requireText('css', 'overflow-x: clip;', 'Viewport overflow must be clipped without hiding focus.');
requireText('css', ':focus-visible', 'Visible keyboard focus styling is required.');
requireText('css', '.sr-only', 'Module-provided screen-reader-only text must remain visually hidden.');
requireText('css', '@media (prefers-reduced-motion: reduce)', 'Reduced-motion behavior is required.');
requireText('css', 'white-space: nowrap;', 'Primary affordances must not wrap.');
requireText('css', 'slop: pass (1–58)', 'The final Hallmark slop sweep must be recorded.');
requireText('css', '--drupal-displace-offset-top', 'The sticky header must respect Drupal toolbar displacement.');
requireText('css', '.moody26-menu__trigger[aria-expanded="true"]', 'Navigation needs a non-color expanded state.');
requireText('css', '@media (min-width: 40rem)', 'The small responsive breakpoint is required.');
requireText('css', '@media (min-width: 60rem)', 'The medium responsive breakpoint is required.');
requireText('css', '@media (min-width: 75rem)', 'The navigation breakpoint is required.');
requireText('css', '.moody26-navigation__actions', 'The mobile action group needs a deliberate task-first treatment.');
requireText('css', 'overscroll-behavior: contain;', 'The overlay drawer must contain its own scroll chain.');
forbidText('css', 'moody26-drawer-open', 'Mobile navigation must not lock body scrolling.');
requirePattern('css', /\[aria-busy="true"\]/, 'Loading states must be styled.');
requirePattern('css', /\[data-state="error"\]/, 'Error states must be styled.');
requirePattern('css', /\[data-state="success"\]/, 'Success states must be styled.');

requireText('quickActionsCss', 'component: command palette', 'Quick actions must retain the Hallmark component contract.');
requireText('headerSocialCss', 'component: responsive header social links', 'Header Social Links must retain the Hallmark component contract.');
requireText('headerSocialCss', 'inline-size: var(--target-min);', 'Header social links must preserve 44 CSS-pixel targets.');
requireText('headerSocialCss', 'block-size: var(--target-min);', 'Header social links must preserve 44 CSS-pixel targets.');
requireText('headerSocialCss', 'mask-size: var(--space-lg);', 'Header social marks must remain subordinate to their touch targets.');
requireText('headerSocialCss', ':focus-within', 'Header social links must expose visible parent focus without relying on :has().');
forbidText('headerSocialCss', ':has(', 'Header social focus must remain compatible with supported Firefox releases.');
requireText('headerSocialCss', '@media (hover: hover) and (pointer: fine)', 'Header social hover feedback must be capability-gated.');
requireText('headerSocialCss', '@media (min-width: 75rem)', 'Header social placement must follow the navigation breakpoint.');
requireText('headerSocialCss', '@media (prefers-reduced-motion: reduce)', 'Header social feedback must honor reduced motion.');
for (const state of ['Default', 'Hover', 'Focus', 'Active', 'Disabled', 'Loading', 'Error', 'Success']) {
  requireText('quickActionsPreview', `>${state}<`, `The state sheet must include ${state.toLowerCase()}.`);
}
requireText('landingHero', 'macrostructure: Split Studio', 'Landing components must preserve the Split Studio decision.');
requireText('landingHero', ':has(.block-bundle-moody-hero)', 'Full-bleed heroes must remove generic section padding.');
requireText('editorialSections', 'container-type: inline-size', 'Editorial components must remain container-aware.');
requireText('editorialSections', 'var(--drupal-displace-offset-top, 0rem)', 'Layout Builder anchors must clear the optional Drupal toolbar.');
requireText('editorialSections', '.moody-contact-info-wrapper', 'Resource hubs must retain the shared Contact Info close.');
requireText('editorialSections', ':has(.block-bundle-moody-contact-info)', 'Contact Info closes must remove generic outer section padding.');
requireText('discoveryIndex', 'repeat(12, minmax(0, 1fr))', 'Discovery grids must use safe image-bearing tracks.');
requireText('discoveryIndex', '.linked-focus-area-item:focus-visible', 'Focus Area tasks need immediate visible focus.');
requireText('discoveryIndex', '.utexas-promo-unit .data-wrapper > a:focus-visible', 'Promo Unit links need immediate visible focus.');
requireText('discoveryIndex', '@container (min-width: 64rem)', 'Resource hubs must retain their wide asymmetric layout.');
requireText('peopleDirectory', 'component: shared people directory', 'People directories must retain the Hallmark component contract.');
requireText('peopleDirectory', 'container: people-directory / inline-size;', 'People directories must remain container-aware.');
requireText('peopleDirectory', 'repeat(4, minmax(0, 1fr))', 'People-directory image grids must use safe tracks.');
requireText('peopleDirectory', '.people-directory__profile:focus-visible', 'People profile links need a visible focus-equivalent detail.');
requireText('peopleDirectory', '@media (hover: hover) and (pointer: fine)', 'People-directory hover feedback must be capability-gated.');
requireText('newsroom', 'component: shared newsroom index', 'Newsroom components must retain the Hallmark component contract.');
requireText('newsroom', 'container: news-index / inline-size;', 'News indexes must remain container-aware.');
requireText('newsroom', 'repeat(12, minmax(0, 1fr))', 'News indexes must retain safe asymmetric tracks.');
requireText('newsroom', '.news-teaser__story:focus-visible', 'News story links need a visible focus-equivalent detail.');
requireText('newsroom', '@media (hover: hover) and (pointer: fine)', 'Newsroom hover feedback must be capability-gated.');
requireText('accordionCss', 'macrostructure: Conversational FAQ', 'Accordions must retain the Hallmark macrostructure contract.');
requireText('accordionCss', '.moody-accordion__summary:focus-visible', 'Accordion summaries need immediate visible focus.');
requireText('accordionCss', '.moody-accordion__item[open]', 'Accordions need a non-color expanded-state signal.');
requireText('accordionCss', '@media (hover: hover) and (pointer: fine)', 'Accordion hover feedback must be capability-gated.');
requireText('accordionCss', '@media (prefers-reduced-motion: reduce)', 'Accordion disclosure feedback must honor reduced motion.');
requireText('accordionTemplate', '<details class="moody-accordion__item">', 'Accordions must use native details disclosure state.');
requireText('accordionTemplate', '<summary class="moody-accordion__summary">', 'Accordions must expose a native summary control.');
requireText('accordionTemplate', 'aria-hidden="true"', 'Accordion state decoration must remain hidden from assistive technology.');
forbidText('accordionTemplate', 'x-data', 'Accordions must not depend on Alpine state.');
forbidText('accordionTemplate', '@click', 'Accordions must not depend on Alpine event handlers.');
forbidText('accordionTemplate', 'aria-expanded', 'Native accordion state must not be duplicated with manually managed ARIA.');
requireText('featuredHighlightCss', 'component: featured editorial highlight', 'Featured Highlights must retain the Hallmark component contract.');
requireText('featuredHighlightCss', 'container: featured-highlight / inline-size;', 'Featured Highlights must remain container-aware.');
requireText('featuredHighlightCss', '.featured-highlight__content .ut-btn:focus-visible', 'Featured Highlight calls to action need immediate visible focus.');
requireText('featuredHighlightCss', '@media (hover: hover) and (pointer: fine)', 'Featured Highlight hover feedback must be capability-gated.');
requireText('featuredHighlightCss', '@container featured-highlight (min-width: 52rem)', 'Featured Highlights must retain their component-responsive layout.');
requireText('featuredHighlightCss', 'grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);', 'Media-led Featured Highlights must retain their safe 5/7 layout.');
requireText('featuredHighlightCss', 'grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);', 'Text-only Featured Highlights must retain their asymmetric 4/8 layout.');
requireText('featuredHighlightCss', '.featured-highlight--media-unavailable', 'Featured Highlights must retain a stable failed-media state.');
requireText('featuredHighlightCss', '.featured-highlight__media:has(iframe)', 'Featured Highlights must preserve responsive external video.');
requireText('featuredHighlightTemplate', "'featured-highlight--has-media'", 'Featured Highlights must expose their media composition.');
requireText('featuredHighlightTemplate', '<h2 class="featured-highlight__title ut-headline">', 'Featured Highlight headlines must retain page-safe heading semantics.');
requireText('featuredHighlightTemplate', 'media_identifier', 'Featured Highlights must preserve the formatter-provided identifier.');
requireText('featuredHighlightTemplate', 'attributes.addClass', 'Featured Highlights must preserve formatter-provided attributes.');
requireText('featuredHighlightTemplate', 'rendered_copy', 'Featured Highlights must preserve processed editor copy.');
forbidText('featuredHighlightTemplate', 'attach_library', 'Featured Highlights must use the theme global library without duplicate attachments.');
forbidText('featuredHighlightTemplate', 'fh-background', 'Featured Highlights must not depend on inactive Speedway wrappers.');
forbidText('editorialSections', 'field--type-utexas-featured-highlight', 'Featured Highlight layout must live in its dedicated component stylesheet.');
requireText('promoListCss', 'component: editorial resource ledger', 'Promo Lists must retain the Hallmark component contract.');
requireText('promoListCss', 'container: promo-list / inline-size;', 'Promo Lists must remain container-aware.');
requireText('promoListCss', 'grid-template-columns: minmax(0, 1fr);', 'Promo List tracks must retain safe minimum sizing.');
requireText('promoListCss', 'grid-template-columns: repeat(2, minmax(0, 1fr));', 'Responsive Promo Lists must retain two safe tracks.');
requireText('promoListCss', '.promo-list__title a:focus-visible', 'Promo List headline links need immediate visible focus.');
requireText('promoListCss', '@media (hover: hover) and (pointer: fine)', 'Promo List hover feedback must be capability-gated.');
requireText('promoListCss', '.promo-list__item--media-unavailable', 'Promo Lists must retain a stable failed-media state.');
requireText('promoListTemplate', 'promo_list_items|filter', 'Promo Lists must exclude structurally empty stored entries.');
requireText('promoListTemplate', 'role="list"', 'Promo List collections must expose list semantics.');
requireText('promoListTemplate', '<li class="{{ item_classes|join', 'Promo List entries must expose list-item semantics.');
requireText('promoListTemplate', '<h2 class="ut-headline ut-headline--underline promo-list__group-title">', 'Promo List group headings must begin a page-safe section.');
requireText('promoListTemplate', '<h3 class="ut-headline promo-list__title">', 'Grouped Promo List items must retain subordinate headings.');
requireText('promoListTemplate', '<h2 class="ut-headline promo-list__title">', 'Ungrouped Promo List items must not skip heading levels.');
requireText('promoListTemplate', 'attributes.addClass(classes)', 'Promo Lists must preserve formatter-provided attributes.');
requireText('promoListTemplate', 'rendered_copy', 'Promo Lists must preserve processed editor copy.');
forbidText('promoListTemplate', 'attach_library', 'Promo Lists must use the theme global library without duplicate attachments.');
forbidText('promoListTemplate', 'href=', 'Promo List destinations must remain formatter-owned.');
forbidText('promoListTemplate', '|raw', 'Promo Lists must not bypass Drupal render safety.');
requireText('flexContentCss', 'component: editorial media dossier', 'Flex Content Areas must retain the Hallmark component contract.');
requireText('flexContentCss', 'container: flex-content / inline-size;', 'Flex Content Areas must remain container-aware.');
requireText('flexContentCss', 'grid-template-columns: repeat(2, minmax(0, 1fr));', 'Flex Content Areas must retain two safe tracks.');
requireText('flexContentCss', 'grid-template-columns: repeat(3, minmax(0, 1fr));', 'Flex Content Areas must retain three safe tracks.');
requireText('flexContentCss', 'grid-template-columns: repeat(4, minmax(0, 1fr));', 'Flex Content Areas must retain four safe tracks.');
requireText('flexContentCss', 'grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);', 'One-column Flex Content Areas must retain their safe media band.');
requireText('flexContentCss', 'aspect-ratio: 3 / 2;', 'Flex Content Area images must retain the formatter derivative ratio.');
requireText('flexContentCss', 'aspect-ratio: 16 / 9;', 'Flex Content Area external video must remain responsive.');
requireText('flexContentCss', '.flex-content__title a:focus-visible', 'Flex Content Area headline links need immediate visible focus.');
requireText('flexContentCss', '@media (hover: hover) and (pointer: fine)', 'Flex Content Area hover feedback must be capability-gated.');
requireText('flexContentCss', '.flex-content--media-unavailable', 'Flex Content Areas must retain a stable failed-media state.');
requireText('flexContentCss', '.ut-btn[aria-hidden="true"]', 'Redundant Flex Content Area calls to action must remain visually suppressed.');
requireText('flexContentFieldTemplate', 'role="list"', 'Flex Content Area collections must expose list semantics.');
requireText('flexContentFieldTemplate', '<li{{ item.attributes.addClass', 'Flex Content Area entries must expose list-item semantics.');
requireText('flexContentTemplate', '<article class="{{ item_classes|join', 'Each Flex Content Area entry must remain an article.');
requireText('flexContentTemplate', '<h3 class="ut-headline flex-content__title">', 'Flex Content Area item headlines must preserve their established h3 contract.');
requireText('flexContentTemplate', 'rendered_media', 'Flex Content Areas must preserve formatter-owned media output.');
requireText('flexContentTemplate', 'rendered_copy', 'Flex Content Areas must preserve processed editor copy.');
requireText('flexContentTemplate', '{% if links %}', 'Flex Content Areas must preserve formatter-owned secondary links.');
requireText('flexContentTemplate', 'rendered_cta', 'Flex Content Areas must preserve formatter-owned CTA attributes.');
forbidText('flexContentTemplate', 'attach_library', 'Flex Content Areas must use the theme global library without duplicate attachments.');
forbidText('flexContentTemplate', 'href=', 'Flex Content Area destinations must remain formatter-owned.');
forbidText('flexContentTemplate', '|raw', 'Flex Content Areas must not bypass Drupal render safety.');
requireText('imageLinkCss', 'component: linked media plate', 'Image Links must retain the Hallmark component contract.');
requireText('imageLinkCss', 'container: image-link / inline-size;', 'Image Links must remain container-aware.');
requireText('imageLinkCss', '.image-link__target:focus-visible', 'Image Links need immediate visible focus.');
requireText('imageLinkCss', 'min-height: var(--target-min);', 'Image Links must preserve a 44 CSS-pixel target.');
requireText('imageLinkCss', '@media (hover: hover) and (pointer: fine)', 'Image Link hover feedback must be capability-gated.');
requireText('imageLinkCss', '.image-link__media--unavailable', 'Image Links must retain a stable failed-media state.');
requireText('imageLinkCss', 'height: auto;', 'Image Links must preserve intrinsic image proportions.');
forbidText('imageLinkCss', 'aspect-ratio', 'Image Links must not crop mixed-ratio editorial media.');
forbidText('imageLinkCss', 'object-fit: cover', 'Image Links must not crop essential editorial media.');
requireText('imageLinkTemplate', 'rendered_image', 'Image Links must preserve formatter-owned responsive media output.');
requireText('imageLinkTemplate', 'link.text|render', 'Image Links must preserve formatter-owned link-text render arrays.');
requireText('imageLinkTemplate', 'rendered_link_label|striptags|trim', 'Image Links must derive a safe formatter-owned accessible name.');
requireText('imageLinkTemplate', "'class': ['image-link__target']", 'Image Links must expose a stable full-target hook.');
requireText('imageLinkTemplate', 'link(rendered_image, link.url', 'Image Link destinations must remain formatter-owned URL objects.');
requireText('imageLinkTemplate', "'aria-label': link_label", 'Image Links must enter the document with a useful accessible name.');
forbidText('imageLinkTemplate', 'attach_library', 'Image Links must use the theme global library without duplicate attachments.');
forbidText('imageLinkTemplate', 'href=', 'Image Link destinations must not be reconstructed in Twig.');
forbidText('imageLinkTemplate', '|raw', 'Image Links must not bypass Drupal render safety.');
requireText('flexColorBlocksCss', 'component: editorial task ledger', 'Flex Color Blocks must retain the Hallmark component contract.');
requireText('flexColorBlocksCss', 'container: flex-color-blocks-block / inline-size;', 'Flex Color Blocks must respond to their Layout Builder container.');
requireText('flexColorBlocksCss', 'grid-template-columns: minmax(0, 1fr);', 'Flex Color Blocks must retain a safe narrow track.');
requireText('flexColorBlocksCss', 'grid-template-columns: repeat(2, minmax(0, 1fr));', 'Flex Color Blocks must retain two safe wide tracks.');
requireText('flexColorBlocksCss', '.flex-color-blocks__item:first-child:nth-last-child(odd)', 'Odd Flex Color Block collections must retain their lead-plus-pair composition.');
requireText('flexColorBlocksCss', '.flex-color-blocks__target:focus-visible', 'Flex Color Block links need immediate visible focus.');
requireText('flexColorBlocksCss', 'min-height: var(--target-min);', 'Flex Color Block links must preserve a 44 CSS-pixel target.');
requireText('flexColorBlocksCss', '@media (hover: hover) and (pointer: fine)', 'Flex Color Block hover feedback must be capability-gated.');
requireText('flexColorBlocksFieldTemplate', 'role="list"', 'Flex Color Block collections must expose list semantics.');
requireText('flexColorBlocksFieldTemplate', '<li{{ item.attributes.addClass', 'Flex Color Block entries must expose direct list-item semantics.');
requireText('flexColorBlocksFieldTemplate', 'rendered_item|striptags|trim', 'Flex Color Blocks must omit structurally empty stored entries.');
requireText('flexColorBlocksTemplate', 'link(item_content, link', 'Flex Color Block destinations must remain formatter-owned URL objects.');
requireText('flexColorBlocksTemplate', 'flex-color-blocks__content', 'Unlinked Flex Color Blocks must retain an honest non-interactive state.');
requireText('flexColorBlocksTemplate', 'flex-color-blocks__legacy-', 'Legacy Flex Color Block colors must remain available as migration classes.');
forbidText('flexColorBlocksTemplate', 'href=', 'Flex Color Block destinations must not be reconstructed in Twig.');
forbidText('flexColorBlocksTemplate', '<h', 'Flex Color Block item labels must not create repeated section headings.');
forbidText('flexColorBlocksTemplate', 'attach_library', 'Flex Color Blocks must use the theme global library without duplicate attachments.');
forbidText('flexColorBlocksTemplate', '|raw', 'Flex Color Blocks must not bypass Drupal render safety.');
forbidText('editorialSections', 'field--type-moody-flex-color-blocks', 'Flex Color Block layout must live in its dedicated component stylesheet.');
forbidText('newsroom', 'flex-color-blocks-wrapper', 'Newsroom routes must use the shared Flex Color Block contract.');
requireText('quotationCss', 'component: authored editorial figure', 'Moody Quotations must retain the Hallmark component contract.');
requireText('quotationCss', '.moody-quotation-container {', 'Moody Quotations need a dedicated query container outside the figure.');
requireText('quotationCss', 'container: moody-quotation / inline-size;', 'Moody Quotations must respond to their Layout Builder container.');
requireText('quotationCss', 'grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);', 'Media quotations must retain safe 5/7 tracks.');
requireText('quotationCss', '.moody-quotation__cta-link:focus-visible', 'Quotation CTAs need immediate visible focus.');
requireText('quotationCss', 'min-height: var(--target-min);', 'Quotation CTAs must preserve a 44 CSS-pixel target.');
requireText('quotationCss', '@media (hover: hover) and (pointer: fine)', 'Quotation CTA hover feedback must be capability-gated.');
requireText('quotationCss', '.moody-quotation--media-unavailable', 'Moody Quotations must retain a stable failed-media state.');
requireText('quotationTemplate', '<figure class="{{ quotation_classes|join', 'Moody Quotations must expose figure semantics.');
requireText('quotationTemplate', '<blockquote class="moody-quotation__quote">', 'Moody Quotations must expose real quotation semantics.');
requireText('quotationTemplate', '<figcaption class="moody-quotation__attribution">', 'Moody Quotations must expose real attribution semantics.');
requireText('quotationTemplate', 'rendered_media', 'Moody Quotations must preserve formatter-owned responsive media output.');
requireText('quotationTemplate', 'rendered_cta', 'Moody Quotations must preserve formatter-owned CTA output.');
requireText('quotationTemplate', 'moody-quotation--legacy-', 'Legacy quotation styles must remain available as migration classes.');
forbidText('quotationTemplate', '<cite', 'A person must not be misrepresented as a cited work.');
forbidText('quotationTemplate', 'href=', 'Quotation CTA destinations must not be reconstructed in Twig.');
forbidText('quotationTemplate', 'attach_library', 'Moody Quotations must use existing libraries without duplicate attachments.');
forbidText('quotationTemplate', '|raw', 'Moody Quotations must not bypass Drupal render safety.');
forbidText('css', '.quotation-wrapper', 'Legacy quotation presentation must not leak into the global stylesheet.');
forbidText('editorialSections', '.quotation-wrapper', 'Quotation presentation must live in its dedicated component stylesheet.');
requireText('flexGridCss', 'component: editorial media directory', 'Moody Flex Grids must retain the Hallmark component contract.');
requireText('flexGridCss', 'container: flex-grid / inline-size;', 'Moody Flex Grids must respond to their Layout Builder container.');
requireText('flexGridCss', 'grid-template-columns: minmax(0, 1fr);', 'Moody Flex Grids must retain a safe narrow track.');
requireText('flexGridCss', 'grid-template-columns: repeat(2, minmax(0, 1fr));', 'Moody Flex Grids must retain two safe tracks.');
requireText('flexGridCss', 'grid-template-columns: repeat(3, minmax(0, 1fr));', 'Moody Flex Grids must retain three safe tracks.');
requireText('flexGridCss', 'grid-template-columns: repeat(4, minmax(0, 1fr));', 'Moody Flex Grids must retain four safe tracks.');
requireText('flexGridCss', '.flex-grid__target:focus-visible', 'Full-entry Flex Grid links need immediate visible focus.');
requireText('flexGridCss', '.flex-grid__cta:focus-visible', 'Flex Grid CTAs need immediate visible focus.');
requireText('flexGridCss', 'min-height: var(--target-min);', 'Flex Grid links must preserve a 44 CSS-pixel target.');
requireText('flexGridCss', 'white-space: nowrap;', 'Flex Grid CTA labels must remain one-line affordances.');
requireText('flexGridCss', '@media (hover: hover) and (pointer: fine)', 'Flex Grid hover feedback must be capability-gated.');
requireText('flexGridCss', '.flex-grid__article--media-unavailable', 'Moody Flex Grids must retain a stable failed-media state.');
requireText('flexGridStandardTemplate', '<ul class="flex-grid__list" role="list">', 'Moody Flex Grid collections must expose list semantics.');
requireText('flexGridStandardTemplate', '<li class="flex-grid__item">', 'Moody Flex Grid entries must expose direct list-item semantics.');
requireText('flexGridStandardTemplate', '<article class="{{ item_classes|join', 'Each Moody Flex Grid entry must remain an article.');
requireText('flexGridStandardTemplate', '<h2 class="flex-grid__heading">', 'Authored Flex Grid group headlines must remain h2 headings.');
requireText('flexGridStandardTemplate', '<h3 class="flex-grid__title">', 'Grouped Flex Grid items must remain h3 headings.');
requireText('flexGridStandardTemplate', '<h2 class="flex-grid__title">', 'Ungrouped Flex Grid items must remain page-safe h2 headings.');
requireText('flexGridStandardTemplate', 'link(item_content, item.link', 'Full-entry Flex Grid destinations must remain formatter-owned URL objects.');
requireText('flexGridStandardTemplate', 'link(item.link_button_text, item.link', 'Authored Flex Grid CTAs must remain formatter-owned URL objects.');
requireText('flexGridStandardTemplate', "variant != 'flip' and item.image", 'Legacy flip output must remain static and avoid inaccessible URL-only media.');
requireText('flexGridStandardTemplate', 'item.image|render', 'Moody Flex Grids must preserve formatter-owned responsive media output.');
requireText('flexGridStandardTemplate', 'item.copy|default', 'Moody Flex Grids must preserve processed editor copy.');
for (const [file, variant] of [
  ['flexGridCircularTemplate', 'circular'],
  ['flexGridPromoTemplate', 'promo'],
  ['flexGridRectangularTemplate', 'rectangular'],
  ['flexGridFlipTemplate', 'flip'],
  ['flexGridCardTemplate', 'card'],
]) {
  requireText(file, "@moody26/components/moody-flex-grid-standard.html.twig", `${variant} Flex Grid output must reuse the shared template.`);
  requireText(file, `variant: '${variant}'`, `${variant} Flex Grid output must retain its migration variant.`);
}
forbidText('flexGridStandardTemplate', 'href=', 'Flex Grid destinations must not be reconstructed in Twig.');
forbidText('flexGridStandardTemplate', 'sr-only', 'Flex Grid links must not duplicate visible headings with hidden text.');
forbidText('flexGridStandardTemplate', '>View<', 'Flex Grid templates must not invent generic View destinations.');
forbidText('flexGridStandardTemplate', 'View more', 'Flex Grid templates must not invent generic View more destinations.');
forbidText('flexGridStandardTemplate', 'attach_library', 'Moody Flex Grids must use existing libraries without duplicate attachments.');
forbidText('flexGridStandardTemplate', '|raw', 'Moody Flex Grids must not bypass Drupal render safety.');
forbidText('discoveryIndex', '.flex-grid-wrapper', 'Flex Grid presentation must live in its dedicated component stylesheet.');
forbidText('editorialSections', 'field--type-moody-flex-grid', 'Flex Grid CTA presentation must live in its dedicated component stylesheet.');
forbidText('motion', "'.flex-grid-items'", 'Static Moody Flex Grids must not receive decorative reveal motion.');
requireText('theme', 'function moody26_preprocess_views_view_unformatted', 'Faculty directory rows need a translated result summary.');
requireText('theme', 'function moody26_preprocess_views_view_fields', 'Faculty directory profiles need entity-backed names and URLs.');
requireText('theme', "'moody26-directory-' . Html::getClass($directory->label())", 'Landing compositions must use portable directory-term classes.');
requireText('theme', "preg_match('/<h1", 'News leads must normalize nested authored h1 markup.');
requireText('theme', "gmdate('Y-m-d'", 'News teasers need machine-readable publication dates.');
requireText('theme', "$variables['content_attributes']['class'][] = 'node__content';", 'Standalone node output must expose the shared content contract.');
requireText('theme', "mb_strtoupper(mb_substr($variables['person_name'], 0, 1))", 'Missing portraits need a content-derived initial.');
requireText('theme', "'#theme' => 'image_style'", 'Faculty portraits must retain Drupal image-style delivery.');
requireText('theme', "'#alt' => ''", 'Linked directory portraits must remain decorative beside the visible person name.');
requireText('peopleDirectoryRows', 'role="list"', 'The directory grid must expose list semantics.');
requireText('peopleDirectoryRows', "setAttribute('role', 'listitem')", 'Directory entries must expose list-item semantics.');
requireText('peopleDirectoryView', "'No faculty matched'|t", 'Filtered directories need a useful empty-state heading.');
requireText('peopleDirectoryView', "'Try a different name, keyword, or department.'|t", 'Filtered directories need useful recovery guidance.');
requireText('peopleDirectoryFields', '<h2 class="people-directory__name">', 'Each person name must remain a navigable heading.');
requireText('peopleDirectoryFields', 'href="{{ person_url }}"', 'Each directory profile must provide a real destination link.');
requireText('peopleDirectoryFields', 'people-directory__monogram', 'Directory media must provide an honest content-derived fallback.');
requireText('accessibility', "once('moody26-people-directory'", 'Directory navigation enhancement must be idempotent.');
requireText('accessibility', "setAttribute('aria-current', 'page')", 'Directory switchers must announce the current page.');
requireText('accessibility', "Drupal.t('Faculty directories')", 'Directory switchers need a translated landmark name.');
requireText('accessibility', "once('moody26-person-image'", 'Directory portrait fallbacks must be idempotent.');
requireText('accessibility', "classList.add('people-directory__media--fallback')", 'Failed portraits must reveal the stable fallback tile.');
requireText('accessibility', "once('moody26-showcase-image'", 'Showcase media fallbacks must be idempotent.');
requireText('accessibility', "classList.add('moody-showcase--media-unavailable')", 'Failed Showcase media must preserve its text composition.');
requireText('accessibility', "'moody26-resource-image'", 'Resource media fallbacks must be idempotent.');
requireText('accessibility', "classList.add('resource-media--unavailable')", 'Failed resource media must preserve its text and links.');
requireText('accessibility', "once('moody26-featured-highlight-image'", 'Featured Highlight media fallbacks must be idempotent.');
requireText('accessibility', "classList.add('featured-highlight--media-unavailable')", 'Failed Featured Highlight media must preserve and recompose its content.');
requireText('accessibility', "once('moody26-promo-list-image'", 'Promo List media fallbacks must be idempotent.');
requireText('accessibility', "classList.add('promo-list__item--media-unavailable')", 'Failed Promo List media must preserve and recompose its content.');
requireText('accessibility', "once('moody26-flex-content-image'", 'Flex Content Area media fallbacks must be idempotent.');
requireText('accessibility', "classList.add('flex-content--media-unavailable')", 'Failed Flex Content Area media must preserve and recompose its content.');
requireText('accessibility', "once('moody26-image-link-image'", 'Image Link naming and media recovery must be idempotent.');
requireText('accessibility', 'queueMicrotask(() =>', 'Image Link naming must settle after synchronous Drupal link enhancements.');
requireText('accessibility', "target.setAttribute('aria-label'", 'Image Links must normalize their accessible name after upstream link enhancement.');
requireText('accessibility', "Drupal.t('external link')", 'Image Links must announce truthful external destinations.');
requireText('accessibility', "Drupal.t('opens in new window')", 'Image Links must announce new-window behavior.');
requireText('accessibility', "classList.remove('ut-cta-link--external')", 'Same-origin Image Links must not retain a false external-link signal.');
requireText('accessibility', "classList.add('image-link__media--unavailable')", 'Failed linked images must expose a stable text-link fallback.');
requireText('accessibility', "image.closest('picture') ?? image", 'Failed Image Links must hide the broken responsive image source.');
requireText('accessibility', "once('moody26-quotation-image'", 'Moody Quotation media recovery must be idempotent.');
requireText('accessibility', "classList.add('moody-quotation--media-unavailable')", 'Failed quotation media must preserve and recompose its authored content.');
requireText('accessibility', "once('moody26-flex-grid-image'", 'Moody Flex Grid media recovery must be idempotent.');
requireText('accessibility', "classList.add('flex-grid__article--media-unavailable')", 'Failed Flex Grid media must preserve its article text and destination.');
requireText('accessibility', 'image.complete && image.currentSrc && !image.naturalWidth', 'Lazy image safeguards must not treat an unselected source as a failure.');
requireText('focusAreas', '<ul class="focus-areas-items', 'Focus Areas must expose semantic list markup.');
requireText('focusAreas', 'aria-hidden="true"', 'Focus Area icons must remain decorative beside visible task names.');
forbidText('focusAreas', 'sr-only', 'Focus Areas must not duplicate their visible task name.');
requireText('promoUnits', '<ul class="utexas-promo-unit-items" role="list">', 'Promo Unit groups must expose semantic list markup.');
requireText('promoUnits', 'aria-hidden="true"', 'Promo Unit index photography must remain decorative beside resource headings.');
requireText('newsRows', '<section class="news-index"', 'The latest-stories display must expose a labelled section.');
requireText('newsRows', '<ul class="news-index__list" role="list">', 'The latest-stories display must expose list semantics.');
requireText('newsFields', '<article class="news-teaser">', 'Each latest-story result must remain an article.');
requireText('newsFields', '<time class="news-teaser__date"', 'News publication dates must remain semantic time elements.');
requireText('newsFields', '<h2 class="news-teaser__title"', 'Each news story title must remain a navigable heading.');
requireText('newsFields', 'aria-labelledby="{{ story_title_id }}"', 'Each news teaser must keep one descriptive story destination.');
requireText('newsFields', "'Story topics'|t", 'News topic destinations need a translated accessible label.');

const runtimeFiles = [
  'info', 'libraries', 'theme', 'themeSettings', 'fontsCss', 'css',
  'headerSocialCss', 'quickActionsCss', 'landingHero', 'editorialSections', 'discoveryIndex',
  'featuredHighlightCss', 'featuredHighlightTemplate', 'promoListCss', 'promoListTemplate',
  'flexContentCss', 'flexContentFieldTemplate', 'flexContentTemplate',
  'imageLinkCss', 'imageLinkTemplate',
  'flexColorBlocksCss', 'flexColorBlocksFieldTemplate', 'flexColorBlocksTemplate',
  'quotationCss', 'quotationTemplate',
  'flexGridCss', 'flexGridStandardTemplate', 'flexGridCircularTemplate', 'flexGridPromoTemplate',
  'flexGridRectangularTemplate', 'flexGridFlipTemplate', 'flexGridCardTemplate',
  'accordionCss', 'accordionTemplate',
  'peopleDirectory', 'peopleDirectoryView', 'peopleDirectoryRows', 'peopleDirectoryFields',
  'newsroom', 'newsRows', 'newsFields',
  'focusAreas', 'promoUnits',
  'motionCss', 'settingsCss', 'accessibility', 'navigation', 'quickActions', 'motion', 'html', 'page', 'brandbar',
  'header', 'footer', 'brandingBlock', 'menuBlock', 'menu',
];
const forbiddenLegacy = [
  ['base theme: moody', 'legacy Moody base-theme declaration'],
  ['moody-college/moody', 'legacy Moody Composer dependency'],
  ['@moody/', 'legacy Moody Twig namespace'],
  ['#moody-header', 'legacy Moody header selector'],
  ['.main-menu__', 'legacy Moody menu selector'],
  ['search-social-give', 'legacy Moody action-bar selector'],
  ['Speedway', 'Speedway runtime reference'],
];
for (const file of runtimeFiles) {
  for (const [needle, label] of forbiddenLegacy) {
    forbidText(file, needle, `${file} contains a ${label}.`);
  }
}

const cssFiles = ['css', 'headerSocialCss', 'quickActionsCss', 'landingHero', 'editorialSections', 'featuredHighlightCss', 'promoListCss', 'flexContentCss', 'imageLinkCss', 'flexColorBlocksCss', 'quotationCss', 'flexGridCss', 'discoveryIndex', 'accordionCss', 'peopleDirectory', 'newsroom', 'motionCss', 'settingsCss'];
const forbiddenCss = [
  [/#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/i, 'Raw hex colors belong only in tokens.css.'],
  [/\b(?:rgb|rgba|hsl|hsla|oklch)\(/i, 'Raw color functions belong only in tokens.css.'],
  [/transition\s*:\s*all\b/i, 'Transition individual properties; never transition all.'],
  [/\bwidth\s*:\s*100vw\b/i, '100vw can create horizontal overflow.'],
  [/\bmin-height\s*:\s*100vh\b/i, 'Use content-led layouts rather than forced full-height panels.'],
  [/-webkit-background-clip\s*:\s*text|background-clip\s*:\s*text/i, 'Gradient text is outside the Moody26 system.'],
];
for (const file of cssFiles) {
  const cssWithoutComments = (contents[file] ?? '').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [pattern, message] of forbiddenCss) {
    if (pattern.test(cssWithoutComments)) {
      errors.push(`${file}: ${message}`);
    }
  }
  for (const match of cssWithoutComments.matchAll(/font-family\s*:\s*([^;]+);/g)) {
    if (!match[1].trim().startsWith('var(--font-')) {
      errors.push(`${file} has a non-token font-family: ${match[1].trim()}`);
    }
  }
}

for (const file of ['preflight', 'log']) {
  try {
    JSON.parse(contents[file] ?? '');
  }
  catch {
    errors.push(`${file} must contain valid JSON.`);
  }
}
requireText('preflight', '"package_version": "0.16.0"', 'Hallmark preflight must match the Moody Flex Grid release.');
requireText('log', 'Conversational FAQ within the Ecosystem Index', 'Hallmark memory must record the shared accordion macrostructure.');
requireText('log', 'Editorial media directory within the Ecosystem Index', 'Hallmark memory must record the shared Moody Flex Grid component.');

requirePattern('readme', /standalone/i, 'README must describe the standalone architecture.');
forbidText('readme', 'Base theme | `moody`', 'README must not advertise the legacy base theme.');
requirePattern('agents', /base theme:\s*false/i, 'AGENTS.md must preserve the standalone theme contract.');
requireText('agents', 'WCAG 2.3.3', 'AGENTS.md must preserve the interaction-animation accessibility gate.');
requireText('agents', 'Save-Data', 'AGENTS.md must preserve the data-saving motion gate.');
requireText('agents', 'all four setting', 'AGENTS.md must require the complete visual-options test matrix.');
requireText('readme', 'Coordinated page motion (GSAP)', 'README must document the GSAP visual option.');
requireText('readme', 'Interface motion (Anime.js)', 'README must document the Anime.js visual option.');
requireText('readme', 'Header social links', 'README must document the responsive Social Links option.');
requireText('readme', 'stores the selected block’s UUID', 'README must explain Social Links configuration portability.');
requireText('readme', 'Shared people directories', 'README must document the reusable directory layer.');
requireText('readme', 'Shared resource hubs', 'README must document the reusable resource-hub layer.');
requireText('readme', 'Shared newsroom components', 'README must document the reusable newsroom layer.');
requireText('readme', 'Shared accordions', 'README must document the native shared accordion layer.');
requireText('readme', 'Shared Featured Highlights', 'README must document the reusable Featured Highlight layer.');
requireText('readme', 'Shared Promo Lists', 'README must document the reusable Promo List layer.');
requireText('readme', 'Shared Flex Content Areas', 'README must document the reusable Flex Content Area layer.');
requireText('readme', 'Shared Image Links', 'README must document the reusable Image Link layer.');
requireText('readme', 'Shared Flex Color Blocks', 'README must document the reusable Flex Color Block layer.');
requireText('readme', 'Shared Moody Quotations', 'README must document the reusable Moody Quotation layer.');
requireText('readme', 'Shared Moody Flex Grids', 'README must document the reusable Moody Flex Grid layer.');
requireText('agents', '`header_social_links_block`', 'AGENTS.md must preserve the header Social Links contract.');
requireText('agents', 'Missing, unpublished, non-reusable, inaccessible, wrong-bundle, or malformed', 'AGENTS.md must require Social Links to fail closed.');
requireText('agents', '### People directories', 'AGENTS.md must preserve the people-directory contract.');
requireText('agents', '### Resource hubs', 'AGENTS.md must preserve the resource-hub contract.');
requireText('agents', '### Newsroom components', 'AGENTS.md must preserve the newsroom component contract.');
requireText('agents', '### Accordions', 'AGENTS.md must preserve the native accordion contract.');
requireText('agents', '### Featured Highlights', 'AGENTS.md must preserve the Featured Highlight component contract.');
requireText('agents', '### Promo Lists', 'AGENTS.md must preserve the Promo List component contract.');
requireText('agents', '### Flex Content Areas', 'AGENTS.md must preserve the Flex Content Area component contract.');
requireText('agents', '### Image Links', 'AGENTS.md must preserve the Image Link component contract.');
requireText('agents', '### Flex Color Blocks', 'AGENTS.md must preserve the Flex Color Block component contract.');
requireText('agents', '### Moody Quotations', 'AGENTS.md must preserve the Moody Quotation component contract.');
requireText('agents', '### Moody Flex Grids', 'AGENTS.md must preserve the Moody Flex Grid component contract.');

if (errors.length) {
  console.error(`Moody26 verification failed (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
}
else {
  console.log(`Moody26 verification passed (${Object.keys(files).length} source files, ${fonts.length} local fonts, standalone shell, UT brand, accessible directories, resource hubs, newsroom, accordions, Featured Highlights, Promo Lists, Flex Content Areas, Image Links, Flex Color Blocks, Moody Quotations, and Moody Flex Grids, header social links, motion, responsive, and Hallmark gates).`);
}
