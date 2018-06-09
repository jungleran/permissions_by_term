import createAccess from '../async-function/create-access';
import empty from '../util/empty';

QUnit.test( "Get access objects by querying backend with all params", async function( assert ) {

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
   * @var Access access
   */
  let access = await createAccess(fetchFromBackend);

  assert.ok(access.getUserDisplayName().length > 0, 'user display names are contained');
  assert.ok(access.getRoles().length > 0, 'roles are contained');
  assert.ok(access.getFieldWrapperCSSClasses().length > 0, 'field wrapper css classes are contained');
  assert.ok(access.getTaxonomyRelationFieldNames().length > 0, 'taxonomy relation field names are contained');
});

QUnit.test( "Get access objects by querying backend with partly params", async function( assert ) {

  const fetchFromBackend = async() => {
    return {
      taxonomyRelationFieldNames: undefined,
      permissions: {
        userDisplayNames: ['jeff', 'brandon', 'brian'],
      }
    };
  };

  /**
   * @var Access access
   */
  let access = await createAccess(fetchFromBackend);

  assert.ok(access.getUserDisplayName().length > 0, 'user display names are contained');
  assert.ok(empty(access.getRoles()), 'roles are contained');
  assert.ok(empty(access.getFieldWrapperCSSClasses()), 'field wrapper css classes are contained');
  assert.ok(empty(access.getTaxonomyRelationFieldNames()), 'taxonomy relation field names are contained');
});