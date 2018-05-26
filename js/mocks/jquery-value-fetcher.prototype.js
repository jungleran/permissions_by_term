var jQueryValueFetcher = function($){
  this.jquery = $;
};

jQuery.prototype.fetch = function(selector) {
  return 'foo-value';
}

function createJQueryValueFetcher() {
  return new jQueryValueFetcher();
}
