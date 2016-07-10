var React = require('react');

var NoteList = React.createClass({
  render: function() {
    var that = this;

    var notes = that.props.menus.map(function(name, i) {
      var url = "#" + name;

      return (
        <li key={i} className={i == that.props.current ? "active": ""}>
          <div className="list-wrap" data-url={url}>
            <div>
              <strong>노트 제목{name}</strong>
              <span>어제</span>
              <p>
                [16.06.16] 브랜드사이트 리뷰 Free Trial 강조  로그인과 연결되는 색상 엔터프라이즈와 연결되도록  의견
                사이트맵 Station 설명이 Features 우측에 들어가는게 흐름상 자연스럽.
              </p>
            </div>
          </div>
        </li>
      );
    });

    return (
      <section id="note-list">
        <strong id="head-title">노트</strong>
        <p id="head-info">500개의 노트</p>
        <ul>
          {notes}
        </ul>
      </section>
    );
  }
});

module.exports = NoteList;
