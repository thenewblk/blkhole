var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./views/app.jsx');
var Home = require('./views/home.jsx');
var Login = require('./views/login.jsx');
var Channel = require('./views/channel.jsx');
var Agency = require('./views/agency.jsx');
var CaseStudy = require('./views/casestudy.jsx');

var NotFound = require('./views/404.jsx');

var routes = module.exports = (
    <Route path="/" handler={App}>
      <Route name='login' handler={Login} />
      <Route path='/agency' handler={Agency} />
      <Route path=':channel' handler={Channel} />
      <Route path='/post/:casestudy' handler={CaseStudy} />
      <DefaultRoute handler={Home} />
      <NotFoundRoute handler={NotFound} />
    </Route>
);
