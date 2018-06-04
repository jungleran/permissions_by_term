let Permissions = function() {
}

//@TODO: What the fuck! throw this away.
Permission.prototype.pushUserDisplayNames = function(tids, permissionsToDisplay, permissions) {
  for (var index = 0; index < tids.length; ++index) {
    if (permissions.hasOwnProperty('userDisplayNames') && permissions['userDisplayNames'].hasOwnProperty(tids[index]) && permissions['userDisplayNames'][tids[index]] !== null &&
      permissionsToDisplay['permittedUsers'].indexOf(permissions['userDisplayNames'][tids[index]]) === -1) {

      var userDisplayNames = permissions['userDisplayNames'][tids[index]];

      if (userDisplayNames.constructor === Array && userDisplayNames.length > 1) {
        userDisplayNames.forEach(function(value){
          if (permissionsToDisplay['permittedUsers'].indexOf(value) === -1) {
            permissionsToDisplay['permittedUsers'].push(value);
          }
        });
      } else {
        if (permissionsToDisplay['permittedUsers'].indexOf(userDisplayNames) === -1) {
          permissionsToDisplay['permittedUsers'].push(userDisplayNames);
        }
      }
    }
  }

  return permissionsToDisplay;
}

Permission.prototype.pushRoles = function(tids, permissionsToDisplay, permissions) {
  for (var index = 0; index < tids.length; ++index) {

    if (permissions['roleLabels'] === undefined) {
      return permissionsToDisplay;
    }

    if (permissions['roleLabels'][tids[index]] !== undefined && permissions['roleLabels'][tids[index]] !== null) {
      permissions['roleLabels'][tids[index]].forEach(function(role){
        if (permissionsToDisplay['permittedRoles'].indexOf(role) === -1) {
          permissionsToDisplay['permittedRoles'].push(role);
        }
      });
    }
  }

  return permissionsToDisplay;
}

Permission.prototype.getPermissionsByTids = function(tids, permissions) {
  var permissionsToDisplay = {
    permittedUsers: [],
    permittedRoles: []
  };

  permissionsToDisplay = this.pushRoles(tids, permissionsToDisplay, permissions);
  permissionsToDisplay = this.pushUserDisplayNames(tids, permissionsToDisplay, permissions);

  return permissionsToDisplay;
}

Permission.prototype.isAllowedUsersRestriction = function(permissionsToDisplay) {
  if (permissionsToDisplay['permittedUsers'].length > 0 && permissionsToDisplay['permittedUsers'] !== null) {
    return true;
  }

  return false;
}

Permission.prototype.isAllowedRolesRestriction = function(permissionsToDisplay) {
  if (permissionsToDisplay['permittedRoles'].length > 0 && permissionsToDisplay['permittedRoles'] !== null) {
    return true;
  }

  return false;
}
