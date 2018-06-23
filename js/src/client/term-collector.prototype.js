const _ = require('lodash');

let TermCollector = function($, infoRenderer, document){
  this.selectedTids = [];
};

TermCollector.prototype.getSelectedTids = function() {
  return this.selectedTids;
}

TermCollector.prototype.termExists = function(key) {
  if (!this.selectedTids || (this.selectedTids.constructor !== Array && this.selectedTids.constructor !== Object)) {
    return false;
  }
  for (let i = 0; i < this.selectedTids.length; i++) {
    if (this.selectedTids[i] === key) {
      return true;
    }
  }
  return key in this.selectedTids;
}

TermCollector.prototype.addSelectedTid = function(tid) {
  if (!this.termExists(tid)) {
    this.selectedTids.push(tid);
  }
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