var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var Instagram = require('instagram-node').instagram();

Instagram.use({
	client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
});

var graph = require('fbgraph');

graph.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);

module.exports = function(app, passport) {

  app.get('/twitter', function(req, res) {
    var params = {screen_name: 'thenewblk'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (!error) {
        res.json(tweets);
      }
    });
  });

  app.get('/twitter/me', function(req, res) {
    var params = {screen_name: 'thenewblk'};
    client.get('users/show', params, function(error, tweets, response){
      if (!error) {
        res.json(tweets);
      }
    });
  });

  app.get('/instagram', function(req, res) {
    Instagram.user_media_recent('2284936891',  function(error, medias, pagination, remaining, limit) {
      if (!error) {
        res.json(medias);
      }
    });
  });

  app.get('/instagram/me', function(req, res) {
    Instagram.user('2284936891',  function(error, medias, pagination, remaining, limit) {
      if (!error) {
        res.json(medias);
      }
    });
  });

  app.get('/facebook', function(req, res) {
    graph.get("124969474212539/feed", function(err, result) {
      res.json(result);
    });
  });


  app.get('/facebook/me', function(req, res) {
    graph.get("124969474212539/insights/page_fans", function(err, result) {
      res.json(result);
    });
  });

};
