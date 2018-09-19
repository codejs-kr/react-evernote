import React, { Component, Fragment } from 'react';
import { ContentArticle } from 'components';
import { ContentTopContainer } from 'containers';

class ContentContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentNoteData } = this.props;

    if (!currentNoteData) {
      return false
    }

    return (
      <Fragment>
        <ContentTopContainer currentNoteData={currentNoteData} />
        <ContentArticle currentNoteData={currentNoteData} />
      </Fragment>
    );
  }
}

export default ContentContainer;
