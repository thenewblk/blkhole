var React = require('react');
var Router = require('react-router');

var Helmet = require('react-helmet');

var util = require('util');

module.exports = React.createClass({
  mixins: [ Router.State ],

  render: function render() {
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <link rel="shortcut icon" href="/favicon.jpg" />
          <link rel="stylesheet" href="/styles/main.css" />
        </head>
        <body>
          {this.props.children}
        </body>
        <script src='/bundle.js'></script>
      </html>
    );
  }
});
