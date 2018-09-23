import React, { Component, Fragment } from 'react';
import { Aside, IntroLoader } from 'components';
import { NoteListContainer, ContentTopContainer, ContentArticleContainer } from 'containers';
import api from 'contents/js/api';
import 'contents/scss/main.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: "목록",
      currentNoteIdx: 0,
      currentNoteData: null,
      lists: [],
      ready: false
    };

    this.init();
  }

  init = async() => {
    const lists = await api.init({
      onUpdate: (lists) => {
        this.handleNoteList(lists);
      }
    });

    this.handleNoteList(lists);
    this.setState({
      ready: true
    });
  };

  handleAsideClick = (event) => {
    console.log('handleAsideClick', event.target);
    const target = event.target;
    const menuName = target.id ? target.id : target.parentElement.id;

    if (menuName.match('new-note')) {
      //console.log('신규');
      api.note.createNote();
      return false;
    } else {
      this.setState({
        currentPage: menuName
      });
    }
  };

  handleNoteList = (lists) => {
    this.setState({
      lists: lists,
      currentNoteIdx: 0
    });
  };

  handleNoteData = (data) => {
    this.setState({
      currentNoteData: data
    });
  };

  handleNoteIdx = (index) => {
    console.log('handleNoteIdx', index);

    this.setState({
      currentNoteIdx: index
    });
  };

  render() {
    const { handleAsideClick, handleNoteData, handleNoteIdx } = this;
    const { ready, lists, currentNoteIdx, currentNoteData } = this.state;

    if (!ready) {
      return (
        <IntroLoader />
      );
    }

    return (
      <div>
        <Aside
          handleAsideClick={handleAsideClick}
        />
        <NoteListContainer
          lists={lists}
          currentNoteIdx={currentNoteIdx}
          handleNoteData={handleNoteData}
          handleNoteIdx={handleNoteIdx}
        />
        <section id="content">
          {
            currentNoteData ? (
              <Fragment>
                <ContentTopContainer
                  lists={lists}
                  currentNoteData={currentNoteData}
                />
                <ContentArticleContainer
                  currentNoteData={currentNoteData}
                />
              </Fragment>
            ) : null
          }
        </section>
      </div>
    );
  }
}

export default App;