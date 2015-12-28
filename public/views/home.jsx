var React = require('react');
var Helmet = require('react-helmet');

module.exports = React.createClass({
  render: function render() {
    return (
      <div>
        <Helmet
              title="the new blk"
              meta={[
                  {"name": "description", "content": "the new blk" }
              ]}
              link={[
                  {"rel": "canonical", "href": "http://thenewblk.com/"},
                  {"rel": "shortcut icon", "href": "/favicon.jpg"}
              ]}
          />
        <h1>Home Page</h1>

      </div>
    );
  }
});
