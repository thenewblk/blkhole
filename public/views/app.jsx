var Layout = require('./layout.jsx');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var util = require('util');

module.exports = React.createClass({
  mixins: [ Router.State ],

  getHandlerKey: function () {
    // this will all depend on your needs, but here's a typical
    // scenario that's pretty much what the old prop did
    var childDepth = 1; // have to know your depth
    var childName = this.getRoutes()[childDepth].name;
    var id = this.getParams().id;
    var key = childName+id;
    return key;
  },
  render: function render() {
    return (
      <Layout {...this.props}>
        <Router.RouteHandler {...this.props} key={this.getHandlerKey()} />
      </Layout>
    );
  }
});
