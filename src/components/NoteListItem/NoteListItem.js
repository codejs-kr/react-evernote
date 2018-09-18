import React, { Component } from 'react';
import './NoteListItem.scss';
import Util from 'contents/js/util';

class NoteListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { i, currentNoteIdx, obj } = this.props;

    let id = obj.id;
    let title = obj.title ? obj.title : "제목없음";
    let date = Util.getDate(obj.lastUpdateDate);
    let preview = {__html: obj.preview};
    let json = JSON.stringify(obj);

    return (
      <li className={i === currentNoteIdx ? "active": ""}>
        <div className="list-wrap" data-id={id} data-obj={json}>
          <div>
            <strong>{title}</strong>
            <span>{date}</span>
            <article dangerouslySetInnerHTML={preview} />
          </div>
        </div>
      </li>
    );
  }
}

export default NoteListItem;