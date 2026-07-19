# Moody 26

Moody 26 is the standalone Drupal theme for the University of Texas at
Austin’s Moody College of Communication site fleet. It pairs the University’s
visual identity with an accessible, editorial system that can serve academic,
research, film, journalism, advertising, alumni, event, and public-facing
sites without requiring the legacy Moody or Speedway themes.

> **Project status:** pre-release (`0.1.0`). The theme is being validated in
> [Moody Core](https://github.com/UTMoodyCollege/moody-core) before its first
> stable tag. Pin an exact commit when evaluating the `main` branch.

## Highlights

- A theme-owned University bar, Moody masthead, responsive navigation, page
  shell, and compliant footer.
- An approved Moody CSU mark and locally hosted Charis SIL and Libre Franklin
  web fonts—no third-party font request and no base-theme asset dependency.
- Keyboard- and touch-operable disclosure navigation with native document tab
  order, visible focus, Escape handling, and a mobile drawer that leaves the
  tab order when closed.
- A `Command+K` / `Control+K` quick-action dialog generated from the site’s
  rendered navigation, home link, search form, and Give link.
- Shared tokens for University colors, typography roles, spacing, type scale,
  focus, motion, target sizes, responsive containers, and elevation.
- Layout Builder-friendly landing heroes, editorial pairings, calls to action,
  forms, proof treatments, and discovery grids.
- Matching CKEditor 5 styles and a dependency-free structural verifier.

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

### Theme settings

`Appearance → Settings → Moody 26` exposes:

- **Give link:** leave empty to remove the header action.
- **Parent-unit label and URL:** optional for subsidiary sites. The link is
  displayed in the University bar at desktop sizes only.
- Drupal’s standard logo controls. The bundled approved Moody CSU SVG is used
  when the default logo is selected.

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

There is no asset compilation step and no runtime JavaScript dependency beyond
Drupal core. CSS, native JavaScript behaviors, Twig, and PHP are committed as
source. Run the self-contained package verifier from the theme root:

```sh
npm run check
```

In a Drupal host project, rebuild caches and exercise the installed theme:

```sh
vendor/bin/drush theme:enable moody26 -y
vendor/bin/drush cache:rebuild
```

Moody Core provides the current browser integration suite:

```sh
BASE_URL=https://moody-core.ddev.site:33001 npx playwright test tests/moody26.spec.js
BROWSER_MATRIX=1 BASE_URL=https://moody-core.ddev.site:33001 npx playwright test tests/moody26.spec.js
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
| `theme-settings.php` | Give and parent-unit settings |
| `tokens.css` | Brand, type, spacing, motion, focus, and layout tokens |
| `css/fonts.css` | Local approved digital font declarations |
| `css/moody26.css` | Global foundation, shell, navigation, forms, and footer |
| `css/components/` | Landing, editorial, discovery, and quick-action components |
| `js/navigation.js` | Drawer and disclosure navigation state |
| `js/quick-actions.js` | Native dialog and rendered-destination discovery |
| `js/accessibility.js` | Progressive safeguards for rendered content components |
| `templates/` | Theme-owned HTML, page, shell, block, and menu markup |
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

The code license does not grant permission to use University of Texas at Austin
or Moody College names, wordmarks, logos, or other trademarks. Their use
remains subject to University policies and approval.
