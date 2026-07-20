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
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-hero-image', '.moody26-hero__media-inner img', context).forEach((image) => {
        const hideFailedMedia = () => {
          image.closest('.moody26-hero__media')?.setAttribute('hidden', '');
          image.closest('.moody26-hero')?.classList.add('moody26-hero--media-unavailable');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-showcase-image', '.showcase img', context).forEach((image) => {
        const hideFailedMedia = () => {
          image.closest('.showcase__media')?.setAttribute('hidden', '');
          image.closest('.showcase')?.classList.add('showcase--media-unavailable');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once(
        'moody26-resource-image',
        '.focus-areas-item img, .utexas-promo-unit img',
        context,
      ).forEach((image) => {
        const hideFailedMedia = () => {
          image.closest('.image-wrapper')?.setAttribute('hidden', '');
          image.closest('.focus-areas-item, .utexas-promo-unit')
            ?.classList.add('resource-media--unavailable');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-featured-highlight-image', '.featured-highlight__media img', context).forEach((image) => {
        const hideFailedMedia = () => {
          image.closest('.featured-highlight__media')?.setAttribute('hidden', '');
          image.closest('.featured-highlight')?.classList.add('featured-highlight--media-unavailable');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-promo-list-image', '.promo-list__media img', context).forEach((image) => {
        const hideFailedMedia = () => {
          image.closest('.promo-list__media')?.setAttribute('hidden', '');
          image.closest('.promo-list__item')?.classList.add('promo-list__item--media-unavailable');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-flex-content-image', '.flex-content__media img', context).forEach((image) => {
        const hideFailedMedia = () => {
          image.closest('.flex-content__media')?.setAttribute('hidden', '');
          image.closest('.flex-content')?.classList.add('flex-content--media-unavailable');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-quotation-image', '.moody-quotation__media img', context).forEach((image) => {
        const hideFailedMedia = () => {
          const quotation = image.closest('.moody-quotation');
          const media = image.closest('.moody-quotation__media');
          if (!quotation || !media || quotation.classList.contains('moody-quotation--media-unavailable')) {
            return;
          }
          media.hidden = true;
          quotation.classList.add('moody-quotation--media-unavailable');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-flex-grid-image', '.flex-grid__media img', context).forEach((image) => {
        const hideFailedMedia = () => {
          const article = image.closest('.flex-grid__article');
          const media = image.closest('.flex-grid__media');
          if (!article || !media || article.classList.contains('flex-grid__article--media-unavailable')) {
            return;
          }
          media.hidden = true;
          article.classList.add('flex-grid__article--media-unavailable');
        };
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-image-link-image', '.image-link__media img', context).forEach((image) => {
        const media = image.closest('.image-link__media');
        const target = image.closest('.image-link__target');
        const authoredLabel = target?.dataset.imageLinkLabel?.trim() ?? '';
        const imageLabel = image.alt.trim();
        const label = authoredLabel && !/^https?:\/\//i.test(authoredLabel)
          ? authoredLabel
          : imageLabel || authoredLabel;

        if (target && label) {
          queueMicrotask(() => {
            const destination = new URL(target.href, window.location.href);
            const qualifiers = [];
            const isExternalWebDestination = ['http:', 'https:'].includes(destination.protocol)
              && destination.origin !== window.location.origin;
            if (isExternalWebDestination) {
              qualifiers.push(Drupal.t('external link'));
            }
            else {
              target.classList.remove('ut-cta-link--external');
            }
            if (target.target === '_blank' || target.target === 'new') {
              qualifiers.push(Drupal.t('opens in new window'));
            }
            target.setAttribute('aria-label', [label, ...qualifiers].join('; '));
          });
        }

        const showFailedMediaLink = () => {
          if (!media || media.classList.contains('image-link__media--unavailable')) {
            return;
          }

          if (!target || !label) {
            if (!target) {
              media.hidden = true;
            }
            return;
          }

          const fallback = document.createElement('span');
          fallback.className = 'image-link__fallback';
          fallback.textContent = imageLabel || label;
          (image.closest('picture') ?? image).hidden = true;
          target.append(fallback);
          media.classList.add('image-link__media--unavailable');
        };

        image.addEventListener('error', showFailedMediaLink, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          showFailedMediaLink();
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
        if (image.complete && image.currentSrc && !image.naturalWidth) {
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
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedPortrait();
        }
      });
    },
  };
})(Drupal, once);
