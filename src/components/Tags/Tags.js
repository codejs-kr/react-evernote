import React, { Component } from 'react';
import './Tags.scss';
import api from 'contents/js/api';
import $ from 'jquery';
import tagit from 'contents/js/tag-it';

class Tags extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id, tags } = this.props;
    console.log('componentDidMount', id, tags);

    tagit.init($('#tags'));

    if (tags && tags.length) {
      tagit.setData(tags);
    }

    tagit.onChange = () => {
      console.log('테그 변경');

      api.note.updataTags({
        id: id,
        tags: tagit.getData()
      });
    };
  }

  componentDidUpdate(prevProps) {
    const { id, tags } = this.props;
    console.log('componentDidUpdate', id, tags);

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
      <div id="tags" />
    );
  }
}

export default Tags;