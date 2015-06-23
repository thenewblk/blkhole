var React = require('react');
var Router = require('react-router');
var Menu = require('./menu.jsx');
var Helmet = require('react-helmet');

var util = require('util');

module.exports = React.createClass({
  mixins: [ Router.State ],
  componentDidMount: function(){
    (function(d) {
      var config = {
        kitId: 'fus2ruo',
        scriptTimeout: 3000
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
  },
  render: function render() {
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <link rel="shortcut icon" href="/favicon.jpg" />
          <link rel="stylesheet" href="/styles/main.css" />
        </head>
        <body>
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
