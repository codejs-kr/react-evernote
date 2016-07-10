var React = require('react');
var Menu1Content = require('./content-menu1.jsx');
var Menu2Content = require('./content-menu2.jsx');
var Menu3Content = require('./content-menu3.jsx');

/*
  Content
*/
var Content = React.createClass({
  render: function() {
    console.log('Content render', this.props.current);

    var content = null;
    var color = 'red';
    switch(this.props.current) {
      case "목록":
        content = <Menu1Content />;
        color = 'red';
        break;
      case "신규":
        content = <Menu2Content />;
        color = 'green';
        break;
      case "검색":
        content = <Menu3Content />;
        color = 'yellow';
        break;
    }

    return (
      <section id="content" className={color}>
        {content}
      </section>
    );
  }
});

module.exports = Content;
