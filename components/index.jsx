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
  - Firebase DB 검토 O
  - 컨텐츠 변경시 서버에 전송 O
  - 노트 CRUD O
  - 노트 검색
  - 테그 (인풋박스로 바뀌고 콤마로 구분해서 저장시 UI표현)
    - 추가
    - 변경
    - 삭제
  - 메뉴
    - 삭제 O
    - 즐겨찾기
    - 정보보기
    - 이메일 공유
    - 전체화면모드
  - 테그 분류
*/

/*
  Wrap (Parent)
*/
var Wrap = React.createClass({
  getInitialState: function() {
    return {
      currentAction: "목록",
      currentNoteIdx: 1,
      currentNoteData: null
    };
  },
  componentDidMount: function() {
    // console.log('componentDidMount');
    // console.log('this.refs.asideMenu', this.refs.asideMenu);
    // console.log('this.refs.asideMenu', ReactDOM.findDOMNode(this.refs.asideMenu));
    var that = this;

    // 최초 목록 로드
    $.note.readList(function(data) {
      console.log('데이타', data);

      that.setState({
        lists: data
      });
    });

    // 목록 변경 리스닝
    $.note.onUpdateList = function(data) {
      that.setState({
        lists: data
      });

      that.setState({
        currentNoteIdx: 0
      });
    };
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

    if (menuName.match('신규')) {
      console.log('신규');
      $.note.createNote();
      return false;
    }
  },
  handleNoteData: function(data) {
    this.setState({
      currentNoteData: data
    });
  },
  handleNoteIdx: function(data) {
    this.setState({
      currentNoteIdx: data
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
          handleNoteIdx={this.handleNoteIdx}
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
  <Wrap menus={["목록", "신규", "분류"]} />,
  document.querySelector('#wrap')
);
