var React = require('react');
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
  init: function(data) {
    CKEDITOR.replace('editor');
    this.target = CKEDITOR.instances.editor;
    this.target.setData(data);

    var config = CKEDITOR.config;
    console.log('config', config);
    config.height = '80em';
  },
  update: function(data) {
    this.target.setData(data);
  }
}

module.exports = Article;
