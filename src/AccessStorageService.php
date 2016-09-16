<?php

namespace Drupal\permissions_by_term;

use Drupal\Core\Database\Driver\mysql\Connection;
use \Drupal\Component\Utility\Tags;
use Drupal\Core\Form\FormState;

/**
 * Class AccessService.
 *
 * The "protected" class methods are meant for protection regarding Drupal's
 * forms and presentation layer.
 *
 * The "public" class methods can be used for extensions.
 *
 * @package Drupal\permissions_by_term
 */
class AccessStorageService {

  /**
   * Drupal\Core\Database\Driver\mysql\Connection definition.
   *
   * @var Drupal\Core\Database\Driver\mysql\Connection
   */
  protected $oDatabase;

  /**
   * The form state object.
   *
   * @var \Drupal\Core\Form\FormState
   */
  protected $oFormState;

  /**
   * The term name for which the access is set.
   *
   * @var string
   */
  protected $sTermName;

  /**
   * The user ids which gain granted access.
   *
   * @var array
   */
  protected $aUserIdsGrantedAccess;

  /**
   * The term id.
   *
   * @var int
   */
  private $iTermId;

  /**
   * The roles with granted access.
   *
   * @var array
   */
  protected $aSubmittedRolesGrantedAccess;

  /**
   * AccessStorageService constructor.
   *
   * @param \Drupal\Core\Database\Driver\mysql\Connection $database
   *   The connection to the database.
   * @param \Drupal\Core\Form\FormState|null $oFormState
   *   The form state object.
   * @param null|int $iTermId
   *   The taxonomy term id.
   */
  public function __construct(Connection $database, FormState $oFormState = NULL, $iTermId = NULL) {
    $this->oDatabase  = $database;
    $this->oFormState = $oFormState;

    if (!empty($this->oFormState)) {
      $sValuesUserAccess       = $this->oFormState->getValues()['access']['user'];
      $aUsernamesGrantedAccess = Tags::explode($sValuesUserAccess);

      $this->aUserIdsGrantedAccess = $this->getUserIdsByNames($aUsernamesGrantedAccess);

      $this->iTermId = $iTermId;

      if (!empty($this->oFormState->getValue('name')['0']['value'])) {
        $this->sTermName  = $this->oFormState->getValue('name')['0']['value'];
      }
    }
  }

  /**
   * Gets submitted roles with granted access from form.
   *
   * @return array
   *   An array with chosen roles.
   */
  protected function getSubmittedRolesGrantedAccess() {
    $aRoles       = $this->oFormState->getValue('access')['role'];
    $aChosenRoles = array();
    foreach ($aRoles as $sRole) {
      if ($sRole !== 0) {
        $aChosenRoles[] = $sRole;
      }
    }
    return $aChosenRoles;
  }

  /**
   * Checks if the submitted users are existing.
   *
   * If an user isn't existing, set an error message.
   */
  public function checkIfUsersExists() {
    $sAllowedUsers = $this->oFormState->getValue('access')['user'];
    $aAllowedUsers = Tags::explode($sAllowedUsers);
    foreach ($aAllowedUsers as $sUserId) {
      $aUserId = \Drupal::entityQuery('user')
        ->condition('uid', $sUserId)
        ->execute();
      if (empty($aUserId)) {
        $this->oFormState->setErrorByName('access][user',
          t('The user with ID %user_id does not exist.',
          array('%user_id' => $sUserId)));
      }
    }
  }

  /**
   * Gets user term permissions by tid.
   *
   * @return mixed
   *   Existing term permissions.
   */
  public function getExistingUserTermPermissionsByTid() {
    return $this->oDatabase->select('permissions_by_term_user', 'pu')
      ->condition('tid', $this->iTermId)
      ->fields('pu', ['uid'])
      ->execute()
      ->fetchCol();
  }

  /**
   * Gets role term permissions by tid.
   *
   * @return mixed
   *   Existing role term permissions.
   */
  public function getExistingRoleTermPermissionsByTid() {
    return $this->oDatabase->select('permissions_by_term_role', 'pr')
      ->condition('tid', $this->iTermId)
      ->fields('pr', ['rid'])
      ->execute()
      ->fetchCol();
  }

  /**
   * Gets single user id by user name.
   *
   * @param string $sUsername
   *   An user name.
   *
   * @return int
   *   User id.
   */
  public function getUserIdByName($sUsername) {
    return $this->oDatabase->select('users_field_data', 'ufd')
      ->condition('name', $sUsername)
      ->fields('ufd', ['uid'])
      ->execute()
      ->fetchAssoc();
  }

  /**
   * Gets multiple user ids by user names.
   *
   * @param array $aUserNames
   *   An array with user names.
   *
   * @return array
   *   User ids.
   */
  public function getUserIdsByNames($aUserNames) {
    $aUserIds = array();
    foreach ($aUserNames as $userName) {
      $iUserId    = $this->getUserIdByName($userName)['uid'];
      $aUserIds[] = $iUserId['uid'];
    }
    return $aUserIds;
  }

