const fs = require('fs');

describe('Node form testing', () => {

  let nodeForm = fs.readFileSync('node-form.prototype.js','utf-8');
  eval(nodeForm);

  let jquery = fs.readFileSync('./mocks/jquery.prototype.js','utf-8');
  eval(jquery);

  test('Compute field wrapper CSS classes', () => {
    const jQuery = {
      val(fn) {
        if (fn) fn();
        return this;
      }
    };

    let nodeForm = createNodeForm(jQuery);
    let fieldNames = ['field_name-one', 'field_name_two'];

    expect(nodeForm.computeFieldWrapperCSSClasses(fieldNames)).toEqual(['.field--name-field-name-one', '.field--name-field-name-two']);
  });

  test('Display permissions by select', (readFile) => {
    let jQueryMock = createJQuery();

    let nodeForm = createNodeForm(jQueryMock);

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

});

