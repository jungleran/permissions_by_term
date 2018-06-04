var Term = function($, infoRenderer, document){
  this.jQuery = $;
  this.selectedTids = [];
  this.formElementCssClasses = [];
  this.infoRenderer = infoRenderer;
  this.document = document;
};

Term.prototype.getSelectedTids = function() {
  var tids = [];

  for (var index = 0; index < this.formElementCssClasses.length; ++index) {
    if (this.selectedTids[this.formElementCssClasses[index]] !== undefined && this.selectedTids[this.formElementCssClasses[index]].constructor === Array) {

      this.selectedTids[this.formElementCssClasses[index]].forEach(function(tid){
        tids.push(tid);
      })
    }
  }

  return tids;
}

Term.prototype.keyExists = function(key, array) {
  if (!array || (array.constructor !== Array && array.constructor !== Object)) {
    return false;
  }
  for (var i = 0; i < array.length; i++) {
    if (array[i] === key) {
      return true;
    }
  }
  return key in array;
}

Term.prototype.addSelectedTid = function(tid, formElementCssClass) {
  if (!this.keyExists(formElementCssClass, this.formElementCssClasses)) {
    this.formElementCssClasses.push(formElementCssClass);
  }

  if (this.selectedTids[formElementCssClass] === undefined) {

    this.selectedTids[formElementCssClass] = [];
  }

  this.selectedTids[formElementCssClass].push(tid);
}

Term.prototype.removeTid = function(value, formElementCssClass) {
  const index = this.selectedTids[formElementCssClass].indexOf(parseInt(value));

  if (index !== -1) {
    this.selectedTids[formElementCssClass].splice(index, 1);
  }
}

Term.prototype.resetData = function(formElementCssClass) {
  this.selectedTids[formElementCssClass] = [];
}
