var React = require('react');
var Router = require('react-router');
var util = require('util');

module.exports = React.createClass({
  mixins: [ Router.State ],

  render: function render() {
    console.log("Layout props: " + util.inspect(this.props));
    console.log("Layout state: " + util.inspect(this.state));
    console.log("this.getParams(): " + util.inspect(this.getParams()));
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <link rel="shortcut icon" href="/favicon.jpg" />
          <link rel="stylesheet" href="/styles/main.css" type="text/css" media="all" />
          <title>{this.props.title}</title>
        </head>
        <body>
          {this.props.children}
        </body>
        <script src='/bundle.js'></script>
      </html>
    );
  }
});
