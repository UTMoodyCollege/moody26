<?php

/**
 * @file
 * Administrative settings for the Moody 26 theme.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function moody26_form_system_theme_settings_alter(array &$form, FormStateInterface $form_state): void {
  $form['#attached']['library'][] = 'moody26/settings';

  $form['moody26_header'] = [
    '#type' => 'details',
    '#title' => t('Moody 26 header'),
    '#open' => FALSE,
    '#weight' => -20,
  ];

  $form['moody26_header']['give_link'] = [
    '#type' => 'url',
    '#title' => t('Give link'),
    '#default_value' => theme_get_setting('give_link'),
    '#description' => t('Leave empty to remove the Give action from the header.'),
  ];

  $form['moody26_header']['parent_link_title'] = [
    '#type' => 'textfield',
    '#title' => t('Parent-unit link label'),
    '#default_value' => theme_get_setting('parent_link_title'),
    '#description' => t('Optional. Displayed in the University bar on desktop only.'),
  ];

  $form['moody26_header']['parent_link'] = [
    '#type' => 'url',
    '#title' => t('Parent-unit link URL'),
    '#default_value' => theme_get_setting('parent_link'),
    '#states' => [
      'visible' => [
        ':input[name="parent_link_title"]' => ['filled' => TRUE],
      ],
    ],
  ];

  $form['moody26_visual_options'] = [
    '#type' => 'details',
    '#title' => t('Visual options'),
    '#open' => TRUE,
    '#weight' => -19,
  ];

  $form['moody26_visual_options']['motion_controls'] = [
    '#type' => 'fieldset',
    '#title' => t('Optional motion'),
    '#description' => t('Choose which restrained motion layers the public theme may use.'),
    '#attributes' => ['class' => ['moody26-motion-options']],
  ];

  $form['moody26_visual_options']['motion_controls']['motion_gsap_enabled'] = [
    '#type' => 'checkbox',
    '#title' => t('Enable coordinated page motion (GSAP)'),
    '#default_value' => theme_get_setting('motion_gsap_enabled') ?? TRUE,
    '#description' => t('Runs the one-shot masthead entrance and the first eligible discovery-group reveal. Moody 26 reuses a compatible GSAP runtime when available or loads its bundled local fallback.'),
  ];

  $form['moody26_visual_options']['motion_controls']['motion_anime_enabled'] = [
    '#type' => 'checkbox',
    '#title' => t('Enable interface motion (Anime.js)'),
    '#default_value' => theme_get_setting('motion_anime_enabled') ?? TRUE,
    '#description' => t('Adds brief, one-shot feedback when submenu destinations and the first Quick actions results appear.'),
  ];

  $form['moody26_visual_options']['motion_accessibility'] = [
    '#type' => 'item',
    '#input' => FALSE,
    '#title' => t('Accessibility safeguards'),
    '#description' => t('Reduced-motion and Save-Data preferences always suppress optional effects. Navigation, Quick actions, focus, and content remain functional in every combination. When both options are disabled, Moody 26 omits its optional motion library.'),
  ];
}
