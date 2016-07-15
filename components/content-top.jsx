var React = require('react');
var TopActions = React.createClass({
  render: function() {
    return (
      <section id="top-action">
        <div id="left-action">
          <div>Tag Section</div>
        </div>
        <div id="right-action">
          <button type="button" id="btn-favorite">즐겨찾기</button>
          <button type="button" id="btn-info">노트정보</button>
          <button type="button" id="btn-delete">삭제</button>
          <button type="button" id="btn-share">공유</button>
          <button type="button" id="btn-fullscreen">펼치기</button>
        </div>
      </section>
    );
  }
});

module.exports = TopActions;
