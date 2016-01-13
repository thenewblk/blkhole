var React = require('react');
var Router = require('react-router');
var Helmet = require('react-helmet');

var Sprite = require('../components/sprite.jsx');
var Link = Router.Link;

var util = require('util');

module.exports = React.createClass({
  getInitialState: function(){
    return {};
  },
  setAgency: function(){
    this.setState({title: "your agency", words: "We only know one way: All in."})
  },
  setHandcrafted: function(){
    this.setState({title: "handcrafted", video: "handcrafted", words: "Our design process often mirrors the spirit and aesthetic of the brands we help build."})
  },
  handcraftedLoaded: function(){
    console.log("handcraftedLoaded");
  },
  setExperiential: function(){
    this.setState({title: "experiential", video: "experiential", words: "We cultivate brand experiences that are both in-the-moment and long-lasting."})
  },
  resetVideo: function(){
    this.setState({title: null, video: null, words: null})
  },
  componenetDidMount: function(){
    var self = this;
    var handcrafted = document.createElement('video');
    handcrafted.src = "/video/handcrafted.mp4"
    handcrafted.loadeddata = self.handcraftedLoaded();
  },

  render: function render() {
    var self = this,
        video = self.state.video,
        words = self.state.words,
        title = self.state.title

    return (
      <div className="home_page">
        <Helmet
              title="the new blk"
              meta={[
                  {"name": "description", "content": "the new blk" }
              ]}
              link={[
                  {"rel": "canonical", "href": "http://thenewblk.com/"},
                  {"rel": "shortcut icon", "href": "/favicon.jpg"}
              ]}
          />
        <div className="diamond_grid_3">
        <div className="square"></div>
        <Link className="square" to="/agency">
          <span className="diamond_wrapper" onMouseOver={self.setAgency} onMouseOut={self.resetVideo}>
            <Sprite
              image="/icons/agency_icon_sprite-01.svg"
              columns={9}
              frames={9}
              duration={.25}
              frameW={50}
              frameH={50}
              hover={true} />
            <span className="name">Agency</span>
          </span>
        </Link>
        <div className="square"></div>
        <Link className="square" to="/experiential" onMouseOver={self.setExperiential} onMouseOut={self.resetVideo} >
          <span className="diamond_wrapper">
            <Sprite
              image="/icons/experiential-sprite-01.svg"
              columns={9}
              frames={15}
              duration={.5}
              frameW={50}
              frameH={50}
              hover={true} />
            <span className="name">Experiential</span>
          </span>
        </Link>
        <Link className="square" to="/handcrafted" onMouseOver={self.setHandcrafted} onMouseOut={self.resetVideo} >
          <span className="diamond_wrapper">
            <Sprite
              image="/icons/handcrafted-sprite-01.svg"
              columns={8}
              frames={16}
              duration={.4}
              frameW={50}
              frameH={50}
              hover={true} />
            <span className="name">Handcrafted</span>
          </span>
        </Link>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="wearethenewblkllc">
        <p className="uppercase italic theme">{ title ? title + " is" : "We are" }</p>
        <h2 className="bold uppercase newblk">The New BLK</h2>
        <p className="italic words">{words ? words : "an ad agency, creative think tank, and content production studio." }</p>
      </div>
      <div className="home_overlay"></div>
      <div className={"video-container " + video}>
        <video  className="experiential" poster="/images/transparent.png" autoPlay muted="muted" loop>
          <source src="/video/Experiential.webm" type="video/webm" />
        </video>
        <video className="handcrafted" poster="/images/transparent.png" autoPlay muted="muted" loop>
          <source src="/video/Handcrafted.webm" type="video/webm" />
        </video>
      </div>


    </div>
    );
  }
});
