var React = require('react');
var Tags = React.createClass({
  render: function() {
    var tags = null;
    var tagsData = this.props.currentNoteData && this.props.currentNoteData.tags;

    //console.log('tagsData', this.props.currentNoteData);
    if (tagsData) {
      tags = tagsData.map(function(data, i) {
        return (
          <span key={i}>{data}</span>
        );
      });
    }

    return (
      <div id="tags">
        {tags}
      </div>
    );
  }
});

module.exports = Tags;
