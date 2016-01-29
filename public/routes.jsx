var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require('./views/app.jsx'),
    Home = require('./views/home.jsx'),
    Login = require('./views/login.jsx'),
    Channel = require('./views/channel.jsx'),
    Agency = require('./views/agency.jsx'),
    CaseStudy = require('./views/casestudy.jsx'),
    SpriteTest = require('./views/sprite_test.jsx');

var NotFound = require('./views/404.jsx');

var routes = module.exports = (
    <Route path="/" handler={App}>
      <Route name='login' handler={Login} />
      <Route path='/agency' handler={Agency} />
      <Route path='/sprite-test' handler={SpriteTest} />
      <Route path=':channel' handler={Channel} />
      <Route path='/post/:casestudy' handler={CaseStudy} />
      <DefaultRoute handler={Home} />
      <NotFoundRoute handler={NotFound} />
    </Route>
);
