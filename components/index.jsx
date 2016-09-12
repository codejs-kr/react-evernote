require('../src/css/style.css');

var React = require('react');
var ReactDOM = require('react-dom');
var AsideMenu = require('./aside.jsx');
var NoteList = require('./note-list.jsx');
var Content = require('./content.jsx');

/*
  TODO
  - 리스트 선택시 우측 컨텐츠영역 갱신 O
  - 컨텐츠 제목 input으로 변경 O
  - Firebase DB 검토
  - 컨텐츠 변경시 서버에 전송
  - 신규 목록
  - 리스트 검색
  - 테그
    - 추가
    - 변경
    - 삭제
  - 메뉴
    - 삭제
    - 즐겨찾기
    - 정보보기
    - 이메일 공유
    - 전체화면
*/

/*
  Wrap (Parent)
*/
var Wrap = React.createClass({
  getInitialState: function() {
    return {
      currentAction: "신규",
      currentNoteIdx: 0,
      currentNoteData: null
    };
  },
  componentDidMount: function() {
    // console.log('componentDidMount');
    // console.log('this.refs.asideMenu', this.refs.asideMenu);
    // console.log('this.refs.asideMenu', ReactDOM.findDOMNode(this.refs.asideMenu));

    this.serverRequest = $.get(this.props.url, function(data) {
      var data = data.returnData;
      console.log('데이타', data);

      this.setState({
        lists: data
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  handleAsideClick: function(event) {
    console.log('Wrap handleAsideClick', event);
    var menuName = event.target.href.split('#')[1];

    this.setState({
      currentAction: menuName
    });
  },
  handleNoteData: function(data) {
    this.setState({
      currentNoteData: data
    });
  },
  render: function() {
    //console.log('render');
    return (
      <div>
        <AsideMenu
          ref="asideMenu"
          menus={[this.props.menus]}
          currentAction={this.state.currentAction}
          handleAsideClick={this.handleAsideClick}
        />
        <NoteList
          lists={this.state.lists}
          currentNoteIdx={this.state.currentNoteIdx}
          handleNoteData={this.handleNoteData}
        />
        <Content
          currentNoteData={this.state.currentNoteData}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <Wrap menus={["목록", "신규", "검색"]} url="./json/note-list.json" />,
  document.querySelector('#wrap')
);
