var isFirstTrigger = false;
var savedListCount = 0;
var React = require('react');
var NoteList = React.createClass({
  componentDidMount: function() {
    console.log('NoteList componentDidMount', this.props.lists);

    var that = this;
    $('#wrap').on('click', '.list-wrap', function() {
      var targetNoteData = JSON.parse($(this).attr('data-obj')); // data()로 할경우 이전 정보 갱신 안되는 증상 발생
      var noteId = $(this).attr('data-id');

      // read
      $.note.readNote(noteId, function(data) {
        //console.log('ID', noteId, data);
        targetNoteData.content = data;
        targetNoteData.id = noteId;
        that.props.handleNoteData(targetNoteData);
      });

      // active
      that.props.handleNoteIdx($(this).parent().index());
    });
  },
  componentDidUpdate: function() {
    console.log('NoteList componentDidUpdate', this.props.lists);

    // 기본 첫번째 리스트 선택
    if (!isFirstTrigger) {
      $('.list-wrap:first').click();
      isFirstTrigger = true;

      setTimeout(function() {
        $('#overlay').hide();
      }, 1000);
    }

    // 추가, 삭제시 처리
    if (isFirstTrigger && savedListCount != $('.list-wrap').length) {
      $('.list-wrap:first').click();
    }

    savedListCount = $('.list-wrap').length;
  },
  render: function() {
    var that = this;
    var count = 0;

    if (!that.props.lists) {
      console.log('목록 없음');
      return false;
    }

    // 목록 생성
    var notes = that.props.lists.map(function(data, i) {
      var obj = data;
      var id = obj.id;
      var title = obj.title ? obj.title : "제목없음";
      var date = $.util.getDate(obj.lastUpdateDate);
      var preview = {__html: obj.preview};
      var obj = JSON.stringify(obj);
      count++;

      return (
        <li key={i} className={i == that.props.currentNoteIdx ? "active": ""}>
          <div className="list-wrap" data-id={id} data-obj={obj}>
            <div>
              <strong>{title}</strong>
              <span>{date}</span>
              <article dangerouslySetInnerHTML={preview} />
            </div>
          </div>
        </li>
      );
    });

    return (
      <section id="note-list">
        <strong id="head-title">노트</strong>
        <div id="search-wrap">
          <button type="button" id="btn-search">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>

        <p id="head-info">{count}개의 노트</p>
        <ul>
          {notes}
        </ul>
      </section>
    );
  }
});

module.exports = NoteList;
