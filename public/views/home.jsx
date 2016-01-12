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
  setHandcrafted: function(){
    this.setState({video: "/video/handcrafted.mp4"})
  },
  setExperiential: function(){
    this.setState({video: "/video/experiential.mp4"})
  },
  resetVideo: function(){
    this.setState({video: null})
  },

  render: function render() {
    var self = this,
        video = self.state.video;

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
      <div className="diamond_grid">
        <Link className="square" to="/agency">
          <span className="diamond_wrapper">
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
      </div>
      {video ?
        <div className="video-container has_video" key={video}>
          <video id="video-background" autoPlay muted="muted" loop>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      : <div className="video-container" key="blank" ></div>
      }

    </div>
    );
  }
});
