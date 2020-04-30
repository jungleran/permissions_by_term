<?php

namespace Drupal\permissions_by_term;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Access\AccessResultReasonInterface;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Cache\CacheBackendInterface;


class ProcessingResultsCache {

  /**
   * The default cache bin.
   *
   * @var \Drupal\Core\Cache\CacheBackendInterface
   */
  protected $cache;

  public function __construct(CacheBackendInterface $cache) {
    $this->cache = $cache;
  }

  public function setCache(int $accountId, int $entityId, AccessResult $accessResult): void {
    $data = \serialize($accessResult);
    $cid = 'processing_results_cache:' . $entityId . ':' . $accountId;

    $tags = [
      'processing_results_cache:' . $entityId . ':' . $accountId,
      'processing_results_cache:' . $entityId,
      'processing_results_cache',
    ];

    $tags = Cache::mergeTags($tags, [$cid]);

    $this->cache->set($cid, $data, Cache::PERMANENT, $tags);

    $staticCache = &drupal_static(__FUNCTION__ . $cid, NULL);
    $staticCache = $data;
  }

  public function getCache(int $accountId, int $entityId): AccessResult {
    $cid = 'processing_results_cache:' . $entityId . ':' . $accountId;

    $staticCache = &drupal_static(__FUNCTION__ . $cid, NULL);

    if ($staticCache) {
      return \unserialize($staticCache);
    }

    $result = $this->cache->get($cid);

    $data = \unserialize($result->data);

    if (!$data instanceof AccessResult) {
      throw new \Exception("Unexpected result from cache. Passed accountId: $accountId - passed entityId: $entityId");
    }

    return $data;
  }

  public function hasCache(int $accountId, int $entityId): bool {
    $cid = 'processing_results_cache:' . $entityId . ':' . $accountId;

    $staticCache = &drupal_static(__FUNCTION__ . $cid, NULL);

    if ($staticCache) {
      $data = \unserialize($staticCache);

      if (!$data instanceof AccessResult) {
        return FALSE;
      }

      return TRUE;
    }

    $result = $this->cache->get($cid);

    if (!isset($result->data)) {
      return FALSE;
    }

    $data = \unserialize($result->data);

    if (!$data instanceof AccessResult) {
      return FALSE;
    }

    return TRUE;
  }

}
