var React = require('react');
var Tags = require('./content-top-tags.jsx');
var TopActions = React.createClass({
  componentDidMount: function() {
    $('#right-action button').click(function() {
      var $this = $(this);
      var command = $this.attr('id').split('-')[1];
      // TODO noteId 통합관리 필요
      var noteId = $('#note-list .active div').attr('data-id');

      switch(command) {
        case 'delete':
          if ($('#note-list li').length === 1) {
            alert('마지막 문서입니다. 새롭게 작성해 보세요.');
            return false;
          }

          if (confirm('정말 삭제 하시겠습니까?')) {
            $.note.deleteNote(noteId);
          }
          break;
        case 'favorite':
          $this.toggleClass('active');
          $.note.updateFavorite({
            id: noteId,
            isFavorite: $this.hasClass('active')
          });
          break;
        case 'info':
          $this.toggleClass('active');
          break;
        case 'fullscreen':
          console.log('fullscreen');
          break;
      }
    });
  },
  componentDidUpdate: function() {
    var data = this.props.currentNoteData;
    console.log('여기다', data);
  },
  render: function() {
    return (
      <section id="top-action">
        <div id="left-action">
          <Tags currentNoteData={this.props.currentNoteData} />
        </div>
        <div id="right-action">
          <button type="button"
            id="btn-favorite"
            className={this.props.currentNoteData && this.props.currentNoteData.isFavorite ? 'active' : ''}
            title="즐겨찾기"
          >
            <i className="fa fa-star fa-lg"></i>
          </button>
          <button type="button" id="btn-info" title="노트정보">
            <i className="fa fa-info-circle fa-lg"></i>
          </button>
          <button type="button" id="btn-delete" title="삭제">
            <i className="fa fa-trash fa-lg"></i>
          </button>
          <button type="button" id="btn-share" title="공유">
            <i className="fa fa-share-alt fa-lg"></i>
          </button>
          <button type="button" id="btn-fullscreen" title="전체화면">
            <i className="fa fa-arrows-alt fa-lg"></i>
          </button>

          <div id="note-info">
            <span class="arrow"></span>
            <ul>
              <li><span>제목</span>:<span>에버노트</span></li>
              <li><span>테그</span>:<span>하나, 둘, 셋, 넷</span></li>
              <li><span>만든날짜</span>:<span>2016-11-11</span></li>
              <li><span>수정날짜</span>:<span>2017-11-11</span></li>
              <li><span>작성자</span>:<span>codeJS</span></li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = TopActions;
