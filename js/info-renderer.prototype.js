var InfoRenderer = function($){
  this.jquery = $;
};

InfoRenderer.prototype.render = function(html) {
  this.jQuery('#edit-permissions-by-term-info .form-type-item').html(html);
}
