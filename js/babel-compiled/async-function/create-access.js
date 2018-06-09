'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _empty = require('../util/empty');

var _empty2 = _interopRequireDefault(_empty);

var _access = require('../model/access.prototype');

var _access2 = _interopRequireDefault(_access);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @returns Access
 */
const createAccess = async fetchFromBackend => {
  let data = await fetchFromBackend(),
      fieldCssClasses = [];

  if (!(0, _empty2.default)(data.taxonomyRelationFieldNames)) {
    data.taxonomyRelationFieldNames.forEach(fieldName => {
      const fieldWrapperClass = '.field--name-' + fieldName.replace(/_/g, '-');

      fieldCssClasses.push(fieldWrapperClass);
    });
  }

  return new _access2.default(data.taxonomyRelationFieldNames, data.permissions.userDisplayNames, data.permissions.roleLabels, fieldCssClasses);
};

exports.default = createAccess;