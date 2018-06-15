const _ = require('lodash');

/**
 * @param PermissionsOutput permissionsOutput
 * @param document
 */
let DomClient = function(document, permissionsOutput, drupal) {
  this.document = document;
  this.permissionsOutput = permissionsOutput;
  this.drupal = drupal;
}

DomClient.prototype.renderPermissionsInfo = function() {

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

}

DomClient.prototype._computeTidsByAutocomplete = function(fieldWrapperCSSClasses = []) {
  let selectedTids = []

  if (!_.isEmpty(fieldWrapperCSSClasses)) {
    for (let index = 0; index < fieldWrapperCSSClasses.length; ++index) {
      let fieldWrapperCSSClass = fieldWrapperCSSClasses[index];

      let values = this.document.querySelectorAll(fieldWrapperCSSClass + ' input').value;

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
}

DomClient.prototype.computeTidsBySelect = function(fieldWrapperCSSClasses) {
  let tids = [],
    inputTypes = ['select', 'input'];


  for (let index = 0; index < fieldWrapperCSSClasses.length; ++index) {
    let fieldWrapperCSSClass = fieldWrapperCSSClasses[index];

    for (let inputTypesIndex = 0; inputTypesIndex <= inputTypes.length; inputTypesIndex++) {
      let values = this.document.querySelector(fieldWrapperCSSClass + ' select').value;

      if (values !== undefined && values !== null && values.constructor === Array) {
        if (values[0] === '_none') {
          this.resetData(fieldWrapperCSSClass);
        }

        for (let i = 0; i < values.length; ++i) {
          if (isNaN(values[i]) === false) {
            tids.push(parseInt(values[i]));
          }
        }
      }

    }

  }

  return tids;
}

DomClient.prototype._computeTidsByCheckbox = function(formElementCssClass) {
  let tids = [];

  for (let checkbox of this.document.querySelectorAll(formElementCssClass + ' input[type="checkbox"]')) {
    if (checkbox.checked === true) {
      tids.push(checkbox.value);
    }
  }

  return tids;
}

DomClient.prototype.computeTids = function(formElementCssClass) {
  let tids = [];

  tids.push(this._computeTidsByCheckbox(formElementCssClass));
  // @TODO: add other input types.
}

DomClient.prototype._getInputType = function(formElementCssClass) {
  let formElement = null;

  if (!_.isEmpty(this.document.querySelector(formElementCssClass + ' input'))) {
    formElement = 'input';
  }

  if (!_.isEmpty(this.document.querySelector(formElementCssClass + ' select'))) {
    formElement = 'select';
  }

  if (formElement === 'input') {
    if (this.document.querySelector(formElementCssClass + ' input').type === "text") {
      return 'text';
    }
    if (this.document.querySelector(formElementCssClass + ' input').type === "checkbox") {
      return 'checkbox';
    }
    if (this.document.querySelector(formElementCssClass + ' input').type === "radio") {
      return 'radio';
    }
  }
  if (!_.isEmpty(formElement) && this.document.querySelector(formElementCssClass + ' select').tagName === "SELECT") {
    return 'select';
  }

  throw 'No input type could be gathered.';

}

export default DomClient;