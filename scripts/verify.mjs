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
  richTextCss: 'css/components/rich-text.css',
  editorialSections: 'css/components/editorial-sections.css',
  featuredHighlightCss: 'css/components/featured-highlight.css',
  promoListCss: 'css/components/promo-list.css',
  flexContentCss: 'css/components/flex-content.css',
  imageLinkCss: 'css/components/image-link.css',
  flexColorBlocksCss: 'css/components/flex-color-blocks.css',
  quotationCss: 'css/components/quotation.css',
  flexGridCss: 'css/components/flex-grid.css',
  impactFactsCss: 'css/components/impact-facts.css',
  showcaseCss: 'css/components/showcase.css',
  contactInfoCss: 'css/components/contact-info.css',
  callToActionCss: 'css/components/call-to-action.css',
  resourceGroupCss: 'css/components/resource-group.css',
  flexTabsCss: 'css/components/flex-tabs.css',
  flexListCss: 'css/components/flex-list.css',
  heroCarouselCss: 'css/components/hero-carousel.css',
  photoContentCss: 'css/components/photo-content.css',
  newsletterCss: 'css/components/newsletter.css',
  quickLinksCss: 'css/components/quick-links.css',
  socialLinksCss: 'css/components/social-links.css',
  anchorGalleryCss: 'css/components/anchor-gallery.css',
  discoveryIndex: 'css/components/discovery-index.css',
  accordionCss: 'css/components/accordion.css',
  peopleDirectory: 'css/components/people-directory.css',
  studentStoriesCss: 'css/components/student-stories.css',
  studentStoriesPreview: 'css/components/student-stories.preview.html',
  eventsListingCss: 'css/components/events-listing.css',
  eventsListingPreview: 'css/components/events-listing.preview.html',
  newsroom: 'css/components/newsroom.css',
  featureStoryCss: 'css/components/feature-story.css',
  eventDetailCss: 'css/components/event-detail.css',
  facultyProfileCss: 'css/components/faculty-profile.css',
  shorthandStoryCss: 'css/components/shorthand-story.css',
  pdfDocumentCss: 'css/components/pdf-document.css',
  pdfDocumentPreview: 'css/components/pdf-document.preview.html',
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
  studentStoriesView: 'templates/views/views-view--life-after-moody-explorer--block-1.html.twig',
  studentStoriesRows: 'templates/views/views-view-unformatted--life-after-moody-explorer--block-1.html.twig',
  studentStoriesFields: 'templates/views/views-view-fields--life-after-moody-explorer--block-1.html.twig',
  profileListingBlock: 'templates/blocks/block--block-content--utprof-profile-listing.html.twig',
  profileDesignationField: 'templates/components/field--node--field-utprof-designation.html.twig',
  newsRows: 'templates/views/views-view-unformatted--news-filtered--block-filtered.html.twig',
  newsFields: 'templates/views/views-view-fields--news-filtered--block-filtered.html.twig',
  featureCreditTemplate: 'templates/components/moody-feature-credit.html.twig',
  eventTemplate: 'templates/content/node--moody-event.html.twig',
  eventsListingTemplate: 'templates/components/moody-events-v2-block.html.twig',
  facultyProfileTemplate: 'templates/content/node--faculty-bio.html.twig',
  shorthandStoryTemplate: 'templates/blocks/block--moody-shorthand-zip-shorthand-zip-story.html.twig',
  pdfDocumentTemplate: 'templates/blocks/block--moody-flipbook-pdf-flipbook.html.twig',
  focusAreas: 'templates/components/moody-focus-areas.html.twig',
  promoUnits: 'templates/components/utexas-promo-unit.html.twig',
  featuredHighlightTemplate: 'templates/components/utexas-featured-highlight.html.twig',
  promotionTemplate: 'templates/components/moody-promotion.html.twig',
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
  impactFactsTemplate: 'templates/components/moody-impact-facts.html.twig',
  showcaseFieldTemplate: 'templates/components/field--moody-showcase.html.twig',
  showcaseTemplate: 'templates/components/moody-showcase.html.twig',
  contactInfoTemplate: 'templates/components/moody-contact-info.html.twig',
  utexasResourcesTemplate: 'templates/components/utexas-resources.html.twig',
  moodyResourceGroupTemplate: 'templates/components/moody-resource-group.html.twig',
  flexTabsTemplate: 'templates/components/field--moody-flex-tabs.html.twig',
  flexListTemplate: 'templates/components/field--utexas-flex-list.html.twig',
  flexListAccordionTemplate: 'templates/components/field--utexas-flex-list--accordion.html.twig',
  flexListTabsTemplate: 'templates/components/field--utexas-flex-list--htabs.html.twig',
  heroCarouselTemplate: 'templates/components/field--block-content--utexas-hero-carousel.html.twig',
  photoContentTemplate: 'templates/components/utexas-photo-content-area.html.twig',
  newsletterTemplate: 'templates/components/moody-newsletter.html.twig',
  quickLinksTemplate: 'templates/components/utexas-quick-links.html.twig',
  socialLinksTemplate: 'templates/components/field--utexas-social-link-field.html.twig',
  anchorGalleryTemplate: 'templates/components/field--block-content--field-anchor-image--moody-anchors-block.html.twig',
  heroTemplate: 'templates/components/moody-hero.html.twig',
  heroStyle1Template: 'templates/components/moody-hero-1.html.twig',
  heroStyle2Template: 'templates/components/moody-hero-2.html.twig',
  heroStyle3Template: 'templates/components/moody-hero-3.html.twig',
  heroStyle4Template: 'templates/components/moody-hero-4.html.twig',
  heroStyle5Template: 'templates/components/moody-hero-5.html.twig',
  heroStyle6Template: 'templates/components/moody-hero-6.html.twig',
  heroStyle6ShortTemplate: 'templates/components/moody-hero-6-short.html.twig',
  heroStyle7Template: 'templates/components/moody-hero-7.html.twig',
  heroStyle8Template: 'templates/components/moody-hero-8.html.twig',
  utexasHeroTemplate: 'templates/components/utexas-hero.html.twig',
  utexasHero1Template: 'templates/components/utexas-hero-1.html.twig',
  utexasHero2Template: 'templates/components/utexas-hero-2.html.twig',
  utexasHero3Template: 'templates/components/utexas-hero-3.html.twig',
  utexasHero4Template: 'templates/components/utexas-hero-4.html.twig',
  utexasHero5Template: 'templates/components/utexas-hero-5.html.twig',
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

const forbidPattern = (file, pattern, message) => {
  if (pattern.test(contents[file] ?? '')) {
    errors.push(message);
  }
};

