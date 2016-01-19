var React = require('react');
var Router = require('react-router');
var Helmet = require('react-helmet');

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
    return {title: 'We are', words: "We only know one way: All in."};
  },
  setAgency: function(){
    this.setState({title: "your agency is", video: "agency", words: "an ad agency, creative think tank, and content production studio."})
  },
  setHandcrafted: function(){
    this.setState({title: "handcrafted is", video: "handcrafted", words: "Our design process often mirrors the spirit and aesthetic of the brands we help build."})
  },
  handcraftedLoaded: function(){
    console.log("handcraftedLoaded");
  },
  setExperiential: function(){
    this.setState({title: "experiential is", video: "experiential", words: "We cultivate brand experiences that are both in-the-moment and long-lasting."})
  },
  resetVideo: function(){
    this.setState({title: 'We are', video: null, words: "We only know one way: All in."})
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

    return (
      <div className="home_page">
        <Helmet
              title="The New BLK"
              meta={[
                  {"name": "description", "content": "the new blk" }
              ]}
              link={[
                  {"rel": "canonical", "href": "http://thenewblk.com/"}
              ]}
          />
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
            <StaggeredMotion
              key={title}
              defaultStyles={title_styles}
              styles={
              function(prevStyles){
                return prevStyles.map(function(_, i){
                  return (i === 0)
                      ? { rotation: spring(0, [300, 30]), opacity: spring(1, [600, 30])}
                      : { opacity: spring(prevStyles[i - 1].opacity, [600, 30]),
                          rotation: spring(prevStyles[i - 1].rotation, [300, 30]),
                        }
                  });
              }}>
              {function(interpolatedStyles){
                return (
                  <p className="uppercase italic theme" style={{display: "inline-block"}}>
                    {interpolatedStyles.map(
                      function(style, i){
                          if (title[i] == " "){
                            return <span key={i} style={{position:"relative", display: "inline", top: style.x, transform: "rotate(" + style.rotation + "deg)", left: style.y, opacity: style.opacity}} >{title[i]}</span>
                          } else {
                            return <span key={i} style={{position:"relative", display: "inline-block", top: style.x, transform: "rotate(" + style.rotation + "deg)", left: style.y, opacity: style.opacity}} >{title[i]}</span>
                          }
                        }
                    )}
                  </p>
                )
              }}
            </StaggeredMotion>
          : null }
          <h2 className="bold uppercase newblk">The New BLK</h2>

          { words ?
            <StaggeredMotion
              key={words}
              defaultStyles={words_styles}
              styles={
              function(prevStyles){
                return prevStyles.map(function(_, i){
                  return (i === 0)
                      ? { rotation: spring(0, [400, 30]), opacity: spring(1, [1200, 50])}
                      : { opacity: spring(prevStyles[i - 1].opacity, [1200, 50]),
                          rotation: spring(prevStyles[i - 1].rotation, [400, 30]),
                        }
                });
              }}>
              {function(interpolatedStyles){
                return (
                  <p className="italic words" style={{display: "inline-block"}}>
                    {interpolatedStyles.map(
                      function(style, i){
                          if (words[i] == " "){
                            return <span key={i} style={{position:"relative", display: "inline", top: style.x, transform: "rotate(" + style.rotation + "deg)", left: style.y, opacity: style.opacity}} >{words[i]}</span>
                          } else {
                            return <span key={i} style={{position:"relative", display: "inline-block", top: style.x, transform: "rotate(" + style.rotation + "deg)", left: style.y, opacity: style.opacity}} >{words[i]}</span>
                          }
                        }
                    )}
                  </p>
                )
              }}
            </StaggeredMotion>
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
  }
});
