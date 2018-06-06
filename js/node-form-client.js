(() => {

  'use strict';

  if (document.querySelector("#edit-permissions-by-term-info") !== null) {

    /**
     * @returns Access
     */
    let createAccess = async () => {
      let contentType = null;
      if (window.location.href.indexOf('/node/add') !== -1) {
        contentType = window.location.href.split("/").pop();
      }

      let url = '/admin/permissions-by-term/access-info-by-url?url=' + window.location.pathname;
      if (contentType !== null) {
        url = '/admin/permissions-by-term/access-info-by-content-type/' + contentType;
      }

      return await fetch(url, { credentials:'include' })
        .then(function(response) {
          return response.json();
        }).then(function(data) {
          return new Access(data.taxonomyRelationFieldNames, data.permissions.userDisplayNames, data.permissions.roleLabels);
        });
    };

    /**
     * @type {Drupal~behavior}
     */
    Drupal.behaviors.nodeForm = {
      attach: async () => {
        /**
         * @var Access access
         */
        let access = await createAccess();


        // $.when(getFormInfo).done((formInfo) => {
        //
        //   if (formInfo['taxonomyRelationFieldNames'] !== null) {
        //
        //     let infoRenderer = new InfoRenderer($);
        //     let nodeForm = new NodeForm($, infoRenderer),
        //         fieldWrapperCSSClasses = nodeForm.computeFieldWrapperCSSClasses(formInfo['taxonomyRelationFieldNames']);
        //
        //     initPermissionInfoByFormElements(nodeForm, fieldWrapperCSSClasses, formInfo);
        //
        //     for (let formElementCssClass in fieldWrapperCSSClasses) {
        //       nodeForm.addFormElementCssClass(formElementCssClass);
        //
        //       $(formElementCssClass + ' select').change(() => {
        //         nodeForm.displayPermissionsBySelect(fieldWrapperCSSClasses, formInfo['permissions']);
        //       });
        //
        //       $(formElementCssClass + ' input[type="text"]').on('autocomplete-select', () => {
        //         nodeForm.displayPermissionsByAutocomplete(fieldWrapperCSSClasses, formInfo['permissions']);
        //       });
        //
        //       $(formElementCssClass + ' input[type="text"]').on('keyup', () => {
        //         nodeForm.displayPermissionsByAutocomplete(fieldWrapperCSSClasses, formInfo['permissions']);
        //       });
        //
        //
        //       $(formElementCssClass + ' input[type="checkbox"]').change(() => {
        //         nodeForm.displayPermissionsByCheckingCheckbox($(this).prop('value'), $(this).prop('checked'), formInfo['permissions']);
        //       });
        //     }
        //   }
        //
        // });
        //
        // function initPermissionInfoByFormElements(nodeForm, fieldWrapperCSSClasses, formInfo) {
        //   nodeForm.displayPermissionsBySelect(fieldWrapperCSSClasses, formInfo['permissions']);
        //   nodeForm.displayPermissionsByAutocomplete(fieldWrapperCSSClasses, formInfo['permissions']);
        //   nodeForm.displayPermissionsByInitCheckbox(fieldWrapperCSSClasses, formInfo['permissions']);
        // }

      }
    };

    if (Drupal.autocomplete) {
      /**
       * Handles an auto-complete select event.
       *
       * Override the autocomplete method to add a custom event. Overriding is
       * happening to get full input.
       *
       * @param {jQuery.Event} event
       *   The event triggered.
       * @param {object} ui
       *   The jQuery UI settings object.
       *
       * @return {boolean}
       *   Returns false to indicate the event status.
       */
      Drupal.autocomplete.options.select = function selectHandler(event, ui) {
        var terms = Drupal.autocomplete.splitValues(event.target.value);
        // Remove the current input.
        terms.pop();
        // Add the selected item.
        if (ui.item.value.search(',') > 0) {
          terms.push('"' + ui.item.value + '"');
        }
        else {
          terms.push(ui.item.value);
        }
        event.target.value = terms.join(', ');
        // Fire custom event that other controllers can listen to.
        jQuery(event.target).trigger('autocomplete-select');

        // Return false to tell jQuery UI that we've filled in the value already.
        return false;
      }
    }

  }

})(jQuery, window);
