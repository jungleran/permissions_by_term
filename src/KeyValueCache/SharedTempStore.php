<?php

namespace Drupal\permissions_by_term\StaticStorage;


use Drupal\permissions_by_term\KeyValueCache\CacheInterface;

class SharedTempStore implements CacheInterface {

  public function get(string $namespace): ?array {
    // TODO: Implement get() method.
  }

  public function set(string $namespace): void {
    // TODO: Implement set() method.
  }

  public function has(string $namespace): bool {
    // TODO: Implement has() method.
  }

  public function clear(string $namespace): void {
    // TODO: Implement clear() method.
  }


}
