<?php

namespace Drupal\permissions_by_term\StaticStorage;

abstract class StaticStorageAbstract implements StaticStorageInterface {

  /**
   * @var string
   */
  private $staticStorageKey;

  /**
   * @var array
   */
  private static $staticStorage;

  public function setDataStatic(array $data) : void {
    self::$staticStorage[$this->staticStorageKey] = $data;
  }

  public function getDataStatic(): array {
    return self::$staticStorage[$this->staticStorageKey];
  }

  public function isDataStatic(string $key): bool {
    if (\is_array(self::$staticStorage[$this->staticStorageKey]) && \count(self::$staticStorage[$this->staticStorageKey]) > 0) {
      return TRUE;
    }

    return FALSE;
  }

}
