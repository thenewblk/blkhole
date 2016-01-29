// var Layout = require('./layout.jsx');
// var React = require('react');
// var Router = require('react-router');
// var Link = Router.Link;
//
// var util = require('util');
//
// module.exports = React.createClass({
//   mixins: [ Router.State, Router.Navigation ],
//
//   getHandlerKey: function render() {
//     var childDepth = 1,
//         childHandler = this.getRoutes()[childDepth].handler,
//         params = this.getParams(),
//         query = this.getQuery();
//
//     if (childHandler.getHandlerKey) {
//       return childHandler.getHandlerKey(params, query);
//     }
//   },
//
//   render: function render() {
//     return (
//       <Layout {...this.props}>
//         <Router.RouteHandler {...this.props} />
//       </Layout>
//     );
//   }
// });
