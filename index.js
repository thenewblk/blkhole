// make `.jsx` file requirable by node
require('node-jsx').install();

var path = require('path');
var express = require('express');
var renderer = require('react-engine');

// session with `express-session`
var session  = require('express-session');

// authentication with `passport`
var passport = require('passport');

// create the database with `mongoosee`
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var app = express();

// create the view engine with `react-engine`
var engine = renderer.server.create({
  reactRoutes: path.join(__dirname + '/public/routes.jsx')
});

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', __dirname + '/public/views');

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', renderer.expressView);

//expose public folder as static assets
app.use(express.static(__dirname + '/public'));

// set the session and passport
app.use(session({ secret: 'bangarang' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./routes/api/channel')(app, passport);
require('./routes/api/client')(app, passport);
require('./routes/api/project')(app, passport);
require('./routes/api/tag')(app, passport);
require('./routes/api/post')(app, passport);

app.get('*', function(req, res) {
  res.render(req.url, {
    title: 'Home Page'
  });
});

// app.get('/experiential', function(req, res) {
//   res.render(req.url, {
//     title: 'Experiential',
//     channel: 'experiential'
//   });
// });

app.get('/login', function(req, res) {
  res.render(req.url, {
    title: 'Login Page',
  });
});

// 404 template
app.use(function(req, res) {
  res.render('404', {
    title: 'React Engine Express Sample App',
    url: req.url
  });
});

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
