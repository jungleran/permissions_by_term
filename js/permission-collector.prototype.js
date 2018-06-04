let PermissionCollector = function() {
}

//@TODO: What the fuck! throw this away.
PermissionCollector.prototype.pushUserDisplayNames = function(tids, PermissionCollectorsToDisplay, PermissionCollectors) {
  for (var index = 0; index < tids.length; ++index) {
    if (PermissionCollectors.hasOwnProperty('userDisplayNames') && PermissionCollectors['userDisplayNames'].hasOwnProperty(tids[index]) && PermissionCollectors['userDisplayNames'][tids[index]] !== null &&
      PermissionCollectorsToDisplay['permittedUsers'].indexOf(PermissionCollectors['userDisplayNames'][tids[index]]) === -1) {

      var userDisplayNames = PermissionCollectors['userDisplayNames'][tids[index]];

      if (userDisplayNames.constructor === Array && userDisplayNames.length > 1) {
        userDisplayNames.forEach(function(value){
          if (PermissionCollectorsToDisplay['permittedUsers'].indexOf(value) === -1) {
            PermissionCollectorsToDisplay['permittedUsers'].push(value);
          }
        });
      } else {
        if (PermissionCollectorsToDisplay['permittedUsers'].indexOf(userDisplayNames) === -1) {
          PermissionCollectorsToDisplay['permittedUsers'].push(userDisplayNames);
        }
      }
    }
  }

  return PermissionCollectorsToDisplay;
}

PermissionCollector.prototype.pushRoles = function(tids, PermissionCollectorsToDisplay, PermissionCollectors) {
  for (var index = 0; index < tids.length; ++index) {

    if (PermissionCollectors['roleLabels'] === undefined) {
      return PermissionCollectorsToDisplay;
    }

    if (PermissionCollectors['roleLabels'][tids[index]] !== undefined && PermissionCollectors['roleLabels'][tids[index]] !== null) {
      PermissionCollectors['roleLabels'][tids[index]].forEach(function(role){
        if (PermissionCollectorsToDisplay['permittedRoles'].indexOf(role) === -1) {
          PermissionCollectorsToDisplay['permittedRoles'].push(role);
        }
      });
    }
  }

  return PermissionCollectorsToDisplay;
}

PermissionCollector.prototype.getPermissionCollectorsByTids = function(tids, PermissionCollectors) {
  var PermissionCollectorsToDisplay = {
    permittedUsers: [],
    permittedRoles: []
  };

  PermissionCollectorsToDisplay = this.pushRoles(tids, PermissionCollectorsToDisplay, PermissionCollectors);
  PermissionCollectorsToDisplay = this.pushUserDisplayNames(tids, PermissionCollectorsToDisplay, PermissionCollectors);

  return PermissionCollectorsToDisplay;
}

PermissionCollector.prototype.isAllowedUsersRestriction = function(PermissionCollectorsToDisplay) {
  if (PermissionCollectorsToDisplay['permittedUsers'].length > 0 && PermissionCollectorsToDisplay['permittedUsers'] !== null) {
    return true;
  }

  return false;
}

PermissionCollector.prototype.isAllowedRolesRestriction = function(PermissionCollectorsToDisplay) {
  if (PermissionCollectorsToDisplay['permittedRoles'].length > 0 && PermissionCollectorsToDisplay['permittedRoles'] !== null) {
    return true;
  }

  return false;
}
