/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/async-function/create-access.js":
/*!*********************************************!*\
  !*** ./src/async-function/create-access.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/empty */ \"./src/util/empty.js\");\n/* harmony import */ var _model_access_prototype__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/access.prototype */ \"./src/model/access.prototype.js\");\n\n\n\n/**\n * @returns Access\n */\nconst createAccess = async (fetchFromBackend) => {\n  let data = await fetchFromBackend(),\n      fieldCssClasses = [];\n\n  if (!Object(_util_empty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(data.taxonomyRelationFieldNames)) {\n    data.taxonomyRelationFieldNames.forEach((fieldName) => {\n      const fieldWrapperClass = '.field--name-' + fieldName.replace(/_/g, '-');\n\n      fieldCssClasses.push(fieldWrapperClass);\n    });\n  }\n\n  return new _model_access_prototype__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\n      data.taxonomyRelationFieldNames,\n      data.permissions.userDisplayNames,\n      data.permissions.roleLabels,\n      fieldCssClasses\n  );\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createAccess);\n\n//# sourceURL=webpack:///./src/async-function/create-access.js?");

/***/ }),

/***/ "./src/async-function/fetch-from-backend.js":
/*!**************************************************!*\
  !*** ./src/async-function/fetch-from-backend.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @returns array\n */\nconst fetchFromBackend = async () => {\n  let contentType = null;\n  if (window.location.href.indexOf('/node/add') !== -1) {\n    contentType = window.location.href.split(\"/\").pop();\n  }\n\n  let url = '/admin/permissions-by-term/access-info-by-url?url=' + window.location.pathname;\n  if (contentType !== null) {\n    url = '/admin/permissions-by-term/access-info-by-content-type/' + contentType;\n  }\n\n  return await fetch(url, { credentials:'include' })\n      .then(function(response) {\n        return response.json();\n      }).then(function(data) {\n        return data;\n      });\n};\n\n//# sourceURL=webpack:///./src/async-function/fetch-from-backend.js?");

/***/ }),