  /**
   * Gets the user names from users.
   *
   * Users which have granted access for a taxonomy term.
   *
   * @return mixed
   *   Gets user ids, which are allowed to access.
   */
  public function getAllowedUserIds() {
    $query = $this->oDatabase->select('permissions_by_term_user', 'p')
      ->fields('p', ['uid'])
      ->condition('p.tid', $this->iTermId);

    // fetchCol() returns all results, fetchAssoc() only "one" result.
    return $query->execute()
      ->fetchCol();
  }

  /**
   * Deletes term permissions by user id.
   *
   * @param array $aUserIdsAccessRemove
   *   An array with user ids, which access will be removed.
   */
  public function deleteTermPermissionsByUserIds($aUserIdsAccessRemove) {
    foreach ($aUserIdsAccessRemove as $iUserId) {
      $this->oDatabase->delete('permissions_by_term_user')
        ->condition('uid', $iUserId, '=')
        ->execute();
    }
  }

  /**
   * Deletes term permissions by role ids.
   *
   * @param array $aRoleIdsAccessRemove
   *   An array with role ids, that will be removed.
   */
  public function deleteTermPermissionsByRoleIds($aRoleIdsAccessRemove) {
    foreach ($aRoleIdsAccessRemove as $sRoleId) {
      $this->oDatabase->delete('permissions_by_term_role')
        ->condition('rid', $sRoleId, '=')
        ->execute();
    }
  }

  /**
   * Adds term permissions by user ids.
   *
   * @param array $aUserIdsGrantedAccess
   *   The user ids which will get granted access.
   *
   * @throws \Exception
   */
  public function addTermPermissionsByUserIds($aUserIdsGrantedAccess) {
    foreach ($aUserIdsGrantedAccess as $iUserIdGrantedAccess) {
      $this->oDatabase->insert('permissions_by_term_user')
        ->fields(['tid', 'uid'], [$this->iTermId, $iUserIdGrantedAccess])
        ->execute();
    }
  }

  /**
   * Adds term permissions by role ids.
   *
   * @param array $aRoleIdsGrantedAccess
   *   The role ids which will gain access.
   *
   * @throws \Exception
   */
  public function addTermPermissionsByRoleIds($aRoleIdsGrantedAccess) {
    foreach ($aRoleIdsGrantedAccess as $sRoleIdGrantedAccess) {
      $this->oDatabase->insert('permissions_by_term_role')
        ->fields(['tid', 'rid'], [$this->iTermId, $sRoleIdGrantedAccess])
        ->execute();
    }
  }

  /**
   * Gets the term id by term name.
   *
   * @param string $sTermName
   *   The term name.
   *
   * @return int
   *   The term id.
   */
  public function getTermIdByName($sTermName) {
    $aTermId = \Drupal::entityQuery('taxonomy_term')
      ->condition('name', $sTermName)
      ->execute();
    return key($aTermId);
  }

  /**
   * Gets the taxonomy name by id.
   *
   * @param int $term_id
   *   The taxonomy term id.
   *
   * @return string
   *   Gets a term name by an id.
   */
  public function getTermNameById($term_id) {
    $term_name = \Drupal::entityQuery('taxonomy_term')
      ->condition('id', $term_id)
      ->execute();
    return key($term_name);
  }

  /**
   * Gets the user ids which have been submitted by form.
   *
   * Users which will gain granted access to taxonomy terms.
   *
   * @return array
   *   The user ids which have been submitted.
   */
  protected function getSubmittedUserIds() {
    /* There's a $this->oFormState->getValues() method, but
     * it is loosing multiple form values. Don't know why.
     * So there're some custom lines on the $_REQUEST array. */
    $sRawUsers = $_REQUEST['access']['user'];

    if (empty($sRawUsers)) {
      return array();
    }

    $aRawUsers = explode('),', $sRawUsers);
    $aUserIds = array();
    foreach ($aRawUsers as $sRawUser) {
      $aTempRawUser = explode(' (', $sRawUser);
      // We check the user id by user name. If we get null back, the user might
      // be the Anonymous user. In that case we get null back and then we use
      // this id, which is 0.
      $fallback_user_id = str_replace(')', '', $aTempRawUser[1]);
      $fallback_user_id = intval($fallback_user_id);

      $sRawUser = trim($aTempRawUser['0']);
      $uid = $this->getUserIdByName($sRawUser)['uid'];
      if ($uid == NULL && $fallback_user_id == 0) {
        // We might want to give access to the Anonymous user.
        $aUserIds[] = 0;
      }
      else {
        $aUserIds[] = $this->getUserIdByName($sRawUser)['uid'];
      }

    }

    return $aUserIds;
  }

