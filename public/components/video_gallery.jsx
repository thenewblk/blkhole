var React = require('react');
var Isvg = require('react-inlinesvg');

var VideoGallery = module.exports = React.createClass({
  getInitialState: function(){
    return {currentVideo: "", moreOver: false};
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  setCurrentVideo: function(video, type){
    console.log("setCurrentVideo");
    this.setState({currentVideo: video, type: type})
  },

  moreOver: function(){
    this.setState({moreOver: true})
  },

  moreLeave: function(){
    this.setState({moreOver: false})
  },

  componentDidMount: function(){
    var self = this;
    self.setState({windowWidth: window.innerWidth});
    window.addEventListener('resize', self.handleResize);
  },

  componentWillUnmount: function(){
    var self = this;
    window.removeEventListener('resize', self.handleResize);
  },

  render: function render() {
    var self = this,
    thing = self.props.thing,
    description = thing.description,
    backgroundImage = thing.backgroundImage,
    style = thing.style,
    currentVideo = self.state.currentVideo,
    type = self.state.type,
    moreOver = self.state.moreOver,
    windowWidth = self.state.windowWidth;

    var wrapper_styles = {
      backgroundColor: self.props.blockColor,
      backgroundImage: "url(" + backgroundImage + ")"
    }

    if (thing.videos.length > 1) {
      var videos = thing.videos.map(function(video, index){
        var image = video.image,
            url = video.url,
            title = video.title,
            type = video.type,
            video_files = video.video,
            series = video.series;

        if (video_files) {
          var webm = video_files.webm,
              mp4 = video_files.mp4;
        }
        return (
          <span key={index} className="video_small" style={{backgroundImage: "url("+image+")"}} onClick={self.setCurrentVideo.bind(self, url, type)}>
            <span className="description">
              <h4 className="video_small_title">{title}</h4>
              <p className="video_small_series">{series}</p>
            </span>
            <span className="small_over">
              { (webm || mp4) ?
                <video poster="/images/transparent.png" autoPlay muted="muted" loop>
                    { webm ? <source src={webm} type="video/webm" /> : null }
                    { mp4 ? <source src={mp4} type="video/mp4" /> : null }
                </video>
                : null
              }
            </span>
          </span>
        )
      });

      var mobile_videos = thing.videos.map(function(video, index){
        var image = video.image,
            url = video.url,
            title = video.title,
            type = video.type,
            video_files = video.video,
            series = video.series;

        if (video_files) {
          var webm = video_files.webm,
              mp4 = video_files.mp4;
        }

        var videogallery = {
            type: "videos",
            backgroundImage: image,
            description: title,
            videos: [
                {
                    type: type,
                    url: url,
                    title: title,
                    series: series,
                    image: image,
                    video: {
                        webm: webm,
                        mp4: mp4
                    }
                }
              ]
            };

        return (
          <VideoGallery key={index} thing={videogallery} blockColor={self.props.blockColor} />
        )
      });

      if (windowWidth >= 768) {
        return (
          <div className={currentVideo ? "post videos video_open " + style : "post videos " + style }>
            {currentVideo ?
              <div className="iframe-video-container">
                {type == "vimeo" ? <iframe src={currentVideo+"&autoplay=1"}  width="853" height="480" frameBorder="0" webkitAllowfullscreen mozAllowfullscreen allowFullScreen></iframe> : null }
                {type == "youtube" ? <iframe src={currentVideo+"?autoplay=1"} frameBorder="0" width="560" height="315"></iframe> : null }


                {moreOver ? <div className="more_overlay"></div> : null }
              </div>

            :
              <div className="main_video_wrapper" style={wrapper_styles}>
                <div className="main_video_container" onClick={self.setCurrentVideo.bind(self, thing.videos[0].url, thing.videos[0].type)}>
                  <Isvg src="/icons/new/play_1-01.svg" className="video_play_button" />
                  <p className="video_description">{description}</p>
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
      } else {
        return (
          <div className="post mobile_videos">
            <div className="main_video_wrapper" style={wrapper_styles}>
              <div className="main_video_container">
                <p className="video_description">{description}</p>
              </div>
            </div>
            {mobile_videos}
          </div>
        )
      }
    } else if (thing.videos.length == 1) {
        var video = thing.videos[0];
        var image = video.image,
            url = video.url,
            title = video.title,
            type = video.type,
            video_files = video.video,
            series = video.series;

        if (video_files) {
          var webm = video_files.webm,
              mp4 = video_files.mp4;
        }
        return (
          <div className={currentVideo ? "post videos video_open single_video " + style : "post videos single_video " + style }>
            {currentVideo ?
              <div className="iframe-video-container">
                {type == "vimeo" ? <iframe src={currentVideo+"&autoplay=1"}  width="853" height="480" frameBorder="0" webkitAllowfullscreen mozAllowfullscreen allowFullScreen></iframe> : null }
                {type == "youtube" ? <iframe src={currentVideo+"?autoplay=1"} frameBorder="0" width="560" height="315"></iframe> : null }
              </div>
            :
              <div className="main_video_wrapper" style={wrapper_styles}>
                <div className="main_video_container" onClick={self.setCurrentVideo.bind(self, thing.videos[0].url, thing.videos[0].type)}>
                  <Isvg src="/icons/new/play_1-01.svg" className="video_play_button" />
                  <p className="video_description">{description}</p>
                  <div className="more_overlay"></div>
                </div>
              </div>
            }
          </div>
        )
    }
  }
});
