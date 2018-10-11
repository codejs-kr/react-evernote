import React, { Component } from 'react';
import { ContentTop } from 'components';
import $ from "jquery";
import api from 'contents/js/api';
import util from 'contents/js/util';

class ContentTopContainer extends Component {
  constructor(props) {
    super(props);

    const { currentNoteData } = this.props;

    this.state = {
      id: currentNoteData.id,
      isFavorite: currentNoteData.isFavorite,
      isActiveInfo: false,
      isActiveFullScreen: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState);

    if (prevState.id !== nextProps.currentNoteData.id) {
      return {
        id: nextProps.currentNoteData.id,
        isFavorite: nextProps.currentNoteData.isFavorite,
        isActiveInfo: false
      }
    }

    return null; // null 을 리턴하면 따로 업데이트 할 것은 없다는 의미
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
      isActiveInfo: !this.state.isActiveInfo
    });
  };

  handleDelete = () => {
    const { currentNoteData, lists } = this.props;
    const { id } = currentNoteData;

    if (lists.length === 1) {
      alert('마지막 문서입니다. 새롭게 작성해 보세요.');
      return false;
    }

    if (confirm('정말 삭제 하시겠습니까?')) {
      api.note.deleteNote(id);
    }
  };

  handleFullScreen = () => {
    const isActive = this.state.isActiveFullScreen;

    this.setState({
      isActiveFullScreen: !isActive
    });

    isActive ? util.endFullScreen() : util.startFullScreen();
  };

  render() {
    const { currentNoteData } = this.props;
    const { isFavorite, isActiveInfo } = this.state;
    const { handleFavorite, handleInfo, handleDelete, handleFullScreen } = this;

    return (
      <ContentTop
        currentNoteData={currentNoteData}
        isFavorite={isFavorite}
        isActiveInfo={isActiveInfo}
        handleFavorite={handleFavorite}
        handleInfo={handleInfo}
        handleDelete={handleDelete}
        handleFullScreen={handleFullScreen}
      />
    );
  }
}

export default ContentTopContainer;
