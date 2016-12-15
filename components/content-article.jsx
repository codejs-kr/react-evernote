var React = require('react');
var noteId = null;
var Article = React.createClass({
  render: function() {
    return (
      <main>
        <h1><input type="text" placeholder="제목을 입력하세요." /></h1>
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
    $('h1 input').keyup(function(e) {
      editor.onKeyup(e, true);
    });
  },
  componentDidUpdate: function() {
    console.log('변경확인', this.props.currentNoteData);

    var data = this.props.currentNoteData;
    if (!data) {
      return false;
    }

    $('h1 input').val(data.title || '');
    if (editor.target) {
      // 현재 작성중인 노트일때 업데이트 안함.
      if (data.id != noteId) {
        console.log('본문 업데이트')
        editor.update(data.content);
      }
    } else {
      if (data) {
        editor.init(data.content);
      }
    }

    // 현재 노트 ID저장
    noteId = data.id;
  }
});

var editor = {
  target: null,
  timeID: null,
  init: function(data) {
    CKEDITOR.replace('editor');
    var editorObj = CKEDITOR.instances.editor;
    var config = CKEDITOR.config;
    editorObj.setData(data);
    config.height = '80em';
    this.target = editorObj;
    //console.log('editorObj', editorObj, 'config', config);

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
  getTitle: function() {
    return $('h1 input').val();
  },
  getContent: function() {
    return this.target.getData();
  },
  save: function(isTitle) {
    console.log('save', arguments);

    var data = null;
    if (isTitle) {
      data = this.getTitle();
      $.note.updateTitle({
        id: noteId,
        title: data
      });
    } else {
      data = this.getContent();
      $.note.updateNote({
        id: noteId,
        content: data
      });
    }
    // changeState('saving');
    // api.note.save(data, function() {
    //   changeState('saved');
    // }, function() {
    //   changeState('failed');
    // });
  },
  /**
   * saveRequest
   * 변경사항이 생길때 1초 초과시 save() 실행
   */
  saveRequest: function(isTitle) {
    var that = this;
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
}

module.exports = Article;
