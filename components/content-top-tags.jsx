var tagit = null;
var React = require('react');
var Tags = React.createClass({
  componentDidMount: function() {
    tagit = new TagIt();
    tagit.init($('#tags'));
  },
  componentDidUpdate: function() {
    var tagsData = this.props.currentNoteData && this.props.currentNoteData.tags;
    tagit.reset();

    if (tagsData && tagsData.length) {
      tagit.setData(tagsData);
    }
  },
  render: function() {
    return (
      <div id="tags"></div>
    );
  }
});

module.exports = Tags;
