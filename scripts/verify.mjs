#!/usr/bin/env node

import { readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const themeRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const files = {
  readme: 'README.md',
  agents: 'AGENTS.md',
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
  quickActionsCss: 'css/components/quick-actions.css',
  quickActionsPreview: 'css/components/quick-actions.preview.html',
  landingHero: 'css/components/landing-hero.css',
  editorialSections: 'css/components/editorial-sections.css',
  discoveryIndex: 'css/components/discovery-index.css',
  accessibility: 'js/accessibility.js',
  navigation: 'js/navigation.js',
  quickActions: 'js/quick-actions.js',
  html: 'templates/html.html.twig',
  page: 'templates/pages/page.html.twig',
  brandbar: 'templates/partials/brandbar.html.twig',
  header: 'templates/partials/header.html.twig',
  footer: 'templates/partials/footer.html.twig',
  brandingBlock: 'templates/blocks/block--system-branding-block.html.twig',
  menuBlock: 'templates/blocks/block--system-menu-block--primary-menu.html.twig',
  menu: 'templates/menus/menu--primary-menu.html.twig',
  logo: 'logo.svg',
  sourceLicense: 'LICENSE',
  fontLicense: 'LICENSES/OFL-1.1.txt',
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

requireText('tokens', '--color-ut-burnt-orange: #bf5700;', 'Use exact UT burnt orange #bf5700.');
requireText('tokens', '--font-display: "CharisSil", Georgia, serif;', 'Use the approved UT digital serif role.');
requireText('tokens', '--font-body: "LibreFrank", Arial, Helvetica, sans-serif;', 'Use the approved UT digital sans-serif role.');
requireText('tokens', '--target-min: 2.75rem;', 'Interactive targets must retain the 44 CSS-pixel floor.');
requireText('tokens', '--color-accent-ink:', 'Accent surfaces need a verified text-color pair.');
requireText('tokens', '--focus-outline:', 'Visible focus must use a named token.');

for (const weight of ['400', '500', '600', '700', '900']) {
  requireText('fontsCss', `font-weight: ${weight};`, `Local font CSS must include weight ${weight}.`);
}
requireText('fontLicense', 'SIL OPEN FONT LICENSE Version 1.1', 'Bundled fonts must include their OFL license.');
requireText('sourceLicense', 'GNU GENERAL PUBLIC LICENSE', 'Theme source must include the declared GPL license.');
requireText('logo', 'viewBox=', 'The approved Moody mark must remain a scalable SVG.');
requirePattern('logo', /#bf5700/i, 'The approved Moody mark must retain exact burnt orange.');
requirePattern('logo', /#333f48/i, 'The approved Moody mark must retain UT charcoal.');

requireText('html', 'href="#main-content"', 'The HTML shell needs a skip link.');
requireText('page', '<main{{ main_content_attributes }}>', 'The page shell must own the main landmark.');
requireText('page', 'highlighted_content|striptags|trim', 'Empty rendered utility regions must not create layout gaps.');
requireText('header', 'id="moody26-header"', 'The theme must own its header shell.');
requireText('header', 'aria-controls="moody26-primary-navigation"', 'The drawer button must identify its navigation.');
requireText('brandbar', 'https://www.utexas.edu/', 'The University bar must link to UT Austin.');
requireText('brandbar', 'ut-parent-entity', 'The optional parent-unit hook must remain available.');
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
requireText('navigation', 'event.relatedTarget && item.contains(event.relatedTarget)', 'Submenus must remain open while focus moves between their links.');
requireText('navigation', "event.key !== 'Escape'", 'Escape must close the current navigation layer.');
requireText('navigation', "document.addEventListener('keydown'", 'Escape handling must support Safari click-focus behavior.');
requireText('navigation', 'navigation.inert =', 'A closed mobile drawer must leave the tab order.');
requireText('navigation', "window.matchMedia('(min-width: 75rem)')", 'Navigation must switch at the content-driven desktop breakpoint.');

requireText('quickActions', "'aria-keyshortcuts': 'Meta+K Control+K'", 'Quick actions must advertise both platform shortcuts.');
requireText('quickActions', "role: 'combobox'", 'Quick-action search must expose combobox semantics.');
requireText('quickActions', "role: 'listbox'", 'Quick-action results must expose listbox semantics.');
requireText('quickActions', "role: 'option'", 'Quick-action destinations must expose option semantics.');
requireText('quickActions', "'aria-activedescendant'", 'Arrow-key selection must be announced.');
requireText('quickActions', "'aria-live': 'polite'", 'Result counts must use a polite live region.');
requireText('quickActions', 'dialog.showModal()', 'Quick actions must use a native modal dialog.');
requireText('quickActions', '.moody26-submenu__link[href]', 'Quick actions must discover the rendered Drupal menu.');
requireText('quickActions', "target.closest('input, textarea, select, [contenteditable]", 'Editor shortcuts must remain untouched.');
requireText('accessibility', "icon.removeAttribute('tabindex')", 'Decorative scroll hints must stay out of the tab order.');

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
requirePattern('css', /\[aria-busy="true"\]/, 'Loading states must be styled.');
requirePattern('css', /\[data-state="error"\]/, 'Error states must be styled.');
requirePattern('css', /\[data-state="success"\]/, 'Success states must be styled.');

requireText('quickActionsCss', 'component: command palette', 'Quick actions must retain the Hallmark component contract.');
for (const state of ['Default', 'Hover', 'Focus', 'Active', 'Disabled', 'Loading', 'Error', 'Success']) {
  requireText('quickActionsPreview', `>${state}<`, `The state sheet must include ${state.toLowerCase()}.`);
}
requireText('landingHero', 'macrostructure: Split Studio', 'Landing components must preserve the Split Studio decision.');
requireText('editorialSections', 'container-type: inline-size', 'Editorial components must remain container-aware.');
requireText('discoveryIndex', 'repeat(12, minmax(0, 1fr))', 'Discovery grids must use safe image-bearing tracks.');

const runtimeFiles = [
  'info', 'libraries', 'theme', 'themeSettings', 'fontsCss', 'css',
  'quickActionsCss', 'landingHero', 'editorialSections', 'discoveryIndex',
  'accessibility', 'navigation', 'quickActions', 'html', 'page', 'brandbar',
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

const cssFiles = ['css', 'quickActionsCss', 'landingHero', 'editorialSections', 'discoveryIndex'];
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

if (errors.length) {
  console.error(`Moody26 verification failed (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
}
else {
  console.log(`Moody26 verification passed (${Object.keys(files).length} source files, ${fonts.length} local fonts, standalone shell, UT brand, accessibility, responsive, and Hallmark gates).`);
}
