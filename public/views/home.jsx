var React = require('react');
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

var util = require('util');

module.exports = React.createClass({
  getInitialState: function(){
    return {title: '', words: "Ad agency, creative think tank, and content production studio"};
  },
  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },
  setAgency: function(){
    this.setState({title: 'We are', video: "agency", words: "We only know one way: All in."})
  },
  setHandcrafted: function(){
    this.setState({title: "handcrafted is", video: "handcrafted", words: "Our design process often mirrors the spirit and aesthetic of the brands we help build."})
  },
  setExperiential: function(){
    this.setState({title: "experiential is", video: "experiential", words: "We cultivate brand experiences that are both in-the-moment and long-lasting."})
  },
  resetVideo: function(){
    this.setState({title: '', video: null, words: "Ad agency, creative think tank, and content production studio"})
  },

  componentDidMount: function(){
    var self = this;
    self.setState({windowWidth: window.innerWidth});
    window.addEventListener('resize', self.handleResize);
  },

  render: function render() {
    var self = this,
        video = self.state.video,
        words = self.state.words,
        title = self.state.title,
        windowWidth = self.state.windowWidth;
    if (title){
      var title_styles = title.split('').map(function(index){
        return ({rotation: (Math.random() - 0.5) * 10, x: 0, y: 0, opacity: 0})
      })
    }

    if (words){
      var words_styles = words.split('').map(function(index){
        return ({rotation: (Math.random() - 0.5) * 25, x: 0 , y: 0, opacity: 0})
      })
    }
    var example = "an ad agency, creative think tank, and content production studio.";
    var example_styles = example.split('').map(function(index){
      return ({rotation: (Math.random() - 0.5) * 4500 , x: (Math.random() - 0.5) * 1000 , y: (Math.random() - 0.5) * 1000, opacity: 0, scale: 1})
    })
    if (windowWidth) {
      if (windowWidth > 768){
        return (
          <div className="home_page">
            <Helmet title="The New BLK" />
            <div className="diamond_grid_3">
              <span className="desktop_squares">
                <div className="square"></div>
                <Link className="square" to="/agency" onMouseEnter={self.setAgency} onMouseLeave={self.resetVideo}>
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
                <div className="square"></div>
                <Link className="square" to="/experiential" onMouseEnter={self.setExperiential} onMouseLeave={self.resetVideo} >
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
                <Link className="square" to="/handcrafted" onMouseEnter={self.setHandcrafted} onMouseLeave={self.resetVideo} >
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
              </span>
              <span className="mobile_squares">
                <Link className="square" to="/agency" onMouseEnter={self.setAgency} onMouseLeave={self.resetVideo}>
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
                <Link className="square" to="/experiential" onMouseEnter={self.setExperiential} onMouseLeave={self.resetVideo} >
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
                <Link className="square" to="/handcrafted" onMouseEnter={self.setHandcrafted} onMouseLeave={self.resetVideo} >
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
              </span>
            </div>
            <div className="wearethenewblkllc">
              { title ?
                <Motion
                  key={title}
                  defaultStyle={{
                      opacity: 0,
                      rotation: Math.random() * -10,
                      x: Math.random() * 2,
                    }}
                  style={{
                      opacity: spring(1, [80, 20]),
                      rotation: spring(0, [200, 20]),
                      x: spring(0, [80, 20]),
                    }}>
                  {function(style){
                    return (<p key={title} className="uppercase italic theme" style={{position: "relative", top: style.x, transform: "rotate(" + style.rotation + "deg)", left: style.y, opacity: style.opacity}}>{title}</p>)
                  }}
                </Motion>
              : <p key={title} className="uppercase italic theme blank_title"></p> }

              <Motion
                defaultStyle={{
                    opacity: 0,
                    rotation: Math.random() * -10,
                    x: Math.random() * 2,
                  }}
                style={{
                    opacity: spring(1, [80, 20]),
                    rotation: spring(0, [200, 20]),
                    x: spring(0, [80, 20]),
                  }}>
                {function(style){
                  return (<img className="bold uppercase newblk" src="/images/thenewblk.svg" style={{position: "relative", top: style.x, transform: "rotate(" + style.rotation + "deg)", left: style.y, opacity: style.opacity}} />)
                }}
              </Motion>



                { words ?
                  <Motion
                    key={words}
                    defaultStyle={{
                        opacity: 0,
                        x: Math.random() * -15,
                      }}
                    style={{
                        opacity: spring(1, [80, 20]),
                        x: spring(0, [80, 20]),
                      }}>
                    {function(style){
                      return (<p key={words} className="italic words" style={{position: "relative", top: style.x, left: style.y, opacity: style.opacity}}>{words}</p>)
                    }}
                  </Motion>
                : null }
            </div>
            <div className="home_overlay"></div>
            <div className={"video-container " + video}>
              <video  className="experiential" poster="/images/transparent.png" autoPlay muted="muted" loop>
                <source src="/video/Experiential.webm" type="video/webm" />
                <source src="/video/experiential.mp4" type="video/mp4" />
              </video>
              <video className="handcrafted" poster="/images/transparent.png" autoPlay muted="muted" loop>
                <source src="/video/Handcrafted.webm" type="video/webm" />
                <source src="/video/handcrafted.mp4" type="video/mp4" />
              </video>
              <video className="agency" poster="/images/transparent.png" autoPlay muted="muted" loop>
                <source src="/video/agency_v2.webm" type="video/webm" />
                <source src="/video/agency.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        );
      } else {
        return (
          <div className="home_page">
            <Helmet title="The New BLK" />
            <div className="wearethenewblkllc">
              <img className="bold uppercase newblk" src="/images/thenewblk.svg" />
              <p className="italic words">Ad agency, creative think tank, and content production studio</p>
            </div>
            <div className="themes">
              <Link className="theme agency" to="/agency">
                <h2 className="theme_name">
                  <Sprite
                    image="/icons/agency_icon_sprite-01.svg"
                    columns={9}
                    frames={9}
                    duration={.25}
                    frameW={50}
                    frameH={50}
                    hover={true} />
                  <span className="name">Agency</span>
                </h2>
                <p>We only know one way: All in.</p>
                <span className="theme_overlay"></span>
              </Link>
              <Link className="theme experiential" to="/experiential">
                <h2 className="theme_name">
                  <Sprite
                    image="/icons/experiential-sprite-01.svg"
                    columns={9}
                    frames={15}
                    duration={.5}
                    frameW={50}
                    frameH={50}
                    hover={true} />
                  <span className="name">Experiential</span>
                </h2>
                <p>We cultivate brand experiences that are both in-the-moment and long-lasting.</p>
                <span className="theme_overlay"></span>
              </Link>
              <Link className="theme handcrafted" to="/handcrafted">
                <h2 className="theme_name">
                  <Sprite
                    image="/icons/handcrafted-sprite-01.svg"
                    columns={8}
                    frames={16}
                    duration={.4}
                    frameW={50}
                    frameH={50}
                    hover={true} />
                  <span className="name">Handcrafted</span>
                </h2>
                <p>Our design process often mirrors the spirit and aesthetic of the brands we help build.</p>
                <span className="theme_overlay"></span>
              </Link>
            </div>
            <div className="home_overlay"></div>
          </div>
        );
      }
    } else {
      return (
        <div className="home_page">
          <Helmet title="The New BLK" />
          <Loader />
        </div>
      )

    }
  }
});
