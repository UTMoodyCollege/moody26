/**
 * @file
 * Keeps inherited Moody navigation behavior semantically truthful.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.moody26Navigation = {
    attach(context) {
      once('moody26-navigation', '#moody-header', context).forEach((header) => {
        const menuButton = header.querySelector('#menu-icon');
        const navigation = header.querySelector('.nav-wrapper');
        const wideMenu = window.matchMedia('(min-width: 75rem)');
        const hoverMenu = window.matchMedia('(hover: hover) and (pointer: fine)');

        if (menuButton && navigation) {
          navigation.id = 'moody26-primary-navigation';
          menuButton.removeAttribute('href');
          menuButton.setAttribute('type', 'button');
          menuButton.setAttribute('aria-controls', navigation.id);
          menuButton.setAttribute('aria-expanded', 'false');
          menuButton.querySelector('svg')?.setAttribute('aria-hidden', 'true');
          menuButton.querySelector('svg')?.setAttribute('focusable', 'false');

          // The parent queues a load-time mobile reset. A fast user (or test)
          // can open the drawer before that reset runs, leaving the button in
          // its Close state while the sheet is collapsed. Preserve the most
          // recent user intent whenever that inherited reset lands late.
          let drawerTouched = false;
          let drawerOpen = false;
          const syncDrawerState = () => {
            navigation.classList.toggle('active', drawerOpen);
            menuButton.setAttribute('aria-expanded', String(drawerOpen));
            document.body.classList.toggle('overflow-hidden', drawerOpen);
          };

          menuButton.addEventListener('click', () => {
            queueMicrotask(() => {
              drawerTouched = true;
              drawerOpen = navigation.classList.contains('active');
              syncDrawerState();
            });
          });

          new MutationObserver(() => {
            if (drawerTouched && navigation.classList.contains('active') !== drawerOpen) {
              queueMicrotask(syncDrawerState);
            }
          }).observe(navigation, {
            attributeFilter: ['class'],
          });
        }

        const repairSearchInput = () => {
          const input = header.querySelector('.ut-search-form input[type="search"]');
          if (!input) {
            return;
          }

          const label = input.labels?.[0];
          input.removeAttribute('required');
          input.removeAttribute('aria-required');
          input.setAttribute('placeholder', Drupal.t('Search Moody'));
          label?.classList.remove('form-required', 'js-form-required');
          if (label) {
            label.textContent = Drupal.t('Search Moody College site');
          }

          window.jQuery?.(input).off('.moodySearchContrast');
          ['background', 'color', '-webkit-text-fill-color', 'caret-color'].forEach((property) => {
            input.style.removeProperty(property);
          });
        };

        repairSearchInput();
        queueMicrotask(repairSearchInput);

        const setSubmenuState = (trigger, isOpen) => {
          const item = trigger.closest('.main-menu__list-item');
          const panel = item?.querySelector(':scope > .sub-nav-wrapper');
          const list = panel?.querySelector('.main-menu__list--subnav');

          trigger.setAttribute('aria-expanded', String(isOpen));
          trigger.classList.toggle('open', isOpen);
          panel?.classList.toggle('open', isOpen);
          panel?.setAttribute('aria-hidden', String(!isOpen));
          panel?.setAttribute('aria-expanded', String(isOpen));
          list?.classList.toggle('open', isOpen);
        };

        const triggers = [...header.querySelectorAll('.moody-subnav-trigger')];
        const submenuIntent = new WeakMap();
        const commitSubmenuState = (trigger, isOpen) => {
          submenuIntent.set(trigger, isOpen);
          setSubmenuState(trigger, isOpen);
        };
        const closeSubmenus = (except = null) => {
          triggers.forEach((trigger) => {
            if (trigger !== except) {
              commitSubmenuState(trigger, false);
            }
          });
        };

        // The inherited mega-menu assumes every L1 trigger is an anchor. On
        // <nolink> menu items it otherwise promotes the first destination link
        // into a second, incorrect submenu control.
        const repairInheritedMetadata = () => {
          triggers.forEach((trigger) => {
            const panel = document.getElementById(trigger.getAttribute('aria-controls'));
            const falseTrigger = panel?.querySelector('.main-menu__link--subnav[role="button"]');

            if (falseTrigger?.getAttribute('aria-controls') === panel.id) {
              falseTrigger.removeAttribute('role');
              falseTrigger.removeAttribute('aria-controls');
              falseTrigger.removeAttribute('aria-expanded');
              falseTrigger.removeAttribute('tabindex');
            }

            panel?.setAttribute('aria-labelledby', trigger.id);
          });
        };

        repairInheritedMetadata();
        queueMicrotask(repairInheritedMetadata);

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            const openTrigger = triggers.find((candidate) => candidate.getAttribute('aria-expanded') === 'true');
            if (openTrigger) {
              event.preventDefault();
              event.stopImmediatePropagation();
              closeSubmenus();
              openTrigger.focus({ preventScroll: true });
              queueMicrotask(() => {
                closeSubmenus();
                openTrigger.focus({ preventScroll: true });
              });
            }
            return;
          }

        }, true);

        triggers.forEach((trigger) => {
          const item = trigger.closest('.main-menu__list-item');
          const panel = item?.querySelector(':scope > .sub-nav-wrapper');

          if (!panel) {
            return;
          }

          const syncState = () => {
            const intendedState = submenuIntent.get(trigger);
            const currentState = trigger.getAttribute('aria-expanded') === 'true';
            if (intendedState !== undefined && intendedState !== currentState) {
              queueMicrotask(() => setSubmenuState(trigger, intendedState));
            }

            const isOpen = trigger.getAttribute('aria-expanded') === 'true' || trigger.classList.contains('open') || trigger.classList.contains('focus');
            panel.setAttribute('aria-hidden', String(!isOpen));
            panel.setAttribute('aria-expanded', String(isOpen));
            panel.querySelector('.main-menu__list--subnav')?.classList.toggle('open', isOpen);
          };

          syncState();
          new MutationObserver(syncState).observe(trigger, {
            attributeFilter: ['aria-expanded', 'class'],
          });

          // Stop the parent's split-label handlers at the real target without
          // preventing the native button from receiving the pointer event.
          ['mousedown', 'touchstart'].forEach((eventName) => {
            trigger.addEventListener(eventName, (event) => {
              event.stopImmediatePropagation();
            }, true);
          });

          // Native buttons already translate Enter and Space to click. Own the
          // click in capture so Accessible Mega Menu and the parent's split-
          // link handlers cannot toggle the same state a second time.
          trigger.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            const previousIntent = submenuIntent.get(trigger);
            const isOpen = previousIntent === undefined ? true : !previousIntent;
            closeSubmenus(trigger);
            commitSubmenuState(trigger, isOpen);
          }, true);

          // The inherited keyboard layer cancels native activation in Firefox
          // and WebKit, leaving visual and ARIA state out of sync.
          trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
              event.preventDefault();
              event.stopImmediatePropagation();
              trigger.click();
            }
          }, true);

          item.addEventListener('focusout', () => {
            window.setTimeout(() => {
              if (!item.contains(document.activeElement)) {
                commitSubmenuState(trigger, false);
              }
            }, 0);
          });

          let closeTimer;
          item.addEventListener('pointerenter', () => {
            if (!wideMenu.matches || !hoverMenu.matches) {
              return;
            }

            window.clearTimeout(closeTimer);
            closeSubmenus(trigger);
            commitSubmenuState(trigger, true);
          });

          item.addEventListener('pointerleave', () => {
            if (wideMenu.matches && hoverMenu.matches) {
              closeTimer = window.setTimeout(() => commitSubmenuState(trigger, false), 250);
            }
          });

          panel.addEventListener('pointerenter', () => {
            if (!wideMenu.matches || !hoverMenu.matches) {
              return;
            }

            window.clearTimeout(closeTimer);
            closeSubmenus(trigger);
            commitSubmenuState(trigger, true);
          });
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
