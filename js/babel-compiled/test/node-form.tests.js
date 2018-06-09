'use strict';

QUnit.test("Compute field wrapper CSS classes", function (assert) {
  var $ = sinon.stub(),
      infoRenderer = sinon.stub(),
      document = sinon.stub(),
      nodeForm = new NodeForm(document, infoRenderer),
      fieldNames = ['field_name-one', 'field_name_two'];

  assert.deepEqual(nodeForm.computeFieldWrapperCSSClasses(fieldNames), ['.field--name-field-name-one', '.field--name-field-name-two']);
});

QUnit.test("Display permissions by select", function (assert) {
  var $ = sinon.stub();
  $.val = function () {};
  $.html = function () {};

  Drupal = sinon.stub();
  Drupal.t = sinon.stub();

  var infoRenderer = sinon.stub();
  var infoRendererSpy = sinon.spy();
  infoRenderer.render = infoRendererSpy;

  var document = {
    querySelector: sinon.stub().returns({
      val: sinon.stub().returns(['6'])
    })
  };

  var nodeForm = new NodeForm($, infoRenderer, document);

  // const NodeForm = new NodeForm(jQuery);
  var fieldNames = ['field_name-one', 'field_name_two'];

  var fieldWrapperCSSClasses = ['.field--name-field-name-one', '.field--name-field-name-two'];

  var formInfo = {
    permissions: {
      roleLabels: {
        6: 'Administrator'
      },
      userDisplayNames: {
        6: ['Administrator', 'Authenticated user'],
        7: ['Administrator'],
        9: ['Editor'],
        10: ['Anonymous user']
      }
    }
  };

  nodeForm.displayPermissionsBySelect(fieldWrapperCSSClasses, formInfo);

  // @TODO: Modify expected html to REALLY expected html!
  var expectedHtml = "undefined<br /><br /><b>undefined</b> <i>undefined</i><br /><b>undefined</b> <i>undefined</i>";

  assert.ok(infoRenderer.render.withArgs(expectedHtml).calledOnce, "Expect call with specific html for info rendering on advanced widget.");
});