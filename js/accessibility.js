/**
 * @file
 * Progressive content safeguards for Drupal-rendered editorial components.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.moody26ContentSafeguards = {
    attach(context) {
      once('moody26-layout-region', '.utexas-layout--twocol-wrapper', context).forEach((layout) => {
        const regions = [...layout.querySelectorAll(':scope > .layout__region')];
        regions.forEach((region) => {
          const text = region.textContent.replace(/\u00a0/g, ' ').trim();
          const meaningfulElement = region.querySelector([
            'a', 'button', 'canvas', 'form', 'iframe', 'img', 'input',
            'picture', 'select', 'svg', 'textarea', 'video',
          ].join(','));
          if (!text && !meaningfulElement) {
            region.hidden = true;
          }
        });

        if (regions.filter((region) => !region.hidden).length === 1) {
          layout.classList.add('moody26-single-region');
        }
      });

      once('moody26-news-image', '.latest-news-block-image-field img', context).forEach((image) => {
        const hideFailedMedia = () => image.closest('.latest-news-block-image-field')?.setAttribute('hidden', '');
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-showcase-image', '.moody-showcase img', context).forEach((image) => {
        const hideFailedMedia = () => {
          image.closest('.showcase-image')?.setAttribute('hidden', '');
          image.closest('.moody-showcase')?.classList.add('moody-showcase--media-unavailable');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-ambient-fallback', 'img#fallback-image:not([alt])', context).forEach((image) => {
        const hideFailedPoster = () => image.setAttribute('hidden', '');
        image.alt = '';
        image.addEventListener('error', hideFailedPoster, { once: true });
        if (!image.getAttribute('src')) {
          const poster = image.closest('.homepage-hero__video')
            ?.querySelector('video[poster]')
            ?.getAttribute('poster');
          if (poster) {
            image.src = poster;
            image.fetchPriority = 'high';
          }
          else {
            hideFailedPoster();
          }
        }
        if (image.complete && !image.naturalWidth) {
          hideFailedPoster();
        }
      });

      once('moody26-scroll-hint', '#scroll-hint svg', context).forEach((icon) => {
        icon.removeAttribute('tabindex');
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('focusable', 'false');
      });

      once('moody26-people-directory', '.faculty-bio-view', context).forEach((directory) => {
        const viewBlock = directory.closest('.views-element-container');
        const switcherBlock = viewBlock?.previousElementSibling;
        const switcher = switcherBlock?.matches('.block-bundle-basic')
          ? switcherBlock.querySelector('.ut-copy p')
          : null;
        if (!switcher) {
          return;
        }

        switcher.setAttribute('role', 'navigation');
        switcher.setAttribute('aria-label', Drupal.t('Faculty directories'));
        const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
        switcher.querySelectorAll('a[href]').forEach((link) => {
          const destination = new URL(link.href, window.location.href);
          const destinationPath = destination.pathname.replace(/\/$/, '') || '/';
          if (destination.origin === window.location.origin && destinationPath === currentPath) {
            link.setAttribute('aria-current', 'page');
          }
          else {
            link.removeAttribute('aria-current');
          }
        });
      });

      once('moody26-person-image', '.people-directory__media img', context).forEach((image) => {
        const hideFailedPortrait = () => {
          image.setAttribute('hidden', '');
          image.closest('.people-directory__media')?.classList.add('people-directory__media--fallback');
        };
        image.addEventListener('error', hideFailedPortrait, { once: true });
        if (image.complete && !image.naturalWidth) {
          hideFailedPortrait();
        }
      });
    },
  };
})(Drupal, once);
