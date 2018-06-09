"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Access = function Access() {
  var taxonomyRelationFieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var userDisplayNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var roles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var fieldWrapperCSSClasses = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  this.taxonomyRelationFieldNames = taxonomyRelationFieldNames;
  this.roles = roles;
  this.userDisplayNames = userDisplayNames;
  this.fieldWrapperCSSClasses = fieldWrapperCSSClasses;
};

/**
 * @returns string[]
 */
Access.prototype.getUserDisplayName = function () {
  return this.userDisplayNames;
};

/**
 * @returns string[]
 */
Access.prototype.getRoles = function () {
  return this.roles;
};

/**
 * @returns string[]
 */
Access.prototype.getTaxonomyRelationFieldNames = function () {
  return this.taxonomyRelationFieldNames;
};

Access.prototype.getFieldWrapperCSSClasses = function () {
  return this.fieldWrapperCSSClasses;
};

exports.default = Access;