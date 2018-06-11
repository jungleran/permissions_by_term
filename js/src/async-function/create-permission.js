import _ from 'lodash';
import Access from '../model/permission.prototype';

/**
 * @returns Access
 */
const createPermission = async (fetchFromBackend) => {
  let data = await fetchFromBackend(),
      fieldCssClasses = [];

  if (!_.isEmpty(data.taxonomyRelationFieldNames)) {
    data.taxonomyRelationFieldNames.forEach((fieldName) => {
      const fieldWrapperClass = '.field--name-' + fieldName.replace(/_/g, '-');

      fieldCssClasses.push(fieldWrapperClass);
    });
  }

  return new Access(
      data.taxonomyRelationFieldNames,
      data.permissions.userDisplayNames,
      data.permissions.roleLabels,
      fieldCssClasses
  );
}

export default createPermission;