import React, { Component } from 'react';
import api from 'contents/js/api';
import './Tags.scss';
import $ from 'jquery';

let tagit = null;
class Tags extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props;

    tagit = new TagIt($, {
      // 테그 변경이 감지 되면 저장.
      onChange: function() {
        console.log('테그 변경');

        api.note.updataTags({
          id: id,
          tags: tagit.getData()
        });
      }
    });

    tagit.init($('#tags'));
  }

  componentDidUpdate(prevProps) {
    const { id, tags } = this.props;
    //console.log('확인', data);

    // 현재 작성중인 노트일때 업데이트 안함.
    if (prevProps.id !== id) {
      tagit.reset();

      if (tags && tags.length) {
        tagit.setData(tags);
      }
    }
  }

  render() {
    return (
      <div id="tags">

      </div>
    );
  }
}

export default Tags;