/**
 * @file
 * Repairs accessibility metadata omitted by inherited fleet components.
 */

(function (Drupal, drupalSettings, once) {
  'use strict';

  Drupal.behaviors.moody26Accessibility = {
    attach(context) {
      once('moody26-decorative-fallback', '#fallback-image', context).forEach((image) => {
        image.setAttribute('alt', '');
        image.setAttribute('loading', 'eager');
        image.setAttribute('fetchpriority', 'high');

        const setDimensions = () => {
          if (image.naturalWidth && image.naturalHeight) {
            image.setAttribute('width', image.naturalWidth);
            image.setAttribute('height', image.naturalHeight);
          }
        };

        image.addEventListener('load', setDimensions, { once: true });
        if (!image.getAttribute('src') && drupalSettings.ambientVideo?.ambientVideoFallback) {
          image.setAttribute('src', drupalSettings.ambientVideo.ambientVideoFallback);
        }
        if (image.complete) {
          setDimensions();
        }
      });

      once('moody26-scroll-cue', '#scroll-hint', context).forEach((control) => {
        control.setAttribute('role', 'button');
        control.setAttribute('tabindex', '0');
        control.setAttribute('aria-label', 'Scroll to page content');
        const icon = control.querySelector('svg');
        icon?.removeAttribute('tabindex');
        icon?.setAttribute('aria-hidden', 'true');
        icon?.setAttribute('focusable', 'false');
        control.addEventListener('keydown', (event) => {
          if (['Enter', ' '].includes(event.key)) {
            event.preventDefault();
            control.click();
          }
        });
      });

      once('moody26-video-control', '#play-pause', context).forEach((control) => {
        const video = document.querySelector('#moody-video');
        const syncLabel = () => {
          control.setAttribute('aria-label', video?.paused ? 'Play background video' : 'Pause background video');
          control.querySelector('svg')?.setAttribute('aria-hidden', 'true');
        };
        syncLabel();
        control.addEventListener('click', () => window.setTimeout(syncLabel, 0));
      });

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

        const populatedRegions = regions.filter((region) => !region.hidden);
        if (populatedRegions.length === 1) {
          layout.classList.add('moody26-single-region');
        }
      });

      once('moody26-news-image', '.latest-news-block-image-field img', context).forEach((image) => {
        const hideFailedMedia = () => {
          image.closest('.latest-news-block-image-field')?.setAttribute('hidden', '');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && !image.naturalWidth) {
          hideFailedMedia();
        }
      });
    },
  };
})(Drupal, drupalSettings, once);
