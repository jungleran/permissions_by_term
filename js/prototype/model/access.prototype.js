let Access = function(taxonomyRelationFieldNames, userDisplayNames, roles, fieldWrapperCSSClasses) {
  this.taxonomyRelationFieldNames = taxonomyRelationFieldNames;
  this.roles = roles;
  this.userDisplayNames = userDisplayNames;
  this.fieldWrapperCSSClasses = fieldWrapperCSSClasses;
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

Access.prototype.getFieldWrapperCSSClasses = function() {
  return this.fieldWrapperCSSClasses;
}