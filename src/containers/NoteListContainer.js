import React, { Component, Fragment } from 'react';
import { NoteListItem } from 'components';
import api from 'contents/js/api';
import $ from 'jquery';

class NoteListContainer extends Component {
  constructor(props) {
    super(props);
    this.count = 1;
  }

  getNoteList = () => {
    const { lists, currentNoteIdx } = this.props;
    let result = [];
    this.count = 1;

    lists.map((data, i) => {
      //console.log('확인 data', data, i);
      let obj = data;
      this.count++;

      result.push(
        <NoteListItem
          key={i}
          i={i}
          currentNoteIdx={currentNoteIdx}
          obj={obj}
        />
      );
    });

    console.log('확인 result', result);

    return result;
  };

  componentDidMount() {
    const { handleNoteData, handleNoteIdx } = this.props;

    $('#root').on('click', '.list-wrap', function() {
      const targetNoteData = JSON.parse($(this).attr('data-obj')); // data()로 할경우 이전 정보 갱신 안되는 증상 발생
      const noteId = $(this).attr('data-id');

      // read
      api.note.readNote(noteId, function(data) {
        console.log('ID', noteId, data);
        targetNoteData.content = data;
        targetNoteData.id = noteId;
        handleNoteData(targetNoteData);
      });

      // active
      handleNoteIdx($(this).parent().index());
    });
  }

  componentDidUpdate() {
    console.log('NoteList componentDidUpdate', this.props.lists);

    //// 기본 첫번째 리스트 선택
    //if (!isFirstTrigger) {
    //  $('.list-wrap:first').click();
    //  isFirstTrigger = true;
    //
    //  setTimeout(function() {
    //    $('#overlay').fadeOut(function() {
    //      $(this).remove();
    //    });
    //  }, 1000);
    //}
    //
    //// 추가, 삭제시 처리
    //if (isFirstTrigger && savedListCount != $('.list-wrap').length) {
    //  $('.list-wrap:first').click();
    //}
    //
    //savedListCount = $('.list-wrap').length;
  }

  render() {
    const { getNoteList } = this;
    const notes = getNoteList();

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
            { this.count }개의 노트
          </p>

          <ul>
            { notes }
          </ul>
        </section>
      </Fragment>
    );
  }
}

export default NoteListContainer;
