require('../src/css/style.css');

var React = require('react');
var ReactDOM = require('react-dom');
var AsideMenu = require('./aside.jsx');
var NoteList = require('./notelist.jsx');
var Content = require('./content.jsx');

console.log(123);

/*
  Wrap (Parent)
*/
var Wrap = React.createClass({
  getInitialState: function() {
    return {
      currentPage: "신규",
      currentNoteIdx: 1
    };
  },
  componentDidMount: function() {
    console.log('this.refs.asideMenu', this.refs.asideMenu);
    console.log('this.refs.asideMenu', ReactDOM.findDOMNode(this.refs.asideMenu));
  },
  handleClick: function(event) {
    console.log('Wrap handleClick', event);
    var menuName = event.target.href.split('#')[1];

    this.setState({
      currentPage: menuName
    });
  },
  render: function() {
    return (
      <div>
        <AsideMenu
          ref="asideMenu"
          menus={[this.props.menus]}
          current={this.state.currentPage}
          handleClick={this.handleClick}
        />
        <NoteList
          menus={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          current={this.state.currentNoteIdx}
        />
        <Content current={this.state.currentPage} />
      </div>
    );
  }
});

ReactDOM.render(
  <Wrap menus={["목록", "신규", "검색"]} />,
  document.querySelector('#wrap')
);
