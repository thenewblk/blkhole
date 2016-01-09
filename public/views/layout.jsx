var React = require('react');
var Router = require('react-router');
var Menu = require('./menu.jsx');
var Helmet = require('react-helmet');

var util = require('util');

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
  mixins: [ Router.State ],

  componentDidMount: function(){
    // this.typekit();
  },

  typekit: function() {
    (function() {
      var config = {
        kitId: 'fus2ruo',
        scriptTimeout: 3000
      };
      var h = document.getElementsByTagName('html')[0];
      h.className += ' wf-loading';
      var t = setTimeout(function() {
        h.className = h.className.replace(/(\s|^)wf-loading(\s|$)/g, ' ');
        h.className += ' wf-inactive';
      }, config.scriptTimeout);
      var d = false;
      var tk = document.createElement('script');
      tk.src = '//use.typekit.net/' + config.kitId + '.js';
      tk.type = 'text/javascript';
      tk.async = 'true';
      tk.onload = tk.onreadystatechange = function() {
        var rs = this.readyState;
        if (d || rs && rs != 'complete' && rs != 'loaded') return;
        d = true;
        clearTimeout(t);
        try { Typekit.load(config); } catch (e) {}
      };
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(tk, s);
    })();
  },

  render: function render() {
    var self = this;

    if (self.getPathname() == "/") {
      var path = "home";
    } else {
      var path = slugify(self.getPathname());
    }

    return (
      <html className="">
        <head>
          <meta charSet='utf-8' />
          <link rel="shortcut icon" href="/favicon.jpg" />
          <link type="text/css" rel="stylesheet" href="http://fast.fonts.net/cssapi/24c40778-95c9-421b-9400-9cdd9eefcbaa.css"/>
          <link rel="stylesheet" href="/styles/main.css" />
        </head>
        <body className={path}>
          <Menu />
          <div className="main">
            {this.props.children}
          </div>
        </body>
        <script src='/bundle.js'></script>
      </html>
    );
  }
});
