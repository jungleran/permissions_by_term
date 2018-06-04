let Display = function() {

}

Display.prototype.computeFieldWrapperCSSClasses = function(fieldNames) {
  var wrapperCssClasses = [];

  for (var index = 0; index < fieldNames.length; ++index) {
    var fieldWrapperClass = '.field--name-' + fieldNames[index].replace(/_/g, '-');

    wrapperCssClasses.push(fieldWrapperClass);
  }

  return wrapperCssClasses;
}

Display.prototype.displayPermissionsByCheckingCheckbox = function(tid, checked, permissions) {
  if (checked === false) {
    this.resetData('checkbox_tid_' + tid);
  } else if (checked === true){
    this.addSelectedTid(parseInt(tid), 'checkbox_tid_' + tid);
  }

  this.renderPermissionsInfo(permissions);
}

Display.prototype.displayPermissionsByInitCheckbox = function(fieldWrapperCSSClasses, permissions) {
  for (var index = 0; index < this.jQuery(fieldWrapperCSSClasses + ' input:checkbox').length; ++index) {

    var checkbox = this.jQuery(fieldWrapperCSSClasses + ' input:checkbox')[index],
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

Display.prototype.displayPermissionsBySelect = function(fieldWrapperCSSClasses, permissions) {
  for (var index = 0; index < fieldWrapperCSSClasses.length; ++index) {
    var inputTypes = ['select', 'input'];

    var fieldWrapperCSSClass = fieldWrapperCSSClasses[index];

    for (var inputTypesIndex = 0; inputTypesIndex <= inputTypes.length; inputTypesIndex++) {
      let tids = this.document.querySelector(fieldWrapperCSSClass + ' select').val();

      if (tids !== undefined && tids !== null && tids.constructor === Array) {
        if (tids[0] === '_none') {
          this.resetData(fieldWrapperCSSClass);
        }

        for (var i = 0; i < tids.length; ++i) {
          if (isNaN(tids[i]) === false) {
            this.addSelectedTid(parseInt(tids[i]), fieldWrapperCSSClass);
          }
        }
      }

    }

  }

  this.renderPermissionsInfo(permissions);

}

Display.prototype.displayPermissionsByAutocomplete = function(fieldWrapperCSSClasses, permissions) {
  for (var index = 0; index < fieldWrapperCSSClasses.length; ++index) {
    var fieldWrapperCSSClass = fieldWrapperCSSClasses[index];

    var values = this.jQuery(fieldWrapperCSSClass + ' input').val();

    this.resetData(fieldWrapperCSSClass);

    if (values !== undefined && values.indexOf('(') !== -1 && values.indexOf(')')) {

      var tidsInBrackets = values.match(/\(\d+\)/g);

      if (tidsInBrackets !== undefined && tidsInBrackets !== null && tidsInBrackets.constructor === Array) {

        for (var i = 0; i < tidsInBrackets.length; ++i) {
          var selectedTid = parseInt(tidsInBrackets[i].replace('(', '').replace(')', ''));
          this.addSelectedTid(selectedTid, fieldWrapperCSSClass);
        }

      }

    }

  }

  this.renderPermissionsInfo(permissions);

}

Display.prototype.renderPermissionsInfo = function(permissions) {

  var permissionsToDisplay = this.getPermissionsByTids(this.getSelectedTids(), permissions);

  var allowedUsersHtml = '<b>' + Drupal.t('Allowed users:') + '</b> ';

  if (this.isAllowedUsersRestriction(permissionsToDisplay)) {
    allowedUsersHtml += permissionsToDisplay['permittedUsers'].join(', ');
  } else {
    allowedUsersHtml += '<i>' + Drupal.t('No user restrictions.') + '</i>';
  }

  var allowedRolesHtml = '<b>' + Drupal.t('Allowed roles:') + '</b> ';

  if (this.isAllowedRolesRestriction(permissionsToDisplay)) {
    allowedRolesHtml += permissionsToDisplay['permittedRoles'].join(', ');
  } else {
    allowedRolesHtml += '<i>' + Drupal.t('No role restrictions.') + '</i>';;
  }

  var generalInfoText = Drupal.t("This widget shows information about taxonomy term related permissions. It's being updated, as soon you make any related changes in the form.");

  let newTermInfo = this.document.createElement('div');
  newTermInfo.innerHTML = generalInfoText + '<br /><br />' + allowedUsersHtml + '<br />' + allowedRolesHtml;
  this.document.querySelector('#edit-permissions-by-term-info .form-type-item').replaceWith(newTermInfo);

}

Display.prototype.addFormElementCssClass = function(formElementCssClass) {
  this.formElementCssClasses.push(formElementCssClass);
}
