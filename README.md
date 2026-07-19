# Moody 26

Moody 26 is an accessible, youth-aware Drupal theme for the University of
Texas at Austin's Moody College of Communication site fleet. It combines the
University's visual identity with a shared editorial system for academic,
research, film, journalism, advertising, alumni, and public-facing content.

> **Project status:** pre-release (`0.1.0`). Moody 26 is being incubated in
> [Moody Core](https://github.com/UTMoodyCollege/moody-core) before becoming a
> separately released Composer package. The `main` branch may change before the
> first stable release.

## What the theme provides

- A responsive UT/Moody masthead using the approved inherited wordmark.
- Keyboard- and touch-operable primary navigation with accessible disclosure
  semantics and native tab order.
- A `Cmd+K` / `Ctrl+K` quick-action dialog generated from the site's rendered
  navigation, search form, home link, and Give link.
- Shared design tokens for UT colors, approved typography roles, spacing,
  focus, motion, target sizes, and responsive containers.
- Layout Builder-friendly landing heroes, editorial content pairings, proof
  treatments, calls to action, forms, and discovery grids.
- Focus, reduced-motion, contrast, reflow, and media-metadata repairs for
  inherited Moody components.
- Matching front-end styles in CKEditor 5.

Moody 26 does **not** provide site content, Drupal configuration, menu content,
or a replacement for the base Moody theme. Those remain the responsibility of
the consuming site.

## Requirements

| Requirement | Supported version or role |
| --- | --- |
| Drupal | 10 or 11 |
| PHP | A version supported by the installed Drupal release |
| Base theme | [`moody-college/moody`](https://github.com/UTMoodyCollege/moody), currently `dev-master` |
| Composer | 2.x recommended |
| Node.js | 20 or newer for development checks only |
| Browsers | Current and previous two major Chrome, Firefox, and Safari releases |

The theme assumes a Composer-based Drupal project with a `web/` document root.
DDEV is supported for local development but is not required at runtime.

## Installation

### Composer development install

Until a tagged package is available, register the GitHub repository as a VCS
source and require the development branch from the Drupal project root:

```sh
composer config repositories.moody26 vcs https://github.com/UTMoodyCollege/moody26.git
composer require moody-college/moody26:dev-main
```

Composer installs the required `moody-college/moody` base theme as a dependency.
If your project uses DDEV, prefix the commands with `ddev`.

### Manual development checkout

For theme development inside an existing Moody Drupal project:

```sh
composer require moody-college/moody:dev-master
git clone https://github.com/UTMoodyCollege/moody26.git web/themes/custom/moody26
```

Use the Composer method for deployments so the installed revision is recorded
and reproducible.

### Enable the theme

Enable Moody 26, make it the default theme when the site is ready to switch,
and rebuild caches:

```sh
vendor/bin/drush theme:enable moody26 -y
vendor/bin/drush config:set system.theme default moody26 -y
vendor/bin/drush cache:rebuild
```

On DDEV, replace `vendor/bin/drush` with `ddev drush`.

Changing the default theme is a configuration change. Export and review that
configuration according to the consuming site's deployment workflow.

## Site integration

Moody 26 preserves the region model used by the Moody site fleet:

| Area | Regions |
| --- | --- |
| Header | `header_primary`, `header_secondary`, `header_tertiary`, `site_announcement`, `primary_menu` |
| Main content | `breadcrumb`, `highlighted`, `help`, `content`, `sidebar_first`, `sidebar_second` |
| Footer | `footer_left`, `footer_middle`, `footer_right` |
| System | `page_top`, `page_bottom`, `hidden` |

After activation, confirm that the branding, site search, primary menu, Give
link, footer menus, contact information, and required policy links are placed
in the expected regions. Existing Moody fleet configuration can normally be
reused.

The quick-action dialog discovers destinations from the rendered header. Do
not maintain a separate action list. Changes to the primary menu, home link,
Give link, or search form are reflected after Drupal's normal cache rebuild.

## Accessibility and University brand

Moody 26 is designed and tested toward WCAG 2.1 Level AA and the requirements
referenced by UT Austin's digital accessibility policy. This is a development
baseline, not a claim of certification. Every production site still needs
content review, keyboard and assistive-technology testing, and institutional
accessibility review.

Key requirements include:

- Preserve the approved University and Moody marks without redrawing,
  stretching, or typesetting replacements.
- Use official burnt orange exactly as `#bf5700` or its exact color-space
  equivalent; do not create burnt-orange tints.
- Preserve the approved Charis SIL serif and Libre Franklin sans-serif roles.
- Keep keyboard focus visible and immediate, with 44-by-44 CSS-pixel minimum
  targets for touch controls.
- Support keyboard navigation, 200% zoom, reflow, reduced motion, useful
  accessible names, and non-color state cues.
- Provide accurate alternative text, captions, transcripts, and audio
  descriptions when the content requires them.
- Keep the required UT Austin Home, Emergency Information, Site Policies,
  Digital Accessibility Policy, and Web Privacy Policy destinations in the
  footer, with a dynamic copyright year.

Authoritative references:

- [UT Austin website guidelines](https://umac.utexas.edu/brand-center/visual-identity/website-guidelines/)
- [Digital Accessibility Policy and Procedures](https://compliance.utexas.edu/programs/iaa/digital-accessibility/digital-accessibility-policy-and-procedures)
- [University and CSU wordmarks](https://umac.utexas.edu/brand-center/university-csu-wordmarks/)
- [University colors](https://umac.utexas.edu/brand-center/colors/)
- [University typography](https://umac.utexas.edu/brand-center/typography/)

## Development

Moody 26 has no asset compilation step or runtime JavaScript dependencies.
CSS and Drupal behaviors are committed as source. The structural verifier uses
only Node.js built-ins:

```sh
npm run check
```

The current verifier is an integration gate. Run it while the theme is located
at `web/themes/custom/moody26` in a Moody Core checkout because it also checks
the host project's compliance guide and Playwright coverage.

For local runtime validation:

```sh
ddev drush theme:enable moody26 -y
ddev drush cache:rebuild
```

From the Moody Core project root, run the functional and visual suite:

```sh
BASE_URL=https://moody-core.ddev.site:33001 npm run test:moody26
```

Run the cross-browser release gate with:

```sh
BROWSER_MATRIX=1 BASE_URL=https://moody-core.ddev.site:33001 npx playwright test tests/moody26.spec.js
```

Before a release, manually review at 320, 375, 414, and 768 CSS pixels; tab
through navigation and forms; test 200% zoom and reflow; inspect landmarks and
heading order; and verify reduced-motion behavior.

## Project structure

| Path | Purpose |
| --- | --- |
| `tokens.css` | Brand, typography, spacing, motion, focus, target, and layout tokens |
| `css/moody26.css` | Global progressive overrides for Moody and UT Drupal Kit markup |
| `css/components/` | Landing, editorial, discovery, and quick-action components |
| `js/accessibility.js` | Accessibility metadata repairs for inherited components |
| `js/navigation.js` | Navigation semantics, focus behavior, and responsive state bridge |
| `js/quick-actions.js` | Dependency-free native dialog and command discovery |
| `templates/menus/` | Semantic Drupal primary-menu template override |
| `scripts/verify.mjs` | Structural, brand, accessibility, and integration guardrails |
| `AGENTS.md` | Maintainer-facing design and compliance contract |

## Customization

- Add reusable design values to `tokens.css`; component styles should consume
  named tokens rather than introduce raw colors or font families.
- Keep theme code portable. Site-specific configuration and behavior belong in
  the consuming Drupal project, not this repository.
- Prefer native HTML, CSS, Drupal behaviors, and inherited UT Drupal Kit
  capabilities over new frameworks or dependencies.
- Preserve editor usability in Layout Builder and CKEditor when changing the
  front-end presentation.
- Treat accessibility and UT brand requirements as release gates, not optional
  polish.

## Contributing

Issues and pull requests are welcome. Keep each change focused and include:

1. A concise description of the user-facing problem and solution.
2. Applicable verifier and Playwright results.
3. Before-and-after screenshots for visual changes at desktop and mobile sizes.
4. Notes from keyboard, focus, reflow, and reduced-motion checks when an
   interaction changes.

Do not commit credentials, database exports, uploaded files, generated test
artifacts, or site-specific content.

## License and trademarks

The source code is licensed under
[GPL-2.0-or-later](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html), as
declared in `composer.json`.

The code license does not grant permission to use University of Texas at Austin
or Moody College names, wordmarks, logos, or other trademarks. Their use remains
subject to University policies and approval.
