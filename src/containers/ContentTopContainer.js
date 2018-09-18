import React, { Component } from 'react';
import { ContentTop } from 'components';
import $ from "jquery";
import api from 'contents/js/api';
import util from 'contents/js/util';

class ContentTopContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activedInfo: false,
      activedFullScreen: false
    };
  }

  handleFavorite = () => {
    const { currentNoteData } = this.props;
    const { noteId, isFavorite } = currentNoteData;

    api.note.updateFavorite({
      id: noteId,
      isFavorite: isFavorite
    });
  };

  handleInfo = () => {
    this.setState({
      activedInfo: !this.state.activedInfo
    });
  };

  handleDelete = () => {
    if ($('#note-list li').length === 1) {
      alert('마지막 문서입니다. 새롭게 작성해 보세요.');
      return false;
    }

    if (confirm('정말 삭제 하시겠습니까?')) {
      api.note.deleteNote(noteId);
    }
  };

  handleFullScreen = () => {
    this.setState({
      activedFullScreen: !this.state.activedFullScreen
    });

    this.state.activedFullScreen ? util.startFullScreen() : util.endFullScreen();
  };

  render() {
    const { currentNoteData } = this.props;

    return (
      <ContentTop currentNoteData={currentNoteData} />
    );
  }
}

export default ContentTopContainer;
