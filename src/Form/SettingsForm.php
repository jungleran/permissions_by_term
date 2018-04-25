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
    $descriptionSingleTerm = <<<EOT
By default users are granted access content, as long they have access to a <strong>single</strong>
related taxonomy term. If the single term restriction option is checked, they must
have access to <strong>all</strong> related taxonomy terms to access an node.
EOT;

    $form['single_term_restriction'] = [
      '#type' => 'checkbox',
      '#title' => t('Single Term Restriction'),
      '#description' => t($descriptionSingleTerm),
      '#default_value' => \Drupal::config('permissions_by_term.settings')->get('single_term_restriction'),
    ];

    $descriptionPrivateMode = <<<EOT
Grant only access to other users than content creator, if you have set any taxonomy terms with permissions to users/roles.
EOT;

    $form['private_mode'] = [
      '#type' => 'checkbox',
      '#title' => t('Private Mode'),
      '#description' => t($descriptionPrivateMode),
      '#default_value' => \Drupal::config('permissions_by_term.settings')->get('single_term_restriction'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    \Drupal::configFactory()
      ->getEditable('permissions_by_term.settings.single_term_restriction')
      ->set('value', $form_state->getValue('single_term_restriction'))
      ->save();

    \Drupal::configFactory()
      ->getEditable('permissions_by_term.settings.private_mode')
      ->set('value', $form_state->getValue('private_mode'))
      ->save();

    node_access_rebuild(true);

    parent::submitForm($form, $form_state);
  }

}
