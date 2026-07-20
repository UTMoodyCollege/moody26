/**
 * @file
 * Adds optional, progressive motion without owning any functional state.
 */

import { waapi } from 'animejs/waapi';
import { stagger } from 'animejs/utils';

(function (Drupal, once) {
  'use strict';

  const scriptUrl = document.currentScript?.src;
  const gsapFallbackUrl = scriptUrl
    ? new URL('../vendor/gsap.min.js', scriptUrl).href
    : '';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = navigator.connection?.saveData === true;
  const gsapEnabled = document.documentElement.dataset.moody26MotionGsap === 'true';
  const animeEnabled = document.documentElement.dataset.moody26MotionAnime === 'true';
  const rootCleanups = new WeakMap();
  const disclosureAnimations = new Map();
  let gsapRequest;

  const motionAllowed = () => !reducedMotion.matches && !saveData;

  const numberToken = (name, fallback) => {
    const value = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!value) {
      return fallback;
    }
    if (value.endsWith('ms')) {
      return Number.parseFloat(value);
    }
    if (value.endsWith('s')) {
      return Number.parseFloat(value) * 1000;
    }
    if (value.endsWith('rem')) {
      return Number.parseFloat(value)
        * Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    }
    return Number.parseFloat(value) || fallback;
  };

  const motionTokens = () => ({
    distance: numberToken('--motion-distance', 12),
    durationMajor: numberToken('--dur-long', 420),
    durationMinor: numberToken('--dur-short', 220),
    easeOut: window.getComputedStyle(document.documentElement)
      .getPropertyValue('--ease-out').trim() || 'cubic-bezier(0.16, 1, 0.3, 1)',
    stagger: numberToken('--motion-stagger', 48),
    staggerTight: numberToken('--motion-stagger-tight', 28),
  });

  const markMode = (mode) => {
    document.documentElement.setAttribute('data-moody26-motion', mode);
  };

  const getGsap = () => {
    if (window.gsap) {
      return typeof window.gsap.matchMedia === 'function'
        ? Promise.resolve(window.gsap)
        : Promise.reject(new Error('The existing GSAP runtime is not compatible with Moody26.'));
    }
    if (!gsapFallbackUrl) {
      return Promise.reject(new Error('Moody26 could not resolve its GSAP fallback.'));
    }
    if (!gsapRequest) {
      gsapRequest = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = gsapFallbackUrl;
        script.async = true;
        script.dataset.moody26GsapFallback = '';
        script.addEventListener('load', () => {
          if (typeof window.gsap?.matchMedia !== 'function') {
            reject(new Error('GSAP did not expose its browser API.'));
            return;
          }
          resolve(window.gsap);
        }, { once: true });
        script.addEventListener('error', reject, { once: true });
        document.head.append(script);
      });
    }
    return gsapRequest;
  };

  const visible = (element) => element.getClientRects().length > 0
    && window.getComputedStyle(element).visibility !== 'hidden';

  const setupGsapMotion = (gsap, main) => {
    const tokens = motionTokens();
    const media = gsap.matchMedia();

    media.add({
      allowMotion: '(prefers-reduced-motion: no-preference)',
      wide: '(min-width: 40rem)',
    }, (motionContext) => {
      if (!motionContext.conditions.allowMotion || saveData) {
        markMode('reduced');
        return undefined;
      }

      markMode('full');
      const header = document.getElementById('moody26-header');
      const mastheadTargets = header
        ? [header.querySelector('.moody26-header__masthead')]
          .filter((element) => element && visible(element))
        : [];
      const navigationTargets = header
        ? [...header.querySelectorAll('.moody26-menu > .moody26-menu__item')].filter(visible)
        : [];

      if (mastheadTargets.length) {
        gsap.fromTo(
          mastheadTargets,
          { opacity: 0, y: Math.min(tokens.distance, 12) },
          {
            duration: tokens.durationMajor / 1000,
            ease: 'power3.out',
            opacity: 1,
            y: 0,
            onComplete: () => gsap.set(mastheadTargets, { clearProps: 'opacity,transform' }),
          },
        );
      }

      if (navigationTargets.length) {
        gsap.fromTo(
          navigationTargets,
          { opacity: 0, y: Math.min(tokens.distance, 12) },
          {
            duration: tokens.durationMinor / 1000,
            ease: 'power3.out',
            opacity: 1,
            stagger: tokens.stagger / 1000,
            y: 0,
            onComplete: () => gsap.set(navigationTargets, { clearProps: 'opacity,transform' }),
          },
        );
      }

      let observer;
      if (motionContext.conditions.wide) {
        const group = main.querySelector([
          '.utexas-promo-unit-items',
          '.block-moody-feature-page-feature-pages-editors-picks .row',
          '.moody-flip-things-image-grid-container .contents-row-max-w',
        ].join(','));
        const items = group ? [...group.children].filter(visible).slice(0, 8) : [];

        if (items.length > 1) {
          observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) {
              return;
            }
            observer.disconnect();
            gsap.fromTo(
              items,
              { opacity: 0, y: tokens.distance },
              {
                clearProps: 'opacity,transform',
                duration: tokens.durationMinor / 1000,
                ease: 'power3.out',
                opacity: 1,
                stagger: tokens.staggerTight / 1000,
                y: 0,
              },
            );
          }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
          observer.observe(group);
        }
      }

      return () => observer?.disconnect();
    }, main);

    return () => media.revert();
  };

  const clearDisclosureAnimations = () => {
    disclosureAnimations.forEach(({ items, timer }, animation) => {
      window.clearTimeout(timer);
      animation.revert();
      items.forEach((item) => item.removeAttribute('data-moody26-motion-item'));
    });
    disclosureAnimations.clear();
  };

  const finishDisclosure = (animation) => {
    const record = disclosureAnimations.get(animation);
    if (!record) {
      return;
    }
    window.clearTimeout(record.timer);
    try {
      animation.revert();
    }
    finally {
      record.items.forEach((item) => item.removeAttribute('data-moody26-motion-item'));
      disclosureAnimations.delete(animation);
    }
  };

  const animateDisclosure = (event) => {
    if (!animeEnabled || !motionAllowed() || !(event.target instanceof Element)) {
      return;
    }
    const selectors = event.detail?.kind === 'quick-actions'
      ? '[role="option"]'
      : '.moody26-submenu__link';
    const items = [...event.target.querySelectorAll(selectors)].filter(visible).slice(0, 8);
    if (!items.length) {
      return;
    }

    const tokens = motionTokens();
    items.forEach((item) => item.setAttribute('data-moody26-motion-item', ''));
    let animation;
    try {
      animation = waapi.animate(items, {
        delay: stagger(tokens.staggerTight),
        duration: tokens.durationMinor,
        ease: tokens.easeOut,
        opacity: [0, 1],
        transform: [`translateY(${Math.min(tokens.distance / 2, 6)}px)`, 'translateY(0px)'],
        onComplete: () => finishDisclosure(animation),
      });
    }
    catch {
      items.forEach((item) => item.removeAttribute('data-moody26-motion-item'));
      return;
    }
    const finalDelay = tokens.durationMinor + ((items.length - 1) * tokens.staggerTight) + 50;
    disclosureAnimations.set(animation, {
      items,
      timer: window.setTimeout(() => finishDisclosure(animation), finalDelay),
    });
  };

  Drupal.behaviors.moody26Motion = {
    attach(context) {
      once('moody26-motion-events', 'html', context).forEach(() => {
        if (animeEnabled) {
          document.addEventListener('moody26:reveal', animateDisclosure);
        }
      });

      once('moody26-motion-root', '.moody26-main', context).forEach((main) => {
        let activeCleanup = () => {};
        let generation = 0;
        let disposed = false;

        const start = () => {
          generation += 1;
          const currentGeneration = generation;
          activeCleanup();
          activeCleanup = () => {};

          if (!motionAllowed()) {
            clearDisclosureAnimations();
            markMode('reduced');
            return;
          }

          if (!gsapEnabled) {
            markMode('full');
            return;
          }

          getGsap()
            .then((gsap) => {
              if (disposed || generation !== currentGeneration || !motionAllowed()) {
                return;
              }
              activeCleanup = setupGsapMotion(gsap, main);
            })
            .catch(() => {
              if (!disposed && generation === currentGeneration) {
                markMode('unavailable');
              }
            });
        };

        reducedMotion.addEventListener('change', start);
        start();
        rootCleanups.set(main, () => {
          disposed = true;
          generation += 1;
          activeCleanup();
          clearDisclosureAnimations();
          reducedMotion.removeEventListener('change', start);
        });
      });
    },

    detach(context, settings, trigger) {
      if (trigger !== 'unload') {
        return;
      }
      once.remove('moody26-motion-root', '.moody26-main', context).forEach((main) => {
        rootCleanups.get(main)?.();
        rootCleanups.delete(main);
      });
    },
  };
})(Drupal, once);
