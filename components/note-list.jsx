var React = require('react');

var isFirstTrigger = false;
var NoteList = React.createClass({
  componentDidMount: function() {
    console.log('NoteList componentDidMount', this.props.lists);
    var that = this;

    $('#wrap').on('click', '.list-wrap', function() {
      var data = $(this).data('obj');
      that.props.handleNoteData(data);

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

    if (!that.props.lists) {
      console.log('목록 없음');
      return false;
    }

    // 목록 생성
    var notes = that.props.lists.map(function(obj, i) {
      //console.log('여기다', obj, i);

      var id = obj.id;
      var title = obj.title;
      var date = obj.date;
      var content = obj.content;
      var obj = JSON.stringify(obj);

      return (
        <li key={i} className={i == that.props.currentNoteIdx ? "active": ""}>
          <div className="list-wrap" data-id={id} data-obj={obj}>
            <div>
              <strong>{title}</strong>
              <span>{date}</span>
              <p>{content}</p>
            </div>
          </div>
        </li>
      );
    });

    return (
      <section id="note-list">
        <strong id="head-title">노트</strong>
        <p id="head-info">{that.props.lists.length}개의 노트</p>
        <ul>
          {notes}
        </ul>
      </section>
    );
  }
});

module.exports = NoteList;
