import createPermission from '../src/async-function/create-permission';
import _ from 'lodash';

QUnit.test( "Get permission objects by querying backend with all params", async function( assert ) {

  const fetchFromBackend = async() => {
    return {
      taxonomyRelationFieldNames: ['field-one', 'field-two', 'field-thrid'],
      permissions: {
        userDisplayNames: ['jeff', 'brandon', 'brian'],
        roleLabels: ['admin', 'editor']
      }
    };
  };

  /**
   * @var Permission permission
   */
  let permission = await createPermission(fetchFromBackend);

  assert.ok(permission.getUserDisplayName().length > 0, 'user display names are contained');
  assert.ok(permission.getRoles().length > 0, 'roles are contained');
  assert.ok(permission.getFieldWrapperCSSClasses().length > 0, 'field wrapper css classes are contained');
  assert.ok(permission.getTaxonomyRelationFieldNames().length > 0, 'taxonomy relation field names are contained');
});

QUnit.test( "Get permission objects by querying backend with partly params", async function( assert ) {

  const fetchFromBackend = async() => {
    return {
      taxonomyRelationFieldNames: undefined,
      permissions: {
        userDisplayNames: ['jeff', 'brandon', 'brian'],
      }
    };
  };

  /**
   * @var Access permission
   */
  let permission = await createPermission(fetchFromBackend);

  assert.ok(permission.getUserDisplayName().length > 0, 'user display names are contained');
  assert.ok(_.isEmpty(permission.getRoles()), 'roles are contained');
  assert.ok(_.isEmpty(permission.getFieldWrapperCSSClasses()), 'field wrapper css classes are contained');
  assert.ok(_.isEmpty(permission.getTaxonomyRelationFieldNames()), 'taxonomy relation field names are contained');
});