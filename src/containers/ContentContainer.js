import React, { Component } from 'react';
import { ContentArticle } from 'components';
import { ContentTopContainer } from 'containers';


class ContentContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentNoteData } = this.props;

    return (
      <section id="content">
        <ContentTopContainer currentNoteData={currentNoteData} />
        <ContentArticle currentNoteData={currentNoteData} />
      </section>
    );
  }
}

export default ContentContainer;
