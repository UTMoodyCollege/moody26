#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const themeRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(themeRoot, '../../../..');

const files = {
  rootAgents: resolve(repoRoot, 'AGENTS.md'),
  agents: resolve(themeRoot, 'AGENTS.md'),
  info: resolve(themeRoot, 'moody26.info.yml'),
  libraries: resolve(themeRoot, 'moody26.libraries.yml'),
  tokens: resolve(themeRoot, 'tokens.css'),
  css: resolve(themeRoot, 'css/moody26.css'),
  quickActionsCss: resolve(themeRoot, 'css/components/quick-actions.css'),
  quickActionsPreview: resolve(themeRoot, 'css/components/quick-actions.preview.html'),
  landingHero: resolve(themeRoot, 'css/components/landing-hero.css'),
  editorialSections: resolve(themeRoot, 'css/components/editorial-sections.css'),
  discoveryIndex: resolve(themeRoot, 'css/components/discovery-index.css'),
  accessibility: resolve(themeRoot, 'js/accessibility.js'),
  navigation: resolve(themeRoot, 'js/navigation.js'),
  quickActions: resolve(themeRoot, 'js/quick-actions.js'),
  menu: resolve(themeRoot, 'templates/menus/menu--primary-menu.html.twig'),
  preflight: resolve(themeRoot, '.hallmark/preflight.json'),
  log: resolve(themeRoot, '.hallmark/log.json'),
  rootPackage: resolve(repoRoot, 'package.json'),
  playwright: resolve(repoRoot, 'playwright.config.js'),
  visualTest: resolve(repoRoot, 'tests/moody26.visual.spec.js'),
  functionalTest: resolve(repoRoot, 'tests/moody26.spec.js'),
};

const errors = [];
const contents = {};

