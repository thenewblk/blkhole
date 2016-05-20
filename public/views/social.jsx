var React = require('react');
var ReactDOM = require("react-dom");

var Router = require('react-router');
var Helmet = require('react-helmet');
var Loader = require('../components/loader.jsx');

var spring = require('react-motion').spring;
var presets = require('react-motion').presets;
var Motion = require('react-motion').Motion;
var StaggeredMotion = require('react-motion').StaggeredMotion;
var TransitionMotion = require('react-motion').TransitionMotion;


var Sprite = require('../components/sprite.jsx');

var Link = Router.Link;

var util = require('util'),
    request = require('superagent');

var Footer = require('./footer.jsx');

var Instagram = React.createClass({
  render: function(){

    var self = this;
    var content = self.props.content;
    var style = self.props.style;

    style.backgroundImage = "url("+content.images.standard_resolution.url+")";

    return (
      <div className="instagram_image" style={style}></div>
    )
  }
});


var Tweet = React.createClass({
  render: function(){
    var self = this;
    var content = self.props.content;
    var style = self.props.style;
    return (
      <p className="tweet_text" style={style}> <i className="fa fa-twitter"></i> {content.text}</p>
    )
  }
});

var Facebook = React.createClass({
  render: function(){
    var self = this;
    var content = self.props.content;
    var style = self.props.style;

    return (
      <p className="tweet_text" style={style}> <i className="fa fa-facebook"></i> {content.message}</p>
    )
  }
});

