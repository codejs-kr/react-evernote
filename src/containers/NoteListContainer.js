import React, { Component, Fragment } from 'react';
import { NoteListItem } from 'components';
import api from 'contents/js/api';
import $ from 'jquery';

class NoteListContainer extends Component {
  constructor(props) {
    super(props);

    this.isFirstTrigger = false;
    this.savedListCount = 0;
  }

  getNoteList = () => {
    const { lists, currentNoteIdx } = this.props;
    let result = [];

    lists.map((data, i) => {
      result.push(
        <NoteListItem
          key={i}
          i={i}
          currentNoteIdx={currentNoteIdx}
          obj={data}
        />
      );
    });

    return result;
  };

  /**
   * 목록 추가 삭제시 포커스 갱신
   */
  updateFocus = () => {
    const { isFirstTrigger, savedListCount } = this;
    const { handleNoteIdx } = this.props;

    if (isFirstTrigger && savedListCount !== $('.list-wrap').length) {
      $('.list-wrap:first').click();
    }

    this.savedListCount = $('.list-wrap').length;
  };

  /**
   * 최초 로드시 첫번째 목록 선택
   */
  setFirstTrigger = () => {
    const { lists } = this.props;
    const { handleReadNote } = this;
    const data = lists[0];
    console.log('NoteList componentDidUpdate', lists);

    // 기본 첫번째 리스트 선택
    if (!this.isFirstTrigger) {
      handleReadNote(data.id, data);
      this.isFirstTrigger = true;
    }
  };

  /**
   * 노트 내용 호출
   * @param id
   * @param targetNoteData
   */
  handleReadNote = (id, targetNoteData) => {
    console.log('handleReadNote', id);
    const { handleNoteData } = this.props;

    // read
    api.note.readNote(id, function(data) {
      console.log('ID', id, data);
      targetNoteData.content = data;
      targetNoteData.id = id;
      handleNoteData(targetNoteData);
    });
  };

  componentDidMount() {
    const { handleNoteIdx } = this.props;
    const { handleReadNote, setFirstTrigger } = this;

    $('#root').on('click', '.list-wrap', function() {
      const targetNoteData = JSON.parse($(this).attr('data-obj')); // data()로 할경우 이전 정보 갱신 안되는 증상 발생
      const noteId = $(this).attr('data-id');

      handleReadNote(noteId, targetNoteData);

      // active
      handleNoteIdx($(this).parent().index());
    });

    setFirstTrigger();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { lists, currentNoteIdx } = this.props;

    return (
      nextProps.lists !== lists ||
      nextProps.currentNoteIdx !== currentNoteIdx
    );
  }

  componentDidUpdate(prevProps) {
    const { handleReadNote } = this;
    const { lists } = this.props;

    // 목록의 갯수가 바뀔때 첫번째 노트의 내용 보여 줍니다. (목록 추가 / 삭제)
    if (prevProps.lists.length !== lists.length) {
      const data = lists[0];
      const id = data.id;
      handleReadNote(id, data);
    }
  }

  render() {
    const { lists } = this.props;
    const { getNoteList } = this;

    return (
      <Fragment>
        <section id="note-list">
          <strong id="head-title">노트</strong>
          <div id="search-wrap">
            <button type="button" id="btn-search">
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </div>

          <p id="head-info">
            { lists.length }개의 노트
          </p>

          <ul>
            { getNoteList() }
          </ul>
        </section>
      </Fragment>
    );
  }
}

export default NoteListContainer;
