var React = require('react');
var noteId = null;
var Article = React.createClass({
  render: function() {
    return (
      <main>
        <h1><input type="text" value="불러오는 중입니다..." placeholder="제목을 입력하세요."></input></h1>
        <article>
          <textarea id="editor" placeholder="컨텐츠 영역"></textarea>
        </article>
      </main>
    );
  },
  componentDidMount: function() {
    // var data = this.props.currentNoteData;
    // console.log('여기다1', data);
    //
    // if (data) {
    //   $('h1').html(data.title);
    //   editor.init(data.content);
    // }
  },
  componentDidUpdate: function() {
    console.log('변경확인', this.props.currentNoteData);

    var data = this.props.currentNoteData;
    if (!data) {
      return false;
    }

    noteId = data.id;
    $('h1 input').val(data.title || '');
    if (editor.target) {
      if (data && data.content) {
        editor.update(data.content);
      }
    } else {
      if (data) {
        editor.init(data.content);
      }
    }
  }
});

var editor = {
  target: null,
  timeID: null,
  init: function(data) {
    CKEDITOR.replace('editor');
    var editorObj = CKEDITOR.instances.editor;
    this.target = editorObj;
    editorObj.setData(data);

    var config = CKEDITOR.config;
    config.height = '80em';
    console.log('editorObj', editorObj, 'config', config);

    editorObj.on('contentDom', function() {
      var editable = editorObj.editable();

      /*
      * 목록 가져오기로 setData() 이후 이벤트가 풀리는 증상 해결.
      * ref: http://stackoverflow.com/questions/16054070/ckeditor-setdata-prevents-attaching-of-events-with-on-function
      */
      editable.attachListener(editorObj.document, 'keyup', function(event) {
        editor.onKeyup(event.data.$);
      });
    });
  },
  update: function(data) {
    this.target.setData(data);
  },
  getContent: function() {
    return this.target.getData();
  },
  save: function() {
    console.log('save', arguments);
    var data = this.getContent();

    // API 저장
    $.note.updateNote({
      id: noteId,
      content: data
    });
    // changeState('saving');
    // api.note.save(data, function() {
    //   changeState('saved');
    // }, function() {
    //   changeState('failed');
    // });
  },
  /**
   * saveRequest
   * 변경사항이 생길때 1.5초 초과시 save() 실행
   */
  saveRequest: function() {
    var that = this;
    if (this.timeID) {
      clearTimeout(this.timeID);
    }

    this.timeID = setTimeout(function() {
      that.save();
    }, 1500);
  },
  onKeyup: function(event) {
    console.log('onKeyEvent', arguments);
    this.saveRequest();
  }
}

module.exports = Article;
