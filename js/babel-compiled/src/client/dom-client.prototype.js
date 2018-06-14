'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const _ = require('lodash');

/**
 * @param PermissionsOutput permissionsOutput
 * @param document
 */
let DomClient = function (document, permissionsOutput, drupal) {
  this.document = document;
  this.permissionsOutput = permissionsOutput;
  this.drupal = drupal;
};

DomClient.prototype.renderPermissionsInfo = function () {

  let allowedUsersHtml = '<b>' + this.drupal.t('Allowed users:') + '</b> ';

  if (!_.isEmpty(this.permissionsOutput.getUsernames())) {
    allowedUsersHtml += this.permissionsOutput.getUsernames().join(', ');
  } else {
    allowedUsersHtml += '<i>' + this.drupal.t('No user restrictions.') + '</i>';
  }

  let allowedRolesHtml = '<b>' + this.drupal.t('Allowed roles:') + '</b> ';

  if (!_.isEmpty(this.permissionsOutput.getRoles())) {
    allowedRolesHtml += this.permissionsOutput.getRoles().join(', ');
  } else {
    allowedRolesHtml += '<i>' + this.drupal.t('No role restrictions.') + '</i>';;
  }

  let generalInfoText = this.drupal.t("This widget shows information about taxonomy term related permissions. It's being updated, as soon you make any related changes in the form.");

  let newTermInfo = this.document.createElement('div');
  newTermInfo.innerHTML = generalInfoText + '<br /><br />' + allowedUsersHtml + '<br />' + allowedRolesHtml;
  this.document.querySelector('#edit-permissions-by-term-info .form-type-item').replaceWith(newTermInfo);
};

DomClient.prototype.computeTidsByAutocomplete = function (fieldWrapperCSSClasses = []) {
  let selectedTids = [];

  if (!_.isEmpty(fieldWrapperCSSClasses)) {
    for (let index = 0; index < fieldWrapperCSSClasses.length; ++index) {
      let fieldWrapperCSSClass = fieldWrapperCSSClasses[index];

      let values = this.document.querySelector(fieldWrapperCSSClass + ' input').value;

      if (values !== undefined && _.includes(values, '(') && _.includes(values, ')')) {

        let tidsInBrackets = values.match(/\(\d+\)/g);

        if (tidsInBrackets !== undefined && tidsInBrackets !== null && tidsInBrackets.constructor === Array) {

          for (let i = 0; i < tidsInBrackets.length; ++i) {
            let selectedTid = parseInt(tidsInBrackets[i].replace('(', '').replace(')', ''));
            if (!_.includes(selectedTids, selectedTid)) {
              selectedTids.push(selectedTid);
            }
          }
        }
      }
    }
  }

  return selectedTids;
};

exports.default = DomClient;