/***/ "./src/client/dom-client.prototype.js":
/*!********************************************!*\
  !*** ./src/client/dom-client.prototype.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let DomClient = function() {\n\n}\n\nDomClient.prototype.computeFieldWrapperCSSClasses = function(fieldNames) {\n  var wrapperCssClasses = [];\n\n  for (var index = 0; index < fieldNames.length; ++index) {\n    var fieldWrapperClass = '.field--name-' + fieldNames[index].replace(/_/g, '-');\n\n    wrapperCssClasses.push(fieldWrapperClass);\n  }\n\n  return wrapperCssClasses;\n}\n\nDomClient.prototype.DomClientPermissionsByCheckingCheckbox = function(tid, checked, permissions) {\n  if (checked === false) {\n    this.resetData('checkbox_tid_' + tid);\n  } else if (checked === true){\n    this.addSelectedTid(parseInt(tid), 'checkbox_tid_' + tid);\n  }\n\n  this.renderPermissionsInfo(permissions);\n}\n\nDomClient.prototype.DomClientPermissionsByInitCheckbox = function(fieldWrapperCSSClasses, permissions) {\n  for (var index = 0; index < this.jQuery(fieldWrapperCSSClasses + ' input:checkbox').length; ++index) {\n\n    var checkbox = this.jQuery(fieldWrapperCSSClasses + ' input:checkbox')[index],\n      checkboxChecked = this.jQuery(fieldWrapperCSSClasses + ' input:checkbox')[index].checked,\n      tid = parseInt(checkbox.attributes.value.value);\n\n    if (checkboxChecked === false) {\n      this.resetData('checkbox_tid' + tid);\n    } else if (checkboxChecked === true) {\n      this.addSelectedTid(tid, 'checkbox_tid_' + tid);\n    }\n  }\n\n  this.renderPermissionsInfo(permissions);\n}\n\nDomClient.prototype.DomClientPermissionsBySelect = function(fieldWrapperCSSClasses, permissions) {\n  for (var index = 0; index < fieldWrapperCSSClasses.length; ++index) {\n    var inputTypes = ['select', 'input'];\n\n    var fieldWrapperCSSClass = fieldWrapperCSSClasses[index];\n\n    for (var inputTypesIndex = 0; inputTypesIndex <= inputTypes.length; inputTypesIndex++) {\n      let tids = this.document.querySelector(fieldWrapperCSSClass + ' select').val();\n\n      if (tids !== undefined && tids !== null && tids.constructor === Array) {\n        if (tids[0] === '_none') {\n          this.resetData(fieldWrapperCSSClass);\n        }\n\n        for (var i = 0; i < tids.length; ++i) {\n          if (isNaN(tids[i]) === false) {\n            this.addSelectedTid(parseInt(tids[i]), fieldWrapperCSSClass);\n          }\n        }\n      }\n\n    }\n\n  }\n\n  this.renderPermissionsInfo(permissions);\n\n}\n\nDomClient.prototype.DomClientPermissionsByAutocomplete = function(fieldWrapperCSSClasses, permissions) {\n  for (var index = 0; index < fieldWrapperCSSClasses.length; ++index) {\n    var fieldWrapperCSSClass = fieldWrapperCSSClasses[index];\n\n    var values = this.jQuery(fieldWrapperCSSClass + ' input').val();\n\n    this.resetData(fieldWrapperCSSClass);\n\n    if (values !== undefined && values.indexOf('(') !== -1 && values.indexOf(')')) {\n\n      var tidsInBrackets = values.match(/\\(\\d+\\)/g);\n\n      if (tidsInBrackets !== undefined && tidsInBrackets !== null && tidsInBrackets.constructor === Array) {\n\n        for (var i = 0; i < tidsInBrackets.length; ++i) {\n          var selectedTid = parseInt(tidsInBrackets[i].replace('(', '').replace(')', ''));\n          this.addSelectedTid(selectedTid, fieldWrapperCSSClass);\n        }\n\n      }\n\n    }\n\n  }\n\n  this.renderPermissionsInfo(permissions);\n\n}\n\nDomClient.prototype.renderPermissionsInfo = function(permissions) {\n\n  var permissionsToDomClient = this.getPermissionsByTids(this.getSelectedTids(), permissions);\n\n  var allowedUsersHtml = '<b>' + Drupal.t('Allowed users:') + '</b> ';\n\n  if (this.isAllowedUsersRestriction(permissionsToDomClient)) {\n    allowedUsersHtml += permissionsToDomClient['permittedUsers'].join(', ');\n  } else {\n    allowedUsersHtml += '<i>' + Drupal.t('No user restrictions.') + '</i>';\n  }\n\n  var allowedRolesHtml = '<b>' + Drupal.t('Allowed roles:') + '</b> ';\n\n  if (this.isAllowedRolesRestriction(permissionsToDomClient)) {\n    allowedRolesHtml += permissionsToDomClient['permittedRoles'].join(', ');\n  } else {\n    allowedRolesHtml += '<i>' + Drupal.t('No role restrictions.') + '</i>';;\n  }\n\n  var generalInfoText = Drupal.t(\"This widget shows information about taxonomy term related permissions. It's being updated, as soon you make any related changes in the form.\");\n\n  let newTermInfo = this.document.createElement('div');\n  newTermInfo.innerHTML = generalInfoText + '<br /><br />' + allowedUsersHtml + '<br />' + allowedRolesHtml;\n  this.document.querySelector('#edit-permissions-by-term-info .form-type-item').replaceWith(newTermInfo);\n\n}\n\nDomClient.prototype.addFormElementCssClass = function(formElementCssClass) {\n  this.formElementCssClasses.push(formElementCssClass);\n}\n\n\n//# sourceURL=webpack:///./src/client/dom-client.prototype.js?");

/***/ }),

