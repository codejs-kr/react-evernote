import React, { Component } from 'react';
import { Tags } from 'components';
import './ContentTop.scss';


class ContentTop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      currentNoteData,
      activedInfo,
      isFavorite,
      handleFavorite,
      handleInfo,
      handleDelete,
      handleFullScreen
    } = this.props;

    if (!currentNoteData) {
      return false;
    }

    const { title, tags } = currentNoteData;
    let { createDate, lastUpdateDate } = currentNoteData;

    return (
      <section id="top-action">
        <div id="left-action">
          <Tags tags={tags} />
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

          <div id="note-info" className={activedInfo ? "active" : ""}>
            <span className="arrow" />
            <ul>
              <li><span>제목</span>:<span id="info-title" />{ title }</li>
              <li><span>테그</span>:<span id="info-tags" />{ tags }</li>
              <li><span>만든날짜</span>:<span id="info-create-date" />{ createDate }</li>
              <li><span>수정날짜</span>:<span id="info-update-date" />{ lastUpdateDate }</li>
              <li><span>생성자</span>:<span id="info-owner" />CodeJS</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default ContentTop;