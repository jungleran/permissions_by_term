<?php

namespace Drupal\Tests\permissions_by_term\Unit;

use Drupal\permissions_by_term\KeyValueCache\CacheNegotiator;
use Drupal\permissions_by_term\KeyValueCache\SharedTempStore;
use Drupal\permissions_by_term\KeyValueCache\StaticStorage;
use Drupal\permissions_by_term\Model\NidToTidsModel;
use Drupal\Tests\UnitTestCase;

Class CacheNegotiatorTest extends UnitTestCase {

  public function nidToTidsModelProvider() {
    return [
      [
        [new NidToTidsModel()]
      ],
    ];
  }

  /**
   * @dataProvider nidToTidsModelProvider
   */
  public function testGetDataFromStaticStorage(array $data) {
    $sharedTempStore = $this->getMockBuilder(SharedTempStore::class)
      ->getMock();
    $sharedTempStore->expects($this->exactly(0))
      ->method('has')
      ->with(
        $this->equalTo(NidToTidsModel::class)
      )
      ->willReturn(TRUE);

    $staticStorage = new StaticStorage();
    $staticStorage->set(NidToTidsModel::class, $data);

    /** @var SharedTempStore $sharedTempStore */
    $cacheNegotiator = new CacheNegotiator($sharedTempStore, $staticStorage);
    $cacheNegotiator->set(NidToTidsModel::class, $data);

    self::assertInstanceOf(NidToTidsModel::class, $cacheNegotiator->get(NidToTidsModel::class)['0']);
  }

  /**
   * @dataProvider nidToTidsModelProvider
   */
  public function testGetDataFromSharedTempStore(array $data) {
    $sharedTempStore = $this->getMockBuilder(SharedTempStore::class)
      ->getMock();
    $sharedTempStore->expects($this->exactly(1))
      ->method('has')
      ->with(
        $this->equalTo(NidToTidsModel::class)
      )
      ->willReturn(TRUE);
    $sharedTempStore->expects($this->exactly(1))
      ->method('get')
      ->with(
        $this->equalTo(NidToTidsModel::class)
      )
      ->willReturn($data);
    $staticStorage = $this->getMockBuilder(StaticStorage::class)
      ->getMock();
    $staticStorage->expects($this->exactly(1))
      ->method('has')
      ->with(
        $this->equalTo(NidToTidsModel::class)
      )
      ->willReturn(FALSE);
    $staticStorage->expects($this->exactly(0))
      ->method('get')
      ->with(
        $this->equalTo(NidToTidsModel::class)
      )
      ->willReturn(NULL);


    /** @var SharedTempStore $sharedTempStore */
    /** @var StaticStorage $staticStorage */
    $cacheNegotiator = new CacheNegotiator($sharedTempStore, $staticStorage);
    $cacheNegotiator->set(NidToTidsModel::class, $data);

    self::assertInstanceOf(NidToTidsModel::class, $cacheNegotiator->get(NidToTidsModel::class)['0']);
  }

}
