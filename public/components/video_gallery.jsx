var React = require('react');
var Isvg = require('react-inlinesvg');

var VideoGallery = module.exports = React.createClass({
  getInitialState: function(){
    return {currentVideo: "", moreOver: false};
  },
  setCurrentVideo: function(video, type){
    this.setState({currentVideo: video, type: type})
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
      var type = video.type;
      var series = video.series;
      return (
        <span key={index} className="video_small" style={{backgroundImage: "url("+image+")"}} onClick={self.setCurrentVideo.bind(self, url, type)}>
          <span className="description">
            <h4 className="video_small_title">{title}</h4>
            <p className="video_small_series">{series}</p>
          </span>
          <span className="small_over"></span>
        </span>
      )
    });

    var currentVideo = self.state.currentVideo;
    var type = self.state.type;
    var moreOver = self.state.moreOver;

    return (
      <div className={currentVideo ? "post videos video_open" : "post videos" }>
        {currentVideo ?
          <div className="iframe-video-container">
            {type == "vimeo" ? <iframe src={currentVideo+"&autoplay=1"}  width="853" height="480" frameBorder="0" webkitAllowfullscreen mozAllowfullscreen allowfullscreen></iframe> : null }
            {type == "youtube" ? <iframe src={currentVideo+"?autoplay=1"} frameBorder="0" width="560" height="315"></iframe> : null }


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