/***/ "./src/client/permission-collector.prototype.js":
/*!******************************************************!*\
  !*** ./src/client/permission-collector.prototype.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let PermissionCollector = function() {\n  this.permittedUsers = [];\n  this.permittedRoles = [];\n}\n\n//@TODO: What the fuck! throw this away.\nPermissionCollector.prototype.pushUserDisplayNames = function(tids, PermissionCollectorToDisplay, PermissionCollectors) {\n  for (var index = 0; index < tids.length; ++index) {\n    if (PermissionCollectors.hasOwnProperty('userDisplayNames') && PermissionCollectors['userDisplayNames'].hasOwnProperty(tids[index]) && PermissionCollectors['userDisplayNames'][tids[index]] !== null &&\n      PermissionCollectorToDisplay['permittedUsers'].indexOf(PermissionCollectors['userDisplayNames'][tids[index]]) === -1) {\n\n      var userDisplayNames = PermissionCollectors['userDisplayNames'][tids[index]];\n\n      if (userDisplayNames.constructor === Array && userDisplayNames.length > 1) {\n        userDisplayNames.forEach(function(value){\n          if (PermissionCollectorToDisplay['permittedUsers'].indexOf(value) === -1) {\n            PermissionCollectorToDisplay['permittedUsers'].push(value);\n          }\n        });\n      } else {\n        if (PermissionCollectorToDisplay['permittedUsers'].indexOf(userDisplayNames) === -1) {\n          PermissionCollectorToDisplay['permittedUsers'].push(userDisplayNames);\n        }\n      }\n    }\n  }\n\n  return PermissionCollectorToDisplay;\n}\n\nPermissionCollector.prototype.pushRoles = function(tids, PermissionCollectorToDisplay, PermissionCollectors) {\n  for (var index = 0; index < tids.length; ++index) {\n\n    if (PermissionCollectors['roleLabels'] === undefined) {\n      return PermissionCollectorToDisplay;\n    }\n\n    if (PermissionCollectors['roleLabels'][tids[index]] !== undefined && PermissionCollectors['roleLabels'][tids[index]] !== null) {\n      PermissionCollectors['roleLabels'][tids[index]].forEach(function(role){\n        if (PermissionCollectorToDisplay['permittedRoles'].indexOf(role) === -1) {\n          PermissionCollectorToDisplay['permittedRoles'].push(role);\n        }\n      });\n    }\n  }\n\n  return PermissionCollectorToDisplay;\n}\n\nPermissionCollector.prototype.getPermissionCollectorsByTids = function(tids, PermissionCollectors) {\n  var PermissionCollectorToDisplay = {\n    permittedUsers: [],\n    permittedRoles: []\n  };\n\n  PermissionCollectorToDisplay = this.pushRoles(tids, PermissionCollectorToDisplay, PermissionCollectors);\n  PermissionCollectorToDisplay = this.pushUserDisplayNames(tids, PermissionCollectorToDisplay, PermissionCollectors);\n\n  return PermissionCollectorToDisplay;\n}\n\nPermissionCollector.prototype.isAllowedUsersRestriction = function(PermissionCollectorToDisplay) {\n  if (PermissionCollectorToDisplay['permittedUsers'].length > 0 && PermissionCollectorToDisplay['permittedUsers'] !== null) {\n    return true;\n  }\n\n  return false;\n}\n\nPermissionCollector.prototype.isAllowedRolesRestriction = function(PermissionCollectorToDisplay) {\n  if (PermissionCollectorToDisplay['permittedRoles'].length > 0 && PermissionCollectorToDisplay['permittedRoles'] !== null) {\n    return true;\n  }\n\n  return false;\n}\n\n\n//# sourceURL=webpack:///./src/client/permission-collector.prototype.js?");

/***/ }),

