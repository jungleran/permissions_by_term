<?php
/**
 * Created by PhpStorm.
 * User: peter
 * Date: 07.09.18
 * Time: 09:44
 */

namespace Drupal\permissions_by_term\KeyValueCache;


class StaticStorage implements CacheInterface {

  /**
   * @var array
   */
  private static $staticStorage;

  public function set(string $namespace, array $data) : void {
    self::$staticStorage[$namespace] = $data;
  }

  public function get(string $namespace): array {
    return self::$staticStorage[$namespace];
  }

  public function has(string $namespace): bool {
    if (\is_array(self::$staticStorage[$namespace]) && \count(self::$staticStorage[$namespace]) > 0) {
      return TRUE;
    }

    return FALSE;
  }

  public function clear(string $namespace): void {
    unset(self::$staticStorage[$namespace]);
  }

}
