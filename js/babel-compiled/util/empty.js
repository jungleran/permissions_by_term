'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const empty = mixedVar => {
  let undef,
      key,
      i,
      len,
      emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  return false;
};

exports.default = empty;