var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./views/app.jsx');
var Account = require('./views/account.jsx');
var Login = require('./views/login.jsx');
var Channel = require('./views/channel.jsx');

var NotFound = require('./views/404.jsx');

var routes = module.exports = (
    <Route path="/" handler={App}>
      <Route name='login' handler={Login} />
      <Route path='/:channel' handler={Channel} />
      <DefaultRoute handler={Account} />
      <NotFoundRoute handler={NotFound} />
    </Route>
);
