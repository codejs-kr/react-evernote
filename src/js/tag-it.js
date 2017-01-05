/*!
 *
 * TagIt
 * @author dodortus (codejs.co.kr / dodortus@gmail.com)
 *
 */
function TagIt(options) {
  var _that = {
    $input: null,
    $container: null,
    data: [],
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
      var value = $.trim(_that.$input.val());

      if ($('.tag').hasClass('exist')) {
        $('.tag').removeClass('exist');
      }

      if (enter && value) {
        _that.append(value);
        _that.$input.val('');
      }
    },
    append: function(value, isInit) {
      console.log('append', arguments);

      // validation
      // 값이 존재하면 기존 테그에 포커스
      if (_that.checkExist(value)) {
        console.log('이미 존재함');
        return false;
      }

      $("<span class='tag'><span>" + value + "</span><button type='button'>X</button></span>")
      .insertBefore(_that.$input);
      _that.data.push(value);

      // 초기 셋팅시엔 저장 하지 않음.
      if (!isInit) {
        _that.onChange();
      }
    },
    remove: function() {
      console.log('remove');

      var $target = $(this).parent();
      var index = $('.tag').index($target);
      $target.remove();
      _that.data.splice(index, 1);
      _that.onChange();
    },
    reset: function() {
      $('.tag').remove();
      _that.data = [];
    },
    setData: function(arr) {
      $.each(arr, function(i, item) {
        _that.append(item, true); // 초기 셋팅
      });
      _that.data = arr;
    },
    getData: function() {
      return _that.data;
    },
    checkExist: function(value) {
      var index = _that.data.indexOf(value);
      if (index > -1) {
        $('.tag:eq(' + index + ')').addClass('exist');
        return true;
      } else {
        return false;
      }
    },
    onChange: function() {
      if (options.onChange) {
        options.onChange();
      } else {
        console.log('no onChange listener');
      }
    }
  }

  $.extend(this, _that);
}
