<?php

namespace Drupal\Tests\permissions_by_term\Unit;

use Drupal\permissions_by_term\KeyValueCache\Cacher;
use Drupal\permissions_by_term\Model\NidToTidsModel;
use Drupal\permissions_by_term\StaticStorage\CacheNegotiator;
use Drupal\permissions_by_term\StaticStorage\NidToTids;
use Drupal\permissions_by_term\StaticStorage\StaticStorage;
use Drupal\Tests\UnitTestCase;

Class CacheNegotiatorTest extends UnitTestCase {

  public function testGetDataFromSharedTempStore() {
    $sharedTempStore = $this->createMock(Cacher::class);
    $sharedTempStore->expects($this->exactly(1))
      ->method('get')
      ->with(
        $this->equalTo(NidToTids::class)
      )
      ->willReturn(NULL);

    $data = [new NidToTidsModel()];

    $staticStorage = $this->createMock(StaticStorage::class);
    $staticStorage->expects($this->exactly(1))
      ->method('get')
      ->with(
        $this->equalTo(NidToTids::class)
      )
      ->willReturn($data);

    /** @var Cacher $sharedTempStore */
    $cacheNegotiator = new CacheNegotiator($sharedTempStore);
    $cacheNegotiator->getData();


  }


}
