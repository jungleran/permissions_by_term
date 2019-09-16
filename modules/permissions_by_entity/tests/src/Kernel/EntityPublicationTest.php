<?php

namespace Drupal\Tests\permissions_by_entity\Kernel;

use Drupal\Core\Access\AccessResult;
use Drupal\KernelTests\KernelTestBase;
use Drupal\pbt_entity_test\Entity\TestEntity;
use Drupal\user\Entity\Role;
use Drupal\user\Entity\User;

class EntityPublicationTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  public static $modules = [
    'pbt_entity_test',
    'dynamic_page_cache',
    'taxonomy',
    'user',
    'permissions_by_term',
    'permissions_by_entity',
  ];

  /**
   * The nodes.
   *
   * @var \Drupal\node\Entity\Node[]
   */
  private $nodes;

  private $anonymousUser;

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();
    $this->installEntitySchema('test_entity');

    $this->nodes['node_unpublished'] = TestEntity::create(['langcode' => 'en']);
    $this->nodes['node_unpublished']->setUnpublished()->save();
    $this->nodes['node_published'] = TestEntity::create(['langcode' => 'en']);
    $this->nodes['node_published']->setPublished()->save();

    $anonymousRole = Role::create(['id' => 'anonymous_users']);
    $anonymousRole->grantPermission('access content');
    $this->anonymousUser = User::create(['id' => 0, 'name' => 'anonymous', 'email' => 'anonymous@example.com']);
    $this->anonymousUser->addRole($anonymousRole->id());
  }

  public function testAnonymousCanViewPublishedNodesWithoutTermPermissions() {
    $this->assertTrue($this->nodes['node_published']->isPublished());
    $this->assertEquals(AccessResult::neutral(), permissions_by_entity_entity_access($this->nodes['node_published'], 'view', $this->anonymousUser));
    $this->assertTrue($this->nodes['node_published']->access('view', $this->anonymousUser));
  }

  public function testAnonymousCannotViewUnpublishedNodesWithoutTermPermissions() {
    $this->assertFalse($this->nodes['node_unpublished']->isPublished());
    $this->assertEquals(AccessResult::neutral(), permissions_by_entity_entity_access($this->nodes['node_unpublished'], 'view', $this->anonymousUser));
    $this->assertFalse($this->nodes['node_unpublished']->access('view', $this->anonymousUser));
  }

}