try {
  const packageJson = JSON.parse(contents.package ?? '');
  if (packageJson.version !== '0.43.0') {
    errors.push('The semantic events-listing release must remain versioned as 0.43.0.');
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
requireText('libraries', 'css/components/rich-text.css', 'Shared Basic and Rich Text styles must remain attached.');
requireText('richTextCss', 'container: moody26-rich-text / inline-size;', 'Basic blocks must expose a portable component container.');
requireText('richTextCss', '.block-bundle-basic .ut-copy li::marker', 'Basic lists must retain a restrained non-color-independent marker treatment.');
requireText('richTextCss', 'a[target="_blank"]', 'Basic new-window links need a visible behavior signal.');
requireText('richTextCss', 'clip-path: polygon(', 'Basic new-window links must retain a custom CSS behavior mark.');
requireText('richTextCss', 'Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4', 'Basic and Rich Text styles must retain their Hallmark self-critique.');
requireText('richTextCss', 'overflow-wrap: anywhere;', 'Pasted rich-text destinations must not widen the page.');
forbidPattern('richTextCss', /(?:online-teaching|deans-ambassadors|node-\d+|block-[\da-f]{8}-[\da-f-]{27,})/i, 'Basic and Rich Text styling must not depend on routes, node IDs, or block UUIDs.');
requireText('libraries', 'css/components/people-directory.css', 'Shared people-directory styles must remain attached.');
requireText('libraries', 'css/components/student-stories.css', 'Shared student-story styles must remain attached.');
requireText('libraries', 'css/components/events-listing.css', 'Shared upcoming-events styles must remain attached.');
requireText('libraries', 'css/components/newsroom.css', 'Shared newsroom styles must remain attached.');
requireText('libraries', 'css/components/feature-story.css', 'Shared feature-story styles must remain attached.');
requireText('libraries', 'css/components/event-detail.css', 'Shared event-detail styles must remain attached.');
requireText('libraries', 'css/components/faculty-profile.css', 'Shared faculty-profile styles must remain attached.');
requireText('libraries', 'css/components/shorthand-story.css', 'The Shorthand integration boundary must remain attached.');
requireText('libraries', 'css/components/pdf-document.css', 'The PDF document boundary must remain attached.');
requireText('libraries', 'css/components/accordion.css', 'Shared accordion styles must remain attached.');
requireText('libraries', 'css/components/featured-highlight.css', 'Shared Featured Highlight styles must remain attached.');
requireText('libraries', 'css/components/promo-list.css', 'Shared Promo List styles must remain attached.');
requireText('libraries', 'css/components/flex-content.css', 'Shared Flex Content Area styles must remain attached.');
requireText('libraries', 'css/components/image-link.css', 'Shared Image Link styles must remain attached.');
requireText('libraries', 'css/components/flex-color-blocks.css', 'Shared Flex Color Block styles must remain attached.');
requireText('libraries', 'css/components/quotation.css', 'Shared Moody Quotation styles must remain attached.');
requireText('libraries', 'css/components/flex-grid.css', 'Shared Moody Flex Grid styles must remain attached.');
requireText('libraries', 'css/components/impact-facts.css', 'Shared Moody Impact Facts styles must remain attached.');
requireText('libraries', 'css/components/showcase.css', 'Shared Moody Showcase styles must remain attached.');
requireText('libraries', 'css/components/contact-info.css', 'Shared Moody Contact Info styles must remain attached.');
requireText('libraries', 'css/components/call-to-action.css', 'Shared Call to Action styles must remain attached.');
requireText('libraries', 'css/components/resource-group.css', 'Shared Resource Group styles must remain attached.');
requireText('libraries', 'css/components/flex-tabs.css', 'Shared Flex Tabs styles must remain attached.');
requireText('libraries', 'css/components/flex-list.css', 'Shared UT Drupal Kit Flex List styles must remain attached.');
requireText('libraries', 'css/components/hero-carousel.css', 'Accessible UT Drupal Kit Hero Carousel styles must remain attached.');
requireText('libraries', 'css/components/photo-content.css', 'Shared UT Drupal Kit Photo Content Area styles must remain attached.');
requireText('libraries', 'css/components/newsletter.css', 'Shared Moody Newsletter styles must remain attached.');
requireText('libraries', 'css/components/quick-links.css', 'Shared UT Drupal Kit Quick Links styles must remain attached.');
requireText('libraries', 'css/components/social-links.css', 'Shared UT Drupal Kit Social Links styles must remain attached.');
requireText('libraries', 'css/components/anchor-gallery.css', 'Shared Moody Anchor gallery styles must remain attached.');
requireText('libraries', 'js/dist/motion.min.js', 'The built motion integration must remain attached.');
requireText('libraries', 'version: 0.43.0', 'The Drupal asset version must match the semantic events-listing release.');
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
requireText('accessibility', "once(\n        'moody26-basic-new-window'", 'Basic new-window enhancement must remain idempotent.');
requireText('accessibility', "link.relList.add('noopener')", 'Basic new-window links must receive an explicit safe relationship.');
requireText('accessibility', "Drupal.t('Opens in new window.')", 'Basic new-window behavior must have a translated assistive description.');
requireText('accessibility', "link.setAttribute('aria-describedby'", 'Basic new-window links must preserve their accessible name and reference a description.');
requireText('theme', "$block_content->bundle() === 'basic'", 'Basic block safeguards must use the portable bundle contract.');
requireText('theme', "preg_replace('/<(\\/?)h1(\\b[^>]*)>/i', '<$1h2$2>'", 'Basic block h1 elements must render at the first valid section level.');
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
requireText('headerSocialCss', 'background-size: var(--space-lg);', 'Header social marks must remain subordinate to their touch targets.');
requireText('headerSocialCss', 'background-image: var(--social-icon-image);', 'Header social marks must use provider-owned icon artwork.');
requireText('headerSocialCss', '-webkit-mask: none;', 'Header social artwork must not retain the provider alpha mask.');
requireText('headerSocialCss', '.social-links__list', 'Header social placement must support the semantic field template.');
requireText('headerSocialCss', ':focus-within', 'Header social links must expose visible parent focus without relying on :has().');
forbidText('headerSocialCss', ':has(', 'Header social focus must remain compatible with supported Firefox releases.');
requireText('headerSocialCss', '@media (hover: hover) and (pointer: fine)', 'Header social hover feedback must be capability-gated.');
requireText('headerSocialCss', '@media (min-width: 75rem)', 'Header social placement must follow the navigation breakpoint.');
requireText('headerSocialCss', '@media (prefers-reduced-motion: reduce)', 'Header social feedback must honor reduced motion.');
for (const state of ['Default', 'Hover', 'Focus', 'Active', 'Disabled', 'Loading', 'Error', 'Success']) {
  requireText('quickActionsPreview', `>${state}<`, `The state sheet must include ${state.toLowerCase()}.`);
}
requireText('landingHero', 'macrostructure: Split Studio', 'Landing components must preserve the Split Studio decision.');
requireText('landingHero', '.section-wrapper.moody26-section--hero', 'Heroes must remove generic section padding without requiring relational selectors.');
requireText('landingHero', '@supports selector(.section-wrapper:has(*))', 'Modern browsers must retain the server-rendered Hero edge selector.');
forbidText('landingHero', ':has(:is(', 'Hero edge selectors must remain compatible with older browser engines.');
requireText('landingHero', '@media (min-width: 56.25rem)', 'Ambient-video posters must remain the mobile-first media below the provider video breakpoint.');
requireText('landingHero', '#play-pause:focus-visible', 'Ambient-video controls need immediate visible focus.');
requireText('landingHero', '#play-pause:disabled', 'Unavailable ambient-video controls need a truthful disabled treatment before removal.');
requireText('landingHero', '.moody26-ambient-video--fallback #video-wrapper', 'Failed ambient videos must leave the visual composition.');
requireText('landingHero', '.moody26-ambient-video--fallback .homepage-hero__fallback-image', 'Failed ambient videos must retain their authored poster surface.');
requireText('landingHero', '@media (prefers-reduced-motion: reduce)', 'Ambient-video CSS must retain a static reduced-motion path.');
requireText('editorialSections', 'var(--drupal-displace-offset-top, 0rem)', 'Layout Builder anchors must clear the optional Drupal toolbar.');
requireText('editorialSections', '.moody26-directory-students .node__content > .section-wrapper:nth-child(2)', 'The Students reference composition must remain directory-scoped rather than route-scoped.');
requireText('editorialSections', '.layout__region--main > .block-bundle-basic:first-child', 'The Students lead treatment must stay isolated to the first main-region Basic block.');
requireText('agents', 'Preserve source-order keyboard flow across component boundaries', 'Resource-hub guidance must protect cross-component keyboard order.');
requireText('readme', 'The `/students` route is the reference integration fixture', 'Public documentation must identify the complete resource-hub fixture.');
requireText('contactInfoCss', 'component: editorial service band', 'Moody Contact Info must retain its Hallmark component contract.');
requireText('contactInfoCss', 'container: contact-info / inline-size;', 'Moody Contact Info must remain container-aware.');
requireText('contactInfoCss', '.section-wrapper.moody26-section--contact-info', 'Contact Info closes must remove generic outer section padding without relational-selector support.');
requireText('contactInfoCss', 'a:focus-visible', 'Contact Info links need immediate visible focus.');
requireText('contactInfoCss', '@media (hover: hover) and (pointer: fine)', 'Contact Info hover feedback must be capability-gated.');
requireText('contactInfoCss', '@container contact-info (min-width: 48rem)', 'Contact Info must retain its component-responsive layout.');
requireText('contactInfoCss', 'grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);', 'Contact Info must retain its safe asymmetric split.');
requireText('contactInfoCss', 'a[href^="mailto:"]', 'Contact Info must protect long email affordances at narrow widths.');
forbidText('editorialSections', '.moody-contact-info-wrapper', 'Legacy Contact Info presentation must not remain in editorial page CSS.');
requireText('contactInfoTemplate', "rendered_headline|striptags|trim", 'Contact Info must test rendered headline content before emitting a heading.');
requireText('contactInfoTemplate', '<h2 class="contact-info__title">', 'Contact Info headlines must remain page-safe h2 headings.');
requireText('contactInfoTemplate', '<h3 class="contact-info__aside-title">', 'Contact Info subheadlines must remain subordinate to authored headlines.');
requireText('contactInfoTemplate', '<h2 class="contact-info__aside-title">', 'A standalone Contact Info subheadline must not skip heading levels.');
requireText('contactInfoTemplate', 'has_subheadline or has_cta', 'Contact Info must render each supporting field independently.');
forbidText('contactInfoTemplate', 'href=', 'Contact Info destinations must remain formatter-owned.');
forbidText('contactInfoTemplate', '|raw', 'Contact Info must not bypass Drupal render safety.');
forbidText('contactInfoTemplate', 'attach_library', 'Contact Info must use the theme global library without duplicate attachments.');
forbidText('contactInfoTemplate', 'moody-contact-info-wrapper', 'Contact Info must not retain legacy presentation wrappers.');
requireText('callToActionCss', 'component: shared formatter-owned call to action', 'Call to Action blocks must retain their Hallmark component contract.');
requireText('callToActionCss', 'pre-emit critique: P5 H4 E5 S5 R5 V5', 'Call to Action blocks must retain their Hallmark self-critique.');
requireText('callToActionCss', '.block-bundle-call-to-action:has(.ut-btn)', 'Call to Action presentation must require real formatter output.');
requireText('callToActionCss', 'min-block-size: var(--target-min);', 'Call to Action links must retain a 44 CSS-pixel target.');
requireText('callToActionCss', 'white-space: normal;', 'Long formatter-owned Call to Action labels must remain complete in narrow regions.');
requireText('callToActionCss', 'word-break: normal;', 'Call to Action labels must not split ordinary words.');
requireText('callToActionCss', ':focus-visible', 'Call to Action links need immediate visible focus.');
requireText('callToActionCss', '[aria-disabled="true"]', 'Call to Action links must honor an authored disabled state.');
requireText('callToActionCss', '@media (hover: hover) and (pointer: fine)', 'Call to Action hover feedback must be capability-gated.');
requireText('callToActionCss', 'color: var(--color-accent);', 'Call to Action hover text must remain burnt orange.');
requireText('resourceGroupCss', 'component: shared editorial resource ledger', 'Resource Groups must retain their Hallmark component contract.');
requireText('resourceGroupCss', 'container: resource-group / inline-size;', 'Both Resource Group providers must remain container-aware.');
requireText('resourceGroupCss', ':where(.block-bundle-utexas-resources, .block-bundle-moody-resource-group)', 'Moody and UT Drupal Kit Resource Groups must share one component contract.');
requireText('resourceGroupCss', 'grid-template-columns: minmax(0, 1fr);', 'Resource Groups must retain one safe narrow track.');
requireText('resourceGroupCss', 'grid-template-columns: repeat(2, minmax(0, 1fr));', 'Default UT Resource Groups must retain two safe wide tracks.');
requireText('resourceGroupCss', '.stacked-display .resource-group__items', 'Stacked UT Resource Groups must remain deliberately linear.');
requireText('resourceGroupCss', 'border-block-start: var(--rule-strong) solid var(--color-accent);', 'Resource Groups must retain their exact burnt-orange rule.');
requireText('resourceGroupCss', 'min-block-size: var(--target-min);', 'Resource Group links must retain a 44 CSS-pixel target.');
requireText('resourceGroupCss', '.resource-group__links a:visited', 'Resource Group links need an explicit visited state.');
requireText('resourceGroupCss', '.resource-group__links a:focus-visible', 'Resource Group links need immediate visible focus.');
requireText('resourceGroupCss', '.resource-group__links a:not([aria-disabled="true"]):active', 'Resource Group links need active feedback.');
requireText('resourceGroupCss', '.resource-group__links a[aria-disabled="true"]', 'Resource Group links must honor an authored disabled state.');
requireText('resourceGroupCss', '@media (hover: hover) and (pointer: fine)', 'Resource Group hover feedback must be capability-gated.');
requireText('resourceGroupCss', 'white-space: normal;', 'Long Resource Group labels must wrap safely in narrow regions.');
requireText('resourceGroupCss', 'overflow-wrap: anywhere;', 'Resource Group text must remain contained during reflow.');
requireText('resourceGroupCss', 'word-break: normal;', 'Resource Group labels must not split ordinary words.');
requireText('resourceGroupCss', '.resource-group__item.resource-media--unavailable', 'Resource Groups must retain resilient failed-media composition.');
requireText('utexasResourcesTemplate', '<section class="{{ group_classes|join(\' \') }}"', 'UT Drupal Kit Resources must expose a labelled section.');
requireText('utexasResourcesTemplate', '<ul class="resource-group__items" role="list">', 'UT Drupal Kit Resources must expose resource-list semantics.');
requireText('utexasResourcesTemplate', '<ul class="resource-group__links" role="list">', 'UT Drupal Kit Resources must expose destination-list semantics.');
requireText('utexasResourcesTemplate', '<h2 id="{{ resource_group_heading_id }}"', 'UT Resource Group headings must remain page-safe h2 headings.');
requireText('utexasResourcesTemplate', '<h3 class="resource-group__item-title ut-headline">', 'UT item headings must remain subordinate when a group heading exists.');
requireText('utexasResourcesTemplate', 'class="resource-group__item-title ut-headline">', 'Standalone UT item headings must not skip heading levels.');
requireText('utexasResourcesTemplate', 'loop.first and has_item_landmark', 'The first standalone UT item heading must label its Resource Group landmark.');
requireText('utexasResourcesTemplate', "'Resources'|t", 'Heading-free UT Resource Groups need a translated landmark name.');
requireText('utexasResourcesTemplate', 'item.image|default([])|render', 'UT Resource Groups must preserve formatter-owned responsive media.');
requireText('utexasResourcesTemplate', 'link|render', 'UT Resource Groups must preserve formatter-owned destinations.');
forbidText('utexasResourcesTemplate', 'href=', 'UT Resource Group destinations must not be reconstructed in Twig.');
forbidText('utexasResourcesTemplate', '|raw', 'UT Resource Groups must not bypass Drupal render safety.');
forbidText('utexasResourcesTemplate', 'attach_library', 'UT Resource Groups must use the theme global library without duplicate attachments.');
forbidText('utexasResourcesTemplate', 'ut-resources-wrapper', 'UT Resource Groups must not retain the inactive profile-theme wrapper.');
forbidText('utexasResourcesTemplate', 'utexas-resource-items', 'UT Resource Groups must not retain the legacy item wrapper.');
forbidText('utexasResourcesTemplate', '→', 'UT Resource Groups must not invent a synthetic arrow.');
requireText('moodyResourceGroupTemplate', '<section class="{{ group_classes|join(\' \') }}"', 'Moody Resource Groups must expose a labelled section.');
requireText('moodyResourceGroupTemplate', '<ul class="resource-group__links resource-group__links--group" role="list">', 'Moody Resource Group destinations must expose list semantics.');
requireText('moodyResourceGroupTemplate', '<h2 id="{{ resource_group_heading_id }}"', 'Moody Resource Group headings must correct the legacy heading skip.');
requireText('moodyResourceGroupTemplate', "headline|default('')|striptags|trim", 'Moody Resource Group headings must remain safely filtered.');
requireText('moodyResourceGroupTemplate', "'resource-group--legacy-' ~ legacy_style", 'Moody Resource Group color choices must survive only as migration classes.');
requireText('moodyResourceGroupTemplate', 'link|render', 'Moody Resource Groups must preserve formatter-owned destinations.');
forbidText('moodyResourceGroupTemplate', '<h3', 'Moody Resource Groups must not preserve the formatter heading skip.');
forbidText('moodyResourceGroupTemplate', 'href=', 'Moody Resource Group destinations must not be reconstructed in Twig.');
forbidText('moodyResourceGroupTemplate', '|raw', 'Moody Resource Groups must not bypass Drupal render safety.');
forbidText('moodyResourceGroupTemplate', 'attach_library', 'Moody Resource Groups must use the theme global library without duplicate attachments.');
forbidText('moodyResourceGroupTemplate', 'moody-resource-group-wrapper', 'Moody Resource Groups must not retain the legacy presentation wrapper.');
forbidText('moodyResourceGroupTemplate', 'resource-group-links', 'Moody Resource Groups must not retain the legacy link wrapper.');
forbidText('moodyResourceGroupTemplate', '→', 'Moody Resource Groups must not invent a synthetic arrow.');
requireText('theme', 'function moody26_preprocess_utexas_resources', 'UT Resource Groups need intrinsic image dimensions and semantic heading identity.');
requireText('theme', 'function moody26_preprocess_moody_resource_group', 'Moody Resource Groups need semantic heading identity.');
requireText('theme', "Html::getUniqueId('resource-group-heading')", 'Resource Group labels must use unique document IDs.');
requireText('theme', "moody26_add_intrinsic_image_dimensions($item['image'])", 'UT Resource Groups must reuse the formatter-safe intrinsic media helper.');
requireText('accessibility', '.resource-group__media img', 'Resource Group media must reuse the shared failure safeguard.');
requireText('accessibility', ".resource-group__item')", 'Failed Resource Group media must preserve its item content.');
requireText('flexTabsCss', 'component: progressive editorial tab index', 'Flex Tabs must retain the Hallmark component contract.');
requireText('flexTabsCss', 'container: flex-tabs / inline-size;', 'Flex Tabs must remain container-aware.');
requireText('flexTabsCss', 'overflow-x: auto;', 'Long tab indexes must scroll inside their own component.');
requireText('flexTabsCss', 'white-space: nowrap;', 'Tab labels must remain one-line affordances.');
requireText('flexTabsCss', '.flex-tabs__tab:focus-visible', 'Flex Tabs need immediate visible tab focus.');
requireText('flexTabsCss', '.flex-tabs__panel:focus-visible', 'Flex Tab panels need immediate visible keyboard focus.');
requireText('flexTabsCss', '[aria-selected="true"]', 'Flex Tabs need a non-color selected-state rule.');
requireText('flexTabsCss', '[aria-disabled="true"]', 'Flex Tabs must honor a truthful disabled state if one is supplied.');
requireText('flexTabsCss', '@media (hover: hover) and (pointer: fine)', 'Flex Tab hover feedback must be capability-gated.');
requireText('flexTabsTemplate', 'data-flex-tabs', 'Flex Tabs must expose a progressive enhancement root.');
requireText('flexTabsTemplate', 'href="#{{ tab.panel_id }}"', 'Flex Tabs must remain usable fragment links without JavaScript.');
requireText('flexTabsTemplate', '<section', 'Flex Tab fallback content must remain labelled document sections.');
requireText('flexTabsTemplate', 'aria-labelledby="{{ tab.tab_id }}"', 'Flex Tab fallback panels must retain accessible names.');
requireText('flexTabsTemplate', 'flex_tabs_supplemental', 'Untitled authored content must survive outside the tab interaction.');
forbidText('flexTabsTemplate', 'data-bs-toggle', 'Flex Tabs must not depend on Bootstrap state.');
forbidText('flexTabsTemplate', 'role="tab"', 'Flex Tabs must add tab semantics only after JavaScript can manage them.');
forbidText('flexTabsTemplate', '|raw', 'Flex Tabs must not bypass Drupal render safety.');
forbidText('flexTabsTemplate', ' hidden', 'Flex Tab fallback content must remain visible before enhancement.');
requireText('theme', 'function moody26_preprocess_field', 'Flex Tabs need theme-owned stored-state normalization.');
requireText('theme', "($variables['field_type'] ?? '') !== 'moody_flex_tabs'", 'Flex Tab preprocessing must remain field-type scoped.');
requireText('theme', '$active_assigned', 'Flex Tabs must normalize missing and duplicate authored active states.');
requireText('theme', "['flex_tabs_supplemental']", 'Flex Tabs must preserve meaningful content without a usable title.');
requireText('accessibility', "once('moody26-flex-tabs'", 'Flex Tab enhancement must remain idempotent.');
requireText('accessibility', "setAttribute('role', 'tablist')", 'Flex Tabs must expose a managed tablist after enhancement.');
requireText('accessibility', "setAttribute('role', 'tabpanel')", 'Flex Tabs must expose managed tab panels after enhancement.');
requireText('accessibility', "event.key === 'ArrowLeft'", 'Flex Tabs must support previous-tab keyboard movement.');
requireText('accessibility', "event.key === 'ArrowRight'", 'Flex Tabs must support next-tab keyboard movement.');
requireText('accessibility', "event.key === 'Home'", 'Flex Tabs must support first-tab keyboard movement.');
requireText('accessibility', "event.key === 'End'", 'Flex Tabs must support last-tab keyboard movement.');
requireText('accessibility', 'focus({ preventScroll: true })', 'Flex Tab keyboard activation must avoid focus scroll jumps.');
requireText('accessibility', 'tabList.scrollLeft', 'Flex Tabs must reveal the selected label without scrolling the page.');
requireText('accessibility', 'panels[index].hidden = !selected;', 'Flex Tabs must remove inactive panel content from keyboard order.');
requireText('flexListCss', 'component: shared UT Drupal Kit Flex List', 'Flex Lists must retain the Hallmark component contract.');
requireText('flexListCss', 'container-name: flex-list flex-tabs;', 'Flex Lists must remain independently responsive and share the tab container contract.');
requireText('flexListCss', 'grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);', 'Default Flex Lists must retain their safe asymmetric ledger.');
requireText('flexListCss', 'border-block-start: var(--rule-strong) solid var(--color-accent);', 'Default Flex Lists must retain the exact burnt-orange rule.');
requireText('flexListCss', '.flex-list__description a:focus-visible', 'Flex List content links need immediate visible focus.');
requireText('flexListCss', '@media (hover: hover) and (pointer: fine)', 'Flex List hover feedback must be capability-gated.');
requireText('flexListTemplate', '<ul class="flex-list__items" role="list">', 'Default Flex Lists must expose real list semantics.');
requireText('flexListTemplate', "rendered_title|striptags|trim is not empty", 'Default Flex Lists must reject structurally empty authored headers.');
requireText('flexListTemplate', "rendered_body|striptags|trim is not empty", 'Default Flex Lists must reject structurally empty authored bodies.');
forbidPattern('flexListTemplate', /<h[1-6]/, 'Default Flex Lists must not guess a document heading level.');
forbidText('flexListTemplate', '|raw', 'Default Flex Lists must not bypass Drupal render safety.');
forbidText('flexListTemplate', 'attach_library', 'Flex Lists must use the theme global library without duplicate attachments.');
requireText('flexListAccordionTemplate', '<details{{ entry.attributes.addClass(\'moody-accordion__item\') }}>', 'Flex List accordions must use native disclosure state.');
requireText('flexListAccordionTemplate', '<summary class="moody-accordion__summary">', 'Flex List accordions must expose browser-owned summary controls.');
requireText('flexListAccordionTemplate', "entry.has_title and entry.has_body", 'Only complete Flex List pairs may become disclosures.');
requireText('flexListAccordionTemplate', 'flex-list__static-item', 'Incomplete Flex List accordion content must remain visible without a dead control.');
forbidText('flexListAccordionTemplate', 'role="button"', 'Native Flex List summaries must not receive redundant button roles.');
forbidText('flexListAccordionTemplate', '|raw', 'Flex List accordions must not bypass Drupal render safety.');
requireText('flexListTabsTemplate', 'data-flex-tabs', 'Flex List horizontal tabs must reuse the shared progressive behavior.');
requireText('flexListTabsTemplate', 'href="#{{ component_id }}-panel-{{ loop.index0 }}"', 'Flex List horizontal tabs must retain no-JavaScript fragment links.');
requireText('flexListTabsTemplate', 'aria-labelledby="{{ component_id }}-tab-{{ loop.index0 }}"', 'Flex List fallback panels must retain accessible names.');
requireText('flexListTabsTemplate', 'supplemental_items', 'Incomplete Flex List tab content must survive outside the interaction.');
forbidText('flexListTabsTemplate', 'data-bs-toggle', 'Flex List horizontal tabs must not depend on Bootstrap state.');
forbidText('flexListTabsTemplate', 'role="tab"', 'Flex List tabs must add ARIA tab semantics only after enhancement.');
forbidText('flexListTabsTemplate', '|raw', 'Flex List horizontal tabs must not bypass Drupal render safety.');
forbidText('flexListTabsTemplate', ' hidden', 'Flex List fallback panels must remain visible before enhancement.');
requireText('heroCarouselCss', 'component: UT Drupal Kit Hero Carousel', 'Hero Carousels must retain the Hallmark component contract.');
requireText('heroCarouselCss', 'container: hero-carousel / inline-size;', 'Hero Carousels must respond to their Layout Builder container.');
requireText('heroCarouselCss', '.hero-carousel__controls:not([hidden])', 'Hero Carousel controls must appear only after complete enhancement.');
requireText('heroCarouselCss', '.hero-carousel__button:focus-visible', 'Hero Carousel controls need immediate visible focus.');
requireText('heroCarouselCss', '@media (hover: hover) and (pointer: fine)', 'Hero Carousel hover feedback must be capability-gated.');
requireText('heroCarouselCss', '@media (prefers-reduced-motion: reduce)', 'Hero Carousel transitions must honor reduced motion.');
requireText('heroCarouselTemplate', "attributes.removeAttribute('id')", 'Hero Carousels must remove the provider field’s duplicate root ID.');
requireText('heroCarouselTemplate', 'role="group"', 'Hero Carousel slides and controls must expose meaningful group semantics.');
requireText('heroCarouselTemplate', 'aria-roledescription="{{ \'slide\'|t }}"', 'Hero Carousel slides must expose translated slide semantics.');
requireText('heroCarouselTemplate', 'aria-label="{{ \'Slide @current of @total\'|t', 'Hero Carousel slides must expose their position and total.');
requireText('heroCarouselTemplate', 'hidden data-hero-carousel-controls', 'Hero Carousel controls must stay absent from the no-JavaScript tab order.');
forbidText('heroCarouselTemplate', 'data-bs-', 'Hero Carousel templates must not depend on Bootstrap state.');
forbidText('heroCarouselTemplate', 'carousel-indicators', 'Hero Carousels must not create an unbounded indicator control rail.');
forbidText('heroCarouselTemplate', '|raw', 'Hero Carousels must not bypass Drupal render safety.');
requireText('theme', "$block_content->bundle() === 'utexas_hero_carousel'", 'Hero Carousel preprocessing must remain bundle scoped.');
requireText('theme', "'utexas_hero_carousel/formatter'", 'Hero Carousels must remove only the provider’s Bootstrap behavior attachment.');
requireText('theme', "$legacy_classes = ['utexas-hero-carousel', 'carousel', 'slide', 'carousel-fade'];", 'Hero Carousels must remove the provider’s competing Bootstrap classes.');
requireText('theme', "['data-hero-carousel-autoplay']", 'Hero Carousels must preserve the editor’s autoplay choice.');
requireText('theme', "['data-hero-carousel-interval']", 'Hero Carousels must preserve a bounded editor speed choice.');
requireText('theme', "['aria-roledescription'] = t('carousel')", 'Hero Carousels must expose a translated carousel region.');
requireText('theme', 'CacheableMetadata::createFromObject($block_content)', 'Hero Carousel entity metadata must remain cacheable.');
requireText('accessibility', "once('moody26-hero-carousel'", 'Hero Carousel enhancement must remain idempotent.');
requireText('accessibility', "window.matchMedia('(prefers-reduced-motion: reduce)')", 'Hero Carousel autoplay must honor reduced motion.');
requireText('accessibility', "slide.setAttribute('aria-hidden', 'true')", 'Inactive Hero Carousel slides must leave the accessibility tree.');
requireText('accessibility', 'slide.inert = !active;', 'Inactive Hero Carousel content must leave the keyboard order.');
requireText('accessibility', "carousel.addEventListener('focusin'", 'Hero Carousel autoplay must pause while keyboard focus is inside.');
requireText('accessibility', "carousel.addEventListener('pointerenter'", 'Hero Carousel autoplay must pause while a pointer is inside.');
requireText('accessibility', "document.addEventListener('visibilitychange', schedule)", 'Hero Carousel autoplay must stop in a hidden document.');
forbidText('accessibility', 'bootstrap.Carousel', 'Hero Carousel behavior must not depend on Bootstrap.');
requireText('photoContentCss', 'component: UT Drupal Kit Photo Content Area', 'Photo Content Areas must retain the Hallmark component contract.');
requireText('photoContentCss', 'container: photo-content / inline-size;', 'Photo Content Areas must respond to their Layout Builder container.');
requireText('photoContentCss', 'grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);', 'Default Photo Content Areas must retain safe asymmetric media and copy tracks.');
requireText('photoContentCss', '.stacked-display .photo-content', 'Stacked Photo Content Areas must remain deliberately linear.');
requireText('photoContentCss', '.photo-content__media :where(picture, img)', 'Photo Content Area media must preserve its intrinsic flow.');
forbidText('photoContentCss', 'aspect-ratio:', 'Photo Content Areas must not impose a universal crop ratio.');
forbidText('photoContentCss', 'object-fit:', 'Photo Content Areas must not crop editor-owned media.');
requireText('photoContentCss', '.photo-content__links a:visited', 'Photo Content Area links need an explicit visited state.');
requireText('photoContentCss', '.photo-content__links a:focus-visible', 'Photo Content Area links need immediate visible focus.');
requireText('photoContentCss', '.photo-content__links a:not([aria-disabled="true"]):active', 'Photo Content Area links need active feedback.');
requireText('photoContentCss', '.photo-content__links a[aria-disabled="true"]', 'Photo Content Area links must honor an authored disabled state.');
requireText('photoContentCss', '@media (hover: hover) and (pointer: fine)', 'Photo Content Area hover feedback must be capability-gated.');
requireText('photoContentTemplate', '<figure class="photo-wrapper photo-content__media">', 'Photo Content Area media must use figure semantics.');
requireText('photoContentTemplate', '<figcaption class="caption photo-content__credit">', 'Photo Content Area credits must use figcaption semantics.');
requireText('photoContentTemplate', '<h2 class="ut-headline photo-content__title">', 'Photo Content Area headlines must not skip the page heading level.');
requireText('photoContentTemplate', '<ul class="link-list photo-content__links" role="list">', 'Photo Content Area destinations must expose list semantics.');
requireText('photoContentTemplate', 'rendered_links|merge([rendered_link])', 'Photo Content Areas must omit invalid empty formatter links.');
forbidText('photoContentTemplate', 'href=', 'Photo Content Area destinations must not be reconstructed in Twig.');
forbidText('photoContentTemplate', '|raw', 'Photo Content Areas must not bypass Drupal render safety.');
forbidText('photoContentTemplate', 'attach_library', 'Photo Content Areas must use the theme global library without duplicate attachments.');
forbidText('photoContentTemplate', '→', 'Photo Content Areas must not invent a synthetic arrow.');
forbidText('editorialSections', 'ut-photo-content-area', 'Photo Content Areas must not retain page-scoped stopgap styling.');
forbidText('css', 'block-bundle-utexas-photo-content-area', 'Photo Content Areas must not retain competing foundation image rules.');
requireText('accessibility', "once('moody26-photo-content-image'", 'Photo Content Area media recovery must be idempotent.');
requireText('accessibility', "classList.add('photo-content--media-unavailable')", 'Failed Photo Content Area media must preserve and recompose authored content.');
requireText('accessibility', 'component.hidden = true;', 'Failed media-only Photo Content Areas must not leave empty component chrome.');
requireText('newsletterCss', 'component: Moody Newsletter destination band', 'Moody Newsletter must retain the Hallmark component contract.');
requireText('newsletterCss', 'container: newsletter / inline-size;', 'Moody Newsletter must respond to its Layout Builder container.');
requireText('newsletterCss', 'grid-template-columns: minmax(0, 5fr) auto;', 'Moody Newsletter must retain its safe wide destination-band layout.');
requireText('newsletterCss', '.newsletter__action > a:visited', 'Moody Newsletter links need an explicit visited state.');
requireText('newsletterCss', '.newsletter__action > a:focus-visible', 'Moody Newsletter links need immediate visible focus.');
requireText('newsletterCss', '.newsletter__action > a:not([aria-disabled="true"]):active', 'Moody Newsletter links need active feedback.');
requireText('newsletterCss', '.newsletter__action > a[aria-disabled="true"]', 'Moody Newsletter links must honor an authored disabled state.');
requireText('newsletterCss', '@media (hover: hover) and (pointer: fine)', 'Moody Newsletter hover feedback must be capability-gated.');
forbidPattern('newsletterCss', /(?:^|\s)(?:#(?:[\da-f]{3}){1,2}|(?:rgb|hsl|oklch)\()/im, 'Moody Newsletter styles must use locked color tokens.');
requireText('newsletterTemplate', '<h2 class="moody-newsletter-headline newsletter__title">', 'Moody Newsletter headlines must not skip the page heading level.');
requireText('newsletterTemplate', "'newsletter--legacy-'", 'Moody Newsletter styles must survive as neutral migration hooks.');
requireText('newsletterTemplate', 'has_headline or has_cta', 'Moody Newsletter must omit structurally empty output.');
forbidText('newsletterTemplate', 'href=', 'Moody Newsletter destinations must not be reconstructed in Twig.');
forbidText('newsletterTemplate', '|raw', 'Moody Newsletter must not bypass Drupal render safety.');
forbidText('newsletterTemplate', 'attach_library', 'Moody Newsletter must use the theme global library without duplicate attachments.');
forbidText('newsletterTemplate', '→', 'Moody Newsletter must not invent a synthetic arrow.');
forbidText('newsletterTemplate', 'class="moody-newsletter-wrapper {{ style }}"', 'Moody Newsletter must not restore raw legacy color classes.');
requireText('quickLinksCss', 'component: UT Drupal Kit Quick Links index', 'Quick Links must retain the Hallmark component contract.');
requireText('quickLinksCss', 'macrostructure: responsive resource ledger', 'Quick Links must retain its Hallmark structural fingerprint.');
requireText('quickLinksCss', 'gate 49: UT content-integrity exception for editor-owned resource names', 'Quick Links must document the deliberate intact-label wrapping exception.');
requireText('quickLinksCss', 'container: quick-links / inline-size;', 'Quick Links must respond to their Layout Builder container.');
requireText('quickLinksCss', 'grid-template-columns: repeat(3, minmax(0, 1fr));', 'Quick Links must retain safe wide navigation-ledger tracks.');
requireText('quickLinksCss', 'min-block-size: var(--target-min);', 'Quick Links must preserve 44 CSS-pixel targets.');
requireText('quickLinksCss', '.quick-links__item > a:visited', 'Quick Links need an explicit visited state.');
requireText('quickLinksCss', '.quick-links__item > a:focus-visible', 'Quick Links need immediate visible focus.');
requireText('quickLinksCss', '.quick-links__item > a:not([aria-disabled="true"]):active', 'Quick Links need active feedback.');
requireText('quickLinksCss', '.quick-links__item > a[aria-disabled="true"]', 'Quick Links must honor an authored disabled state.');
requireText('quickLinksCss', '@media (hover: hover) and (pointer: fine)', 'Quick Links hover feedback must be capability-gated.');
forbidPattern('quickLinksCss', /(?:^|\s)(?:#(?:[\da-f]{3}){1,2}|(?:rgb|hsl|oklch)\()/im, 'Quick Links styles must use locked color tokens.');
requireText('quickLinksTemplate', "{% set wrapper = rendered_links ? 'nav' : 'div' %}", 'Quick Links with destinations must expose a navigation landmark.');
requireText('quickLinksTemplate', '<h2 id="{{ heading_id }}" class="ut-headline quick-links__title">', 'Quick Links headlines must not skip the page heading level.');
requireText('quickLinksTemplate', '<ul class="link-list quick-links__list" role="list">', 'Quick Links must expose explicit list semantics.');
requireText('quickLinksTemplate', 'link is not iterable and link is not none', 'Quick Links must omit malformed stored link arrays.');
requireText('quickLinksTemplate', 'rendered_link|striptags|trim', 'Quick Links must omit empty formatter links.');
requireText('quickLinksTemplate', 'has_copy', 'Quick Links must omit empty processed-copy wrappers.');
forbidText('quickLinksTemplate', 'href=', 'Quick Links destinations must not be reconstructed in Twig.');
forbidText('quickLinksTemplate', '|raw', 'Quick Links must not bypass Drupal render safety.');
forbidText('quickLinksTemplate', 'attach_library', 'Quick Links must use the theme global library without duplicate attachments.');
forbidText('quickLinksTemplate', '→', 'Quick Links must not invent a synthetic arrow.');
requireText('socialLinksCss', 'component: UT Drupal Kit Social Links rail', 'Social Links must retain the Hallmark component contract.');
requireText('socialLinksCss', 'macrostructure: compact destination rail', 'Social Links must retain its Hallmark structural fingerprint.');
requireText('socialLinksCss', 'container: social-links / inline-size;', 'Social Links must respond to their Layout Builder container.');
requireText('socialLinksCss', '--social-link-target: var(--target-min);', 'Social Links must preserve 44 CSS-pixel targets.');
requireText('socialLinksCss', 'background-image: var(--social-icon-image);', 'Social Links must present provider-owned icon artwork.');
requireText('socialLinksCss', '-webkit-mask: none;', 'Social Links must remove the provider alpha mask.');
requireText('socialLinksCss', '.social-links__item:focus-within', 'Social Links need immediate visible parent focus.');
requirePattern('socialLinksCss', /\.social-links__item:focus-within\s*\{[\s\S]*?padding: 0;[\s\S]*?border: 0;/, 'Social Links focus must override provider geometry without layout shift.');
requireText('socialLinksCss', '.block__ut-social-links--link:visited', 'Social Links need an explicit visited state.');
requireText('socialLinksCss', '.block__ut-social-links--link:not([aria-disabled="true"]):active', 'Social Links need active feedback.');
requireText('socialLinksCss', '.block__ut-social-links--link[aria-disabled="true"]', 'Social Links must honor an authored disabled state.');
requireText('socialLinksCss', '@media (hover: hover) and (pointer: fine)', 'Social Links hover feedback must be capability-gated.');
requireText('socialLinksCss', '@container social-links (min-width: 14rem)', 'Authored Social Links sizes must expand only in viable containers.');
requireText('socialLinksCss', '.block-bundle-social-links + .utexas-block-top-margin-remove', 'Legacy spacing must not cover Social Links targets.');
requireText('socialLinksCss', 'margin-top: 0 !important;', 'Social Links must override the provider’s important negative margin collision.');
forbidPattern('socialLinksCss', /(?:^|\s)(?:#(?:[\da-f]{3}){1,2}|(?:rgb|hsl|oklch)\()/im, 'Social Links styles must use locked color tokens.');
requireText('socialLinksTemplate', "icon_size|default('ut-social-links--small', true)", 'Social Links must retain the provider’s backward-compatible default size.');
requireText('socialLinksTemplate', 'role="group"', 'Social Links must expose a labelled group.');
requireText('socialLinksTemplate', "aria-label=\"{{ 'Social media'|t }}\"", 'Link-only Social Links need a translated accessible name.');
requireText('socialLinksTemplate', '<h2 id="{{ heading_id }}" class="ut-headline social-links__title">', 'Social Links headlines must not skip the page heading level.');
requireText('socialLinksTemplate', '<ul class="social-links__list" role="list">', 'Social Links must expose explicit list semantics.');
requireText('socialLinksTemplate', 'rendered_link|striptags|trim', 'Social Links must omit empty formatter links.');
forbidText('socialLinksTemplate', 'href=', 'Social Links destinations must not be reconstructed in Twig.');
forbidText('socialLinksTemplate', '|raw', 'Social Links must not bypass Drupal render safety.');
forbidText('socialLinksTemplate', 'attach_library', 'Social Links must use the theme global library without duplicate attachments.');
requireText('theme', "($variables['field_type'] ?? '') === 'utexas_social_link_field'", 'Social Link preprocessing must remain field-type scoped.');
requireText('theme', 'UTexasSocialLinkOptions::getIcons()', 'Social Links must discover provider-owned icon assets.');
requireText('theme', 'file_exists($icon)', 'Social Links must omit unavailable provider icon files.');
requireText('theme', '$url instanceof \\Drupal\\Core\\Url', 'Social Links must preserve formatter-owned URL objects.');
requireText('theme', '--social-icon-image: url(', 'Social Links must expose the validated provider icon URL.');
requireText('anchorGalleryCss', 'component: Moody Anchor image gallery', 'Moody Anchor galleries must retain the Hallmark component contract.');
requireText('anchorGalleryCss', 'macrostructure: staggered portrait strip', 'Moody Anchor galleries must retain their structural fingerprint.');
requireText('anchorGalleryCss', 'container-name: anchor-gallery;', 'Moody Anchor galleries must retain their named Layout Builder container.');
requireText('anchorGalleryCss', 'container-type: inline-size;', 'Moody Anchor galleries must respond to their Layout Builder container.');
requireText('anchorGalleryCss', 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', 'Moody Anchor galleries need a content-width fallback when container queries are unavailable.');
requireText('anchorGalleryCss', 'grid-template-columns: repeat(2, minmax(0, 1fr));', 'Moody Anchor galleries must retain safe two-column tracks.');
requireText('anchorGalleryCss', 'grid-template-columns: repeat(4, minmax(0, 1fr));', 'Moody Anchor galleries must retain safe four-column tracks.');
requireText('anchorGalleryCss', 'aspect-ratio: 5 / 7;', 'Moody Anchor media must retain its portrait frame.');
requireText('anchorGalleryCss', 'min-block-size: var(--target-min);', 'Moody Anchor actions must preserve 44 CSS-pixel targets.');
requireText('anchorGalleryCss', 'white-space: nowrap;', 'Moody Anchor actions must remain one-line affordances.');
requireText('anchorGalleryCss', '.anchor-btn:visited', 'Moody Anchor actions need an explicit visited state.');
requireText('anchorGalleryCss', '.anchor-btn:focus-visible', 'Moody Anchor actions need immediate visible focus.');
requireText('anchorGalleryCss', '.anchor-btn:not([aria-disabled="true"]):active', 'Moody Anchor actions need active feedback.');
requireText('anchorGalleryCss', '.anchor-btn[aria-disabled="true"]', 'Moody Anchor actions must honor an authored disabled state.');
requireText('anchorGalleryCss', '@media (hover: hover) and (pointer: fine)', 'Moody Anchor hover feedback must be capability-gated.');
forbidPattern('anchorGalleryCss', /(?:^|\s)(?:#(?:[\da-f]{3}){1,2}|(?:rgb|hsl|oklch)\()/im, 'Moody Anchor gallery styles must use locked color tokens.');
requireText('anchorGalleryTemplate', '<ul class="anchor-gallery__list" role="list" aria-label="{{ \'Image gallery\'|t }}">', 'Moody Anchor galleries must expose a translated semantic list.');
requireText('anchorGalleryTemplate', '<li{{ item.attributes.addClass(item_classes) }}>', 'Moody Anchor galleries must keep direct semantic list items.');
requireText('anchorGalleryTemplate', '{{ item.media }}', 'Moody Anchor galleries must preserve formatter-owned responsive media.');
requireText('anchorGalleryTemplate', '{{ item.action }}', 'Moody Anchor galleries must preserve formatter-owned actions.');
forbidText('anchorGalleryTemplate', '{{ label }}', 'Moody Anchor galleries must not leak the generic field label.');
forbidText('anchorGalleryTemplate', 'href=', 'Moody Anchor destinations must not be reconstructed in Twig.');
forbidText('anchorGalleryTemplate', '|raw', 'Moody Anchor galleries must not bypass Drupal render safety.');
forbidText('anchorGalleryTemplate', 'attach_library', 'Moody Anchor galleries must use the theme global library without duplicate attachments.');
requireText('theme', "($variables['field_name'] ?? '') === 'field_anchor_image'", 'Moody Anchor preprocessing must remain field-name scoped.');
requireText('theme', "$entity->bundle() === 'moody_anchors_block'", 'Moody Anchor preprocessing must remain bundle scoped.');
requireText('theme', "($media['#theme'] ?? NULL) !== 'responsive_image_formatter'", 'Moody Anchor validation must require provider responsive media.');
requireText('theme', 'file_exists($uri)', 'Moody Anchor galleries must omit unavailable source files.');
requireText('theme', '$action instanceof Link', 'Moody Anchor galleries must preserve formatter-owned Link objects.');
requireText('theme', "str_starts_with($route_name, 'layout_builder.')", 'Empty Moody Anchor blocks must remain reachable in Layout Builder.');
requireText('theme', "->addCacheContexts(['route'])", 'Moody Anchor editor/public output must vary by route.');
requireText('theme', "$variables['attributes']['hidden'] = 'hidden';", 'Empty Moody Anchor blocks must leave the layout and accessibility tree.');
requireText('theme', "$variables['content']['field_anchor_image']['#access'] = FALSE;", 'Empty Moody Anchor fields must not render provider fallbacks.');
requireText('discoveryIndex', 'repeat(12, minmax(0, 1fr))', 'Discovery grids must use safe image-bearing tracks.');
requireText('discoveryIndex', '.linked-focus-area-item:focus-visible', 'Focus Area tasks need immediate visible focus.');
requireText('discoveryIndex', '.utexas-promo-unit .data-wrapper > a:focus-visible', 'Promo Unit links need immediate visible focus.');
requireText('discoveryIndex', '@container (min-width: 64rem)', 'Resource hubs must retain their wide asymmetric layout.');
requireText('peopleDirectory', 'component: shared people directory', 'People directories must retain the Hallmark component contract.');
requireText('peopleDirectory', 'container: people-directory / inline-size;', 'People directories must remain container-aware.');
requireText('peopleDirectory', 'repeat(4, minmax(0, 1fr))', 'People-directory image grids must use safe tracks.');
requireText('peopleDirectory', '.people-directory__profile:focus-visible', 'People profile links need a visible focus-equivalent detail.');
requireText('peopleDirectory', '@media (hover: hover) and (pointer: fine)', 'People-directory hover feedback must be capability-gated.');
requireText('peopleDirectory', 'container: profile-listing / inline-size;', 'UTProf Profile Listings must remain container-aware.');
requireText('peopleDirectory', '.profile-listing .utprof__views-list', 'UTProf Profile Listings must retain the provider semantic list.');
requireText('peopleDirectory', 'grid-template-columns: var(--space-3xl) minmax(0, 1fr);', 'Profile media objects must keep one safe text track.');
requireText('peopleDirectory', '.utprof__profile-item--media-unavailable', 'UTProf Profile Listings must retain failed-media reflow.');
requireText('peopleDirectory', '.profile-listing.utexas-fourcol .utprof__views-list', 'UTProf Profile Listings must honor author-selected wide layouts.');
requireText('peopleDirectory', ':where(.utprof__directory-link, .utprof__email) a:focus-visible', 'Profile directory and email links need immediate visible focus.');
requireText('peopleDirectory', ':where(.utprof__directory-link, .utprof__email) a[aria-disabled="true"]', 'Profile links must honor an authored disabled state.');
forbidPattern('peopleDirectory', /(?:entertainment-media-industries|node-4097|block-[\da-f]{8}-[\da-f-]{27,})/i, 'UTProf Profile Listing styles must not depend on a route, node ID, or block UUID.');
requireText('studentStoriesCss', 'component: student-story index and profile lead', 'Student stories must retain the Hallmark component contract.');
requireText('studentStoriesCss', 'container: student-stories / inline-size;', 'Student-story indexes must remain container-aware.');
requireText('studentStoriesCss', 'repeat(4, minmax(0, 1fr))', 'Student-story image grids must retain safe wide tracks.');
requireText('studentStoriesCss', '.student-story-card__link:focus-visible', 'Student-story links need immediate visible focus.');
requireText('studentStoriesCss', '@media (hover: hover) and (pointer: fine)', 'Student-story hover feedback must be capability-gated.');
requireText('studentStoriesCss', '@supports not (container-type: inline-size)', 'Student-story grids need a responsive fallback when container queries are unavailable.');
requireText('studentStoriesCss', '.student-story-card__link[aria-disabled="true"]', 'Student-story links must preserve an authored disabled treatment.');
requireText('studentStoriesCss', '.node-life_after_moody_page .moody26-page-title h1', 'Life After Moody profiles must retain one visible document title.');
requireText('studentStoriesCss', 'grid-template-columns: var(--space-3xl) minmax(0, 1fr);', 'Narrow student-story cards must retain one safe text track.');
forbidPattern('studentStoriesCss', /(?:students\/life-after-moody\/(?:emily|julia)|node-\d+|block-[\da-f]{8}-[\da-f-]{27,})/i, 'Student-story styling must not depend on a profile path, node ID, or block UUID.');
forbidText('studentStoriesCss', 'transition:', 'The editorial student-story index must remain static without decorative motion.');
for (const state of ['default', 'hover', 'focus', 'active', 'disabled', 'loading', 'error', 'success']) {
  requireText('studentStoriesPreview', `data-preview-state="${state}"`, `The student-story preview must demonstrate its ${state} state.`);
}
requireText('studentStoriesRows', '<ul id="moody26-student-story-results"', 'Student-story results must render as one semantic list.');
requireText('studentStoriesRows', '<li{{ row.attributes.addClass(row_classes) }}>', 'Student-story result entries must remain direct list items.');
requireText('studentStoriesFields', 'class="student-story-card__link"', 'Each student-story card must expose one primary destination.');
requireText('studentStoriesFields', 'aria-labelledby="{{ student_story_title_id }}"', 'Student-story destinations must use their visible title as the accessible name.');
requireText('studentStoriesFields', '<h3 class="student-story-card__title"', 'Story names must follow the directory section heading without a level skip.');
requireText('studentStoriesFields', 'aria-hidden="true"', 'Directory media must remain decorative inside the named story link.');
forbidText('studentStoriesFields', 'fields.field_lam_preview_img', 'Student-story cards must not render the provider’s broken linked thumbnail field.');
requireText('studentStoriesView', "{{ 'No student stories matched'|t }}", 'Filtered student stories need a translated factual empty state.');
requireText('studentStoriesView', "{{ 'Clear filters'|t }}", 'Filtered student stories need one recovery action.');
requireText('theme', "$view_id === 'life_after_moody_explorer'", 'Student-story preprocessing must remain View scoped.');
requireText('theme', "$display_id === 'block_1'", 'Student-story cards must remain display scoped.');
requireText('theme', "$variables['view']->total_rows", 'Student-story result summaries must remain honest when pagination is enabled.');
requireText('theme', "moody26_student_story_preview_image($story, $variables)", 'Student-story cards must use the failure-safe preview image builder.');
requireText('theme', "!file_exists($uri)", 'Student-story directory media must fail closed when the physical source is unavailable.');
requireText('theme', "'#alt' => ''", 'Linked directory portraits must remain decorative.');
requireText('theme', "t('Filter student stories')", 'Student-story filters need a concise accessible form name.');
requireText('theme', "t('Search by name')", 'Student-story name filters need a specific visible label.');
requireText('theme', "unset($form['title']['#attributes']['placeholder']", 'Student-story filters must not use instructional placeholder copy.');
requireText('theme', "['visually-hidden']", 'Student-story profile titles must leave the visually-hidden migration state.');
requireText('showcaseTemplate', 'showcase_suppress_duplicate_heading', 'Student-story profile leads must not repeat the page title as an h2.');
requireText('newsroom', 'component: shared newsroom index', 'Newsroom components must retain the Hallmark component contract.');
requireText('newsroom', 'container: news-index / inline-size;', 'News indexes must remain container-aware.');
requireText('newsroom', 'repeat(12, minmax(0, 1fr))', 'News indexes must retain safe asymmetric tracks.');
requireText('newsroom', '.news-teaser__story:focus-visible', 'News story links need a visible focus-equivalent detail.');
requireText('newsroom', '@media (hover: hover) and (pointer: fine)', 'Newsroom hover feedback must be capability-gated.');
requireText('featureStoryCss', 'macrostructure: Long Document', 'Feature stories must retain the Hallmark Long Document contract.');
requireText('featureStoryCss', '.moody26-feature-story--long-title', 'Long feature-story titles must retain their length-aware masthead.');
requireText('featureStoryCss', 'overflow-wrap: anywhere;', 'Feature-story mastheads must survive long unbroken text.');
requireText('featureStoryCss', 'max-width: var(--measure);', 'Feature-story narrative copy must retain a readable measure.');
requireText('featureStoryCss', 'font-variant-numeric: tabular-nums;', 'Feature-story dates must retain stable numeric spacing.');
requireText('featureStoryCss', '@media (min-width: 40rem)', 'Feature stories must retain their responsive reading rhythm.');
forbidPattern('featureStoryCss', /\.(?:node|page)-\d+/, 'Feature-story styling must not depend on route-specific node or page IDs.');
forbidText('featureStoryCss', 'transition:', 'Feature stories must remain static without unnecessary motion.');
requireText('theme', 'mb_strlen(trim($node->label())) > 90', 'Feature-story title treatment must derive from authored title length.');
for (const derivative of [
  'node:moody_feature_page:field_moody_subtitle',
  'node:moody_feature_page:created',
  'node:moody_feature_page:body',
  'node:moody_feature_page:field_feature_page_author',
]) {
  requireText('theme', `'${derivative}'`, `Feature stories must recognize the ${derivative} Layout Builder field.`);
}
requireText('theme', "t('Story credits')", 'Feature-story credits must expose a translated group name.');
requireText('featureCreditTemplate', "{{ 'By'|t }}", 'Feature-story credits must expose a translated assistive byline.');
requireText('featureCreditTemplate', 'moody-feature-credit__name', 'Feature-story credits must preserve the contributor name.');
requireText('featureCreditTemplate', '{% if title %}', 'Feature-story credits must omit empty contributor roles.');
requireText('shorthandStoryCss', 'component: Shorthand story boundary', 'Shorthand stories must retain the Hallmark component contract.');
requireText('shorthandStoryCss', 'container: shorthand-story / inline-size;', 'Shorthand story boundaries must respond to their Layout Builder container.');
requireText('shorthandStoryCss', 'grid-template-columns: minmax(10rem, 4fr) minmax(0, 8fr);', 'Unavailable Shorthand stories must retain safe asymmetric tracks.');
requireText('shorthandStoryCss', 'background: var(--color-paper-2);', 'Unavailable Shorthand stories must use a token-governed surface.');
requireText('shorthandStoryCss', 'color: var(--color-ink);', 'Unavailable Shorthand story surfaces must declare a contrast-safe ink color.');
forbidText('shorthandStoryCss', 'transition:', 'The static Shorthand boundary must not add decorative motion.');
forbidPattern('shorthandStoryCss', /(?:node|page)-\d+/, 'Shorthand story styling must not depend on route-specific node or page IDs.');
requireText('theme', 'moody_shorthand_zip_shorthand_zip_story', 'Shorthand story preprocessing must remain plugin scoped.');
requireText('theme', "['#children']", 'Shorthand story preprocessing must inspect the provider-owned markup result.');
requireText('theme', 'block__moody_shorthand_zip_shorthand_zip_story', 'Shorthand blocks must receive the dedicated failure-safe template suggestion.');
requireText('shorthandStoryTemplate', "shorthand_story_available ? 'div' : 'section'", 'Available and unavailable Shorthand states must use truthful wrapper semantics.');
requireText('shorthandStoryTemplate', '{{ content }}', 'Available Shorthand stories must preserve provider output.');
requireText('shorthandStoryTemplate', "{{ 'Story unavailable'|t }}", 'Unavailable Shorthand stories need a translated factual heading.');
requireText('shorthandStoryTemplate', "{{ 'The embedded story did not load. Try this page again later.'|t }}", 'Unavailable Shorthand stories need a translated recovery instruction.');
requireText('shorthandStoryTemplate', "'aria-labelledby'", 'Unavailable Shorthand stories must expose an accessible name.');
forbidText('shorthandStoryTemplate', '|raw', 'Shorthand boundaries must not add a second raw-output path.');
forbidText('shorthandStoryTemplate', 'aria-live', 'Server-rendered Shorthand failure states must not announce as live updates.');
forbidText('shorthandStoryTemplate', 'href=', 'Shorthand failure states must not invent a destination.');
requireText('pdfDocumentCss', 'component: PDF document boundary', 'PDF documents must retain the Hallmark component contract.');
requireText('pdfDocumentCss', 'container: pdf-document / inline-size;', 'PDF document boundaries must respond to their Layout Builder container.');
requireText('pdfDocumentCss', 'min-height: var(--target-min);', 'PDF actions must retain accessible minimum targets.');
requireText('pdfDocumentCss', ".moody26-pdf-document__action:focus-visible", 'PDF actions must retain an immediate visible keyboard focus state.');
requireText('pdfDocumentCss', '@media (hover: hover) and (pointer: fine)', 'PDF hover treatments must remain capability gated.');
requireText('pdfDocumentCss', '@media (prefers-reduced-motion: reduce)', 'PDF document states must retain their reduced-motion path.');
requireText('pdfDocumentCss', 'grid-template-columns: minmax(0, 8fr) minmax(10rem, 4fr);', 'PDF document boundaries must retain safe asymmetric tracks.');
forbidPattern('pdfDocumentCss', /(?:node|page)-\d+/, 'PDF document styling must not depend on route-specific node or page IDs.');
forbidText('pdfDocumentCss', 'width: 100vw', 'PDF document boundaries must not widen the viewport.');
for (const state of ['is-hover', 'is-focus', 'is-active', 'is-disabled', 'is-loading']) {
  requireText('pdfDocumentCss', state, `PDF document action CSS must retain its ${state} state.`);
  requireText('pdfDocumentPreview', state, `The PDF document preview must demonstrate its ${state} state.`);
}
requireText('pdfDocumentPreview', 'moody26-pdf-document--unavailable', 'The PDF document preview must demonstrate the error state.');
requireText('pdfDocumentPreview', 'moody26-pdf-document--available', 'The PDF document preview must demonstrate the success state.');
requireText('theme', 'moody_flipbook_pdf_flipbook', 'PDF document preprocessing must remain plugin scoped.');
requireText('theme', 'block__moody_flipbook_pdf_flipbook', 'PDF document blocks must receive their dedicated template suggestion.');
requireText('theme', 'moody26_remove_flipbook_attachments', 'Moody26 must remove the inaccessible DFlip runtime.');
requireText('theme', "!== 'moody_flipbook/moody_dflip'", 'Moody26 must explicitly remove the DFlip asset library.');
requireText('theme', "str_starts_with($key, 'flip_data_')", 'Moody26 must remove per-instance DFlip settings.');
requireText('theme', "$media->access('view', NULL, TRUE)", 'PDF documents must enforce Media view access with cacheability.');
requireText('theme', "$file->access('view', NULL, TRUE)", 'PDF documents must enforce File view access with cacheability.');
requireText('theme', "$file->getMimeType() === 'application/pdf'", 'PDF document boundaries must validate the selected file type.');
requireText('theme', '!file_exists($uri)', 'PDF document boundaries must fail closed when the physical source is unavailable.');
requireText('theme', 'setCacheMaxAge(0)', 'Missing physical PDF sources must not become stale cached failures.');
requireText('pdfDocumentTemplate', '<section{{ attributes', 'PDF document boundaries must use a semantic section.');
requireText('pdfDocumentTemplate', "'aria-labelledby'", 'PDF document boundaries must expose a stable accessible name.');
requireText('pdfDocumentTemplate', "{{ 'Open PDF'|t }}", 'Available PDF documents need a translated concise action.');
requireText('pdfDocumentTemplate', "{{ 'Document unavailable'|t }}", 'Unavailable PDF documents need a translated factual status.');
requireText('pdfDocumentTemplate', "{{ 'The PDF could not be loaded. Try this page again later.'|t }}", 'Unavailable PDF documents need a translated recovery instruction.');
forbidText('pdfDocumentTemplate', '{{ content }}', 'The inaccessible provider viewer must not render inside Moody26.');
forbidText('pdfDocumentTemplate', 'target="_blank"', 'PDF links must not force a new browsing context.');
forbidText('pdfDocumentTemplate', 'aria-live', 'Server-rendered PDF failures must not announce as live updates.');
requireText('eventDetailCss', 'macrostructure: Split Studio', 'Event details must retain the Hallmark Split Studio contract.');
requireText('eventDetailCss', '.moody26-event--long-title', 'Long event titles must retain their length-aware masthead.');
requireText('eventDetailCss', 'overflow-wrap: anywhere;', 'Event titles and body copy must survive long unbroken text.');
requireText('eventDetailCss', 'grid-template-columns: minmax(0, 2fr) minmax(0, 5fr);', 'Event leads must retain safe responsive media and context tracks.');
requireText('eventDetailCss', 'grid-template-columns: minmax(0, 8fr) minmax(16rem, 4fr);', 'Event pages must retain the wide Split Studio composition.');
requireText('eventDetailCss', '.moody26-event--media-unavailable', 'Event pages must retain missing-media reflow.');
requireText('eventDetailCss', '.moody26-event--details-unavailable', 'Event pages must collapse an unavailable details track.');
requireText('eventDetailCss', 'min-height: var(--target-min);', 'Event links must retain accessible minimum targets.');
forbidPattern('eventDetailCss', /(?:node|page)-\d+/, 'Event-detail styling must not depend on route-specific node or page IDs.');
forbidText('eventDetailCss', 'transition:', 'Event details must remain static without unnecessary motion.');
forbidText('eventDetailCss', 'object-fit:', 'Event media must retain its authored aspect ratio without a universal crop.');
requireText('theme', 'moody26_event_image($node, $variables)', 'Event preprocess must use the failure-safe image builder.');
requireText('theme', "$media->access('view', NULL, TRUE)", 'Event media output must respect entity access.');
requireText('theme', 'if (!file_exists($uri) || !$image->isValid())', 'Event media must fail closed when its source is unavailable.');
requireText('theme', "'#width' => $image->getWidth()", 'Event media must expose actual intrinsic width.');
requireText('theme', "'#height' => $image->getHeight()", 'Event media must expose actual intrinsic height.');
requireText('theme', "'fetchpriority' => 'high'", 'Event lead media must retain its loading priority.');
requireText('theme', 'addCacheableDependency($file)', 'Event media output must retain file cache metadata.');
requireText('theme', "'moody26-event--media-unavailable'", 'Event preprocess must expose the failed-media composition.');
requireText('eventTemplate', '<h2 class="moody26-event__details-title">', 'Event details must follow the page h1 with an h2.');
requireText('eventTemplate', '<dl class="moody26-event__details-list">', 'Event facts must retain definition-list semantics.');
requireText('eventTemplate', "{% if has_details %}", 'Event pages must omit an empty details region.');
requireText('eventTemplate', "'moody26-event--details-unavailable'", 'Event pages must expose an unavailable-details composition.');
requireText('eventTemplate', "<dt>{{ 'Date and time'|t }}</dt>", 'Event dates need a visible translated label.');
requireText('eventTemplate', "<dt>{{ 'Hosted by'|t }}</dt>", 'Event hosts need a concise translated label.');
requireText('eventTemplate', "<dt>{{ 'For'|t }}</dt>", 'Event audiences need a concise translated label.');
requireText('eventTemplate', "<dt>{{ 'Topics'|t }}</dt>", 'Event topics need a concise translated label.');
requireText('eventTemplate', '{{ rendered_datetime }}', 'Event dates must preserve formatter output.');
requireText('eventTemplate', 'class="ut-btn moody-btn--arrow"', 'Event source actions must use the shared accessible CTA treatment.');
requireText('eventTemplate', "'external link'|t", 'Event source actions must announce external behavior.');
requireText('eventTemplate', '{{ content._layout_builder }}', 'Event pages must preserve Layout Builder extensions.');
forbidText('eventTemplate', '<h3', 'Event templates must not skip from the page h1 to an h3.');
forbidText('eventTemplate', 'col-md', 'Event templates must not depend on legacy Bootstrap layout classes.');
requireText('eventsListingCss', 'component: editorial events ledger', 'Upcoming events must retain the Hallmark component contract.');
requireText('eventsListingCss', 'container: moody-events / inline-size;', 'Upcoming events must respond to their Layout Builder container.');
requireText('eventsListingCss', 'grid-template-columns: minmax(0, 1fr);', 'Upcoming events must retain a safe narrow track.');
requireText('eventsListingCss', 'grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);', 'Upcoming events must retain safe wide media-content tracks.');
requireText('eventsListingCss', '.moody-events-v2__item--media-unavailable', 'Upcoming events must retain remote-image failure reflow.');
requireText('eventsListingCss', '.moody-events-v2__event-link:focus-visible', 'Upcoming event links need immediate visible focus.');
requirePattern('eventsListingCss', /\.moody-events-v2__event-link\s*\{[\s\S]*?min-height:\s*var\(--target-min\);/, 'Upcoming event title links must retain a 44 CSS-pixel target.');
requireText('eventsListingCss', 'min-height: var(--target-min);', 'Upcoming event actions must retain accessible minimum targets.');
requireText('eventsListingCss', '@media (hover: hover) and (pointer: fine)', 'Upcoming event hover feedback must be capability-gated.');
requireText('eventsListingCss', '@supports not (container-type: inline-size)', 'Upcoming events need a responsive fallback when container queries are unavailable.');
requireText('eventsListingCss', '@media (prefers-reduced-motion: reduce)', 'Upcoming event preview loading must retain a reduced-motion path.');
forbidPattern('eventsListingCss', /(?:alumni|node-\d+|block-[\da-f]{8}-[\da-f-]{27,})/i, 'Upcoming-event styling must not depend on a route, node ID, or block UUID.');
forbidText('eventsListingCss', 'transition:', 'The editorial events ledger must remain static without decorative motion.');
for (const state of ['default', 'hover', 'focus', 'active', 'disabled', 'loading', 'error', 'success']) {
  requireText('eventsListingPreview', `data-preview-state="${state}"`, `The events-listing preview must demonstrate its ${state} state.`);
}
requireText('eventsListingTemplate', '<ul class="moody-events-v2__list" role="list">', 'Upcoming events must expose semantic list markup.');
requireText('eventsListingTemplate', '<article class="moody-events-v2__event">', 'Each upcoming event must remain an article.');
requireText('eventsListingTemplate', '<time class="moody-events-v2__date" datetime="{{ event.date_sort }}">', 'Upcoming event dates must expose the provider ISO value.');
requireText('eventsListingTemplate', "|replace({' - ': '–'})", 'Upcoming event time ranges must use typographic range punctuation.');
requireText('eventsListingTemplate', '<h3 class="moody-events-v2__title">', 'Upcoming event titles must follow the visible block h2.');
requireText('eventsListingTemplate', 'class="moody-events-v2__event-link"', 'Each linked event must expose one descriptive title destination.');
requireText('eventsListingTemplate', 'alt=""', 'Remote event thumbnails must remain decorative beside the same visible title.');
requireText('eventsListingTemplate', 'width="640"', 'Remote event thumbnails must reserve intrinsic width.');
requireText('eventsListingTemplate', 'height="400"', 'Remote event thumbnails must reserve intrinsic height.');
requireText('eventsListingTemplate', '<div class="moody-events-v2__empty" role="status">', 'Empty event feeds need a truthful status in ordinary document flow.');
requireText('eventsListingTemplate', "{{ 'No upcoming events are available from the Moody calendar right now.'|t }}", 'Empty event feeds need translated factual copy.');
requireText('eventsListingTemplate', '<nav class="moody-events-v2__actions"', 'Event calendar recovery actions need a labelled navigation region.');
forbidText('eventsListingTemplate', 'View Event Details', 'Upcoming events must not create a duplicate details destination.');
forbidText('eventsListingTemplate', 'target="_blank"', 'Event calendar actions must not force a new browsing context.');
forbidText('eventsListingTemplate', '|raw', 'Upcoming event listings must not bypass Twig escaping.');
requireText('accessibility', "once('moody26-event-list-image'", 'Upcoming event image recovery must be idempotent.');
requireText('accessibility', "classList.add('moody-events-v2__item--media-unavailable')", 'Failed event thumbnails must preserve and recompose event content.');
requireText('facultyProfileCss', 'macrostructure: Index-First profile dossier', 'Faculty profiles must retain the Hallmark Index-First dossier contract.');
requireText('facultyProfileCss', 'grid-template-columns: minmax(12rem, 3fr) minmax(0, 9fr);', 'Faculty profiles must retain safe responsive portrait and identity tracks.');
requireText('facultyProfileCss', '.moody26-faculty-profile--media-unavailable', 'Faculty profiles must retain missing-portrait reflow.');
requireText('facultyProfileCss', 'min-height: var(--target-min);', 'Faculty profile actions and resource links must retain accessible targets.');
requireText('facultyProfileCss', '@media (hover: hover) and (pointer: fine)', 'Faculty profile hover feedback must remain capability-gated.');
forbidPattern('facultyProfileCss', /(?:node|page)-\d+/, 'Faculty-profile styling must not depend on route-specific node or page IDs.');
forbidText('facultyProfileCss', 'transition:', 'Faculty profiles must remain static without profile-only motion.');
forbidText('facultyProfileCss', 'position: sticky', 'Faculty profiles must not trap identity content in a sticky rail.');
requireText('theme', 'moody26_faculty_profile_image($node, $variables)', 'Faculty preprocess must use the failure-safe portrait builder.');
requireText('theme', 'moody26_faculty_profile_cv_url($node, $variables)', 'Faculty preprocess must validate CV files before exposing downloads.');
requireText('theme', "load('faculty_bio_image')", 'Faculty portraits must preserve the configured faculty image style.');
requireText('theme', "'#theme' => 'image_style'", 'Faculty portraits must retain Drupal image-style delivery.');
requireText('theme', "'fetchpriority' => 'high'", 'Faculty profile portraits must retain their loading priority.');
requireText('theme', "'field_subordinates'", 'Faculty profile sections must preserve future assistant content.');
requireText('theme', "t('More')", 'Untitled custom faculty content must receive a translated fallback label.');
requireText('facultyProfileTemplate', '<dl class="moody26-faculty-profile__contact-list">', 'Faculty contact facts must retain definition-list semantics.');
requireText('facultyProfileTemplate', "<dt>{{ 'Email address'|t }}</dt>", 'Faculty email addresses need a descriptive translated label.');
requireText('facultyProfileTemplate', "{{ 'Download CV (PDF)'|t }}", 'Faculty CV actions must identify the file format.');
requireText('facultyProfileTemplate', "{{ 'View UT directory'|t }}", 'Faculty directory actions must retain concise descriptive text.');
requireText('facultyProfileTemplate', 'data-flex-tabs', 'Faculty sections must reuse the progressive tab controller.');
requireText('facultyProfileTemplate', 'data-flex-tab-panel', 'Faculty content must expose complete progressive tab pairs.');
requireText('facultyProfileTemplate', '<h2 class="moody26-faculty-profile__section-title">', 'Faculty sections must follow the page h1 with h2 headings.');
requireText('facultyProfileTemplate', '{{ content._layout_builder }}', 'Faculty profiles must preserve Layout Builder extensions.');
forbidText('facultyProfileTemplate', 'data-bs-toggle', 'Faculty profiles must not depend on Bootstrap tab behavior.');
forbidText('facultyProfileTemplate', 'col-md', 'Faculty profiles must not depend on legacy Bootstrap layout classes.');
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
requireText('featuredHighlightCss', 'component: Featured Highlight + Moody Promotion', 'The shared editorial signal band must retain its Hallmark component contract.');
requireText('featuredHighlightCss', 'container: featured-highlight / inline-size;', 'Featured Highlights and Moody Promotions must remain container-aware.');
requireText('featuredHighlightCss', '.featured-highlight__content :is(.ut-btn, .ut-btn--homepage):focus-visible', 'Signal-band calls to action need immediate visible focus.');
requireText('featuredHighlightCss', '.block-bundle-moody-promotion:not(:has(.moody-promotion))', 'Empty Moody Promotion placements must collapse without decoration.');
requireText('featuredHighlightCss', '.ut-btn--homepage', 'Moody Promotion formatter links must share the signal-band CTA states.');
requireText('featuredHighlightCss', '[aria-disabled="true"]', 'Signal-band calls to action must honor an authored disabled state.');
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
requireText('promotionTemplate', "'moody-promotion'", 'Moody Promotions must expose their shared component identity.');
requireText('promotionTemplate', '<h2 class="featured-highlight__title ut-headline">', 'Moody Promotion headlines must use page-safe heading semantics.');
requireText('promotionTemplate', 'rendered_media', 'Moody Promotions must preserve formatter-rendered media.');
requireText('promotionTemplate', 'rendered_date', 'Moody Promotions must preserve formatter-rendered dates.');
requireText('promotionTemplate', 'rendered_copy', 'Moody Promotions must preserve processed editor copy.');
requireText('promotionTemplate', 'rendered_cta', 'Moody Promotions must preserve formatter-owned link attributes.');
requireText('promotionTemplate', '{% if has_media or has_content %}', 'Completely empty Moody Promotions must emit no component.');
forbidText('promotionTemplate', 'attach_library', 'Moody Promotions must reuse the global signal-band library.');
forbidText('promotionTemplate', 'href=', 'Moody Promotion destinations must remain formatter-owned.');
forbidText('promotionTemplate', '|raw', 'Moody Promotions must not bypass Drupal render safety.');
forbidText('promotionTemplate', '|filter|', 'Moody Promotion class lists must remain compatible with Drupal Twig.');
forbidText('promotionTemplate', '<h3', 'Moody Promotions must not retain the legacy unconditional h3.');
forbidText('promotionTemplate', 'moody-promotion-wrapper', 'Moody Promotions must not retain legacy theme layout wrappers.');
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
requireText('impactFactsCss', 'component: editorial proof ledger', 'Moody Impact Facts must retain the Hallmark component contract.');
requireText('impactFactsCss', 'container: impact-facts / inline-size;', 'Moody Impact Facts must respond to their Layout Builder container.');
requireText('impactFactsCss', 'grid-template-columns: minmax(0, 1fr);', 'Moody Impact Facts must retain one safe narrow track.');
requireText('impactFactsCss', 'grid-template-columns: repeat(2, minmax(0, 1fr));', 'Moody Impact Facts must retain two safe middle tracks.');
requireText('impactFactsCss', 'grid-template-columns: repeat(12, minmax(0, 1fr));', 'Moody Impact Facts must retain a safe wide editorial grid.');
requireText('impactFactsCss', 'font-variant-numeric: tabular-nums;', 'Moody Impact Facts must use tabular figures.');
requireText('impactFactsCss', '.impact-facts--legacy-columns-three-per-row', 'Moody Impact Facts must preserve the three-column migration choice.');
requireText('impactFactsTemplate', '<ul class="impact-facts__list" role="list">', 'Moody Impact Facts collections must expose list semantics.');
requireText('impactFactsTemplate', '<li class="impact-facts__item">', 'Moody Impact Facts entries must expose direct list-item semantics.');
requireText('impactFactsTemplate', '<h2 class="impact-facts__heading">', 'Authored Impact Facts group headings must remain h2 headings.');
requireText('impactFactsTemplate', '<p class="impact-facts__value">', 'Impact Fact values must remain ordinary content rather than headings.');
requireText('impactFactsTemplate', '<p class="impact-facts__description">', 'Impact Fact descriptions must remain ordinary content rather than headings.');
requireText('impactFactsTemplate', 'rendered_items|striptags|trim', 'Moody Impact Facts must omit structurally empty collections.');
requireText('impactFactsTemplate', 'impact-facts--legacy-style-', 'Legacy Impact Facts styles must remain stable migration classes.');
requireText('impactFactsTemplate', 'impact-facts--legacy-columns-', 'Legacy Impact Facts column choices must remain stable migration classes.');
forbidText('impactFactsTemplate', '<h3', 'Impact Fact values must not distort the page heading hierarchy.');
forbidText('impactFactsTemplate', '<h4', 'Impact Fact descriptions must not distort the page heading hierarchy.');
forbidText('impactFactsTemplate', 'attach_library', 'Impact Facts must use the theme global library without duplicate attachments.');
forbidText('impactFactsTemplate', '|raw', 'Impact Facts must not bypass Drupal render safety.');
forbidText('editorialSections', '.moody-impact-facts-wrapper', 'Impact Facts presentation must live in its dedicated component stylesheet.');
forbidText('motion', "'.impact-fact-items'", 'Static Moody Impact Facts must not receive decorative reveal motion.');
requireText('showcaseCss', 'component: editorial media ledger', 'Moody Showcase must retain the Hallmark component contract.');
requireText('showcaseCss', 'container: showcase / inline-size;', 'Moody Showcase must respond to its Layout Builder container.');
requireText('showcaseCss', 'grid-template-columns: minmax(0, 1fr);', 'Moody Showcase must retain one safe narrow track.');
requireText('showcaseCss', 'grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);', 'Moody Showcase must retain its safe wide editorial split.');
requireText('showcaseCss', '.showcase-list__item.moody-showcase-33-66', 'Moody Showcase must preserve the 33/66 migration view mode.');
requireText('showcaseCss', '.showcase-list__item.moody-showcase-66-33', 'Moody Showcase must preserve the 66/33 migration view mode.');
requireText('showcaseCss', '.showcase-list__item.moody-showcase-marketing-style', 'Moody Showcase must preserve the Marketing migration view mode.');
requireText('showcaseCss', '.showcase--media-unavailable', 'Moody Showcase must retain resilient failed-media composition.');
requireText('showcaseCss', 'white-space: nowrap;', 'Moody Showcase CTAs must remain one-line affordances.');
requireText('showcaseCss', '.showcase__action > a:visited', 'Moody Showcase CTA visited states must preserve compliant link contrast.');
requireText('showcaseCss', 'var(--sticky-offset)', 'Sticky Showcase media must clear the theme-owned header offset.');
requireText('showcaseCss', '@media (prefers-reduced-motion: reduce)', 'Sticky Showcase media must return to ordinary flow for reduced motion.');
requireText('showcaseFieldTemplate', '<ul class="showcase-list" role="list">', 'Moody Showcase collections must expose list semantics.');
requireText('showcaseFieldTemplate', "addClass('showcase-list__item')", 'Moody Showcase entries must expose direct list-item semantics.');
requireText('showcaseFieldTemplate', 'rendered_item|trim', 'Moody Showcase fields must retain media-only entries and omit empty stored items.');
requireText('showcaseTemplate', '<article class="{{ component_classes', 'Each Moody Showcase item must remain an editorial article.');
requireText('showcaseTemplate', '<h2 class="showcase__title showcase-headline">', 'Moody Showcase item headings must correct the formatter heading skip.');
requireText('showcaseTemplate', 'image|default', 'Moody Showcase must preserve formatter-owned responsive image output.');
requireText('showcaseTemplate', 'video|default', 'Moody Showcase must preserve formatter-owned external-video output.');
requireText('showcaseTemplate', 'cta|default', 'Moody Showcase must preserve formatter-owned CTA output.');
requireText('showcaseTemplate', "sticky_image ? 'showcase--sticky-media'", 'Moody Showcase must preserve the sticky-media authoring choice.');
requireText('showcaseTemplate', "full_media ? 'showcase--full-media'", 'Moody Showcase must preserve the full-media authoring choice.');
requireText('showcaseTemplate', "pinned_reveal_image ? 'showcase--pinned-reveal'", 'Moody Showcase must preserve the pinned-media authoring choice.');
forbidText('showcaseTemplate', '<h3', 'Moody Showcase must not preserve the formatter heading skip.');
forbidText('showcaseTemplate', 'href=', 'Moody Showcase destinations must not be reconstructed in Twig.');
forbidText('showcaseTemplate', '|raw', 'Moody Showcase must not bypass Drupal render safety.');
forbidText('showcaseTemplate', 'attach_library', 'Moody Showcase must use existing libraries without duplicate attachments.');
forbidText('showcaseTemplate', '→', 'Moody Showcase must not invent a synthetic arrow.');
forbidText('editorialSections', '.moody-showcase', 'Showcase presentation must live in its dedicated component stylesheet.');
forbidText('newsroom', '.moody-showcase', 'Showcase presentation must not be duplicated in newsroom styles.');
forbidText('motion', "'.moody-showcase'", 'Static Moody Showcases must not receive decorative reveal motion.');
requireText('landingHero', 'component: Moody + UT Drupal Kit responsive editorial hero', 'Moody and UT Drupal Kit Heroes must retain the Hallmark component contract.');
requireText('landingHero', 'container: moody-hero / inline-size;', 'Moody Heroes must respond to their Layout Builder container.');
requireText('landingHero', ':where(.block-bundle-moody-hero, .block-bundle-utexas-hero)', 'Both hero providers must share one component container contract.');
requireText('landingHero', ':where(.field--type-moody-hero, .field--type-utexas-hero)', 'Both hero field providers must retain safe media tracks.');
requireText('landingHero', '.node__content > .section-wrapper.moody26-section--hero', 'Shared Heroes must cover every page bundle without a route or bundle whitelist.');
requireText('landingHero', 'grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);', 'Split Moody Heroes must retain safe 7/5 media-copy tracks.');
requireText('landingHero', '.moody26-hero--layout-overlay .moody26-hero__media::after', 'Overlay Moody Heroes must retain the readable tokenized scrim.');
requireText('landingHero', '.moody26-hero__action > a:visited', 'Moody Hero CTA visited states must preserve compliant link contrast.');
requireText('landingHero', '.moody26-hero__action > a:focus-visible', 'Moody Hero CTAs need immediate visible focus.');
requireText('landingHero', 'box-shadow: var(--focus-halo);', 'Moody Hero CTA focus must retain a paper halo over photography.');
requireText('landingHero', '.moody26-hero__action > a:active', 'Moody Hero CTAs need active feedback.');
requireText('landingHero', '.moody26-hero__action > a[aria-disabled="true"]', 'Moody Hero CTAs must retain a truthful disabled treatment.');
requireText('landingHero', 'min-height: var(--target-min);', 'Moody Hero CTAs must preserve a 44 CSS-pixel target.');
requireText('landingHero', 'white-space: nowrap;', 'Moody Hero CTA labels must remain one-line affordances.');
requireText('landingHero', '@media (hover: hover) and (pointer: fine)', 'Moody Hero hover feedback must be capability-gated.');
requireText('landingHero', '.moody26-hero--media-unavailable', 'Moody Heroes must retain resilient failed-media composition.');
requireText('heroTemplate', '<figure class="moody26-hero__media">', 'Moody Hero media must expose figure semantics.');
requireText('heroTemplate', '<figcaption class="moody26-hero__caption">', 'Authored Moody Hero captions must expose figcaption semantics.');
requireText('heroTemplate', '<h2 class="moody26-hero__title">', 'Authored Moody Hero headings must correct formatter heading skips.');
requireText('heroTemplate', '<p class="moody26-hero__summary">', 'Moody Hero summaries must remain ordinary paragraph content.');
requireText('heroTemplate', 'role="img"', 'Meaningful background Moody Hero media must expose image semantics.');
requireText('heroTemplate', 'aria-label="{{ media_alt }}"', 'Meaningful background Moody Hero media must retain its authored name.');
requireText('heroTemplate', 'aria-hidden="true"', 'Decorative background Moody Hero media must leave the accessibility tree.');
requireText('heroTemplate', 'media|default', 'Moody Heroes must preserve formatter-owned responsive media output.');
requireText('heroTemplate', 'cta|default', 'Moody Heroes must preserve formatter-owned CTA output.');
requireText('heroTemplate', 'Moody and UT Drupal Kit Hero modes', 'The shared semantic Hero template must document both formatter providers.');
requireText('heroTemplate', 'hero_source_scope_class|default', 'The shared Hero must accept a formatter-owned background source scope.');
requireText('heroTemplate', 'hero_background_source_class|default', 'The shared Hero must accept a formatter-owned background selector hook.');
requireText('heroTemplate', 'class="hero-img moody26-hero__background', 'Background Heroes must retain the formatter source hook used by style 1.');
for (const [file, variant, layout] of [
  ['heroStyle1Template', 'style-1', 'split'],
  ['heroStyle2Template', 'style-2', 'overlay'],
  ['heroStyle3Template', 'style-3', 'overlay'],
  ['heroStyle4Template', 'style-4', 'split'],
  ['heroStyle5Template', 'style-5', 'split'],
  ['heroStyle6Template', 'style-6', 'overlay'],
  ['heroStyle6ShortTemplate', 'style-6-short', 'overlay'],
  ['heroStyle7Template', 'style-7', 'overlay'],
  ['heroStyle8Template', 'style-8', 'overlay'],
]) {
  requireText(file, "@moody26/components/moody-hero.html.twig", `${variant} Moody Hero output must reuse the shared template.`);
  requireText(file, `hero_variant: '${variant}'`, `${variant} Moody Hero output must retain its migration variant.`);
  requireText(file, `hero_layout: '${layout}'`, `${variant} Moody Hero output must retain the ${layout} family.`);
}
for (const [file, variant, layout] of [
  ['utexasHeroTemplate', 'default', 'media'],
  ['utexasHero1Template', 'style-1', 'split'],
  ['utexasHero2Template', 'style-2', 'overlay'],
  ['utexasHero3Template', 'style-3', 'overlay'],
  ['utexasHero4Template', 'style-4', 'split'],
  ['utexasHero5Template', 'style-5', 'split'],
]) {
  requireText(file, "@moody26/components/moody-hero.html.twig", `${variant} UT Drupal Kit Hero output must reuse the shared template.`);
  requireText(file, `hero_variant: '${variant}'`, `${variant} UT Drupal Kit Hero output must retain its migration variant.`);
  requireText(file, `hero_layout: '${layout}'`, `${variant} UT Drupal Kit Hero output must retain the ${layout} family.`);
  forbidText(file, 'attach_library', `${variant} UT Drupal Kit Hero output must preserve formatter attachments without duplication.`);
  forbidText(file, 'href=', `${variant} UT Drupal Kit Hero destinations must not be reconstructed in Twig.`);
  forbidText(file, '|raw', `${variant} UT Drupal Kit Hero output must not bypass Drupal render safety.`);
  forbidText(file, 'class="ut-hero', `${variant} UT Drupal Kit Hero must not restore the inactive profile-theme wrapper.`);
}
requireText('utexasHero2Template', "hero_background_source_class: 'hero--photo-gradient'", 'Style 2 UT Drupal Kit Hero must bind the formatter responsive background rules.');
requireText('utexasHero3Template', "hero_background_source_class: 'ut-hero'", 'Style 3 UT Drupal Kit Hero must bind the formatter responsive background rules.');
requireText('utexasHero5Template', "hero_source_scope_class: 'hero--half-n-half'", 'Style 5 UT Drupal Kit Hero must bind the formatter responsive background rules.');
forbidText('heroTemplate', '<h3', 'Moody Hero summaries must not distort the page heading hierarchy.');
forbidText('heroTemplate', 'href=', 'Moody Hero destinations must not be reconstructed in Twig.');
forbidText('heroTemplate', '|raw', 'Moody Heroes must not bypass Drupal render safety.');
forbidText('heroTemplate', 'attach_library', 'Moody Heroes must use the theme global library without duplicate attachments.');
forbidText('heroTemplate', '→', 'Moody Heroes must not invent a synthetic arrow.');
forbidPattern('landingHero', /\.moody-hero(?:\s|[.#:{>+~\[]|$)/, 'Legacy Moody Hero presentation must not compete with the theme-owned component.');
forbidPattern('newsroom', /\.moody-hero(?:\s|[.#:{>+~\[]|$)/, 'Moody Hero presentation must not be duplicated in newsroom styles.');
forbidText('motion', "'.moody26-hero'", 'Static Moody Heroes must not receive decorative reveal motion.');
requireText('theme', 'function moody26_preprocess_views_view_unformatted', 'Faculty directory rows need a translated result summary.');
requireText('theme', 'function moody26_dedupe_page_title_blocks', 'The standalone shell must guard against duplicate Core Page Title placements.');
requireText('theme', "foreach (['content', 'highlighted', 'help'] as $region_name)", 'Page-title ownership must prefer the main Content region.');
requireText('theme', "$plugin_id !== 'page_title_block'", 'Page-title deduplication must remain scoped to the Core Page Title plugin.');
requireText('theme', 'function moody26_preprocess_utexas_hero', 'Default UT Drupal Kit Heroes need intrinsic image dimensions.');
requireText('theme', 'function moody26_preprocess_utexas_hero_4', 'Style 4 UT Drupal Kit Heroes need intrinsic image dimensions.');
requireText('theme', "'responsive_image_formatter'", 'UT Drupal Kit Heroes must preserve responsive image formatter output.');
requireText('theme', "\\Drupal::service('image.factory')->get($uri)", 'UT Drupal Kit Hero dimensions must come from the formatter-owned source image.');
requireText('theme', "$media['#width'] ??= $width", 'Default UT Drupal Kit Hero images must reserve intrinsic width.');
requireText('theme', '$item->height ??= $height', 'Responsive UT Drupal Kit Hero images must reserve intrinsic height.');
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
requireText('profileListingBlock', '<section{{ attributes.addClass(classes) }}>', 'UTProf Profile Listings must expose a labelled section.');
requireText('profileListingBlock', "attributes.setAttribute('aria-labelledby', heading_id)", 'Visible UTProf listing titles must label their section.');
requireText('profileListingBlock', "attributes.setAttribute('aria-label', 'People'|t)", 'Heading-free UTProf listings need a translated landmark name.');
requireText('profileListingBlock', '<h2{{ heading_attributes }}>{{ label }}</h2>', 'UTProf listing titles must remain page-safe h2 headings.');
requireText('profileListingBlock', '{{ rendered_listing }}', 'UTProf listing output must remain provider owned.');
forbidText('profileListingBlock', 'href=', 'UTProf Profile Listing destinations must not be reconstructed in Twig.');
forbidText('profileListingBlock', '|raw', 'UTProf Profile Listings must not bypass Drupal render safety.');
forbidText('profileListingBlock', 'attach_library', 'UTProf Profile Listings must use the global theme library without duplicate attachments.');
requireText('profileDesignationField', '<ul{{ attributes.addClass(classes, \'field__items\') }} role="list">', 'Multiple profile designations must render as descriptive list values.');
requireText('profileDesignationField', '<li{{ item.attributes.addClass(\'field__item\') }}>{{ item.content }}</li>', 'Each profile designation must retain its own semantic list item.');
forbidPattern('profileDesignationField', /<h[1-6]\b/i, 'Profile designations must never be reported as document headings.');
requireText('accessibility', "once('moody26-people-directory'", 'Directory navigation enhancement must be idempotent.');
requireText('accessibility', "setAttribute('aria-current', 'page')", 'Directory switchers must announce the current page.');
requireText('accessibility', "Drupal.t('Faculty directories')", 'Directory switchers need a translated landmark name.');
requireText('accessibility', "once('moody26-person-image'", 'Directory portrait fallbacks must be idempotent.');
requireText('accessibility', "classList.add('people-directory__media--fallback')", 'Failed portraits must reveal the stable fallback tile.');
requireText('accessibility', "once('moody26-profile-listing-image'", 'UTProf portrait failure recovery must remain idempotent.');
requireText('accessibility', "classList.add('utprof__profile-item--media-unavailable')", 'Failed UTProf portraits must preserve and recompose profile content.');
requireText('accessibility', "once('moody26-ambient-video'", 'Ambient-video accessibility enhancement must remain idempotent.');
requireText('accessibility', "once('moody26-section-edge'", 'Hero and Contact Info edge classes must remain idempotent.');
requireText('accessibility', "classList.add('moody26-section--hero')", 'Hero sections need a relational-selector-independent edge class.');
requireText('accessibility', "classList.add('moody26-section--contact-info')", 'Contact Info sections need a relational-selector-independent edge class.');
requireText('accessibility', "Drupal.t('Play background video')", 'Paused ambient video controls need a translated action name.');
requireText('accessibility', "Drupal.t('Pause background video')", 'Playing ambient video controls need a translated action name.');
requireText('accessibility', "control.setAttribute('aria-controls', video.id)", 'Ambient-video controls must identify their controlled media.');
requireText('accessibility', "window.matchMedia('(prefers-reduced-motion: reduce)')", 'Ambient-video playback must honor reduced motion in JavaScript.');
requireText('accessibility', "video.removeAttribute('autoplay')", 'Reduced-motion and failed ambient videos must remove autoplay before source loading.');
requireText('accessibility', "control.hidden = reducedMotion.matches || !mediaAvailable;", 'Ambient-video controls must leave the interaction model when playback is unavailable.');
requireText('accessibility', "classList.add('moody26-ambient-video--fallback')", 'Ambient-video failures must expose a stable fallback state.');
requireText('accessibility', "once('moody26-showcase-image'", 'Showcase media fallbacks must be idempotent.');
requireText('accessibility', "classList.add('showcase--media-unavailable')", 'Failed Showcase media must preserve its text composition.');
requireText('accessibility', "once('moody26-hero-image'", 'Moody Hero media fallbacks must be idempotent.');
requireText('accessibility', "once('moody26-hero-background'", 'CSS-background Moody Hero fallbacks must remain idempotent.');
requireText('accessibility', '.backgroundImage', 'CSS-background Moody Heroes must inspect the formatter-resolved media source.');
requireText('accessibility', 'const probe = new Image();', 'CSS-background Moody Heroes must use a native image failure probe.');
requireText('accessibility', "classList.add('moody26-hero--media-unavailable')", 'Failed Moody Hero media must preserve and recompose its content.');
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
  'headerSocialCss', 'quickActionsCss', 'landingHero', 'richTextCss', 'editorialSections', 'discoveryIndex',
  'featuredHighlightCss', 'featuredHighlightTemplate', 'promoListCss', 'promoListTemplate',
  'flexContentCss', 'flexContentFieldTemplate', 'flexContentTemplate',
  'imageLinkCss', 'imageLinkTemplate',
  'flexColorBlocksCss', 'flexColorBlocksFieldTemplate', 'flexColorBlocksTemplate',
  'quotationCss', 'quotationTemplate',
  'flexGridCss', 'flexGridStandardTemplate', 'flexGridCircularTemplate', 'flexGridPromoTemplate',
  'flexGridRectangularTemplate', 'flexGridFlipTemplate', 'flexGridCardTemplate',
  'impactFactsCss', 'impactFactsTemplate',
  'showcaseCss', 'showcaseFieldTemplate', 'showcaseTemplate',
  'contactInfoCss', 'contactInfoTemplate', 'callToActionCss',
  'resourceGroupCss', 'utexasResourcesTemplate', 'moodyResourceGroupTemplate',
  'flexTabsCss', 'flexTabsTemplate',
  'heroCarouselCss', 'heroCarouselTemplate',
  'photoContentCss', 'photoContentTemplate',
  'socialLinksCss', 'socialLinksTemplate',
  'heroTemplate', 'heroStyle1Template', 'heroStyle2Template', 'heroStyle3Template',
  'heroStyle4Template', 'heroStyle5Template', 'heroStyle6Template', 'heroStyle6ShortTemplate',
  'heroStyle7Template', 'heroStyle8Template',
  'utexasHeroTemplate', 'utexasHero1Template', 'utexasHero2Template',
  'utexasHero3Template', 'utexasHero4Template', 'utexasHero5Template',
  'accordionCss', 'accordionTemplate',
  'peopleDirectory', 'peopleDirectoryView', 'peopleDirectoryRows', 'peopleDirectoryFields',
  'profileListingBlock', 'profileDesignationField',
  'newsroom', 'newsRows', 'newsFields',
  'featureStoryCss', 'featureCreditTemplate', 'shorthandStoryCss', 'shorthandStoryTemplate',
  'pdfDocumentCss', 'pdfDocumentTemplate',
  'eventDetailCss', 'eventTemplate', 'eventsListingCss', 'eventsListingTemplate',
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

const cssFiles = ['css', 'headerSocialCss', 'quickActionsCss', 'landingHero', 'richTextCss', 'editorialSections', 'featuredHighlightCss', 'promoListCss', 'flexContentCss', 'imageLinkCss', 'flexColorBlocksCss', 'quotationCss', 'flexGridCss', 'impactFactsCss', 'showcaseCss', 'contactInfoCss', 'callToActionCss', 'resourceGroupCss', 'flexTabsCss', 'heroCarouselCss', 'photoContentCss', 'socialLinksCss', 'discoveryIndex', 'accordionCss', 'peopleDirectory', 'studentStoriesCss', 'eventsListingCss', 'newsroom', 'featureStoryCss', 'shorthandStoryCss', 'pdfDocumentCss', 'eventDetailCss', 'motionCss', 'settingsCss'];
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
requireText('preflight', '"package_version": "0.43.0"', 'Hallmark preflight must match the semantic events-listing release.');
requireText('log', 'Index-First profile dossier within the Ecosystem Index', 'Hallmark memory must record the shared faculty-profile composition.');
requireText('log', 'Split Studio event brief within the Ecosystem Index', 'Hallmark memory must record the shared event-detail composition.');
requireText('log', 'Long Document feature story within the Ecosystem Index', 'Hallmark memory must record the shared feature-story composition.');
requireText('log', 'Conversational FAQ within the Ecosystem Index', 'Hallmark memory must record the shared accordion macrostructure.');
requireText('log', 'Editorial media directory within the Ecosystem Index', 'Hallmark memory must record the shared Moody Flex Grid component.');
requireText('log', 'Editorial Signal Band within the Ecosystem Index', 'Hallmark memory must record the shared Moody Promotion signal band.');
requireText('log', 'Progressive tab index within the Ecosystem Index', 'Hallmark memory must record the shared Flex Tabs component.');
requireText('log', 'Editorial Content Ledger within the Ecosystem Index', 'Hallmark memory must record the shared Flex List component.');
requireText('log', 'Compact destination rail within the Ecosystem Index', 'Hallmark memory must record the shared Social Links component.');

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
requireText('readme', 'Shared student-story directories and profiles', 'README must document the reusable student-story layer.');
requireText('readme', 'Page-title ownership', 'README must document one-document-h1 ownership.');
requireText('readme', 'Shared UTProf Profile Listings', 'README must document the shared UTProf listing layer.');
requireText('readme', 'Shared ambient-video heroes', 'README must document the accessible ambient-video layer.');
requireText('readme', 'Shared Basic and Rich Text', 'README must document the reusable Basic and Rich Text layer.');
requireText('readme', 'Shared resource hubs', 'README must document the reusable resource-hub layer.');
requireText('readme', 'Shared newsroom components', 'README must document the reusable newsroom layer.');
requireText('readme', 'Shared feature stories', 'README must document the reusable feature-story layer.');
requireText('readme', 'Shared event details', 'README must document the reusable event-detail layer.');
requireText('readme', 'Shared upcoming event listings', 'README must document the reusable upcoming-events layer.');
requireText('readme', 'Shared faculty profiles', 'README must document the reusable faculty-profile layer.');
requireText('readme', 'Shared accordions', 'README must document the native shared accordion layer.');
requireText('readme', 'Shared Featured Highlights', 'README must document the reusable Featured Highlight layer.');
requireText('readme', 'Shared Moody Promotions', 'README must document the reusable Moody Promotion layer.');
requireText('readme', 'Shared Promo Lists', 'README must document the reusable Promo List layer.');
requireText('readme', 'Shared Moody Showcases', 'README must document the reusable Moody Showcase layer.');
requireText('readme', 'Shared Flex Content Areas', 'README must document the reusable Flex Content Area layer.');
requireText('readme', 'Shared Image Links', 'README must document the reusable Image Link layer.');
requireText('readme', 'Shared Flex Color Blocks', 'README must document the reusable Flex Color Block layer.');
requireText('readme', 'Shared Moody Quotations', 'README must document the reusable Moody Quotation layer.');
requireText('readme', 'Shared Moody Flex Grids', 'README must document the reusable Moody Flex Grid layer.');
requireText('readme', 'Shared Moody Impact Facts', 'README must document the reusable Moody Impact Facts layer.');
requireText('readme', 'Shared Moody Heroes', 'README must document the reusable Moody Hero layer.');
requireText('readme', 'provider-set CSS background', 'README must document CSS-background Hero failure recovery.');
requireText('readme', 'Shared UT Drupal Kit Heroes', 'README must document the reusable UT Drupal Kit Hero layer.');
requireText('readme', 'Shared Moody Contact Info', 'README must document the reusable Moody Contact Info layer.');
requireText('readme', 'Shared Call to Action blocks', 'README must document the reusable Call to Action layer.');
requireText('readme', 'Shared Resource Groups', 'README must document the shared Resource Group layer.');
requireText('readme', 'Shared Flex Tabs', 'README must document the progressive shared Flex Tabs layer.');
requireText('readme', 'Shared UT Drupal Kit Flex Lists', 'README must document all UT Drupal Kit Flex List displays.');
requireText('readme', 'Accessible UT Drupal Kit Hero Carousels', 'README must document the progressive Hero Carousel layer.');
requireText('readme', 'Shared UT Drupal Kit Photo Content Areas', 'README must document the shared Photo Content Area layer.');
requireText('readme', 'Shared Moody Newsletter destination bands', 'README must document the shared Moody Newsletter layer.');
requireText('readme', 'Shared UT Drupal Kit Quick Links', 'README must document the shared Quick Links layer.');
requireText('readme', 'Shared UT Drupal Kit Social Links', 'README must document the shared Social Links layer.');
requireText('readme', 'Shared Moody Anchor galleries', 'README must document the shared Moody Anchor gallery layer.');
requireText('agents', '`header_social_links_block`', 'AGENTS.md must preserve the header Social Links contract.');
requireText('agents', 'Missing, unpublished, non-reusable, inaccessible, wrong-bundle, or malformed', 'AGENTS.md must require Social Links to fail closed.');
requireText('agents', '### People directories', 'AGENTS.md must preserve the people-directory contract.');
requireText('agents', '### Student-story directories and profiles', 'AGENTS.md must preserve the student-story contract.');
requireText('agents', '### Page-title ownership', 'AGENTS.md must preserve the one-document-h1 contract.');
requireText('agents', '### UTProf Profile Listings', 'AGENTS.md must preserve the UTProf listing contract.');
requireText('agents', '### Ambient-video heroes', 'AGENTS.md must preserve the ambient-video component contract.');
requireText('agents', '### Basic and Rich Text blocks', 'AGENTS.md must preserve the Basic and Rich Text component contract.');
requireText('agents', '### Resource hubs', 'AGENTS.md must preserve the resource-hub contract.');
requireText('agents', '### Newsroom components', 'AGENTS.md must preserve the newsroom component contract.');
requireText('agents', '### Feature stories', 'AGENTS.md must preserve the feature-story component contract.');
requireText('agents', '### Event details', 'AGENTS.md must preserve the event-detail component contract.');
requireText('agents', '### Upcoming event listings', 'AGENTS.md must preserve the upcoming-events component contract.');
requireText('agents', '### Faculty profiles', 'AGENTS.md must preserve the faculty-profile component contract.');
requireText('agents', '### Accordions', 'AGENTS.md must preserve the native accordion contract.');
requireText('agents', '### Featured Highlights', 'AGENTS.md must preserve the Featured Highlight component contract.');
requireText('agents', '### Moody Promotions', 'AGENTS.md must preserve the Moody Promotion component contract.');
requireText('agents', '### Promo Lists', 'AGENTS.md must preserve the Promo List component contract.');
requireText('agents', '### Flex Content Areas', 'AGENTS.md must preserve the Flex Content Area component contract.');
requireText('agents', '### Image Links', 'AGENTS.md must preserve the Image Link component contract.');
requireText('agents', '### Flex Color Blocks', 'AGENTS.md must preserve the Flex Color Block component contract.');
requireText('agents', '### Moody Quotations', 'AGENTS.md must preserve the Moody Quotation component contract.');
requireText('agents', '### Moody Flex Grids', 'AGENTS.md must preserve the Moody Flex Grid component contract.');
requireText('agents', '### Moody Impact Facts', 'AGENTS.md must preserve the Moody Impact Facts component contract.');
requireText('agents', '### Flex Tabs', 'AGENTS.md must preserve the progressive Flex Tabs component contract.');
requireText('agents', '### UT Drupal Kit Flex Lists', 'AGENTS.md must preserve the shared Flex List component contract.');
requireText('agents', '### UT Drupal Kit Hero Carousels', 'AGENTS.md must preserve the accessible Hero Carousel component contract.');
requireText('agents', '### UT Drupal Kit Photo Content Areas', 'AGENTS.md must preserve the Photo Content Area component contract.');
requireText('agents', '### Moody Newsletter destination bands', 'AGENTS.md must preserve the Moody Newsletter component contract.');
requireText('agents', '### UT Drupal Kit Quick Links', 'AGENTS.md must preserve the Quick Links component contract.');
requireText('agents', '### UT Drupal Kit Social Links', 'AGENTS.md must preserve the Social Links component contract.');
requireText('agents', '### Moody Anchor galleries', 'AGENTS.md must preserve the Moody Anchor gallery component contract.');
requireText('agents', '### Moody Showcases', 'AGENTS.md must preserve the Moody Showcase component contract.');
requireText('agents', '### Moody Heroes', 'AGENTS.md must preserve the Moody Hero component contract.');
requireText('agents', 'do not expose native error events', 'AGENTS.md must preserve the CSS-background Hero failure contract.');
requireText('agents', '### UT Drupal Kit Heroes', 'AGENTS.md must preserve the UT Drupal Kit Hero component contract.');
requireText('agents', '### Moody Contact Info', 'AGENTS.md must preserve the Moody Contact Info component contract.');
requireText('agents', '### Call to Action blocks', 'AGENTS.md must preserve the Call to Action component contract.');
requireText('agents', '### Resource Groups', 'AGENTS.md must preserve the shared Resource Group component contract.');
requireText('agents', '### Shorthand stories', 'AGENTS.md must preserve the shared Shorthand integration contract.');
requireText('agents', 'provider module must resolve and validate', 'AGENTS.md must keep Shorthand file validation as a production prerequisite.');
requireText('readme', '### Shared Shorthand stories', 'README must document the Shorthand integration boundary.');
requireText('readme', 'Try this page again later.', 'README must document the truthful Shorthand recovery state.');
requireText('agents', '### PDF documents', 'AGENTS.md must preserve the shared PDF document contract.');
requireText('agents', 'document-wide Left/Right listener', 'AGENTS.md must preserve the DFlip keyboard-risk rationale.');
requireText('readme', '### Shared PDF documents', 'README must document the keyboard-safe PDF document boundary.');
requireText('readme', 'A themed link cannot make an inaccessible PDF compliant.', 'README must preserve document-level accessibility ownership.');

if (errors.length) {
  console.error(`Moody26 verification failed (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
}
else {
  console.log(`Moody26 verification passed (${Object.keys(files).length} source files, ${fonts.length} local fonts, standalone shell, UT brand, Basic and Rich Text, accessible directories, student-story directories and profiles, UTProf Profile Listings, and faculty profile dossiers, accessible ambient-video heroes, resource hubs, Resource Groups, Flex Tabs, UT Drupal Kit Flex Lists, Hero Carousels, Photo Content Areas, Moody Newsletter destination bands, UT Drupal Kit Quick Links, semantic Social Links, Moody Anchor galleries, failure-safe Shorthand stories, keyboard-safe PDF documents, and API-backed upcoming-event ledgers, newsroom, feature stories, event details, accordions, Featured Highlights, Moody Promotions, Promo Lists, Flex Content Areas, Image Links, Flex Color Blocks, Moody Quotations, Moody Flex Grids, Moody Impact Facts, Moody and UT Drupal Kit Heroes, Moody Showcases, Moody Contact Info, and Call to Action blocks, header social links, motion, responsive, and Hallmark gates).`);
}
