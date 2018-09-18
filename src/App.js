import React, { Component, Fragment } from 'react';
import { Aside } from 'components';
import { NoteListContainer, ContentContainer } from 'containers';
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

  handleNoteList(lists) {
    this.setState({
      lists: lists,
      currentNoteIdx: 0
    });
  }

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
    const { handleNoteData, handleNoteIdx } = this;
    const { ready, lists, currentNoteIdx, currentNoteData } = this.state;

    if (!ready) {
      return false;
    }

    return (
      <div>
        <Aside />
        <NoteListContainer
          lists={lists}
          currentNoteIdx={currentNoteIdx}
          handleNoteData={handleNoteData}
          handleNoteIdx={handleNoteIdx}
        />
        <ContentContainer
          currentNoteData={currentNoteData}
        />
      </div>
    );
  }
}

export default App;