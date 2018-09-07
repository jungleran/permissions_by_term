<?php
/**
 * Created by PhpStorm.
 * User: peter
 * Date: 07.09.18
 * Time: 09:44
 */

namespace Drupal\permissions_by_term\StaticStorage;

use Drupal\permissions_by_term\KeyValueCache\CacheInterface;


class StaticStorage implements CacheInterface {

  /**
   * @var string
   */
  private $staticStorageKey;

  /**
   * @var array
   */
  private static $staticStorage;

  public function set(string $namespace, array $data) : void {
    self::$staticStorage[$this->staticStorageKey] = $data;
  }

  public function get(string $namespace): array {
    return self::$staticStorage[$this->staticStorageKey];
  }

  public function has(string $key): bool {
    if (\is_array(self::$staticStorage[$this->staticStorageKey]) && \count(self::$staticStorage[$this->staticStorageKey]) > 0) {
      return TRUE;
    }

    return FALSE;
  }

  public function clear(string $namespace): void {
    unset(self::$staticStorage[$this->staticStorageKey]);
  }


}
