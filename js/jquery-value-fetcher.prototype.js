var jQueryValueFetcher = function($){
  this.jquery = $;
};

jQuery.prototype.fetch = function(selector) {
  return this.jquery(selector).val();
}

function createJQueryValueFetcher() {
  return new jQueryValueFetcher();
}
