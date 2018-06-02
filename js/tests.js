if (typeof window === 'undefined') {
  sinon = require('sinon');
  let fs = require('fs');

  fs.readFile('node-form.prototype.js');

  prototypeClass = fs.readFileSync('node-form.prototype.js','utf-8');
  eval(prototypeClass);
}

QUnit.test( "Compute field wrapper CSS classes", function( assert ) {
  let $ = sinon.stub();;

  let infoRenderer = sinon.stub();

  let nodeForm = new NodeForm($, infoRenderer);
  let fieldNames = ['field_name-one', 'field_name_two'];

  console.log(nodeForm.computeFieldWrapperCSSClasses(fieldNames));

  assert.deepEqual(nodeForm.computeFieldWrapperCSSClasses(fieldNames), ['.field--name-field-name-one', '.field--name-field-name-two']);
});

QUnit.test( "Display permissions by select", function( assert ) {
  let $ = sinon.stub();
  $.withArgs().returns(sinon.stub({
    val: function () {
    },
    html: function () {
    },
  }));

  Drupal = sinon.stub();
  Drupal.t = sinon.stub();

  var infoRenderer = sinon.stub();
  var infoRendererSpy = sinon.spy();
  infoRenderer.render = infoRendererSpy;

  let nodeForm = new NodeForm($, infoRenderer);

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

  nodeForm.displayPermissionsBySelect(fieldWrapperCSSClasses, formInfo);

  // @TODO: Modify expected html to REALLY expected html!
  var expectedHtml = "undefined<br /><br /><b>undefined</b> <i>undefined</i><br /><b>undefined</b> <i>undefined</i>";

  assert.ok( infoRenderer.render.withArgs(expectedHtml).calledOnce, "Expect call with specific html for info rendering on advanced widget." );

});


