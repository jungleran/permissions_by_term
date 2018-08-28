<?php

namespace Drupal\permissions_by_term\StaticStorage;

class NidsToTids extends StaticStorageAbstract {

  /**
   * @var string
   */
  private $storageKey;

  public function __construct() {
    $this->setStorageKey('nids_to_tids');
  }

  public function setStorageKey(string $storageKey): void {
    $this->storageKey = $storageKey;
  }

  public function getStorageKey(): string {
    return $this->storageKey;
  }

}
