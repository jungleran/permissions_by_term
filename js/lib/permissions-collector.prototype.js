var PermissionsCollector = function ($) {
  this.roleLabels = [];
  this.usernames = [];
};

PermissionsCollector.prototype.setRoleLabels = function (roleLabels) {
  this.roleLabels = roleLabels;
};

PermissionsCollector.prototype.setUsernames = function (usernames) {
  this.usernames = usernames;
};

PermissionsCollector.prototype.getRoleLabels = function () {
  return this.roleLabels;
};

PermissionsCollector.prototype.getUsernames = function () {
  return this.usernames;
};