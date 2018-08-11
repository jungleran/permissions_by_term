<?php

namespace Drupal\Tests\permissions_by_term\Kernel;

use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;
use Drupal\permissions_by_term\Service\AccessStorage;
use Drupal\taxonomy\Entity\Term;
use Drupal\taxonomy\Entity\Vocabulary;
use Drupal\user\Entity\Role;
use Drupal\user\Entity\User;
use Drupal\user\RoleInterface;
use Prophecy\Argument;

/**
 * Class AccessCheckTest
 *
 * @package Drupal\Tests\permissions_by_term\Kernel
 * @group permissions_by_term
 */
class AccessStorageTest extends PBTKernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();
  }

  public function testSaveMultipleLanguageCodes() {
    $_REQUEST = array (
      'access' =>
        array (
          'user' => '',
          'role' =>
            array (
              'authenticated' => 'authenticated',
            ),
        ),
    );

    $formStateStub = $this->getMockBuilder(FormStateInterface::class)
      ->getMock();

    $map = [
      [
        'langcode', NULL,
       [
         ['value' => 'en']
       ]
      ],
      [
        'access', NULL,
        [
          'role' =>
            [
              'authenticated' => 'authenticated',
              'anonymous'     => 0,
              'administrator' => 0,
            ],
        ],
      ]
    ];
    $formStateStub->expects($this->any())
      ->method('getValue')
      ->will($this->returnValueMap($map));

    $this->accessStorage->saveTermPermissions($formStateStub, 1);
  }


}
