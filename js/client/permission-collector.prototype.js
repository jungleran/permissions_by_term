let PermissionCollector = function() {
  this.permittedUsers = [];
  this.permittedRoles = [];
}

//@TODO: What the fuck! throw this away.
PermissionCollector.prototype.pushUserDisplayNames = function(tids, PermissionCollectorToDisplay, PermissionCollectors) {
  for (var index = 0; index < tids.length; ++index) {
    if (PermissionCollectors.hasOwnProperty('userDisplayNames') && PermissionCollectors['userDisplayNames'].hasOwnProperty(tids[index]) && PermissionCollectors['userDisplayNames'][tids[index]] !== null &&
      PermissionCollectorToDisplay['permittedUsers'].indexOf(PermissionCollectors['userDisplayNames'][tids[index]]) === -1) {

      var userDisplayNames = PermissionCollectors['userDisplayNames'][tids[index]];

      if (userDisplayNames.constructor === Array && userDisplayNames.length > 1) {
        userDisplayNames.forEach(function(value){
          if (PermissionCollectorToDisplay['permittedUsers'].indexOf(value) === -1) {
            PermissionCollectorToDisplay['permittedUsers'].push(value);
          }
        });
      } else {
        if (PermissionCollectorToDisplay['permittedUsers'].indexOf(userDisplayNames) === -1) {
          PermissionCollectorToDisplay['permittedUsers'].push(userDisplayNames);
        }
      }
    }
  }

  return PermissionCollectorToDisplay;
}

PermissionCollector.prototype.pushRoles = function(tids, PermissionCollectorToDisplay, PermissionCollectors) {
  for (var index = 0; index < tids.length; ++index) {

    if (PermissionCollectors['roleLabels'] === undefined) {
      return PermissionCollectorToDisplay;
    }

    if (PermissionCollectors['roleLabels'][tids[index]] !== undefined && PermissionCollectors['roleLabels'][tids[index]] !== null) {
      PermissionCollectors['roleLabels'][tids[index]].forEach(function(role){
        if (PermissionCollectorToDisplay['permittedRoles'].indexOf(role) === -1) {
          PermissionCollectorToDisplay['permittedRoles'].push(role);
        }
      });
    }
  }

  return PermissionCollectorToDisplay;
}

PermissionCollector.prototype.getPermissionCollectorsByTids = function(tids, PermissionCollectors) {
  var PermissionCollectorToDisplay = {
    permittedUsers: [],
    permittedRoles: []
  };

  PermissionCollectorToDisplay = this.pushRoles(tids, PermissionCollectorToDisplay, PermissionCollectors);
  PermissionCollectorToDisplay = this.pushUserDisplayNames(tids, PermissionCollectorToDisplay, PermissionCollectors);

  return PermissionCollectorToDisplay;
}

PermissionCollector.prototype.isAllowedUsersRestriction = function(PermissionCollectorToDisplay) {
  if (PermissionCollectorToDisplay['permittedUsers'].length > 0 && PermissionCollectorToDisplay['permittedUsers'] !== null) {
    return true;
  }

  return false;
}

PermissionCollector.prototype.isAllowedRolesRestriction = function(PermissionCollectorToDisplay) {
  if (PermissionCollectorToDisplay['permittedRoles'].length > 0 && PermissionCollectorToDisplay['permittedRoles'] !== null) {
    return true;
  }

  return false;
}
