import PermissionOutputCollector from '../src/client/permission-output-collector.prototype';
import PermissionOutput from '../src/model/permission-output.prototype';
import createPermission from "../src/async-function/create-permission";
import TermCollector from "../src/client/term-collector.prototype";
import DomClient from "../src/client/dom-client.prototype";
import sinon from "sinon";

QUnit.test("Collect output roles and usernames", async ( assert ) => {

  const fetchFromBackend = async() => {
    return {
      taxonomyRelationFieldNames: ['field-one', 'field-two', 'field-thrid'],
      permissions: {
        userDisplayNames: {
          '2': ['jeff'],
          '4': ['brandon', 'brian']
        },
        roleLabels: {
          '1': ['admin','editor'],
          '2': ['editor']
        }
      }
    };
  };

  let document = {
    querySelector: sinon.stub().returns({
      val: sinon.stub().returns('(2)')
    })
  }

  const domClient = new DomClient(document),
      termCollector = new TermCollector;
  termCollector.addSelectedTids(domClient.computeTidsByAutocomplete(['first-field', 'second-field']));

  /**
   * @var Backend[] permissions
   */
  let permissions = await createPermission(fetchFromBackend);

  let permissionOutput = new PermissionOutput;

  let permissionOutputCollector = new PermissionOutputCollector(permissionOutput);

  permissionOutputCollector.collect(permissions, termCollector.getSelectedTids());

  assert.deepEqual(permissionOutputCollector.getPermissionOutput().getRoles(), ['editor']);
  assert.deepEqual(permissionOutputCollector.getPermissionOutput().getUsernames(), ['jeff']);

});