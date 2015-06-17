var Layout = require('./layout.jsx');
var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var util = require('util');

module.exports = React.createClass({
  render: function render() {
    return (
      <Layout {...this.props}>
        <Link to="/">home</Link>
        <Link to="login" params={{title: "Login"}}>Login</Link>
        <Router.RouteHandler {...this.props}/>
      </Layout>
    );
  }
});
