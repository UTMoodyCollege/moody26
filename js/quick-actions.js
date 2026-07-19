/**
 * @file
 * Adds a native, navigation-backed quick-action palette to the Moody26 header.
 */

(function (Drupal, once) {
  'use strict';

  const make = (tag, attributes = {}, text = '') => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  Drupal.behaviors.moody26QuickActions = {
    attach(context) {
      once('moody26-quick-actions', '#moody26-header', context).forEach((header) => {
        const actionBar = header.querySelector('.moody26-header__actions');
        const searchForm = header.querySelector('.moody26-header__search form');
        if (!actionBar) {
          return;
        }

        const dialogId = 'moody26-quick-actions';
        const inputId = `${dialogId}-input`;
        const listId = `${dialogId}-list`;
        const titleId = `${dialogId}-title`;
        const descriptionId = `${dialogId}-description`;
        const statusId = `${dialogId}-status`;
        const isMac = /Mac|iPhone|iPad/.test(navigator.userAgentData?.platform || navigator.platform);
        const shortcut = isMac ? '⌘ K' : Drupal.t('Ctrl K');
        const shortcutName = isMac ? Drupal.t('Command K') : Drupal.t('Control K');

        const trigger = make('button', {
          type: 'button',
          class: 'moody-quick-actions__trigger',
          'aria-controls': dialogId,
          'aria-expanded': 'false',
          'aria-haspopup': 'dialog',
          'aria-keyshortcuts': 'Meta+K Control+K',
          'aria-label': Drupal.t('Open quick actions, @shortcut', { '@shortcut': shortcutName }),
        });
        trigger.append(
          make('span', { class: 'moody-quick-actions__trigger-label' }, Drupal.t('Quick actions')),
          make('kbd', { 'aria-hidden': 'true' }, shortcut),
        );

        const dialog = make('dialog', {
          id: dialogId,
          class: 'moody-quick-actions',
          'aria-labelledby': titleId,
          'aria-describedby': descriptionId,
        });
        const headingGroup = make('div', { class: 'moody-quick-actions__heading-group' });
        headingGroup.append(
          make('h2', { id: titleId, class: 'moody-quick-actions__title' }, Drupal.t('Quick actions')),
          make('p', { id: descriptionId, class: 'moody-quick-actions__description' }, Drupal.t('Jump to a Moody destination or search the site.')),
        );
        const closeButton = make('button', {
          type: 'button',
          class: 'moody-quick-actions__button',
        }, Drupal.t('Close'));
        const dialogHeader = make('div', { class: 'moody-quick-actions__header' });
        dialogHeader.append(headingGroup, closeButton);

        const label = make('label', {
          for: inputId,
          id: `${inputId}-label`,
          class: 'moody-quick-actions__label',
        }, Drupal.t('Search actions'));
        const input = make('input', {
          id: inputId,
          class: 'moody-quick-actions__input',
          type: 'search',
          role: 'combobox',
          autocomplete: 'off',
          spellcheck: 'false',
          placeholder: Drupal.t('Try “undergraduate” or “events”'),
          'aria-autocomplete': 'list',
          'aria-controls': listId,
          'aria-expanded': 'true',
          'aria-labelledby': `${inputId}-label`,
        });
        const search = make('div', { class: 'moody-quick-actions__search' });
        search.append(label, input);

        const results = make('div', { class: 'moody-quick-actions__results' });
        const list = make('ul', {
          id: listId,
          class: 'moody-quick-actions__list',
          role: 'listbox',
          'aria-labelledby': `${inputId}-label`,
        });
        const status = make('p', {
          id: statusId,
          class: 'visually-hidden',
          'aria-live': 'polite',
          'aria-atomic': 'true',
        });
        results.append(list, status);

        const help = make('p', { class: 'moody-quick-actions__help' });
        for (const [keys, command] of [
          ['↑ ↓', Drupal.t('Move')],
          ['Enter', Drupal.t('Open')],
          ['Esc', Drupal.t('Close')],
        ]) {
          const instruction = make('span');
          instruction.append(make('kbd', {}, keys), document.createTextNode(command));
          help.append(instruction);
        }

        dialog.append(dialogHeader, search, results, help);
        actionBar.insertBefore(trigger, actionBar.querySelector('.moody26-give'));
        document.body.append(dialog);

        let actions = [];
        let visibleActions = [];
        let activeIndex = 0;
        let announceTimer;
        let hasAnimatedFirstOpen = false;

        const collectActions = () => {
          const collected = [];
          const hrefs = new Set();
          const add = (link, labelText, group, featured = false) => {
            if (!link?.href || !labelText) {
              return;
            }
            const href = new URL(link.href, window.location.href).href;
            if (hrefs.has(href)) {
              return;
            }
            hrefs.add(href);
            collected.push({ href, label: labelText.trim(), group, featured });
          };

          const home = header.querySelector('.region-header-primary a[href]');
          add(home, Drupal.t('Moody home'), Drupal.t('Home'), true);

          header.querySelectorAll('.moody26-menu > .moody26-menu__item').forEach((item) => {
            const group = item.querySelector(':scope > .moody26-menu__trigger .moody26-menu__label')?.textContent.trim()
              || Drupal.t('Navigate');
            item.querySelectorAll('.moody26-submenu__link[href], :scope > .moody26-menu__link[href]').forEach((link, index) => {
              add(link, link.textContent, group, index === 0);
            });
          });

          const give = actionBar.querySelector('.moody26-give[href]');
          add(give, give?.textContent, Drupal.t('Support Moody'), true);
          return collected;
        };

        const searchAction = (query) => {
          const field = searchForm?.querySelector('input[type="search"]');
          if (!field || !query) {
            return null;
          }
          const url = new URL(searchForm.action, window.location.href);
          url.searchParams.set(field.name || 'keys', query);
          return {
            href: url.href,
            label: Drupal.t('Search Moody for “@query”', { '@query': query }),
            group: Drupal.t('Site search'),
            featured: false,
          };
        };

        const setActive = (index) => {
          const options = [...list.querySelectorAll('[role="option"]')];
          if (!options.length) {
            input.removeAttribute('aria-activedescendant');
            return;
          }
          activeIndex = (index + options.length) % options.length;
          options.forEach((option, optionIndex) => {
            option.setAttribute('aria-selected', String(optionIndex === activeIndex));
          });
          input.setAttribute('aria-activedescendant', options[activeIndex].id);
          options[activeIndex].scrollIntoView({ block: 'nearest' });
        };

        const announce = (count, immediate = false) => {
          window.clearTimeout(announceTimer);
          announceTimer = window.setTimeout(() => {
            status.textContent = Drupal.formatPlural(count, '1 action available.', '@count actions available.');
          }, immediate ? 0 : 150);
        };

        const render = (rawQuery = '', immediateAnnouncement = false) => {
          const query = rawQuery.trim();
          const normalized = query.toLocaleLowerCase();
          const matches = normalized
            ? actions
              .filter((action) => `${action.label} ${action.group}`.toLocaleLowerCase().includes(normalized))
              .sort((a, b) => {
                const aStarts = a.label.toLocaleLowerCase().startsWith(normalized) ? 0 : 1;
                const bStarts = b.label.toLocaleLowerCase().startsWith(normalized) ? 0 : 1;
                return aStarts - bStarts || a.label.localeCompare(b.label);
              })
              .slice(0, 11)
            : actions.filter((action) => action.featured);
          visibleActions = [searchAction(query), ...matches].filter(Boolean);
          list.replaceChildren();

          if (!visibleActions.length) {
            const empty = make('li', { class: 'moody-quick-actions__empty' });
            empty.append(
              make('strong', {}, Drupal.t('No matching Moody links.')),
              make('span', {}, Drupal.t('Try a shorter phrase or clear the search field.')),
            );
            list.append(empty);
          }
          else {
            visibleActions.forEach((action, index) => {
              const option = make('li', {
                id: `${dialogId}-option-${index}`,
                class: 'moody-quick-actions__option',
                role: 'option',
                tabindex: '-1',
                'aria-selected': 'false',
              });
              option.append(
                make('span', { class: 'moody-quick-actions__option-label' }, action.label),
                make('span', { class: 'moody-quick-actions__option-context' }, action.group),
              );
              option.addEventListener('pointerdown', (event) => event.preventDefault());
              option.addEventListener('pointerenter', () => setActive(index));
              option.addEventListener('click', () => window.location.assign(action.href));
              list.append(option);
            });
            setActive(0);
          }
          announce(visibleActions.length, immediateAnnouncement);
        };

        const open = () => {
          if (dialog.open) {
            return;
          }
          header.querySelectorAll('.moody26-menu__trigger[aria-expanded="true"]').forEach((button) => button.click());
          const menuButton = header.querySelector('.moody26-menu-toggle[aria-expanded="true"]');
          menuButton?.click();
          actions = collectActions();
          input.value = '';
          render('', true);
          trigger.setAttribute('aria-expanded', 'true');
          dialog.showModal();
          input.focus({ preventScroll: true });
          if (!hasAnimatedFirstOpen) {
            hasAnimatedFirstOpen = true;
            list.dispatchEvent(new CustomEvent('moody26:reveal', {
              bubbles: true,
              detail: { kind: 'quick-actions' },
            }));
          }
        };

        const isEditing = (target) => target instanceof Element
          && Boolean(target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'));

        trigger.addEventListener('click', open);
        closeButton.addEventListener('click', () => dialog.close());
        dialog.addEventListener('close', () => {
          trigger.setAttribute('aria-expanded', 'false');
          window.clearTimeout(announceTimer);
          trigger.focus({ preventScroll: true });
        });
        dialog.addEventListener('pointerdown', (event) => {
          const box = dialog.getBoundingClientRect();
          const outside = event.clientX < box.left || event.clientX > box.right
            || event.clientY < box.top || event.clientY > box.bottom;
          if (event.target === dialog && outside) {
            dialog.close();
          }
        });
        dialog.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            event.stopImmediatePropagation();
            dialog.close();
          }
        }, true);
        input.addEventListener('input', () => render(input.value));
        input.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setActive(activeIndex + (event.key === 'ArrowDown' ? 1 : -1));
          }
          else if (event.key === 'Enter' && visibleActions[activeIndex]) {
            event.preventDefault();
            window.location.assign(visibleActions[activeIndex].href);
          }
        });
        document.addEventListener('keydown', (event) => {
          if (!event.altKey && !event.shiftKey && (event.metaKey || event.ctrlKey)
            && event.key.toLocaleLowerCase() === 'k' && !isEditing(event.target)) {
            event.preventDefault();
            open();
          }
        });
      });
    },
  };
})(Drupal, once);
