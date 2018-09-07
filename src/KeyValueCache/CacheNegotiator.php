<?php

namespace Drupal\permissions_by_term\StaticStorage;

use Drupal\permissions_by_term\KeyValueCache\CacherInterface;


class CacheNegotiator {

  /**
   * @var \Drupal\Core\TempStore\SharedTempStoreFactory
   */
  private $sharedTempStore;

  /**
   * @var \Drupal\permissions_by_term\StaticStorage\StaticStorageInterface
   */
  private $staticStorage;

  public function __construct(CacherInterface $sharedTempStore, StaticStorageInterface $staticStorage) {
    $this->sharedTempStore = $sharedTempStore;
    $this->staticStorage = $staticStorage;
  }

  public function getData() {

  }

  public function setData() {

  }

}
