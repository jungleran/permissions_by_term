import createPermission from '../async-function/create-permission';
import fetchFromBackend from '../async-function/fetch-from-backend';
import DomClient from "../client/dom-client.prototype";

(() => {

  'use strict';

  if (document.querySelector("#edit-permissions-by-term-info") !== null) {


    /**
     * @type {Drupal~behavior}
     */
    Drupal.behaviors.nodeForm = {
      attach: async () => {
        /**
         * @var Backend backend
         */
        let backend = await createPermission(fetchFromBackend);

        const hasTaxonomyFormFields = (permissions) => {
          if (permissions.taxonomyRelationFieldNames.length !== 0) {
            return true;
          }

          return false;
        }

        if (hasTaxonomyFormFields(backend)) {

          for (let formElementCssClass in backend.getFieldWrapperCSSClasses()) {
            // $(formElementCssClass + ' select').change(() => {
            //   nodeForm.displayPermissionsBySelect(fieldWrapperCSSClasses, formInfo['permissions']);
            // });

            document.querySelector(formElementCssClass + ' input[type="text"]').addEventListener('autocomplete-select', () => {
              let permissionOutput = new PermissionOutput;
              let permissionOutputCollector = new PermissionOutputCollector(permissionOutput);

              permissionOutputCollector.collect(backend, termCollector.getSelectedTids());

              const domClient = new DomClient(document, permissionOutputCollector.getPermissionOutput(), Drupal);
              domClient.renderPermissionsInfo();
            });

            // $(formElementCssClass + ' input[type="text"]').on('autocomplete-select', () => {
            //   nodeForm.displayPermissionsByAutocomplete(fieldWrapperCSSClasses, formInfo['permissions']);
            // });

            // $(formElementCssClass + ' input[type="text"]').on('keyup', () => {
            //   nodeForm.displayPermissionsByAutocomplete(fieldWrapperCSSClasses, formInfo['permissions']);
            // });
            //
            //
            // $(formElementCssClass + ' input[type="checkbox"]').change(() => {
            //   nodeForm.displayPermissionsByCheckingCheckbox($(this).prop('value'), $(this).prop('checked'), formInfo['permissions']);
            // });
          }


          // function initPermissionInfoByFormElements(nodeForm, fieldWrapperCSSClasses, formInfo) {
          //   nodeForm.displayPermissionsBySelect(fieldWrapperCSSClasses, formInfo['permissions']);
          //   nodeForm.displayPermissionsByAutocomplete(fieldWrapperCSSClasses, formInfo['permissions']);
          //   nodeForm.displayPermissionsByInitCheckbox(fieldWrapperCSSClasses, formInfo['permissions']);
          // }
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

    }
  }

})(window);
