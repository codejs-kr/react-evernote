import $ from "jquery";
import api from 'contents/js/api';

export default {
  target: null,
  timeID: null,
  noteID: null,
  init: function(id, data) {
    const that = this;
    that.noteID = id;

    CKEDITOR.replace('editor');
    const editorObj = CKEDITOR.instances.editor;
    const config = CKEDITOR.config;
    editorObj.setData(data);
    config.height = '80em';
    this.target = editorObj;
    //console.log('editorObj', editorObj, 'config', config);

    editorObj.on('contentDom', function() {
      const editable = editorObj.editable();

      /*
       * 목록 가져오기로 setData() 이후 이벤트가 풀리는 증상 해결.
       * ref: http://stackoverflow.com/questions/16054070/ckeditor-setdata-prevents-attaching-of-events-with-on-function
       */
      editable.attachListener(editorObj.document, 'keyup', function(event) {
        that.onKeyup(event.data.$);
      });
    });
  },
  update: function(data) {
    this.target.setData(data);
  },
  getTitle: function() {
    return $('h1 input').val();
  },
  getContent: function() {
    return this.target.getData();
  },
  save: function(isTitle) {
    console.log('save', arguments);

    const that = this;
    let data = null;

    // 타이틀 변경시
    if (isTitle) {
      data = that.getTitle();
      api.note.updateTitle({
        id: that.noteID,
        title: data
      });

    // 본문 변경시
    } else {
      data = that.getContent();
      api.note.updateNote({
        id: that.noteID,
        content: data
      });
    }
  },
  /**
   * saveRequest
   * 변경사항이 생길때 1초 초과시 save() 실행
   */
  saveRequest: function(isTitle) {
    const that = this;
    if (this.timeID) {
      clearTimeout(this.timeID);
    }

    this.timeID = setTimeout(function() {
      that.save(isTitle);
    }, 500);
  },
  onKeyup: function(event, isTitle) {
    console.log('onKeyEvent', arguments);
    this.saveRequest(isTitle);
  }
};