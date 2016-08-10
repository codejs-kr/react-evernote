var React = require('react');
var TopActions = React.createClass({
  render: function() {
    return (
      <section id="top-action">
        <div id="left-action">
          <div id="tags">
            <span>개발</span>
            <span>Javascript</span>
            <span>WebRTC</span>
          </div>
        </div>
        <div id="right-action">
          <button type="button" id="btn-favorite" title="즐겨찾기">
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
        </div>
      </section>
    );
  }
});

module.exports = TopActions;
