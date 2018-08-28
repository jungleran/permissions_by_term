<?php

namespace Drupal\permissions_by_term\StaticStorage;


interface StaticStorageInterface {

  public function setDataStatic(array $data);

  public function getDataStatic(): array;

  public function isDataStatic(string $key): bool;

  public function setStorageKey(string $storageKey): void;

  public function getStorageKey(): string;

}