/***/ "./src/client/term-collector.prototype.js":
/*!************************************************!*\
  !*** ./src/client/term-collector.prototype.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var TermCollector = function($, infoRenderer, document){\n  this.selectedTids = [];\n};\n\nTermCollector.prototype.getSelectedTids = function() {\n  var tids = [];\n\n  for (var index = 0; index < this.formElementCssClasses.length; ++index) {\n    if (this.selectedTids[this.formElementCssClasses[index]] !== undefined && this.selectedTids[this.formElementCssClasses[index]].constructor === Array) {\n\n      this.selectedTids[this.formElementCssClasses[index]].forEach(function(tid){\n        tids.push(tid);\n      })\n    }\n  }\n\n  return tids;\n}\n\nTermCollector.prototype.keyExists = function(key, array) {\n  if (!array || (array.constructor !== Array && array.constructor !== Object)) {\n    return false;\n  }\n  for (var i = 0; i < array.length; i++) {\n    if (array[i] === key) {\n      return true;\n    }\n  }\n  return key in array;\n}\n\nTermCollector.prototype.addSelectedTid = function(tid, formElementCssClass) {\n  if (!this.keyExists(formElementCssClass, this.formElementCssClasses)) {\n    this.formElementCssClasses.push(formElementCssClass);\n  }\n\n  if (this.selectedTids[formElementCssClass] === undefined) {\n\n    this.selectedTids[formElementCssClass] = [];\n  }\n\n  this.selectedTids[formElementCssClass].push(tid);\n}\n\nTermCollector.prototype.removeTid = function(value, formElementCssClass) {\n  const index = this.selectedTids[formElementCssClass].indexOf(parseInt(value));\n\n  if (index !== -1) {\n    this.selectedTids[formElementCssClass].splice(index, 1);\n  }\n}\n\nTermCollector.prototype.resetData = function(formElementCssClass) {\n  this.selectedTids[formElementCssClass] = [];\n}\n\n\n//# sourceURL=webpack:///./src/client/term-collector.prototype.js?");

/***/ }),

/***/ "./src/drupal-behavior-function/node-form-client.js":
/*!**********************************************************!*\
  !*** ./src/drupal-behavior-function/node-form-client.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(() => {\n\n  'use strict';\n\n  if (document.querySelector(\"#edit-permissions-by-term-info\") !== null) {\n\n\n    /**\n     * @type {Drupal~behavior}\n     */\n    Drupal.behaviors.nodeForm = {\n      attach: async () => {\n        /**\n         * @var Access access\n         */\n        let access = await createAccess(fetchFromBackend);\n\n        console.log();\n\n        const hasTaxonomyFormFields = (access) => {\n          if (access.taxonomyRelationFieldNames.length !== 0) {\n            return true;\n          }\n\n          return false;\n        }\n\n        if (hasTaxonomyFormFields(access)) {\n\n\n\n        }\n\n\n        // $.when(getFormInfo).done((formInfo) => {\n        //\n        //   if (formInfo['taxonomyRelationFieldNames'] !== null) {\n        //\n        //     let infoRenderer = new InfoRenderer($);\n        //     let nodeForm = new NodeForm($, infoRenderer),\n        //         fieldWrapperCSSClasses = nodeForm.computeFieldWrapperCSSClasses(formInfo['taxonomyRelationFieldNames']);\n        //\n        //     initPermissionInfoByFormElements(nodeForm, fieldWrapperCSSClasses, formInfo);\n        //\n        //     for (let formElementCssClass in fieldWrapperCSSClasses) {\n        //       nodeForm.addFormElementCssClass(formElementCssClass);\n        //\n        //       $(formElementCssClass + ' select').change(() => {\n        //         nodeForm.displayPermissionsBySelect(fieldWrapperCSSClasses, formInfo['permissions']);\n        //       });\n        //\n        //       $(formElementCssClass + ' input[type=\"text\"]').on('autocomplete-select', () => {\n        //         nodeForm.displayPermissionsByAutocomplete(fieldWrapperCSSClasses, formInfo['permissions']);\n        //       });\n        //\n        //       $(formElementCssClass + ' input[type=\"text\"]').on('keyup', () => {\n        //         nodeForm.displayPermissionsByAutocomplete(fieldWrapperCSSClasses, formInfo['permissions']);\n        //       });\n        //\n        //\n        //       $(formElementCssClass + ' input[type=\"checkbox\"]').change(() => {\n        //         nodeForm.displayPermissionsByCheckingCheckbox($(this).prop('value'), $(this).prop('checked'), formInfo['permissions']);\n        //       });\n        //     }\n        //   }\n        //\n        // });\n        //\n        // function initPermissionInfoByFormElements(nodeForm, fieldWrapperCSSClasses, formInfo) {\n        //   nodeForm.displayPermissionsBySelect(fieldWrapperCSSClasses, formInfo['permissions']);\n        //   nodeForm.displayPermissionsByAutocomplete(fieldWrapperCSSClasses, formInfo['permissions']);\n        //   nodeForm.displayPermissionsByInitCheckbox(fieldWrapperCSSClasses, formInfo['permissions']);\n        // }\n\n      }\n    };\n\n    if (Drupal.autocomplete) {\n      /**\n       * Handles an auto-complete select event.\n       *\n       * Override the autocomplete method to add a custom event. Overriding is\n       * happening to get full input.\n       *\n       * @param {jQuery.Event} event\n       *   The event triggered.\n       * @param {object} ui\n       *   The jQuery UI settings object.\n       *\n       * @return {boolean}\n       *   Returns false to indicate the event status.\n       */\n      Drupal.autocomplete.options.select = function selectHandler(event, ui) {\n        var terms = Drupal.autocomplete.splitValues(event.target.value);\n        // Remove the current input.\n        terms.pop();\n        // Add the selected item.\n        if (ui.item.value.search(',') > 0) {\n          terms.push('\"' + ui.item.value + '\"');\n        }\n        else {\n          terms.push(ui.item.value);\n        }\n        event.target.value = terms.join(', ');\n        // Fire custom event that other controllers can listen to.\n        jQuery(event.target).trigger('autocomplete-select');\n\n        // Return false to tell jQuery UI that we've filled in the value already.\n        return false;\n      }\n    }\n\n  }\n\n})(window);\n\n\n//# sourceURL=webpack:///./src/drupal-behavior-function/node-form-client.js?");

/***/ }),

