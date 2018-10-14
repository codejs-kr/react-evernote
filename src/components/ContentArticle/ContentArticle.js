import React, { Component } from 'react';
import './ContentArticle.scss';
import $ from 'jquery';
import editor from 'contents/js/editor';

class ContentArticle extends Component {
  constructor(props) {
    super(props);

    this.noteId = null;
  }

  setEditor = () => {
    const data = this.props.currentNoteData;
    const $title = $('h1 input');
    console.log('본문 초기 설정', data);

    $title.val(data.title || '');
    editor.init(data.id, data.content);

    $('h1 input').keyup(function(e) {
      editor.onKeyup(e, true);
    });
  };

  updateEditor = () => {
    const data = this.props.currentNoteData;
    console.log('본문 갱신', data);

    // 다른 노트를 선택한 경우 갱신
    if (editor.target) {

      const $title = $('h1 input');
      $title.val(data.title || '');
      editor.update(data.id, data.content);
    }
  };

  componentDidMount() {
    const data = this.props.currentNoteData;

    this.setEditor();
    this.noteId = data.id;
  }

  componentDidUpdate() {
    const data = this.props.currentNoteData;

    if (this.noteId !== data.id) {
      this.updateEditor();
    }

    this.noteId = data.id;
  }

  render() {
    return (
      <main>
        <h1>
          <input type="text" placeholder="제목을 입력하세요." />
        </h1>
        <article>
          <textarea id="editor" placeholder="컨텐츠 영역" />
        </article>
      </main>
    );
  }
}

export default ContentArticle;