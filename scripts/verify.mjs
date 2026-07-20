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
  discoveryIndex: 'css/components/discovery-index.css',
  peopleDirectory: 'css/components/people-directory.css',
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
  if (packageJson.version !== '0.6.0') {
    errors.push('The shared-directory release must remain versioned as 0.6.0.');
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
requireText('libraries', 'js/dist/motion.min.js', 'The built motion integration must remain attached.');
requireText('libraries', 'version: 0.6.0', 'The Drupal asset version must match the shared-directory release.');
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
requireText('editorialSections', 'container-type: inline-size', 'Editorial components must remain container-aware.');
requireText('discoveryIndex', 'repeat(12, minmax(0, 1fr))', 'Discovery grids must use safe image-bearing tracks.');
requireText('peopleDirectory', 'component: shared people directory', 'People directories must retain the Hallmark component contract.');
requireText('peopleDirectory', 'container: people-directory / inline-size;', 'People directories must remain container-aware.');
requireText('peopleDirectory', 'repeat(4, minmax(0, 1fr))', 'People-directory image grids must use safe tracks.');
requireText('peopleDirectory', '.people-directory__profile:focus-visible', 'People profile links need a visible focus-equivalent detail.');
requireText('peopleDirectory', '@media (hover: hover) and (pointer: fine)', 'People-directory hover feedback must be capability-gated.');
requireText('theme', 'function moody26_preprocess_views_view_unformatted', 'Faculty directory rows need a translated result summary.');
requireText('theme', 'function moody26_preprocess_views_view_fields', 'Faculty directory profiles need entity-backed names and URLs.');
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

const runtimeFiles = [
  'info', 'libraries', 'theme', 'themeSettings', 'fontsCss', 'css',
  'headerSocialCss', 'quickActionsCss', 'landingHero', 'editorialSections', 'discoveryIndex',
  'peopleDirectory', 'peopleDirectoryView', 'peopleDirectoryRows', 'peopleDirectoryFields',
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

const cssFiles = ['css', 'headerSocialCss', 'quickActionsCss', 'landingHero', 'editorialSections', 'discoveryIndex', 'peopleDirectory', 'motionCss', 'settingsCss'];
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
requireText('agents', '`header_social_links_block`', 'AGENTS.md must preserve the header Social Links contract.');
requireText('agents', 'Missing, unpublished, non-reusable, inaccessible, wrong-bundle, or malformed', 'AGENTS.md must require Social Links to fail closed.');
requireText('agents', '### People directories', 'AGENTS.md must preserve the people-directory contract.');

if (errors.length) {
  console.error(`Moody26 verification failed (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
}
else {
  console.log(`Moody26 verification passed (${Object.keys(files).length} source files, ${fonts.length} local fonts, standalone shell, UT brand, accessible directories, header social links, motion, responsive, and Hallmark gates).`);
}
