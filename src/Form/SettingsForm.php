<?php

namespace Drupal\permissions_by_term\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;


class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'permissions_by_term_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'permissions_by_term.settings'
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);
    $description_single_term_restriction = <<<EOT
By default users are granted access content, as long they have access to a <strong>single</strong>
related taxonomy term. If the single term restriction option is checked, they must
have access to <strong>all</strong> related taxonomy terms to access an node.
EOT;

    $description_permission_mode = <<<EOT
This mode should make nodes accessible (view and edit) only, if editors have the permission for a related node via taxonomy terms. Users won't have access to nodes with the following conditions:
<br />- nodes without any terms
<br />- nodes without any terms which grant them permission
EOT;

    $form['single_term_restriction'] = [
      '#type' => 'checkbox',
      '#title' => t('Single term restriction'),
      '#description' => t($description_single_term_restriction),
      '#default_value' => \Drupal::config('permissions_by_term.settings')->get('single_term_restriction'),
    ];

    $form['permission_mode'] = [
      '#type' => 'checkbox',
      '#title' => t('Permission mode'),
      '#description' => t($description_permission_mode),
      '#default_value' => \Drupal::config('permissions_by_term.settings')->get('permission_mode'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    \Drupal::configFactory()
      ->getEditable('permissions_by_term.settings')
      ->set('single_term_restriction', $form_state->getValue('single_term_restriction'))
      ->save();

    \Drupal::configFactory()
      ->getEditable('permissions_by_term.settings')
      ->set('permission_mode', $form_state->getValue('permission_mode'))
      ->save();

    node_access_rebuild(true);

    parent::submitForm($form, $form_state);
  }

}
