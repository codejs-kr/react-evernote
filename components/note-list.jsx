var React = require('react');

var isFirstTrigger = false;
var NoteList = React.createClass({
  componentDidMount: function() {
    console.log('NoteList componentDidMount', this.props.lists);
    var that = this;

    $('#wrap').on('click', '.list-wrap', function() {
      var targetNoteData = $(this).data('obj');
      var noteId = $(this).data('id');
      var data = $.note.readNote(noteId, function(data) {
        console.log('데이터', data);
        targetNoteData.content = data;
        targetNoteData.id = noteId;
        that.props.handleNoteData(targetNoteData);
      });

      // active
      $('#note-list .active').removeClass('active');
      $(this).parent().addClass('active');
    });
  },
  componentDidUpdate: function() {
    console.log('NoteList componentDidUpdate', this.props.lists);

    // 기본 첫번째 리스트 선택
    if (!isFirstTrigger) {
      $('.list-wrap:eq(2)').click();
      isFirstTrigger = true;
    }
  },
  render: function() {
    var that = this;
    var count = 0;

    if (!that.props.lists) {
      console.log('목록 없음');
      return false;
    }

    // 목록 생성
    var notes = Object.keys(that.props.lists).map(function(key, i) {
      //console.log('여기다', obj, i);
      var obj = that.props.lists[key];
      var title = obj.title;
      var date = obj.date;
      var preview = obj.preview;
      var obj = JSON.stringify(obj);
      count++;

      return (
        <li key={i} className={i == that.props.currentNoteIdx ? "active": ""}>
          <div className="list-wrap" data-id={key} data-obj={obj}>
            <div>
              <strong>{title}</strong>
              <span>{date}</span>
              <p>{preview}</p>
            </div>
          </div>
        </li>
      );
    });

    return (
      <section id="note-list">
        <strong id="head-title">노트</strong>
        <p id="head-info">{count}개의 노트</p>
        <ul>
          {notes}
        </ul>
      </section>
    );
  }
});

module.exports = NoteList;
