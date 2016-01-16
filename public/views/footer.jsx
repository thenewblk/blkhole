var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var Isvg = require('react-inlinesvg');

module.exports = React.createClass({
  getInitialState: function(){
    return { };
  },

  render: function render() {

    return (
        <footer className="footer">
          <div className="f-wrapper">
            <div className="contact">
              <p className="telly"><a href="tel:4024035619">402.403.5619</a></p>
              <p className="info">info@thenewblk.com</p>
            </div>
            <div className="social">
              <a href="https://www.facebook.com/newblk" target="_blank"><Isvg className="facebook" src="/icons/new/facebook_1-01.svg" /></a>
              <a href="https://twitter.com/thenewblk" target="_blank"><Isvg className="twitter" src="/icons/new/twitter_1-01.svg" /></a>
              <a href="https://instagram.com/blkstagram" target="_blank"><Isvg className="instagram" src="/icons/new/instagram_1-01.svg" /></a>
            </div>
            <div className="map">
              <a href="https://www.google.com/maps/dir//1213+Jones+St,+Omaha,+NE+68102/@41.2531413,-95.9348167,17z/data=!4m13!1m4!3m3!1s0x87938fa8d0d71f35:0x66540c961935aa26!2s1213+Jones+St,+Omaha,+NE+68102!3b1!4m7!1m0!1m5!1m1!1s0x87938fa8d0d71f35:0x66540c961935aa26!2m2!1d-95.9326227!2d41.2531413" target="_blank"><p>1213 Jones Street <br />Omaha, NE 68102</p></a>
            </div>
          </div>
        </footer>
    );
  }
});
