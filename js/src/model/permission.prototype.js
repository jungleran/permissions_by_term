let Permission = function(taxonomyRelationFieldNames = [], userDisplayNames = [], roles = [], fieldWrapperCSSClasses = []) {
  this.taxonomyRelationFieldNames = taxonomyRelationFieldNames;
  this.roles = roles;
  this.userDisplayNames = userDisplayNames;
  this.fieldWrapperCSSClasses = fieldWrapperCSSClasses;
}

/**
 * @returns string[]
 */
Permission.prototype.getUserDisplayName = function() {
  return this.userDisplayNames;
}

/**
 * @returns string[]
 */
Permission.prototype.getRoles = function() {
  return this.roles;
}

/**
 * @returns string[]
 */
Permission.prototype.getTaxonomyRelationFieldNames = function() {
  return this.taxonomyRelationFieldNames;
}

Permission.prototype.getFieldWrapperCSSClasses = function() {
  return this.fieldWrapperCSSClasses;
}

export default Permission;