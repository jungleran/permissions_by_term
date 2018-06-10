const _ = require('lodash');

let DomClient = function(document) {
  this.document = document;
}

DomClient.prototype.computeFieldWrapperCSSClasses = function(fieldNames) {
  let wrapperCssClasses = [];

  for (let index = 0; index < fieldNames.length; ++index) {
    let fieldWrapperClass = '.field--name-' + fieldNames[index].replace(/_/g, '-');

    wrapperCssClasses.push(fieldWrapperClass);
  }

  return wrapperCssClasses;
}

DomClient.prototype.DomClientPermissionsByCheckingCheckbox = function(tid, checked, permissions) {
  if (checked === false) {
    this.resetData('checkbox_tid_' + tid);
  } else if (checked === true){
    this.addSelectedTid(parseInt(tid), 'checkbox_tid_' + tid);
  }

  this.renderPermissionsInfo(permissions);
}

DomClient.prototype.permissionsInitByCheckbox = function(fieldWrapperCSSClasses, permissions) {
  for (let index = 0; index < this.jQuery(fieldWrapperCSSClasses + ' input:checkbox').length; ++index) {

    let checkbox = this.jQuery(fieldWrapperCSSClasses + ' input:checkbox')[index],
      checkboxChecked = this.jQuery(fieldWrapperCSSClasses + ' input:checkbox')[index].checked,
      tid = parseInt(checkbox.attributes.value.value);

    if (checkboxChecked === false) {
      this.resetData('checkbox_tid' + tid);
    } else if (checkboxChecked === true) {
      this.addSelectedTid(tid, 'checkbox_tid_' + tid);
    }
  }

  this.renderPermissionsInfo(permissions);
}

DomClient.prototype.permissionsInitBySelect = function(fieldWrapperCSSClasses, permissions) {
  for (let index = 0; index < fieldWrapperCSSClasses.length; ++index) {
    let inputTypes = ['select', 'input'];

    let fieldWrapperCSSClass = fieldWrapperCSSClasses[index];

    for (let inputTypesIndex = 0; inputTypesIndex <= inputTypes.length; inputTypesIndex++) {
      let tids = this.document.querySelector(fieldWrapperCSSClass + ' select').val();

      if (tids !== undefined && tids !== null && tids.constructor === Array) {
        if (tids[0] === '_none') {
          this.resetData(fieldWrapperCSSClass);
        }

        for (let i = 0; i < tids.length; ++i) {
          if (isNaN(tids[i]) === false) {
            this.addSelectedTid(parseInt(tids[i]), fieldWrapperCSSClass);
          }
        }
      }

    }

  }

  this.renderPermissionsInfo(permissions);

}

DomClient.prototype.computeTidsByAutocomplete = function(fieldWrapperCSSClasses = []) {
  let selectedTids = []

  if (!_.isEmpty(fieldWrapperCSSClasses)) {
    for (let index = 0; index < fieldWrapperCSSClasses.length; ++index) {
      let fieldWrapperCSSClass = fieldWrapperCSSClasses[index];

      let values = this.document.querySelector(fieldWrapperCSSClass + ' input').val();

      if (values !== undefined && values.includes('(') && values.includes(')')) {

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
}

DomClient.prototype.renderPermissionsInfo = function(permissions) {

  let permissionsToDomClient = this.getPermissionsByTids(this.getSelectedTids(), permissions);

  let allowedUsersHtml = '<b>' + Drupal.t('Allowed users:') + '</b> ';

  if (this.isAllowedUsersRestriction(permissionsToDomClient)) {
    allowedUsersHtml += permissionsToDomClient['permittedUsers'].join(', ');
  } else {
    allowedUsersHtml += '<i>' + Drupal.t('No user restrictions.') + '</i>';
  }

  let allowedRolesHtml = '<b>' + Drupal.t('Allowed roles:') + '</b> ';

  if (this.isAllowedRolesRestriction(permissionsToDomClient)) {
    allowedRolesHtml += permissionsToDomClient['permittedRoles'].join(', ');
  } else {
    allowedRolesHtml += '<i>' + Drupal.t('No role restrictions.') + '</i>';;
  }

  let generalInfoText = Drupal.t("This widget shows information about taxonomy term related permissions. It's being updated, as soon you make any related changes in the form.");

  let newTermInfo = this.document.createElement('div');
  newTermInfo.innerHTML = generalInfoText + '<br /><br />' + allowedUsersHtml + '<br />' + allowedRolesHtml;
  this.document.querySelector('#edit-permissions-by-term-info .form-type-item').replaceWith(newTermInfo);

}

DomClient.prototype.addFormElementCssClass = function(formElementCssClass) {
  this.formElementCssClasses.push(formElementCssClass);
}

export default DomClient;