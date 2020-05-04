<?php

namespace Drupal\permissions_by_term\Cache;


use Drupal\Core\Access\AccessResult;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Cache\CacheBackendInterface;


class GrantsCache {

  private const BASE_CACHE_ID = 'permissions_by_term:grants_cache';

  /**
   * The default cache bin.
   *
   * @var \Drupal\Core\Cache\CacheBackendInterface
   */
  protected $cache;

  public function __construct(CacheBackendInterface $cache) {
    $this->cache = $cache;
  }

  public function set(int $userId, array $grants): void {
    $data = $grants;
    $cid = self::BASE_CACHE_ID . ':' . $userId;

    $tags = [
      self::BASE_CACHE_ID . ':' . $userId,
      self::BASE_CACHE_ID,
    ];

    $tags = Cache::mergeTags($tags, [$cid]);

    $this->cache->set($cid, $data, Cache::PERMANENT, $tags);

    $staticCache = &drupal_static(__FUNCTION__ . $cid, NULL);
    $staticCache = $data;
  }

  public function get(int $userId): AccessResult {
    $cid = self::BASE_CACHE_ID . ':' . $userId;

    $staticCache = &drupal_static(__FUNCTION__ . $cid, NULL);

    if ($staticCache) {
      return $staticCache;
    }

    $result = $this->cache->get($cid);

    $data = $result->data;

    if (!is_array($data)) {
      throw new \Exception('Unexpected result from cache. Result must be an array.');
    }

    return $data;
  }

  public function has(int $userId): bool {
    $cid = self::BASE_CACHE_ID . ':' . $userId;

    $staticCache = &drupal_static(__FUNCTION__ . $cid, NULL);

    if ($staticCache) {
      $data = $staticCache;

      if (!is_array($data)) {
        return FALSE;
      }

      return TRUE;
    }

    $result = $this->cache->get($cid);

    if (!isset($result->data)) {
      return FALSE;
    }

    $data = $result->data;

    if (!is_array($data)) {
      return FALSE;
    }

    return TRUE;
  }

}
