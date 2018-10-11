import $ from "jquery";

export default {
  $input: null,
  $container: null,
  data: [],
  init: function($parent) {
    const that = this;

    $parent.append([
      "<input type='text' id='tag-input' placeholder='테그 추가' maxlength='20' value='' />"
    ].join('\n'));
    that.$container = $parent;
    that.$input = $parent.find('#tag-input');
    that.$input.keyup((e) => that.keyup(e));
    that.$container.on('click', '.tag button', (e) => that.remove(e));
  },
  keyup: function(event) {
    //console.log('keyup', event);
    const that = this;
    const keyCode = event.keyCode;
    const enter = keyCode === 13;
    const value = $.trim(that.$input.val());

    if ($('.tag').hasClass('exist')) {
      $('.tag').removeClass('exist');
    }

    if (enter && value) {
      that.append(value);
      that.$input.val('');
    }
  },
  append: function(value, isInit) {
    console.log('append', arguments);
    const that = this;

    // validation
    // 값이 존재하면 기존 테그에 포커스
    if (that.checkExist(value)) {
      console.log('이미 존재함');
      return false;
    }

    $("<span class='tag'><span>" + value + "</span><button type='button'>X</button></span>")
      .insertBefore(that.$input);
    that.data.push(value);

    // 초기 셋팅시엔 저장 하지 않음.
    if (!isInit) {
      that.onChange();
    }
  },
  remove: function() {
    console.log('remove');
    const that = this;
    const $target = $(this).parent();
    const index = $('.tag').index($target);

    $target.remove();
    that.data.splice(index, 1);
    that.onChange();
  },
  reset: function() {
    const that = this;
    $('.tag').remove();
    that.data = [];
  },
  setData: function(arr) {
    const that = this;
    $.each(arr, function(i, item) {
      that.append(item, true); // 초기 셋팅
    });
    that.data = arr;
  },
  getData: function() {
    const that = this;
    return that.data;
  },
  checkExist: function(value) {
    const that = this;
    const index = that.data.indexOf(value);

    if (index > -1) {
      $('.tag:eq(' + index + ')').addClass('exist');
      return true;
    } else {
      return false;
    }
  },
  onChange: function() {}
};