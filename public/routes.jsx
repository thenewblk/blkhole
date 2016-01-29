var React = require('react');
var reactRouter = require('react-router');
var Router = reactRouter.Router;
var Route = reactRouter.Route;
var IndexRoute = reactRouter.IndexRoute;

var App = require('./views/layout.jsx'),
    Home = require('./views/home.jsx'),
    Login = require('./views/login.jsx'),
    Channel = require('./views/channel.jsx'),
    Agency = require('./views/agency.jsx'),
    CaseStudy = require('./views/casestudy.jsx'),
    SpriteTest = require('./views/sprite_test.jsx');

var NotFound = require('./views/404.jsx');

var routes = module.exports = (
  <Router >
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route name='login' component={Login} />
      <Route path='/agency' component={Agency} />
      <Route path='/sprite-test' component={SpriteTest} />
      <Route path=':channel' component={Channel} />
      <Route path='/post/:casestudy' component={CaseStudy} />
    </Route>
  </Router>
);
