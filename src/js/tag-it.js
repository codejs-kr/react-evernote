/*!
 *
 * TagIt
 * @author dodortus (codejs.co.kr / dodortus@gmail.com)
 *
 */
function TagIt() {
  var _that = {
    $input: null,
    $container: null,
    init: function($parent) {
      console.log('init');

      $parent.append([
        "<input type='text' id='tag-input' placeholder='테그 추가' maxlength='20' value='' />"
      ].join('\n'));
      _that.$container = $parent;
      _that.$input = $parent.find('#tag-input');
      _that.$input.keyup(_that.keyup);
      _that.$container.on('click', '.tag button', _that.remove);
    },
    keyup: function(event) {
      //console.log('keyup', event);

      var keyCode = event.keyCode;
      var enter = keyCode === 13;
      var space = keyCode === 32;
      var value = $.trim(_that.$input.val());

      if ((enter || space) && value) {
        _that.append(value);
        _that.$input.val('');
      }
    },
    append: function(value) {
      console.log('append');

      $("<span class='tag'>" + value + "<button type='button'>X</button></span>").insertBefore(_that.$input);
    },
    remove: function() {
      console.log('remove');

      $(this).parent().remove();
    },
    reset: function() {
      $('.tag').remove();
    },
    setData: function(arr) {
      $.each(arr, function(i, item) {
        _that.append(item);
      });
    },
    getData: function() {
      // TODO save
    },
    checkExist: function() {

    }
  }

  $.extend(this, _that);
}
