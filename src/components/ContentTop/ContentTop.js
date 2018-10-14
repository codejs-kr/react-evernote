import React, { Component } from 'react';
import { Tags, ContentInfo } from 'components';
import './ContentTop.scss';

class ContentTop extends Component {
  render() {
    const {
      currentNoteData,
      isActiveInfo,
      isFavorite,
      handleFavorite,
      handleInfo,
      handleDelete,
      handleFullScreen
    } = this.props;

    const { tags, id } = currentNoteData;

    return (
      <section id="top-action">
        <div id="left-action">
          <Tags
            id={id}
            tags={tags}
          />
        </div>
        <div id="right-action">
          <button
            type="button"
            id="btn-favorite"
            className={ isFavorite ? 'active' : '' }
            title="즐겨찾기"
            onClick={handleFavorite}
          >
            <i className="fa fa-star fa-lg" />
          </button>
          <button type="button" id="btn-info" title="노트정보" onClick={handleInfo}>
            <i className="fa fa-info-circle fa-lg" />
          </button>
          <button type="button" id="btn-delete" title="삭제" onClick={handleDelete}>
            <i className="fa fa-trash fa-lg" />
          </button>
          <button type="button" id="btn-share" title="공유">
            <i className="fa fa-share-alt fa-lg" />
          </button>
          <button type="button" id="btn-fullscreen" title="전체화면" onClick={handleFullScreen}>
            <i className="fa fa-arrows-alt fa-lg" />
          </button>

          <ContentInfo
            isActiveInfo={isActiveInfo}
            currentNoteData={currentNoteData}
          />
        </div>
      </section>
    );
  }
}

export default ContentTop;