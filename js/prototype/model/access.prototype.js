let Access = function(taxonomyRelationFieldNames, userDisplayNames, roles) {
  this.taxonomyRelationFieldNames = taxonomyRelationFieldNames;
  this.roles = roles;
  this.userDisplayNames = userDisplayNames;
}

/**
 * @returns string[]
 */
Access.prototype.getUserDisplayName = function() {
  return this.userDisplayNames;
}

/**
 * @returns string[]
 */
Access.prototype.getRoles = function() {
  return this.roles;
}

/**
 * @returns string[]
 */
Access.prototype.getTaxonomyRelationFieldNames = function() {
  return this.taxonomyRelationFieldNames;
}