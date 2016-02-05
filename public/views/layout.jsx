var React = require('react');
var Router = require('react-router').Router;
var Menu = require('./menu.jsx');
var Footer = require('./footer.jsx');

var util = require('util');
var TimerMixin = require('react-timer-mixin');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/\//g, '-')
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = React.createClass({
  mixins: [ Router.State, TimerMixin ],
  contextTypes: {
    location: React.PropTypes.object
  },

  getInitialState: function(){
    return { menu: false }
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  menuOver: function(){
    this.setState({menu: true});
  },

  menuOut: function(){
    this.setState({menu: false});
  },

  deploy: function(){
    this.setState({menu: !this.state.menu});
  },

  googleAnalytics: function(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    window.ga('create', 'UA-72655037-1', 'auto');
    window.ga('send', 'pageview', {'page': this.context.location.pathname});
  },

  componentDidMount: function(){
    var self = this;
    self.setState({windowWidth: window.innerWidth});
    self.googleAnalytics();
    window.addEventListener('resize', self.handleResize);

    var ScrollMagic = require('scrollmagic');
    var TweenMax = require('../components/tweenmax.js');
    require('../components/scrollTo.js');

    var controller = new ScrollMagic.Controller();
    controller.scrollTo(function(target) {
      TweenMax.to(window, 1, {
        scrollTo : {
          y : target,
          autoKill : true
        },
        ease : Cubic.easeInOut
      });

    });

    controller.scrollTo(0);

    self.setState({controller: controller})

  },

  scrollTop: function(){
    var self = this;
    console.log("scrollTop");
    self.state.controller.scrollTo(0);
  },

  componentDidUpdate: function(prevProps, prevState){
    var self = this;
    var props = (prevProps != self.props);
    if (props && self.isMounted()) {
      window.ga('send', 'pageview', {'page': this.context.location.pathname});
      self.state.controller.scrollTo(0);
    }
  },

  componentWillUnmount: function(){
    var self = this;
    window.removeEventListener('resize', self.handleResize);
  },

  scrollIt: function(){
    alert("scrollIt");
    this.state.controller.scrollTo(0);
    this.setState({scroll: false});
  },

  render: function render() {
    var self = this,
        menu_toggle = self.state.menu,
        scroll = self.state.scroll,
        menu = "",
        case_study = self.props.content;

    if (this.context.location.pathname == "/") {
      var path = "home";
    } else {
      var path = slugify(this.context.location.pathname);
    }

    if (menu_toggle) {
      menu = " menu_over";
    } else {
      menu = ""
    }

    var url = "http://thenewblk.com";
    var type = "website";
    var title = "The New BLK";
    var image = "http://thenewblk.com/images/blk.jpg";
    var description = "We are an ad agency, creative think tank, and content production studio.";

    if (case_study) {
      type = "article";
      title = case_study.name;
      image = "http://thenewblk.com" + case_study.content.top_image;

      if (self.props.description){
        description = self.props.description;
      }

      url = url + this.context.location.pathname
    }
    var windowWidth = self.state.windowWidth;

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:url" content={url} />
          <meta property="og:type" content={type} />
          <meta property="og:title" content={title} />
          <meta property="og:image" content={image} />
          <meta property="og:description" content={description} />

          <meta property="fb:app_id" content="128452107535065" />
          <title>The New BLK</title>
          <link rel="icon" href="/images/favicon.png" />
          <link type="text/css" rel="stylesheet" href="http://fast.fonts.net/cssapi/24c40778-95c9-421b-9400-9cdd9eefcbaa.css" />
          <link rel="stylesheet" href="/styles/main.css" />
        </head>
        <body className={path + menu}>
          <Menu onMouseOver={self.menuOver} onMouseOut={self.menuOut} deploy={self.deploy}/>
          <div className="navigator_overlay"></div>
          <div className="main">
            {this.props.children}
            <Footer />
          </div>
          <script src='/bundle.js'></script>
        </body>
      </html>
    );
  }
});