/***/ "./src/model/access.prototype.js":
/*!***************************************!*\
  !*** ./src/model/access.prototype.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet Access = function(taxonomyRelationFieldNames = [], userDisplayNames = [], roles = [], fieldWrapperCSSClasses = []) {\n  this.taxonomyRelationFieldNames = taxonomyRelationFieldNames;\n  this.roles = roles;\n  this.userDisplayNames = userDisplayNames;\n  this.fieldWrapperCSSClasses = fieldWrapperCSSClasses;\n}\n\n/**\n * @returns string[]\n */\nAccess.prototype.getUserDisplayName = function() {\n  return this.userDisplayNames;\n}\n\n/**\n * @returns string[]\n */\nAccess.prototype.getRoles = function() {\n  return this.roles;\n}\n\n/**\n * @returns string[]\n */\nAccess.prototype.getTaxonomyRelationFieldNames = function() {\n  return this.taxonomyRelationFieldNames;\n}\n\nAccess.prototype.getFieldWrapperCSSClasses = function() {\n  return this.fieldWrapperCSSClasses;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Access);\n\n//# sourceURL=webpack:///./src/model/access.prototype.js?");

/***/ }),

/***/ "./src/util/empty.js":
/*!***************************!*\
  !*** ./src/util/empty.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst empty = (mixedVar) => {\n  let undef,\n      key,\n      i,\n      len,\n      emptyValues = [undef, null, false, 0, '', '0'];\n\n  for (i = 0, len = emptyValues.length; i < len; i++) {\n    if (mixedVar === emptyValues[i]) {\n      return true\n    }\n  }\n\n  if (typeof mixedVar === 'object') {\n    for (key in mixedVar) {\n      if (mixedVar.hasOwnProperty(key)) {\n        return false\n      }\n    }\n    return true\n  }\n\n  return false\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (empty);\n\n//# sourceURL=webpack:///./src/util/empty.js?");

/***/ }),