for (const [name, path] of Object.entries(files)) {
  try {
    contents[name] = readFileSync(path, 'utf8');
  }
  catch {
    errors.push(`Missing required ${name} file: ${path}`);
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

requireText('info', 'base theme: moody', 'The theme must retain Moody as its compatibility base.');
requireText('info', 'moody26/global', 'The global Moody26 library must be attached.');
requireText('libraries', 'tokens.css: { weight: 100 }', 'Tokens must load before theme CSS.');
requireText('libraries', 'css/components/quick-actions.css: { weight: 105 }', 'Quick actions must follow the foundation and precede landing components.');
requireText('libraries', 'css/components/landing-hero.css: { weight: 110 }', 'The landing hero component stylesheet must follow the foundation.');
requireText('libraries', 'css/components/editorial-sections.css: { weight: 120 }', 'The editorial sections component stylesheet must be attached.');
requireText('libraries', 'css/components/discovery-index.css: { weight: 130 }', 'The discovery index component stylesheet must be attached last.');
requireText('libraries', 'js/accessibility.js', 'Inherited component accessibility repairs must be attached.');
requireText('libraries', 'core/drupalSettings', 'The configured content-owned ambient poster must be available to the accessibility repair.');
requireText('libraries', 'js/navigation.js', 'The semantic navigation state behavior must be attached.');
requireText('libraries', 'js/quick-actions.js', 'The accessible quick-action behavior must be attached.');
requireText('tokens', '--color-ut-burnt-orange: oklch(57.7767% 0.15453 49.202);', 'Use the exact color-space equivalent of UT burnt orange #bf5700.');
requireText('tokens', '--font-display: "CharisSil", Georgia, serif;', 'Use the approved UT digital serif stack.');
requireText('tokens', '--font-body: "LibreFrank", Arial, Helvetica, sans-serif;', 'Use the approved UT digital sans-serif stack.');
requireText('tokens', '--target-min: 2.75rem;', 'Interactive targets must retain the 44 CSS-pixel minimum.');
requireText('tokens', '--header-logo-inline-max:', 'The approved Moody wordmark must retain a dedicated responsive scale token.');
requireText('tokens', '--header-search-max:', 'The compact header search width must remain tokenized.');
requireText('tokens', '--quick-actions-inline-max:', 'The quick-action dialog width must remain tokenized.');
requireText('tokens', '--shadow-dialog:', 'The command palette must use a named elevation token.');
requireText('tokens', '--focus-outline:', 'A browser-compatible visible focus token is required.');
requireText('tokens', '--transition-control:', 'Control motion must use a browser-compatible property-limited token.');
requireText('css', 'overflow-x: clip;', 'The theme must prevent viewport-level horizontal overflow without hiding focus.');
requireText('css', ':focus-visible', 'Visible keyboard focus styling is required.');
requireText('css', '@media (prefers-reduced-motion: reduce)', 'Reduced-motion behavior is required.');
requireText('css', 'white-space: nowrap;', 'Primary affordances must not wrap.');
requireText('css', 'background: var(--color-ink) !important;', 'The primary menu must retain its consistent charcoal rail.');
requireText('css', '--drupal-displace-offset-top', 'The sticky header must respect Drupal administrative toolbar displacement.');
requireText('css', '#moody-header .region-header-primary .block-system-branding-block', 'The portable branding block must retain its masthead alignment correction.');
requireText('css', '@media (min-width: 40rem)', 'The small responsive breakpoint is required.');
requireText('css', '@media (min-width: 60rem)', 'The large responsive breakpoint is required.');
requireText('css', '@media (min-width: 90rem)', 'The wide responsive breakpoint is required.');
requirePattern('css', /\[aria-busy="true"\]/, 'Loading states must be styled.');
requirePattern('css', /\[data-state="error"\]/, 'Error states must be styled.');
requirePattern('css', /\[data-state="success"\]/, 'Success states must be styled.');
requireText('menu', '<button', 'Submenu triggers must use native buttons.');
requireText('menu', 'aria-controls="{{ submenu_id }}"', 'Submenu triggers must identify their panels.');
requireText('menu', 'aria-labelledby="{{ panel_id }}-trigger"', 'Submenu panels must retain their disclosure-button label relationship.');
forbidText('menu', 'aria-haspopup="true"', 'Disclosure navigation must not claim ARIA menu-popup semantics.');
forbidText('menu', 'role="region"', 'Each submenu must not create a redundant landmark.');
requireText('accessibility', "image.setAttribute('alt', '')", 'The inherited decorative ambient-video fallback must expose empty alt text.');
requireText('accessibility', "image.setAttribute('fetchpriority', 'high')", 'The ambient-video LCP fallback must load at high priority.');
requireText('accessibility', "control.setAttribute('aria-label', 'Scroll to page content')", 'The inherited scroll cue must expose an accessible name.');
requireText('accessibility', "'Pause background video'", 'The inherited ambient-video control must keep a truthful accessible name.');
requireText('navigation', "menuButton.removeAttribute('href')", 'The inherited menu button must not retain an invalid href attribute.');
requireText('navigation', "menuButton.setAttribute('aria-controls', navigation.id)", 'The menu control must identify its navigation region.');
requireText('navigation', "menuButton.setAttribute('aria-expanded', 'false')", 'The menu control must expose its initial state.');
requireText('navigation', "Drupal.t('Primary navigation')", 'The primary navigation landmark must retain a concise accessible name.');
requireText('navigation', "labelSource === primaryNavigation", 'The primary navigation must repair inherited self-referential labelling.');
requireText('navigation', 'navigation.classList.toggle(\'active\', drawerOpen)', 'The mobile drawer must preserve user intent across the inherited delayed reset.');
requireText('navigation', "attributeFilter: ['aria-expanded', 'class']", 'Submenu button state must stay synchronized with inherited navigation behavior.');
requireText('navigation', "trigger.classList.remove('focus', 'add-border', 'icon--open')", 'Closing a submenu must clear inherited visual state classes.');
requireText('navigation', "window.matchMedia('(min-width: 75rem)')", 'Wide-screen submenu buttons must bridge the inherited 1200px event gap.');
requireText('navigation', "item.addEventListener('focusout'", 'Submenus must close when keyboard focus leaves their complete menu item.');
requireText('navigation', "event.key === 'Tab' && !event.shiftKey", 'Forward Tab must preserve the focused submenu for native destination navigation.');
requireText('navigation', "event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar'", 'Submenu buttons must preserve Enter and Space activation across supported browsers.');
requireText('navigation', "input.removeAttribute('required')", 'Sitewide search must not expose a false required state.');
requireText('navigation', "Drupal.t('Search Moody College site')", 'Sitewide search must retain its accurate accessible label.');
requireText('css', '.block__ut-social-links--link', 'Footer social links must retain the theme target-size override.');
requireText('quickActionsCss', 'component: command palette', 'The quick-action stylesheet must retain its Hallmark component contract.');
requirePattern('quickActionsCss', /:focus-visible/, 'Quick actions need visible keyboard focus.');
requirePattern('quickActionsCss', /:disabled/, 'Quick actions must style disabled controls.');
requirePattern('quickActionsCss', /\[aria-busy="true"\]/, 'Quick actions must style loading controls.');
requirePattern('quickActionsCss', /\[data-state="error"\]/, 'Quick actions must style error controls.');
requirePattern('quickActionsCss', /\[data-state="success"\]/, 'Quick actions must style success controls.');
requireText('quickActionsCss', ':has(.moody-quick-actions__input[data-state="error"])::after', 'Input errors need a non-color status glyph.');
requireText('quickActionsCss', ':has(.moody-quick-actions__input[data-state="success"])::after', 'Input success needs a non-color status glyph.');
requireText('quickActions', "'aria-keyshortcuts': 'Meta+K Control+K'", 'The trigger must advertise both platform shortcuts.');
requireText('quickActions', "role: 'combobox'", 'Quick-action search must expose combobox semantics.');
requireText('quickActions', "role: 'listbox'", 'Quick-action results must expose listbox semantics.');
requireText('quickActions', "role: 'option'", 'Quick-action destinations must expose option semantics.');
requireText('quickActions', "'aria-activedescendant'", 'Arrow-key selection must be announced from the focused input.');
requireText('quickActions', "'aria-live': 'polite'", 'Quick-action result counts must use a polite live region.');
requireText('quickActions', 'dialog.showModal()', 'Quick actions must use a native modal dialog.');
requireText('quickActions', '.main-menu__link--subnav[href]', 'Quick actions must discover the rendered Drupal menu instead of duplicating destinations.');
requireText('quickActions', "target.closest('input, textarea, select, [contenteditable]", 'Editor and form shortcuts must remain untouched.');
requireText('quickActionsPreview', 'Quick actions — eight states', 'The disposable Hallmark preview must document all eight states.');
for (const state of ['Default', 'Hover', 'Focus', 'Active', 'Disabled', 'Loading', 'Error', 'Success']) {
  requireText('quickActionsPreview', `>${state}<`, `The quick-action preview must include the ${state.toLowerCase()} state.`);
}
requireText('agents', 'Header shell:', 'The theme agent guide must preserve the header shell contract.');
requireText('agents', 'Expanded primary navigation:', 'The theme agent guide must preserve the balanced mega-menu contract.');
requireText('agents', 'Option+Tab', 'The theme agent guide must preserve Safari link-navigation behavior.');
requireText('agents', 'Quick actions:', 'The theme agent guide must preserve the command-palette contract.');
requireText('landingHero', 'macrostructure: Split Studio', 'Landing components must preserve the Hallmark Split Studio decision.');
requireText('landingHero', '--hero-block-size', 'Landing heroes must consume the shared footprint token.');
requireText('editorialSections', 'container-type: inline-size', 'Editorial components must support container-driven composition.');
requireText('editorialSections', '.field--type-moody-showcase', 'The inherited Moody Showcase component must be integrated into the new system.');
requireText('discoveryIndex', 'repeat(12, minmax(0, 1fr))', 'Discovery grids must use safe image-bearing tracks.');
requireText('rootPackage', 'test:moody26:visual:update', 'The repository must expose an intentional visual-baseline update command.');
requireText('playwright', 'BROWSER_MATRIX', 'The browser release gate must expose the opt-in browser matrix.');
requireText('playwright', "screenshot: 'only-on-failure'", 'Browser failures must retain screenshot evidence.');
requireText('playwright', "video: 'retain-on-failure'", 'Browser failures must retain video evidence.');
requireText('visualTest', 'toHaveScreenshot', 'The primary route matrix must use Playwright visual assertions.');
requireText('visualTest', 'expanded mega-menu at desktop', 'The visual matrix must capture the balanced open mega-menu.');
requireText('visualTest', 'quick actions at', 'The visual matrix must capture the open quick-action palette.');
requireText('functionalTest', 'centers sparse mega-menu rows', 'The browser checks must guard balanced sparse menu rows.');
requireText('functionalTest', 'wordmark vertical alignment', 'The browser checks must guard masthead wordmark alignment at every release viewport.');
requireText('functionalTest', 'tabs through desktop and mobile menu destinations without trapping focus', 'The browser checks must guard native menu Tab order and focus escape.');
requireText('functionalTest', "browserName === 'webkit' ? 'Alt+Tab' : 'Tab'", 'The browser checks must exercise Safari link navigation and standard Tab navigation.');
requireText('functionalTest', "Meta+K Control+K", 'The browser checks must verify the advertised quick-action shortcut.');
for (const route of ['/', '/about', '/students', '/academics', '/home/research', '/alumni', '/news']) {
  requireText('visualTest', `path: '${route}'`, `The visual route matrix must cover ${route}.`);
}

const officialSources = [
  'website-guidelines',
  'digital-accessibility-policy-and-procedures',
  'university-csu-wordmarks',
  '/colors/',
  '/typography/',
];
for (const source of officialSources) {
  requireText('rootAgents', source, `Root AGENTS.md must preserve the official ${source} source.`);
  requireText('agents', source, `Theme AGENTS.md must preserve the official ${source} source.`);
}

for (const file of ['rootAgents', 'agents']) {
  requirePattern(file, /WCAG 2\.1[^\n]*AA/i, `${file} must state the WCAG 2.1 AA floor.`);
  requirePattern(file, /Emergency\s+Information/i, `${file} must state the required Emergency Information footer link.`);
  requirePattern(file, /Web\s+Privacy/i, `${file} must state the required Web Privacy footer link.`);
  requirePattern(file, /dynamic[^.\n]*copyright|copyright[^.\n]*dynamic/i, `${file} must require a dynamic copyright year.`);
}

const themeCssFiles = ['css', 'quickActionsCss', 'landingHero', 'editorialSections', 'discoveryIndex'];
const forbiddenCss = [
  [/#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/i, 'Raw hex colors belong only in documentation; theme CSS must use tokens.'],
  [/\b(?:rgb|rgba|hsl|hsla|oklch)\(/i, 'Raw color functions belong only in tokens.css.'],
  [/transition\s*:\s*all\b/i, 'Transition individual properties; never transition all.'],
  [/\bwidth\s*:\s*100vw\b/i, '100vw can create horizontal overflow.'],
  [/\bmin-height\s*:\s*100vh\b/i, 'Use content-led layouts rather than forced full-height panels.'],
  [/-webkit-background-clip\s*:\s*text|background-clip\s*:\s*text/i, 'Gradient or clipped text is outside the Moody26 system.'],
];
for (const file of themeCssFiles) {
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

if (errors.length) {
  console.error(`Moody26 verification failed (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
}
else {
  console.log(`Moody26 verification passed (${Object.keys(files).length} required files, UT brand tokens, accessibility states, responsive gates, and Hallmark metadata).`);
}
