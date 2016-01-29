// make `.jsx` file requirable by node

require('babel-register')({
  presets: ['es2015', 'react']
});

var path = require('path');
var join = path.join;
var express = require('express');

var ReactEngine = require('react-engine');

var port     = process.env.PORT || 3000;
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
// var engine = renderer.server.create({
//   reactRoutes: path.join(__dirname + '/public/routes.jsx')
// });
var routes = require('./public/routes.jsx');


var engine = ReactEngine.server.create({
  routes: routes,
  routesFilePath: join(__dirname, '/public/routes.jsx'),
  performanceCollector: function(stats) {
    console.log(stats);
  }
});

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', __dirname + '/public/views');

// set jsx as the view engine
app.set('view engine', 'jsx');

// finally, set the custom view
// app.set('view', renderer.expressView);
app.set('view', ReactEngine.expressView);

//expose public folder as static assets
app.use(express.static(__dirname + '/public'));

// set the session and passport
app.use(session({
  secret: 'bangarang',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./routes/api/channel')(app, passport);
require('./routes/api/client')(app, passport);
require('./routes/api/project')(app, passport);
require('./routes/api/tag')(app, passport);
require('./routes/api/post')(app, passport);

var Channel = require('./models/channel');
var Post = require('./models/post');

app.get('/channel/:channel', function(req, res) {
  Channel
    .findOne({ slug: req.params.channel })
    .exec( function (err, channel) {
        if (err) return console.log(err);
        res.render(req.url, {
          title: channel.name,
          content: channel
        });
  });
});

app.get('/post/:post', function(req, res) {
  Post
    .findOne({ slug: req.params.post })
    .exec( function (err, post) {
        if (err) return console.log(err);
        if (post) {
          res.render(req.url, {
            title: post.name,
            image: post.content.top_image,
            description: post.description,
            content: post
          });
        } else {
          res.render('404');
        }
  });
});

app.get('*', function(req, res) {
  res.render(req.url, {
    title: req.url
  });
});

app.get('/login', function(req, res) {
  res.render(req.url, {
    title: 'Login Page',
  });
});


app.use(function(req, res) {
  res.render('404', {
    title: 'React Engine Express Sample App',
    url: req.url
  });
});



var server = app.listen(port, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
