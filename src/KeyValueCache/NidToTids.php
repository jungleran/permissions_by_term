<?php

namespace Drupal\permissions_by_term\StaticStorage;

class NidToTids extends StaticStorageAbstract {

  /**
   * @var array
   */
  private $data;

  public function __construct() {
  }

  public function setData(string $data): void {
    $this->data = $data;
  }

  public function getData(): string {
    return $this->data;
  }

}
