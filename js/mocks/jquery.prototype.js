var jQuery = function(param){
};

jQuery.prototype.val = function() {
  return '1234';
}

function createJQuery() {
  return new jQuery();
}
