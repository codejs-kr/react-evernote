var React = require('react');
var Article = React.createClass({
  render: function() {
    return (
      <main>
        <h1>타이틀 영역</h1>
        <article>
          <textarea placeholder="컨텐츠 영역">컨텐츠 영역</textarea>
        </article>
      </main>
    );
  }
});

module.exports = Article;
