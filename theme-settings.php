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
  $form['moody26_header'] = [
    '#type' => 'details',
    '#title' => t('Moody 26 header'),
    '#open' => TRUE,
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
}
