var Layout = require('./layout.jsx');
var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;

var util = require('util');

module.exports = React.createClass({
  render: function render() {
    return (
      <Layout {...this.props}>
        <div className="navigator">
          <p><Link to="/">Home</Link></p>
          <p><Link to="/experiential" >Experiential</Link></p>
          <p><Link to="/handcrafted" >Handcrafted</Link></p>
        </div>
        <Router.RouteHandler {...this.props}/>
      </Layout>
    );
  }
});
