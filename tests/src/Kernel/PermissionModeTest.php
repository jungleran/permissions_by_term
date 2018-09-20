<?php

namespace Drupal\Tests\permissions_by_term\Kernel;

use Drupal\Core\Access\AccessResultForbidden;
use Drupal\Core\Access\AccessResultNeutral;
use Drupal\node\Entity\Node;
use Drupal\permissions_by_term\Service\AccessStorage;
use Drupal\taxonomy\Entity\Term;
use Drupal\taxonomy\Entity\Vocabulary;
use Drupal\user\Entity\Role;
use Drupal\user\Entity\User;

/**
 * Class AccessCheckTest
 *
 * @package Drupal\Tests\permissions_by_term\Kernel
 * @group permissions_by_term
 */
class PermissionModeTest extends PBTKernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
  }

  public function testCanUserAccessByNodeId(): void {
    $this->createRelationWithoutRestriction();
    self::assertInternalType('string', $this->getNidNoRestriction());
    self::assertTrue($this->accessCheck->canUserAccessByNodeId($this->getNidNoRestriction()));
    \Drupal::configFactory()
      ->getEditable('permissions_by_term.settings')
      ->set('permission_mode', TRUE)
      ->save();
    self::assertFalse($this->accessCheck->canUserAccessByNodeId($this->getNidNoRestriction()));
  }

  public function testHandleNode(): void {
    $this->createRelationWithoutRestriction();
    self::assertInternalType('string', $this->getNidNoRestriction());
    $node = Node::load($this->getNidNoRestriction());

    self::assertInstanceOf(AccessResultNeutral::class, $this->accessCheck->handleNode($node->id(), $node->language()->getId()));
    \Drupal::configFactory()
      ->getEditable('permissions_by_term.settings')
      ->set('permission_mode', TRUE)
      ->save();
    self::assertInstanceOf(AccessResultForbidden::class, $this->accessCheck->handleNode($node->id(), $node->language()->getId()));
  }

  public function testNodeAccessRecordCreation(): void {
    $this->createRelationWithoutRestriction();
    self::assertInternalType('string', $this->getNidNoRestriction());

    $node = Node::load($this->getNidNoRestriction());
    $nodeAccessRecord = permissions_by_term_node_access_records($node);
    self::assertInternalType('null', $nodeAccessRecord);

    $node = Node::load($this->getNidNoRestriction());
    \Drupal::configFactory()
      ->getEditable('permissions_by_term.settings')
      ->set('permission_mode', TRUE)
      ->save();
    $nodeAccessRecord = permissions_by_term_node_access_records($node);
    self::assertInternalType('array', $nodeAccessRecord);
  }

}
