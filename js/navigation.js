/**
 * @file
 * Owns the Moody26 mobile drawer and disclosure navigation state.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.moody26Navigation = {
    attach(context) {
      once('moody26-navigation', '#moody26-header', context).forEach((header) => {
        const menuButton = header.querySelector('.moody26-menu-toggle');
        const navigation = header.querySelector('[data-moody26-drawer]');
        const wideMenu = window.matchMedia('(min-width: 75rem)');
        const hoverMenu = window.matchMedia('(hover: hover) and (pointer: fine)');
        const triggers = [...header.querySelectorAll('.moody26-menu__trigger')];

        const setSubmenuState = (trigger, isOpen) => {
          const panel = document.getElementById(trigger.getAttribute('aria-controls'));
          const isNewlyOpen = panel?.hidden && isOpen;
          trigger.setAttribute('aria-expanded', String(isOpen));
          if (panel) {
            panel.hidden = !isOpen;
            if (isNewlyOpen && !panel.hasAttribute('data-moody26-motion-seen')) {
              panel.setAttribute('data-moody26-motion-seen', '');
              panel.dispatchEvent(new CustomEvent('moody26:reveal', {
                bubbles: true,
                detail: { kind: 'submenu' },
              }));
            }
          }
        };

        const closeSubmenus = (except = null) => {
          triggers.forEach((trigger) => {
            if (trigger !== except) {
              setSubmenuState(trigger, false);
            }
          });
        };

        const setDrawerState = (isOpen) => {
          if (!menuButton || !navigation) {
            return;
          }
          menuButton.setAttribute('aria-expanded', String(isOpen));
          navigation.toggleAttribute('data-open', isOpen);
          navigation.setAttribute('aria-hidden', String(!isOpen && !wideMenu.matches));
          navigation.inert = !isOpen && !wideMenu.matches;
          document.body.classList.toggle('moody26-drawer-open', isOpen && !wideMenu.matches);
          menuButton.querySelector('.moody26-menu-toggle__label').textContent = isOpen
            ? Drupal.t('Close')
            : Drupal.t('Menu');
          if (!isOpen) {
            closeSubmenus();
          }
        };

        const syncViewport = () => {
          if (wideMenu.matches) {
            navigation?.removeAttribute('aria-hidden');
            if (navigation) {
              navigation.inert = false;
              navigation.removeAttribute('data-open');
            }
            menuButton?.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('moody26-drawer-open');
          }
          else {
            setDrawerState(menuButton?.getAttribute('aria-expanded') === 'true');
          }
        };

        menuButton?.addEventListener('click', () => {
          setDrawerState(menuButton.getAttribute('aria-expanded') !== 'true');
        });

        wideMenu.addEventListener('change', syncViewport);
        syncViewport();

        triggers.forEach((trigger) => {
          const item = trigger.closest('.moody26-menu__item');
          const panel = document.getElementById(trigger.getAttribute('aria-controls'));
          let closeTimer;

          if (!item || !panel) {
            return;
          }

          trigger.addEventListener('click', () => {
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';
            closeSubmenus(trigger);
            setSubmenuState(trigger, !isOpen);
          });

          trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Tab' && event.shiftKey) {
              const previousItem = item.previousElementSibling;
              const previousTrigger = previousItem?.querySelector(':scope > .moody26-menu__trigger');
              const previousPanel = previousTrigger
                ? document.getElementById(previousTrigger.getAttribute('aria-controls'))
                : null;
              const previousDestinations = previousPanel?.querySelectorAll('a[href]');
              const lastDestination = previousDestinations?.[previousDestinations.length - 1];
              if (!lastDestination) {
                return;
              }
              event.preventDefault();
              closeSubmenus(previousTrigger);
              setSubmenuState(previousTrigger, true);
              lastDestination.focus({ preventScroll: true });
              return;
            }

            if (event.key === 'Tab' && !event.shiftKey) {
              const firstDestination = panel.querySelector('a[href]');
              if (!firstDestination) {
                return;
              }
              event.preventDefault();
              closeSubmenus(trigger);
              setSubmenuState(trigger, true);
              firstDestination.focus({ preventScroll: true });
            }
          });

          panel.addEventListener('keydown', (event) => {
            const firstDestination = panel.querySelector('a[href]');
            if (event.key === 'Tab' && event.shiftKey && event.target === firstDestination) {
              event.preventDefault();
              trigger.focus({ preventScroll: true });
            }
          });

          item.addEventListener('focusout', (event) => {
            if (event.relatedTarget && item.contains(event.relatedTarget)) {
              return;
            }
            window.setTimeout(() => {
              if (!item.contains(document.activeElement)) {
                setSubmenuState(trigger, false);
              }
            }, 0);
          });

          item.addEventListener('pointerenter', () => {
            if (!wideMenu.matches || !hoverMenu.matches) {
              return;
            }
            window.clearTimeout(closeTimer);
            closeSubmenus(trigger);
            setSubmenuState(trigger, true);
          });

          item.addEventListener('pointerleave', () => {
            if (wideMenu.matches && hoverMenu.matches) {
              closeTimer = window.setTimeout(() => setSubmenuState(trigger, false), 180);
            }
          });
        });

        document.addEventListener('keydown', (event) => {
          if (event.key !== 'Escape') {
            return;
          }

          const openTrigger = triggers.find((trigger) => trigger.getAttribute('aria-expanded') === 'true');
          if (openTrigger) {
            event.preventDefault();
            closeSubmenus();
            openTrigger.focus({ preventScroll: true });
          }
          else if (menuButton?.getAttribute('aria-expanded') === 'true') {
            event.preventDefault();
            setDrawerState(false);
            menuButton.focus({ preventScroll: true });
          }
        });

        document.addEventListener('pointerdown', (event) => {
          if (!header.contains(event.target)) {
            closeSubmenus();
          }
        });
      });
    },
  };
})(Drupal, once);
