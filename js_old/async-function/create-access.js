import empty from '../util/empty';
import Access from '../model/access.prototype';

/**
 * @returns Access
 */
const createAccess = async (fetchFromBackend) => {
  let data = await fetchFromBackend(),
      fieldCssClasses = [];

  if (!empty(data.taxonomyRelationFieldNames)) {
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

export default createAccess;