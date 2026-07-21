/**
 * @file
 * Progressive content safeguards for Drupal-rendered editorial components.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.moody26ContentSafeguards = {
    attach(context) {
      once('moody26-section-edge', '.section-wrapper', context).forEach((section) => {
        if (section.querySelector([
          '.block-bundle-moody-hero',
          '.block-bundle-utexas-hero',
          '.moody-ambient-video',
        ].join(','))) {
          section.classList.add('moody26-section--hero');
        }
        if (section.querySelector('.block-bundle-moody-contact-info')) {
          section.classList.add('moody26-section--contact-info');
        }
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

        if (regions.filter((region) => !region.hidden).length === 1) {
          layout.classList.add('moody26-single-region');
        }
      });

      once('moody26-image-gallery-caption', '[data-gallery-caption]', context).forEach((caption) => {
        caption.setAttribute('role', 'status');
        caption.setAttribute('aria-live', 'polite');
        caption.setAttribute('aria-atomic', 'true');
      });

      once('moody26-image-gallery-trigger', '[data-gallery-trigger]', context).forEach((trigger) => {
        trigger.addEventListener('click', () => trigger.focus({ preventScroll: true }), {
          capture: true,
        });
      });

      once(
        'moody26-image-gallery-thumbnail',
        '.moody-image-gallery__tile .moody-image-gallery__image',
        context,
      ).forEach((image) => {
        const markUnavailable = () => {
          const tile = image.closest('.moody-image-gallery__tile');
          const media = image.closest('.moody-image-gallery__image-wrap');
          if (!tile || !media || tile.classList.contains('is-error')) {
            return;
          }

          const description = image.getAttribute('alt')?.trim();
          const unavailable = description
            ? Drupal.t('Image unavailable: @description', { '@description': description })
            : Drupal.t('Image unavailable');
          const status = document.createElement('span');
          status.className = 'moody-image-gallery__unavailable';
          status.textContent = Drupal.t('Image unavailable');
          image.hidden = true;
          tile.classList.add('is-error');
          tile.disabled = true;
          tile.setAttribute('aria-label', unavailable);
          media.append(status);
        };

        image.addEventListener('error', markUnavailable, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          markUnavailable();
        }
      });

      once('moody26-image-gallery-modal-image', '[data-gallery-image]', context).forEach((image) => {
        const figure = image.closest('.moody-image-gallery__figure');
        const caption = figure?.querySelector('[data-gallery-caption]');
        if (!figure || !caption) {
          return;
        }

        image.addEventListener('load', () => {
          image.hidden = false;
          figure.classList.remove('is-error');
        });
        image.addEventListener('error', () => {
          const description = caption.textContent.trim() || image.getAttribute('alt')?.trim();
          image.hidden = true;
          figure.classList.add('is-error');
          caption.textContent = description
            ? Drupal.t('Image unavailable. @description', { '@description': description })
            : Drupal.t('Image unavailable.');
        });
      });

      once('moody26-focal-point-image', '.moody26-focal-point__overview-image', context).forEach((image) => {
        const showUnavailableMedia = () => {
          const component = image.closest('.moody26-focal-point');
          const media = image.closest('.moody26-focal-point__overview-media');
          if (!component || !media || component.classList.contains('is-error')) {
            return;
          }

          const description = image.alt.trim();
          const status = document.createElement('p');
          status.className = 'moody26-focal-point__status';
          status.setAttribute('role', 'status');
          status.textContent = description
            ? Drupal.t('Media unavailable: @description', { '@description': description })
            : Drupal.t('Media unavailable');

          component.querySelectorAll([
            '.moody26-focal-point__overview-image',
            '.moody26-focal-point__detail-media',
            '.moody26-focal-point__markers',
          ].join(', ')).forEach((element) => {
            element.hidden = true;
          });
          component.classList.remove('is-loading');
          component.classList.add('is-error');
          component.removeAttribute('aria-busy');
          media.append(status);
        };

        image.addEventListener('error', showUnavailableMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          showUnavailableMedia();
        }
      });

      once('moody26-people-grid-image', '.moody26-people-grid__image', context).forEach((image) => {
        const showUnavailableImage = () => {
          const item = image.closest('.moody26-people-grid__item');
          const media = image.closest('.moody26-people-grid__media');
          const content = item?.querySelector('.moody26-people-grid__content');
          if (!item || !media || !content || item.classList.contains('is-error')) {
            return;
          }

          const description = image.alt.trim();
          const status = document.createElement('p');
          status.className = 'moody26-people-grid__status';
          status.setAttribute('role', 'status');
          status.textContent = description
            ? Drupal.t('Image unavailable: @description', { '@description': description })
            : Drupal.t('Image unavailable');

          media.hidden = true;
          item.classList.add('is-error');
          content.prepend(status);
        };

        image.addEventListener('error', showUnavailableImage, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          showUnavailableImage();
        }
      });

      once('moody26-pair-grid-image', '.moody26-pair-grid__image', context).forEach((image) => {
        const showUnavailableImage = () => {
          const side = image.closest('.moody26-pair-grid__side');
          const media = image.closest('.moody26-pair-grid__media');
          const content = side?.querySelector('.moody26-pair-grid__content');
          if (!side || !media || !content || side.classList.contains('is-error')) {
            return;
          }

          const description = image.alt.trim();
          const status = document.createElement('p');
          status.className = 'moody26-pair-grid__status';
          status.setAttribute('role', 'status');
          status.textContent = description
            ? Drupal.t('Image unavailable: @description', { '@description': description })
            : Drupal.t('Image unavailable');

          media.hidden = true;
          side.classList.add('is-error');
          content.prepend(status);
        };

        image.addEventListener('error', showUnavailableImage, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          showUnavailableImage();
        }
      });

      once(
        'moody26-basic-new-window',
        '.block-bundle-basic .ut-copy a[target="_blank"]',
        context,
      ).forEach((link) => {
        link.relList.add('noopener');

        const qualifier = Drupal.t('Opens in new window.');
        const qualifierStem = qualifier.replace(/[.!?]+$/u, '').toLocaleLowerCase();
        const describedBy = (link.getAttribute('aria-describedby') ?? '')
          .split(/\s+/u)
          .filter(Boolean);
        const describedText = describedBy
          .map((id) => document.getElementById(id)?.textContent ?? '')
          .join(' ');
        const accessibilityText = [
          link.textContent,
          link.getAttribute('aria-label'),
          link.getAttribute('title'),
          describedText,
        ]
          .filter(Boolean)
          .join(' ')
          .toLocaleLowerCase();
        if (accessibilityText.includes(qualifierStem)) {
          return;
        }

        const descriptionId = 'moody26-new-window-description';
        let description = document.getElementById(descriptionId);
        if (!description) {
          description = document.createElement('span');
          description.id = descriptionId;
          description.className = 'visually-hidden';
          description.textContent = qualifier;
          document.body.append(description);
        }
        if (!describedBy.includes(descriptionId)) {
          describedBy.push(descriptionId);
          link.setAttribute('aria-describedby', describedBy.join(' '));
        }
      });

      once('moody26-news-image', '.latest-news-block-image-field img', context).forEach((image) => {
        const hideFailedMedia = () => image.closest('.latest-news-block-image-field')?.setAttribute('hidden', '');
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      const hideFailedHeroMedia = (media) => {
        media.closest('.moody26-hero__media')?.setAttribute('hidden', '');
        media.closest('.moody26-hero')?.classList.add('moody26-hero--media-unavailable');
      };

      once('moody26-hero-image', '.moody26-hero__media-inner img', context).forEach((image) => {
        const hideFailedMedia = () => hideFailedHeroMedia(image);
        image.addEventListener('error', hideFailedMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedMedia();
        }
      });

      once('moody26-hero-background', '.moody26-hero__background', context).forEach((background) => {
        const source = getComputedStyle(background).backgroundImage
          .match(/url\(["']?(.*?)["']?\)/u)?.[1];
        if (!source) {
          return;
        }

        const probe = new Image();
        const hideFailedMedia = () => hideFailedHeroMedia(background);
        probe.addEventListener('error', hideFailedMedia, { once: true });
        probe.src = source;
        if (probe.complete && !probe.naturalWidth) {
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
        '.focus-areas-item img, .utexas-promo-unit img, .resource-group__media img',
        context,
      ).forEach((image) => {
        const hideFailedMedia = () => {
          image.closest('.image-wrapper')?.setAttribute('hidden', '');
          image.closest('.focus-areas-item, .utexas-promo-unit, .resource-group__item')
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

      once('moody26-photo-content-image', '.photo-content__media img', context).forEach((image) => {
        const hideFailedMedia = () => {
          const component = image.closest('.photo-content');
          const media = image.closest('.photo-content__media');
          if (!component || !media || component.classList.contains('photo-content--media-unavailable')) {
            return;
          }
          media.hidden = true;
          if (component.querySelector('.photo-content__content')) {
            component.classList.add('photo-content--media-unavailable');
          }
          else {
            component.hidden = true;
          }
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

      once('moody26-event-list-image', '.moody-events-v2__media img', context).forEach((image) => {
        const hideFailedMedia = () => {
          const item = image.closest('.moody-events-v2__item');
          const media = image.closest('.moody-events-v2__media');
          if (!item || !media || item.classList.contains('moody-events-v2__item--media-unavailable')) {
            return;
          }
          media.hidden = true;
          item.classList.add('moody-events-v2__item--media-unavailable');
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

      once('moody26-scroll-media-image', '.moody26-scroll-media__media img', context).forEach((image) => {
        const showUnavailableMedia = () => {
          const item = image.closest('.moody26-scroll-media__item');
          const media = image.closest('.moody26-scroll-media__media-inner');
          if (!item || !media || item.classList.contains('is-error')) {
            return;
          }

          const description = image.alt.trim();
          const status = document.createElement('p');
          status.className = 'moody26-scroll-media__status';
          status.setAttribute('role', 'status');
          status.textContent = description
            ? Drupal.t('Media unavailable: @description', { '@description': description })
            : Drupal.t('Media unavailable');
          (image.closest('picture') ?? image).hidden = true;
          item.classList.add('is-error');
          media.append(status);
        };

        image.addEventListener('error', showUnavailableMedia, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          showUnavailableMedia();
        }
      });

      once('moody26-scroll-media-video', '.moody26-scroll-media__media video', context).forEach((video) => {
        const showUnavailableMedia = () => {
          const item = video.closest('.moody26-scroll-media__item');
          const media = video.closest('.moody26-scroll-media__media-inner');
          if (!item || !media || item.classList.contains('is-error')) {
            return;
          }

          const status = document.createElement('p');
          status.className = 'moody26-scroll-media__status';
          status.setAttribute('role', 'status');
          status.textContent = Drupal.t('Video unavailable');
          video.hidden = true;
          item.classList.add('is-error');
          media.append(status);
        };

        video.removeAttribute('autoplay');
        video.removeAttribute('loop');
        video.autoplay = false;
        video.loop = false;
        video.controls = true;
        video.pause();
        video.addEventListener('error', showUnavailableMedia, { once: true });
      });

      once('moody26-ambient-video', '.moody-ambient-video', context).forEach((hero) => {
        const video = hero.querySelector('video');
        const control = hero.querySelector('#play-pause');
        if (!video || !control) {
          return;
        }

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let mediaAvailable = true;

        const syncControl = () => {
          const label = video.paused
            ? Drupal.t('Play background video')
            : Drupal.t('Pause background video');
          control.setAttribute('aria-label', label);
          if (video.id) {
            control.setAttribute('aria-controls', video.id);
          }
          control.querySelectorAll('svg').forEach((icon) => {
            icon.setAttribute('aria-hidden', 'true');
            icon.setAttribute('focusable', 'false');
          });
        };

        const showFallback = () => {
          if (!mediaAvailable) {
            return;
          }
          mediaAvailable = false;
          video.removeAttribute('autoplay');
          video.autoplay = false;
          video.pause();
          control.disabled = true;
          control.hidden = true;
          hero.classList.add('moody26-ambient-video--fallback');
          syncControl();
        };

        const applyMotionPreference = () => {
          if (reducedMotion.matches) {
            video.removeAttribute('autoplay');
            video.autoplay = false;
            video.pause();
          }
          control.hidden = reducedMotion.matches || !mediaAvailable;
          syncControl();
        };

        video.addEventListener('play', syncControl);
        video.addEventListener('pause', syncControl);
        video.addEventListener('ended', syncControl);
        control.addEventListener('click', () => window.setTimeout(syncControl, 0));
        hero.addEventListener('error', (event) => {
          if (event.target instanceof Element && event.target.matches('video, video source')) {
            showFallback();
          }
        }, true);
        reducedMotion.addEventListener('change', applyMotionPreference);
        applyMotionPreference();
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

      once('moody26-profile-listing-image', '.profile-listing .utprof__list-img img', context).forEach((image) => {
        const hideFailedPortrait = () => {
          const item = image.closest('.utprof__profile-item');
          const media = image.closest('.utprof__list-img');
          if (!item || !media || item.classList.contains('utprof__profile-item--media-unavailable')) {
            return;
          }
          media.hidden = true;
          item.classList.add('utprof__profile-item--media-unavailable');
        };
        image.addEventListener('error', hideFailedPortrait, { once: true });
        if (image.complete && image.currentSrc && !image.naturalWidth) {
          hideFailedPortrait();
        }
      });

      once('moody26-flex-tabs', '[data-flex-tabs]', context).forEach((component) => {
        const tabList = component.querySelector(':scope > .flex-tabs__index > [data-flex-tab-list]');
        const panelGroup = component.querySelector(':scope > .flex-tabs__panels');
        const tabs = tabList
          ? [...tabList.querySelectorAll(':scope > li > [data-flex-tab]')]
          : [];
        const panels = panelGroup
          ? [...panelGroup.querySelectorAll(':scope > [data-flex-tab-panel]')]
          : [];
        if (!tabList || !tabs.length || tabs.length !== panels.length) {
          return;
        }

        const revealTab = (index) => {
          const listBox = tabList.getBoundingClientRect();
          const tabBox = tabs[index].getBoundingClientRect();
          if (tabBox.left < listBox.left) {
            tabList.scrollLeft -= listBox.left - tabBox.left;
          }
          else if (tabBox.right > listBox.right) {
            tabList.scrollLeft += tabBox.right - listBox.right;
          }
        };

        const activate = (activeIndex, moveFocus = false) => {
          tabs.forEach((tab, index) => {
            const selected = index === activeIndex;
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
            tab.toggleAttribute('data-flex-tab-active', selected);
            panels[index].hidden = !selected;
          });

          if (moveFocus) {
            tabs[activeIndex].focus({ preventScroll: true });
          }
          revealTab(activeIndex);
        };

        tabList.setAttribute('role', 'tablist');
        tabList.setAttribute('aria-orientation', 'horizontal');
        tabList.querySelectorAll(':scope > li').forEach((item) => item.setAttribute('role', 'presentation'));
        tabs.forEach((tab, index) => {
          tab.setAttribute('role', 'tab');
          tab.setAttribute('aria-controls', panels[index].id);
          panels[index].setAttribute('role', 'tabpanel');
          panels[index].setAttribute('aria-labelledby', tab.id);
          panels[index].tabIndex = 0;

          tab.addEventListener('click', (event) => {
            event.preventDefault();
            activate(index);
          });
        });

        tabList.addEventListener('keydown', (event) => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
          }

          const currentIndex = tabs.indexOf(document.activeElement);
          if (currentIndex < 0) {
            return;
          }

          const isRtl = getComputedStyle(tabList).direction === 'rtl';
          let nextIndex = currentIndex;
          if (event.key === 'Home') {
            nextIndex = 0;
          }
          else if (event.key === 'End') {
            nextIndex = tabs.length - 1;
          }
          else if (event.key === 'ArrowLeft') {
            nextIndex = (currentIndex + (isRtl ? 1 : -1) + tabs.length) % tabs.length;
          }
          else if (event.key === 'ArrowRight') {
            nextIndex = (currentIndex + (isRtl ? -1 : 1) + tabs.length) % tabs.length;
          }
          else {
            return;
          }

          event.preventDefault();
          activate(nextIndex, true);
        });

        const hashIndex = panels.findIndex((panel) => `#${panel.id}` === window.location.hash);
        const authoredIndex = tabs.findIndex((tab) => tab.hasAttribute('data-flex-tab-active'));
        component.classList.add('flex-tabs--enhanced');
        activate(hashIndex >= 0 ? hashIndex : Math.max(0, authoredIndex));
      });

      once('moody26-hero-carousel', '[data-hero-carousel]', context).forEach((carousel) => {
        const slides = [...carousel.querySelectorAll('[data-hero-carousel-slide]')];
        const controls = carousel.querySelector('[data-hero-carousel-controls]');
        const previous = controls?.querySelector('[data-hero-carousel-previous]');
        const next = controls?.querySelector('[data-hero-carousel-next]');
        const toggle = controls?.querySelector('[data-hero-carousel-toggle]');
        const toggleLabel = toggle?.querySelector('[data-hero-carousel-toggle-label]');
        const status = controls?.querySelector('[data-hero-carousel-status]');
        if (slides.length < 2 || !controls || !previous || !next || !toggle || !toggleLabel || !status) {
          return;
        }

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const authoredAutoplay = carousel.dataset.heroCarouselAutoplay === 'true';
        const parsedInterval = Number.parseInt(carousel.dataset.heroCarouselInterval ?? '', 10);
        const interval = Number.isFinite(parsedInterval)
          ? Math.max(1000, Math.min(10000, parsedInterval))
          : 5000;
        let activeIndex = 0;
        let timer = 0;
        let pointerInside = false;
        let focusInside = false;
        let togglePointerDown = false;
        let userOverrodePlayback = false;
        let playRequested = authoredAutoplay && !reducedMotion.matches;

        const updateToggle = () => {
          toggleLabel.textContent = playRequested ? Drupal.t('Pause') : Drupal.t('Play');
        };

        const stopTimer = () => {
          window.clearTimeout(timer);
          timer = 0;
        };

        const canAdvance = () => (
          playRequested
          && !pointerInside
          && !focusInside
          && !document.hidden
        );

        const schedule = () => {
          stopTimer();
          if (!canAdvance()) {
            return;
          }
          timer = window.setTimeout(() => {
            activate(activeIndex + 1);
            schedule();
          }, interval);
        };

        const activate = (requestedIndex, announce = false) => {
          activeIndex = (requestedIndex + slides.length) % slides.length;
          slides.forEach((slide, index) => {
            const active = index === activeIndex;
            slide.toggleAttribute('data-hero-carousel-active', active);
            if (active) {
              slide.removeAttribute('aria-hidden');
            }
            else {
              slide.setAttribute('aria-hidden', 'true');
            }
            slide.inert = !active;
          });
          status.setAttribute('aria-live', announce ? 'polite' : 'off');
          status.textContent = Drupal.t('Slide @current of @total', {
            '@current': activeIndex + 1,
            '@total': slides.length,
          });
        };

        previous.addEventListener('click', () => {
          activate(activeIndex - 1, true);
          schedule();
        });
        next.addEventListener('click', () => {
          activate(activeIndex + 1, true);
          schedule();
        });
        toggle.addEventListener('pointerdown', () => {
          togglePointerDown = true;
        });
        toggle.addEventListener('pointerup', () => {
          togglePointerDown = false;
        });
        toggle.addEventListener('pointercancel', () => {
          togglePointerDown = false;
        });
        toggle.addEventListener('click', () => {
          userOverrodePlayback = true;
          playRequested = !playRequested;
          updateToggle();
          schedule();
        });

        carousel.addEventListener('pointerenter', () => {
          pointerInside = true;
          stopTimer();
        });
        carousel.addEventListener('pointerleave', () => {
          pointerInside = false;
          schedule();
        });
        carousel.addEventListener('focusin', (event) => {
          focusInside = true;
          stopTimer();
          if (event.target !== toggle || !togglePointerDown) {
            userOverrodePlayback = true;
            playRequested = false;
            updateToggle();
          }
        });
        carousel.addEventListener('focusout', (event) => {
          if (!carousel.contains(event.relatedTarget)) {
            focusInside = false;
            schedule();
          }
        });
        document.addEventListener('visibilitychange', schedule);
        reducedMotion.addEventListener('change', (event) => {
          if (event.matches) {
            playRequested = false;
          }
          else if (!userOverrodePlayback) {
            playRequested = authoredAutoplay;
          }
          updateToggle();
          schedule();
        });

        activate(0);
        updateToggle();
        carousel.classList.add('moody26-hero-carousel--enhanced');
        controls.hidden = false;
        schedule();
      });
    },
  };
})(Drupal, once);
