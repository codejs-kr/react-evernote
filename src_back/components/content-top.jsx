var React = require('react');
var Tags = require('./content-top-tags.jsx');
var TopActions = React.createClass({
  getInitialState: function() {
    return {
      activedInfo: false,
      activedFullScreen: false
    };
  },
  componentDidMount: function() {
    var that = this;
    $('#right-action button').click(function() {
      var $this = $(this);
      var command = $this.attr('id').split('-')[1];
      // TODO noteId 통합관리 필요
      var noteId = $('#note-list .active div').attr('data-id');

      switch(command) {
        case 'favorite':
          $this.toggleClass('active');
          $.note.updateFavorite({
            id: noteId,
            isFavorite: $this.hasClass('active')
          });
          break;
        case 'info':
          $this.toggleClass('active');
          that.setState({
            activedInfo: $this.hasClass('active')
          });
          break;
        case 'delete':
          if ($('#note-list li').length === 1) {
            alert('마지막 문서입니다. 새롭게 작성해 보세요.');
            return false;
          }

          if (confirm('정말 삭제 하시겠습니까?')) {
            $.note.deleteNote(noteId);
          }
          break;
        case 'fullscreen':
          $this.toggleClass('active');
          $this.hasClass('active') ? $.util.startFullScreen() : $.util.endFullScreen();
          console.log('fullscreen');
          break;
      }
    });
  },
  componentDidUpdate: function() {
    var data = this.props.currentNoteData;
    console.log('확인 data', data);

    if (data) {
      $('#info-title').html(data.title ? data.title : "없음");
      $('#info-tags').html(data.tags ? data.tags.join(', ') : "없음");
      $('#info-create-date').html($.util.getDate(data.createDate));
      $('#info-update-date').html($.util.getDate(data.lastUpdateDate));
      $('#info-owner').html('codeJS');
    }
  },
  render: function() {
    var data = this.props.currentNoteData;
    return (
      <section id="top-action">
        <div id="left-action">
          <Tags currentNoteData={data} />
        </div>
        <div id="right-action">
          <button type="button"
            id="btn-favorite"
            className={data && data.isFavorite ? 'active' : ''}
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

          <div id="note-info" className={this.state.activedInfo ? "active" : ""}>
            <span className="arrow"></span>
            <ul>
              <li><span>제목</span>:<span id="info-title"></span></li>
              <li><span>테그</span>:<span id="info-tags"></span></li>
              <li><span>만든날짜</span>:<span id="info-create-date"></span></li>
              <li><span>수정날짜</span>:<span id="info-update-date"></span></li>
              <li><span>생성자</span>:<span id="info-owner"></span></li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = TopActions;
