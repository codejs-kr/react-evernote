import React, { Component } from 'react';
import { Tags } from 'components';
import './ContentTop.scss';

class ContentTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activedInfo: false,
      activedFullScreen: false
    };
  }

  render() {
    const data = null;

    return (
      <section id="top-action">
        <div id="left-action">
          <Tags currentNoteData={data} />
        </div>
        <div id="right-action">
          <button
            type="button"
            id="btn-favorite"
            className={ data && data.isFavorite ? 'active' : '' }
            title="즐겨찾기"
          >
            <i className="fa fa-star fa-lg" />
          </button>
          <button type="button" id="btn-info" title="노트정보">
            <i className="fa fa-info-circle fa-lg" />
          </button>
          <button type="button" id="btn-delete" title="삭제">
            <i className="fa fa-trash fa-lg" />
          </button>
          <button type="button" id="btn-share" title="공유">
            <i className="fa fa-share-alt fa-lg" />
          </button>
          <button type="button" id="btn-fullscreen" title="전체화면">
            <i className="fa fa-arrows-alt fa-lg" />
          </button>

          <div id="note-info" className={this.state.activedInfo ? "active" : ""}>
            <span className="arrow" />
            <ul>
              <li><span>제목</span>:<span id="info-title" /></li>
              <li><span>테그</span>:<span id="info-tags" /></li>
              <li><span>만든날짜</span>:<span id="info-create-date" /></li>
              <li><span>수정날짜</span>:<span id="info-update-date" /></li>
              <li><span>생성자</span>:<span id="info-owner" /></li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default ContentTop;