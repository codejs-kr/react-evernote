var React = require('react');
var Tags = require('./content-top-tags.jsx');

var TopActions = React.createClass({
  componentDidMount: function() {
    $('#right-action button').click(function() {
      var command = $(this).attr('id').split('-')[1];

      if (command == 'delete') {
        // TODO noteId 통합관리 필요
        var noteId = $('#note-list .active div').attr('data-id');
        if ($('#note-list li').length === 1) {
          alert('마지막 문서입니다. 새롭게 작성해 보세요.');
          return false;
        }

        if (confirm('정말 삭제 하시겠습니까?')) {
          $.note.deleteNote(noteId);
          console.log('삭제됨');
        }
      }
    });
  },
  render: function() {
    return (
      <section id="top-action">
        <div id="left-action">
          <Tags currentNoteData={this.props.currentNoteData} />
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
