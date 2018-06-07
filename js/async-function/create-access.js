/**
 * @returns Access
 */
const createAccess = async (fetchFromBackend) => {
  let data = await fetchFromBackend(),
      fieldCssClasses = [];

  data.taxonomyRelationFieldNames.forEach((fieldName) => {
    const fieldWrapperClass = '.field--name-' + fieldName.replace(/_/g, '-');

    fieldCssClasses.push(fieldWrapperClass);
  });

  return new Access(
      data.taxonomyRelationFieldNames,
      data.permissions.userDisplayNames,
      data.permissions.roleLabels,
      fieldCssClasses
  );
}