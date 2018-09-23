import React, { Component } from 'react';
import util from 'contents/js/util';
import './ContentInfo.scss';

class ContentInfo extends Component {
  render() {
    const { isActiveInfo, currentNoteData } = this.props;
    let { title, tags, createDate, lastUpdateDate } = currentNoteData;

    createDate = util.getDate(createDate);
    lastUpdateDate = util.getDate(lastUpdateDate);

    return (
      <div id="note-info" className={isActiveInfo ? "active" : ""}>
        <span className="arrow" />
        <ul>
          <li><span>제목</span>:<span id="info-title" />{ title || "제목없음" }</li>
          <li><span>테그</span>:<span id="info-tags" />{ tags || "테그없음" }</li>
          <li><span>만든날짜</span>:<span id="info-create-date" />{ createDate }</li>
          <li><span>수정날짜</span>:<span id="info-update-date" />{ lastUpdateDate }</li>
          <li><span>생성자</span>:<span id="info-owner" />codeJS</li>
        </ul>
      </div>
    );
  }
}

export default ContentInfo;
