import React, { Component } from 'react';
import { ContentTop, ContentArticle } from 'components';

class ContentContainer extends Component {
  render() {
    return (
      <section id="content">
        <ContentTop currentNoteData={this.props.currentNoteData} />
        <ContentArticle currentNoteData={this.props.currentNoteData} />
      </section>
    );
  }
}

export default ContentContainer;
