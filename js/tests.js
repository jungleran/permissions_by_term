QUnit.test( "Compute field wrapper CSS classes", function( assert ) {

  let jQuery = createJQuery();

  let nodeForm = createNodeForm(jQuery);
  let fieldNames = ['field_name-one', 'field_name_two'];

  console.log(nodeForm.computeFieldWrapperCSSClasses(fieldNames));

  assert.deepEqual(nodeForm.computeFieldWrapperCSSClasses(fieldNames), ['.field--name-field-name-one', '.field--name-field-name-two']);
});

QUnit.test( "Display permissions by select", function( assert ) {
  $ = sinon.stub();
  $.withArgs().returns(sinon.stub({
    val: function () {
    },
    html: function () {
    },
  }));

  Drupal = sinon.stub();
  Drupal.t = sinon.stub();

  let nodeForm = createNodeForm($);

  // const NodeForm = new NodeForm(jQuery);
  let fieldNames = ['field_name-one', 'field_name_two'];


  let fieldWrapperCSSClasses = ['.field--name-field-name-one', '.field--name-field-name-two'];

  let formInfo = {
    permissions: {
      roleLabels: {

      },
      userDisplayNames: {
        6: [
          'Administrator',
          'Authenticated user',
        ],
        7: [
          'Administrator',
        ],
        9: [
          'Editor',
        ],
        10: [
          'Anonymous user',
        ]
      }
    }
  };

  let permissionsDisplay = nodeForm.displayPermissionsBySelect(fieldWrapperCSSClasses, formInfo);

  console.log('foo');

});