  /**
   * Saves term permissions by users.
   *
   * Opposite to save term permission by roles.
   *
   * @return array
   *   Data for database queries.
   */
  public function saveTermPermissions() {

    $aExistingUserPermissions       = $this->getExistingUserTermPermissionsByTid();
    $aSubmittedUserIdsGrantedAccess = $this->getSubmittedUserIds();

    $aExistingRoleIdsGrantedAccess = $this->getExistingRoleTermPermissionsByTid();
    $aSubmittedRolesGrantedAccess  = $this->getSubmittedRolesGrantedAccess();

    $aRet = $this->getPreparedDataForDatabaseQueries($aExistingUserPermissions,
      $aSubmittedUserIdsGrantedAccess, $aExistingRoleIdsGrantedAccess,
      $aSubmittedRolesGrantedAccess);

    // Run the database queries.
    $this->deleteTermPermissionsByUserIds($aRet['UserIdPermissionsToRemove']);
    $this->addTermPermissionsByUserIds($aRet['UserIdPermissionsToAdd']);

    $this->deleteTermPermissionsByRoleIds($aRet['UserRolePermissionsToRemove']);
    $this->addTermPermissionsByRoleIds($aRet['aRoleIdPermissionsToAdd']);

    return $aRet;

  }

  /**
   * Get array items to remove.
   *
   * The array items which aren't in the new items array, but are in old items
   * array, will be returned.
   *
   * @param array $aExistingItems
   *   The existing array items.
   * @param array|bool $aNewItems
   *   Either false if there're no new items or an array with items.
   *
   * @return array
   *   The array items to remove.
   */
  private function getArrayItemsToRemove($aExistingItems, $aNewItems) {

    $aRet = array();

    foreach ($aExistingItems as $existingItem) {
      if (!in_array($existingItem, $aNewItems)) {
        $aRet[] = $existingItem;
      }
    }

    return $aRet;
  }

  /**
   * Get the array items to add.
   *
   * The items in the new items array, which aren't in the existing items array,
   * will be returned.
   *
   * @param array $aNewItems
   *   The new array items.
   * @param array $aExistingItems
   *   The existing array items.
   *
   * @return array
   *   The items which needs to be added.
   */
  private function getArrayItemsToAdd($aNewItems, $aExistingItems) {
    $aRet = array();

    foreach ($aNewItems as $newItem) {
      if (!in_array($newItem, $aExistingItems)) {
        $aRet[] = $newItem;
      }
    }

    return $aRet;
  }

  /**
   * Prepares the data which has to be applied to the database.
   *
   * @param array $aExistingUserPermissions
   *   The permissions for existing user.
   * @param array $aSubmittedUserIdsGrantedAccess
   *   The user ids which get access.
   * @param array $aExistingRoleIdsGrantedAccess
   *   The existing role ids.
   * @param array $aSubmittedRolesGrantedAccess
   *   The user roles which get access.
   *
   * @return array
   *   User ID and role data.
   */
  public function getPreparedDataForDatabaseQueries($aExistingUserPermissions,
                                                    $aSubmittedUserIdsGrantedAccess,
                                                    $aExistingRoleIdsGrantedAccess,
                                                    $aSubmittedRolesGrantedAccess) {
    // Fill array with user ids to remove permission.
    $aRet['UserIdPermissionsToRemove'] =
      $this->getArrayItemsToRemove($aExistingUserPermissions,
        $aSubmittedUserIdsGrantedAccess);

    // Fill array with user ids to add permission.
    $aRet['UserIdPermissionsToAdd'] =
      $this->getArrayItemsToAdd($aSubmittedUserIdsGrantedAccess,
        $aExistingUserPermissions);

    // Fill array with user roles to remove permission.
    $aRet['UserRolePermissionsToRemove'] =
      $this->getArrayItemsToRemove($aExistingRoleIdsGrantedAccess,
        $aSubmittedRolesGrantedAccess);

    // Fill array with user roles to add permission.
    $aRet['aRoleIdPermissionsToAdd'] =
      $this->getArrayItemsToAdd($aSubmittedRolesGrantedAccess,
        $aExistingRoleIdsGrantedAccess);

    return $aRet;
  }

  /**
   * The form value for allowed users as string to be shown to the user.
   *
   * @param \Drupal\user\Entity\User[] $aAllowedUsers
   *   An array with the allowed users.
   *
   * @return null|string
   *   Either null or the user name.
   */
  public function getUserFormValue($aAllowedUsers) {

    $sUserInfos = '';

    if (!empty($aAllowedUsers)) {

      foreach ($aAllowedUsers as $oUser) {
        $iUid = intval($oUser->id());
        if ($iUid !== 0) {
          $sUsername = $oUser->getUsername();
        }
        else {
          $sUsername = t('Anonymous User');
        }

        $sUserInfos .= "$sUsername ($iUid), ";
      }

      // Remove space and comma at the end of the string.
      $sUserInfos = substr($sUserInfos, 0, -2);
    }

    return $sUserInfos;
  }

}
