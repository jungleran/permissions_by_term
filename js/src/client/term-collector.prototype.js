const _ = require('lodash');

let TermCollector = function($, infoRenderer, document){
  this.selectedTids = [];
};

TermCollector.prototype.getSelectedTids = function() {
  return this.selectedTids;
}

TermCollector.prototype.keyExists = function(key, array) {
  if (!array || (array.constructor !== Array && array.constructor !== Object)) {
    return false;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i] === key) {
      return true;
    }
  }
  return key in array;
}

TermCollector.prototype.addSelectedTid = function(tid) {
  this.selectedTids.push(tid);
}

TermCollector.prototype.addSelectedTids = function(tids) {
  if (!_.isEmpty(tids)) {
    tids.forEach((tid) => {
      this.addSelectedTid(tid);
    });
  }
}

TermCollector.prototype.removeTid = function(value, formElementCssClass) {
  const index = this.selectedTids[formElementCssClass].indexOf(parseInt(value));

  if (index !== -1) {
    this.selectedTids[formElementCssClass].splice(index, 1);
  }
}

TermCollector.prototype.resetData = function(formElementCssClass) {
  this.selectedTids[formElementCssClass] = [];
}

export default TermCollector;