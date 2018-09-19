import React, { Component } from 'react';
import { ContentTop } from 'components';
import $ from "jquery";
import api from 'contents/js/api';
import util from 'contents/js/util';

class ContentTopContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
      activedInfo: false,
      activedFullScreen: false
    };
  }

  handleFavorite = () => {
    const { currentNoteData } = this.props;
    const { isFavorite } = this.state;
    const { id } = currentNoteData;

    api.note.updateFavorite({
      id: id,
      isFavorite: !isFavorite
    });

    this.setState({
      isFavorite: !isFavorite
    });
  };

  handleInfo = () => {
    this.setState({
      activedInfo: !this.state.activedInfo
    });
  };

  handleDelete = () => {
    const { currentNoteData } = this.props;
    const { id } = currentNoteData;

    if ($('#note-list li').length === 1) {
      alert('마지막 문서입니다. 새롭게 작성해 보세요.');
      return false;
    }

    if (confirm('정말 삭제 하시겠습니까?')) {
      api.note.deleteNote(id);
    }
  };

  handleFullScreen = () => {
    const actived = this.state.activedFullScreen;

    this.setState({
      activedFullScreen: !actived
    });

    actived ? util.endFullScreen() : util.startFullScreen();
  };

  render() {
    const { currentNoteData } = this.props;
    const { isFavorite } = this.state;
    const { activedInfo, handleFavorite, handleInfo, handleDelete, handleFullScreen } = this;

    console.log('확인2 currentNoteData', currentNoteData.isFavorite);

    return (
      <ContentTop
        currentNoteData={currentNoteData}
        activedInfo={activedInfo}
        isFavorite={isFavorite}
        handleFavorite={handleFavorite}
        handleInfo={handleInfo}
        handleDelete={handleDelete}
        handleFullScreen={handleFullScreen}
      />
    );
  }
}

export default ContentTopContainer;