/***/ "./test/access-creator.tests.js":
/*!**************************************!*\
  !*** ./test/access-creator.tests.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_async_function_create_access__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/async-function/create-access */ \"./src/async-function/create-access.js\");\n/* harmony import */ var _src_util_empty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/util/empty */ \"./src/util/empty.js\");\n\n\n\nQUnit.test( \"Get access objects by querying backend with all params\", async function( assert ) {\n\n  const fetchFromBackend = async() => {\n    return {\n      taxonomyRelationFieldNames: ['field-one', 'field-two', 'field-thrid'],\n      permissions: {\n        userDisplayNames: ['jeff', 'brandon', 'brian'],\n        roleLabels: ['admin', 'editor']\n      }\n    };\n  };\n\n  /**\n   * @var Access access\n   */\n  let access = await Object(_src_async_function_create_access__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(fetchFromBackend);\n\n  assert.ok(access.getUserDisplayName().length > 0, 'user display names are contained');\n  assert.ok(access.getRoles().length > 0, 'roles are contained');\n  assert.ok(access.getFieldWrapperCSSClasses().length > 0, 'field wrapper css classes are contained');\n  assert.ok(access.getTaxonomyRelationFieldNames().length > 0, 'taxonomy relation field names are contained');\n});\n\nQUnit.test( \"Get access objects by querying backend with partly params\", async function( assert ) {\n\n  const fetchFromBackend = async() => {\n    return {\n      taxonomyRelationFieldNames: undefined,\n      permissions: {\n        userDisplayNames: ['jeff', 'brandon', 'brian'],\n      }\n    };\n  };\n\n  /**\n   * @var Access access\n   */\n  let access = await Object(_src_async_function_create_access__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(fetchFromBackend);\n\n  assert.ok(access.getUserDisplayName().length > 0, 'user display names are contained');\n  assert.ok(Object(_src_util_empty__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(access.getRoles()), 'roles are contained');\n  assert.ok(Object(_src_util_empty__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(access.getFieldWrapperCSSClasses()), 'field wrapper css classes are contained');\n  assert.ok(Object(_src_util_empty__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(access.getTaxonomyRelationFieldNames()), 'taxonomy relation field names are contained');\n});\n\n//# sourceURL=webpack:///./test/access-creator.tests.js?");

/***/ }),

/***/ 0:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/async-function/fetch-from-backend.js ./src/client/dom-client.prototype.js ./src/client/permission-collector.prototype.js ./src/client/term-collector.prototype.js ./src/drupal-behavior-function/node-form-client.js ./src/model/access.prototype.js ./src/util/empty.js ./test/access-creator.tests.js ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Users/peter/DevPrivat/permissions-by-term/modules/permissions_by_term/js/src/async-function/fetch-from-backend.js */\"./src/async-function/fetch-from-backend.js\");\n__webpack_require__(/*! /Users/peter/DevPrivat/permissions-by-term/modules/permissions_by_term/js/src/client/dom-client.prototype.js */\"./src/client/dom-client.prototype.js\");\n__webpack_require__(/*! /Users/peter/DevPrivat/permissions-by-term/modules/permissions_by_term/js/src/client/permission-collector.prototype.js */\"./src/client/permission-collector.prototype.js\");\n__webpack_require__(/*! /Users/peter/DevPrivat/permissions-by-term/modules/permissions_by_term/js/src/client/term-collector.prototype.js */\"./src/client/term-collector.prototype.js\");\n__webpack_require__(/*! /Users/peter/DevPrivat/permissions-by-term/modules/permissions_by_term/js/src/drupal-behavior-function/node-form-client.js */\"./src/drupal-behavior-function/node-form-client.js\");\n__webpack_require__(/*! /Users/peter/DevPrivat/permissions-by-term/modules/permissions_by_term/js/src/model/access.prototype.js */\"./src/model/access.prototype.js\");\n__webpack_require__(/*! /Users/peter/DevPrivat/permissions-by-term/modules/permissions_by_term/js/src/util/empty.js */\"./src/util/empty.js\");\nmodule.exports = __webpack_require__(/*! /Users/peter/DevPrivat/permissions-by-term/modules/permissions_by_term/js/test/access-creator.tests.js */\"./test/access-creator.tests.js\");\n\n\n//# sourceURL=webpack:///multi_./src/async-function/fetch-from-backend.js_./src/client/dom-client.prototype.js_./src/client/permission-collector.prototype.js_./src/client/term-collector.prototype.js_./src/drupal-behavior-function/node-form-client.js_./src/model/access.prototype.js_./src/util/empty.js_./test/access-creator.tests.js?");

/***/ })

/******/ });