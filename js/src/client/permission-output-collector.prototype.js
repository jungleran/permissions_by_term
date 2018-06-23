import _ from 'lodash';

/**
 * @param PermissionOutput permissionOutput
 */
let PermissionsOutputCollector = function(permissionOutput) {
  this.permissionOutput = permissionOutput;
}

PermissionsOutputCollector.prototype.collect = function(permissions, tids) {
  this._collectRoles(permissions, tids);
  this._collectUsers(permissions, tids);
}

PermissionsOutputCollector.prototype._collectRoles = function(permissions, tids) {
  for (let tidToRole in permissions.tidsToRoles) {

    if (_.includes(tids[0], tidToRole)) {

      for (let role of permissions.tidsToRoles[tidToRole]) {
        if (!_.includes(this.permissionOutput.getRoles(), role)) {
          this.permissionOutput.addRole(role);
        }
      }

    }

  }
}

PermissionsOutputCollector.prototype._collectUsers = function(permissions, tids) {
  for (let tidToUsername in permissions.tidToUsernames) {
    if (_.includes(tids[0], tidToUsername)) {
      for (let username of permissions.tidToUsernames[tidToUsername]) {
        if (!_.includes(this.permissionOutput.getUsernames(), username)) {
          this.permissionOutput.addUsername(username);
        }
      }

    }

  }
}

/**
 * @returns PermissionOutput
 */
PermissionsOutputCollector.prototype.getPermissionOutput = function() {
  return this.permissionOutput;
}

export default PermissionsOutputCollector;