module.exports = React.createClass({
  getInitialState: function(){
    return {
      description: "Let's Get Social.",
      load_images: [
				"/images/blk.jpg",
        "/images/experiential.jpg",
        "/images/handcrafted.jpg",
        "/images/agency.jpg"
			],
      pre_count: 0,
			percent_loaded: 0,
      social: null,
      fact: null,
      tweets: [],
      instagrams: [],
      facebooks: [],
      envelopes: [],
      total_instagrams: "",
      status_count: "",
      total_fans: ""
    };
  },
  handleResize: function(e) {
    var self = this;
    self.setState({windowWidth: window.innerWidth});
  },

  setFacebook: function(){
    this.setState({description: "AN EXTENSION OF THE DAILY OFFICE BANTER", social: "facebook"})
  },

  setTwitter: function(){
    this.setState({description: "SIMILAR TO WHAT WE DO ON FACEBOOK, WITH MORE ONE TO ONE DIALOGUE", social: "twitter"})
  },

  setMedium: function(){
    this.setState({description: "It's great to write on Medium. And their logo is neat.", social: "medium", fact: "23k words"})
  },

  setInstagram: function(){
    this.setState({description: "SLICE OF LIFE SNAPSHOTS IN BLK & WHITE", social: "instagram", fact: "23 Photos"})
  },


  setMail: function(){
    this.setState({description: "GET OUR TAKE ON IDEAS, CREATIVITY & EMERGING TRENDS", social: "mail", fact: "5 Newsletters so far" })
  },

  resetSocial: function(){
    this.setState({description: "Let's Get Social.", social: null, fact: null})
  },

  loadTweets: function(){
    var self = this;
    request
      .get('/twitter')
      .end(function(err, res) {
        if (res.ok) {
          var tweets = res.body;
          self.setState({ tweets: tweets});

        } else {
          console.log('Oh no! error ' + res.text);
        }
      }.bind(self));
  },

  loadTwitterUser: function(){
    var self = this;
    request
      .get('/twitter/me')
      .end(function(err, res) {
        if (res.ok) {
          var twitter_user = res.body;
          self.setState({ status_count: twitter_user.statuses_count});

        } else {
          console.log('Oh no! error ' + res.text);
        }
      }.bind(self));
  },


  loadInstagrams: function(){
    var self = this;
    request
      .get('/instagram')
      .end(function(err, res) {
        if (res.ok) {
          var instagrams = res.body;
          self.setState({ instagrams: instagrams});

        } else {
          console.log('Oh no! error ' + res.text);
        }
      }.bind(self));
  },

  loadInstagramUser: function(){
    var self = this;
    request
      .get('/instagram/me')
      .end(function(err, res) {
        if (res.ok) {
          var total_instagrams = res.body;
          self.setState({ total_instagrams: total_instagrams.counts.media});

        } else {
          console.log('Oh no! error ' + res.text);
        }
      }.bind(self));
  },

  loadFacebookFeed: function(){
    var self = this;
    request
      .get('/facebook')
      .end(function(err, res) {
        if (res.ok) {
          var facebooks = res.body;
          self.setState({ facebooks: facebooks.data});

        } else {
          console.log('Oh no! error ' + res.text);
        }
      }.bind(self));
  },

  loadFacebookUser: function(){
    var self = this;
    request
      .get('/facebook/me')
      .end(function(err, res) {
        if (res.ok) {
          var total_fans = res.body;
          self.setState({ total_fans: total_fans.data[0].values[2].value});

        } else {
          console.log('Oh no! error ' + res.text);
        }
      }.bind(self));
  },

  loadEnvelopes: function(){
    var self = this;
    request
      .get('/envelopes')
      .end(function(err, res) {
        if (res.ok) {
          var envelopes = res.body;
          self.setState({ envelopes: envelopes});

        } else {
          console.log('Oh no! error ' + res.text);
        }
      }.bind(self));
  },



  componentDidMount: function(){
    var self = this;
    self.setState({windowWidth: window.innerWidth});
    window.addEventListener('resize', self.handleResize);

    var load_images = self.state.load_images;
    for (var i in load_images) {
      var tmp_image = new Image();
      tmp_image.onload = self.onLoad;
      tmp_image.src = load_images[i];
    }

    self.loadTweets();
    self.loadTwitterUser();
    self.loadInstagrams();
    self.loadInstagramUser();
    self.loadFacebookFeed();
    self.loadFacebookUser();
    self.loadEnvelopes();
  },

  onLoad: function() {
    var self = this;
    var tmp_pre_count = self.state.pre_count;
    tmp_pre_count++;

    if (tmp_pre_count == self.state.load_images.length) {

      self.setState({pre_count: tmp_pre_count, percent_loaded: 100, loaded: true});

    } else {

      var percent_loaded = (tmp_pre_count / self.state.load_images.length ) * 100;
      self.setState({pre_count: tmp_pre_count, percent_loaded: percent_loaded});

    }

  },

  componentWillUnmount: function(){
    var self = this;
    window.removeEventListener('resize', self.handleResize);
  },

  render: function render() {
    var self = this,
        description = self.state.description,
        social = self.state.social,
        fact = self.state.fact,
        windowWidth = self.state.windowWidth,
        total_instagrams = self.state.total_instagrams,
        status_count = self.state.status_count,
        total_fans = self.state.total_fans;

    // var instagrams = self.state.instagrams;
    // var instagrams = self.state.instagrams.map(function(instagram, index){
    //   return <Instagram content={instagram} key={index} />
    // });

    var instagrams = self.state.instagrams.map(function(instagram, index){
      return (
        <Motion
          key={index}
          defaultStyle={{
              opacity: 0,
              rotation: (Math.random() - 0.5)  * -1,
              x: (Math.random() - 0.5) * 2000,
              y: (Math.random() - 0.5) * 2000
            }}
          style={{
              opacity: spring(1, [80, 20]),
              rotation: spring(0, [200, 20]),
              x: spring(0, [80, 20]),
              y: spring(0, [80, 20]),
            }}>
          {function(style){
            return (
              <Instagram content={instagram} style={{ transform: "translateY("+style.y+"px) translateX("+style.x+"px)"}} />
            )
          }}
        </Motion>
      )
    });

    var envelopes = self.state.envelopes.map(function(instagram, index){
      return (
        <Motion
          key={index}
          defaultStyle={{
              opacity: 0,
              rotation: (Math.random() - 0.5)  * -1,
              x: (Math.random() - 0.5) * 2000,
              y: (Math.random() - 0.5) * 2000
            }}
          style={{
              opacity: spring(1, [80, 20]),
              rotation: spring(0, [200, 20]),
              x: spring(0, [80, 20]),
              y: spring(0, [80, 20]),
            }}>
          {function(style){
            return (
              <Instagram content={instagram} style={{ transform: "translateY("+style.y+"px) translateX("+style.x+"px)"}} />
            )
          }}
        </Motion>
      )
    });


    var tweets = self.state.tweets.map(function(tweet, index){
      return ( <Tweet content={tweet} key={index} /> )
    });

    var facebooks = self.state.facebooks.map(function(facebook, index){
      return ( <Facebook content={facebook} key={index} /> );
    });

    // if (description){
    //   var description_styles = description.split('').map(function(index){
    //     return ({rotation: (Math.random() - 0.5) * 10, x: 0, y: 0, opacity: 0});
    //   });
    // }

    return (
      <div className={"social_wrapper " + social +"_container"} onMouseLeave={self.resetSocial}>

        <div className="description">
          <Motion
            key={description}
            defaultStyle={{
                opacity: 0,
                rotation: (Math.random() - 0.5)  * -1,
                x: Math.random() * 5
              }}
            style={{
                opacity: spring(1, [80, 20]),
                rotation: spring(0, [200, 20]),
                x: spring(0, [80, 20]),
              }}>
            {function(style){
              return (<p key={description} className="uppercase italic theme" style={{position: "relative", top: style.x, transform: "rotate(" + style.rotation + "deg)", left: style.y, opacity: style.opacity}}>{description}</p>)
            }}
          </Motion>
        </div>


        <div className="social_grid">

            <a href="http://facebook.com/newblk" target="_blank" className="social_buttons facebook_button" onMouseEnter={self.setFacebook}>
              <i className="fa fa-facebook"></i>
              <span className="name">{total_fans.toLocaleString() + " Fans"}</span>
            </a>

            <a href="http://twitter.com/thenewblk" target="_blank"  className="social_buttons twitter_button" onMouseEnter={self.setTwitter}>
              <i className="fa fa-twitter"></i>
              <span className="name">{status_count.toLocaleString() + " Tweets"}</span>
            </a>

            <a href="http://instagram.com/blkstagram" target="_blank"  className="social_buttons instagram_button"  onMouseEnter={self.setInstagram}>
              <i className="fa fa-instagram"></i>
              <span className="name">{total_instagrams.toLocaleString() + " Photos"}</span>
            </a>


            <a href="http://eepurl.com/bSNEPz" target="_blank"  className="social_buttons mail_button"  onMouseEnter={self.setMail}>
              <i className="fa fa-newspaper-o"></i>
              <span className="name">Subscribe</span>
            </a>

        </div>

        <div className="background_textures">
          <div className="background_overlay"></div>
          {social == 'instagram' ?
            <Motion
              defaultStyle={{
                  opacity: 0,
                  rotation: (Math.random() - 0.5)  * -1,
                  x: Math.random() * 5
                }}
              style={{
                  opacity: spring(0.4, [80, 20]),
                  rotation: spring((Math.random()- 0.5)  * 10, [200, 20]),
                  x: spring(-45, [80, 20]),
                }}>
              {function(instagram_style){
                return (
                  <div className="instagrams" style={{position: "relative", top: instagram_style.x, transform: "rotate(" + instagram_style.rotation + "deg)", left: instagram_style.y, opacity: instagram_style.opacity}}>
                    {instagrams}
                  </div>
                )
              }}
            </Motion>
          : null }

          {social == 'twitter' ?

            <Motion
              defaultStyle={{
                  opacity: 0,
                  rotation: (Math.random() - 0.5)  * -1,
                  x: Math.random() * 5
                }}
              style={{
                  opacity: spring(0.4, [80, 20]),
                  rotation: spring((Math.random() - 0.5)  * 10, [200, 20]),
                  x: spring(-45, [80, 20]),
                }}>
              {function(style){
                return (
                  <div className="tweets" style={{position: "relative", top: style.x, transform: "rotate(" + style.rotation + "deg)", left: style.y, opacity: style.opacity}}>{tweets}</div> )
              }}
            </Motion>
          : null }

          {social == 'facebook' ?

            <Motion
              defaultStyle={{
                  opacity: 0,
                  rotation: (Math.random() - 0.5)  * -1,
                  x: Math.random() * 5
                }}
              style={{
                  opacity: spring(0.4, [80, 20]),
                  rotation: spring((Math.random() - 0.5)  * 10, [200, 20]),
                  x: spring(-45, [80, 20]),
                }}>
              {function(style){
                return (
                  <div className="tweets" style={{position: "relative", top: style.x, transform: "rotate(" + style.rotation + "deg)", left: style.y, opacity: style.opacity}}>{facebooks}</div> )
              }}
            </Motion>
          : null }
          <div className={social == 'mail' ? "footer-video video-container show" : "footer-video video-container" }>
            <video className="skateboard" poster="/images/experiential.jpg" autoPlay muted="muted" loop>
               <source src="/video/skateboard_wide.webm" type="video/webm" />
             </video>
          </div>
        </div>

        <Footer />


      </div>
    );

  }
});
