var React = require('react');
var TopActions = require('./content-top.jsx');
var Article = require('./content-article.jsx');

/*
  Content
*/
var Content = React.createClass({
  render: function() {
    console.log('Content render', this.props.current);
    
    var content = null;
    return (
      <section id="content">
        <TopActions />
        <Article />
      </section>
    );
  }
});

module.exports = Content;
