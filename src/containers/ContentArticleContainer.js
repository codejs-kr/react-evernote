import React, { Component } from 'react';
import { ContentArticle } from 'components';

class ContentArticleContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentNoteData } = this.props;

    return (
      <ContentArticle currentNoteData={currentNoteData} />
    );
  }
}

export default ContentArticleContainer;
