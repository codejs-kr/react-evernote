import React, { Component } from 'react';
import './ContentArticle.scss';
import $ from 'jquery';
import editor from 'contents/js/editor';

let noteId = null;

class ContentArticle extends Component {
  constructor(props) {
    super(props);
  }

  setEditor = () => {
    const data = this.props.currentNoteData;

    if (!data) {
      return false;
    }

    console.log('확인 data', data);

    const $title = $('h1 input');

    // 다른 노트를 선택한 경우 갱신
    if (editor.target) {
      if (data.id !== noteId) {
        console.log('본문 갱신');
        $title.val(data.title || '');
        editor.update(data.content);
      }

    // 초기 설정
    } else {
      if (data) {
        console.log('본문 초기 설정');
        $title.val(data.title || '');
        editor.init(data.id, data.content);
      }
    }

    // 현재 노트 ID저장
    noteId = data.id;
  };

  componentDidMount() {
    $('h1 input').keyup(function(e) {
      editor.onKeyup(e, true);
    });

    this.setEditor();
  }

  componentDidUpdate() {
    this.setEditor();
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