var tagit = null;
var noteId = null;
var React = require('react');
var Tags = React.createClass({
  componentDidMount: function() {
    tagit = new TagIt({
      // 테그 변경이 감지 되면 저장.
      onChange: function() {
        console.log('테그 변경');

        $.note.updataTags({
          id: noteId,
          tags: tagit.getData()
        });
      }
    });
    tagit.init($('#tags'));
  },
  componentDidUpdate: function() {
    var data = this.props.currentNoteData;
    var tagsData = data && data.tags;
    //console.log('확인', data);

    // 현재 작성중인 노트일때 업데이트 안함.
    if (data && data.id != noteId) {
      tagit.reset();

      if (tagsData && tagsData.length) {
        tagit.setData(tagsData);
      }

      // 현재 노트 ID저장
      noteId = data.id;
    }
  },
  render: function() {
    return (
      <div id="tags"></div>
    );
  }
});

module.exports = Tags;
