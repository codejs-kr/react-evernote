var React = require('react');

var NoteList = React.createClass({
  render: function() {
    var that = this;

    if (!that.props.lists) {
      console.log('목록 없음');
      return false;
    }

    var notes = that.props.lists.map(function(obj, i) {
      console.log('여기다', obj, i);

      var title = obj.title;
      var date = obj.date;
      var content = obj.content;
      var url = "#" + title;

      return (
        <li key={i} className={i == that.props.current ? "active": ""}>
          <div className="list-wrap" data-url={url}>
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
