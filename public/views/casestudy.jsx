var React = require('react');
var Router = require('react-router');
var Helmet = require('react-helmet');
var request = require('superagent');

var util = require('util');
var Channel = require('./channel_footer.jsx');

var VideoGallery = React.createClass({
  getInitialState: function(){
    return {currentVideo: "", moreOver: false};
  },
  setCurrentVideo: function(video){
    this.setState({currentVideo: video})
  },

  moreOver: function(){
    this.setState({moreOver: true})
  },

  moreLeave: function(){
    this.setState({moreOver: false})
  },

  render: function render() {
    var self = this;
    var thing = self.props.thing;
    var description = thing.description;
    var backgroundImage = thing.backgroundImage;

    var wrapper_styles = {
      backgroundColor: self.props.blockColor,
      backgroundImage: "url(" + backgroundImage + ")"
    }

    var videos = thing.videos.map(function(video, index){
      var image = video.image;
      var url = video.url;
      var title = video.title;
      var series = video.series;
      return (
        <span key={index} className="video_small" style={{backgroundImage: "url("+image+")"}} onClick={self.setCurrentVideo.bind(self,url)}>
          <span className="description">
            <h4 className="video_small_title">{title}</h4>
            <p className="video_small_series">{series}</p>
          </span>
        </span>
      )
    });

    var currentVideo = self.state.currentVideo;
    var moreOver = self.state.moreOver;

    return (
      <div className={currentVideo ? "post videos video_open" : "post videos" }>
        {currentVideo ?
          <div className="iframe-video-container">
            <iframe src={currentVideo+"?autoplay=1"} frameBorder="0" width="560" height="315"></iframe>
            {moreOver ? <div className="more_overlay"></div> : null }
          </div>

        :
          <div className="main_video_wrapper" style={wrapper_styles}>
            <div className="main_video_container">
              <p>{description}</p>
            </div>
          </div>
        }
        <div className={moreOver ? "video_sidebar over" : "video_sidebar" } onMouseEnter={self.moreOver} onMouseLeave={self.moreLeave} onMouseOver={self.moreOver}>
          {videos}
        </div>
        <span className="video_more" onMouseEnter={self.moreOver} onMouseLeave={self.moreLeave}>
          <span className="video_more_text">more</span>
        </span>
      </div>
    )
  }
});


module.exports = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function(){
    return {params: {}, title: ''};
  },

  getContent: function(){
    var self = this;
    request
      .get('/api/post/'+self.getParams().casestudy)
      .end(function(err, res){
        if (res) {
          self.setState({content: res.body, title: res.body.name });
        }
      });
  },

  // componentWillMount: function() {
  //   var self = this;
  // },

  componentWillMount: function() {
    var self = this;
    self.setState({ params: self.getParams() });

    // if (self.props.content && self.props.content.type == "case-study"){
    //   self.getContent();
    //   // self.setState({content: self.props.content, title: self.props.content.name});
    // }
    // else if (self.getParams().casestudy){
    //   self.getContent();
    // }
    self.getContent();
  },

  componentWillReceiveProps: function(nextProps) {
    var self = this;
    self.getContent();
  },

  consoleLog: function(){
    console.log("this.state: " + util.inspect(this.state));
    console.log("this.props: " + util.inspect(this.props));
  },

  toggleDescription: function(){
    this.setState({view_description: !this.state.view_description});
  },

  render: function render() {
    var self = this;
    var title = self.state.title;
    if  (self.state.content) {
      var name = self.state.content.name;
      var project_tags = self.state.content.project_tags;
      var top_image = {
        backgroundImage: 'url(' + self.state.content.content.top_image + ')'
      }

      var block_style = {
        backgroundColor: self.state.content.block_color,
        background: "linear-gradient(135deg, transparent 50px, "+self.state.content.block_color+" 0) top left, linear-gradient(0deg, transparent 0, "+self.state.content.block_color+" 0) top right, linear-gradient(315deg, transparent 50px, "+self.state.content.block_color+" 0) bottom right, linear-gradient(0deg, transparent 0, "+self.state.content.block_color+" 0) bottom left",
        backgroundSize: "51%",
        backgroundRepeat: "no-repeat"
      }

      var things = self.state.content.content.things.map(function(thing, index){
        if (thing.type == "block") {
          if (thing.style == "uppercase") {
            return (
              <div key={index} className="post block uppercase" style={block_style}><span className="content">{thing.content}</span></div>
            )
          } else if (thing.style == "bold") {
            return (
              <div key={index} className="post block bold" style={block_style}>
                <span className="content">{thing.content}</span>
                <span className="bold-content">{thing.bold}</span>
              </div>
            )
          } else {
            return (
              <div key={index} className="post block" style={block_style}><span className="content">{thing.content}</span></div>
            )
          }
        }
        if (thing.type == "text") {
          return (
            <div key={index} className="post text">{thing.content}</div>
          )
        }
        if (thing.type == "pullquote") {
          if (thing.image) {
            return (
              <div key={index} className="post pullquote">
                <img className="break" src={self.state.content.content.break} />
                <img src={thing.image} />
                <img className="break" src={self.state.content.content.break} />
              </div>
            )
          }
          if (thing.content) {
            return (
              <div key={index} className="post pullquote"><img className="break" src={self.state.content.content.break} /><p>{thing.content}</p><img className="break" src={self.state.content.content.break} /></div>
            )
          }
        }
        if (thing.type == "image") {
          return (
            <div key={index} className="post image"><img src={thing.url} /></div>
          )
        }
        if (thing.type == "logo") {
          return (
            <div key={index} className="post logo"><img src={thing.url} /></div>
          )
        }

        if (thing.type == "logos") {
          var logos = thing.content.map(function(small_logo, index){
            return (
              <span key={index} className="small_logo"><img src={small_logo} /></span>
            )
          });
          return (
            <div key={index} className="post logos">{logos}</div>
          )
        }

        if (thing.type == "4-images") {
          return (
            <div key={index} className="post four-images">
              <div className="image-wrapper image-one">
                <img src={thing.one} />
              </div>
              <div className="image-wrapper image-two">
                <img src={thing.two} />
              </div>
              <div className="image-wrapper image-hree">
                <img src={thing.three} />
              </div>
              <div className="image-wrapper image-four">
                <img src={thing.four} />
              </div>
            </div>
          )
        }

        if (thing.type == "video") {

          return (
            <div key={index} className="post video" >

            </div>
          )
        }

        if (thing.type == "videos") {
          return (
            <VideoGallery key={index} thing={thing} blockColor={self.state.content.block_color}/>
          )
        }

      });
    }

    return (
      <div className="case_study">
        <Helmet
              title={title}
              meta={[
                  {"name": "description", "content": title },
                  {"property": "og:type", "content": "article"}
              ]}
              link={[
                  {"rel": "canonical", "href": "http://mysite.com/example"},
                  {"rel": "apple-touch-icon", "href": "http://mysite.com/img/apple-touch-icon-57x57.png"},
                  {"rel": "apple-touch-icon", "sizes": "72x72", "href": "http://mysite.com/img/apple-touch-icon-72x72.png"}
              ]}
          />
        { self.state.content ?
          <div className="content">
            <div className="top" style={top_image}>
              <h1 className="case_study_name">{name}</h1>
            </div>
            <div className="post block " style={block_style}>
              <span className="content left_label">{self.state.content.top_block.project_tags}</span>
              <span className="content">{self.state.content.top_block.content}</span>
            </div>
            {things}
            <Channel channel={self.state.content.channel} />
          </div>
          : "Loading..."
        }

      </div>
    );
  }
});
