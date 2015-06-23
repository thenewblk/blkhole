var Layout = require('./layout.jsx');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var util = require('util');

module.exports = React.createClass({
  render: function render() {
    return (
      <Layout {...this.props}>
        <Router.RouteHandler {...this.props}/>
      </Layout>
    );
  }
});
