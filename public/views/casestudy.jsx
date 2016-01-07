var React = require('react');
var Router = require('react-router');
var Helmet = require('react-helmet');
var request = require('superagent');

var Draggable = require('react-draggable');
var Isvg = require('react-inlinesvg');

var util = require('util');
var Channel = require('./channel_footer.jsx');

var VideoGallery = React.createClass({
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

var Dragger = React.createClass({
  getInitialState: function(){
    return { position: {top: 500, left: 250} };
  },

  handleStart: function (event, ui) {
    this.setState( { position: ui.position } );
  },

  handleDrag: function (event, ui) {
    this.setState( { position: ui.position } );
  },

  handleStop: function (event, ui) {
    this.setState( { position: ui.position } );
  },
  render: function render() {
    var self = this;
    var bottom = self.props.bottom,
        top = self.props.top,
        left = self.state.position.left;

    return (
      <div className="post dragger">
        <div className="dragger_images">
          <Draggable
              axis="x"
              start={{x: 250, y: 500}}
              bounds="parent"
              moveOnStartChange={false}
              zIndex={100}
              onStart={self.handleStart}
              onDrag={self.handleDrag}
              onStop={self.handleStop}>
                <span className="handle">
                  <Isvg src="/icons/new/slide.svg" />
                </span>
          </Draggable>
          <div className="bottom_image" style={{backgroundImage: "url("+bottom+")"}}></div>
          <div className="top_image" style={{backgroundImage: "url("+top+")", width: left+1+"px"}}></div>

        </div>

      </div>
    )
  }
})

var Mouser = React.createClass({
  getInitialState: function(){
    // return { position: {top: 500, left: 250} };
    return { over: false, left: 250 };
  },

  mouseEnter: function () {
    // console.log("mouseOver: " + util.inspect(event));
    this.setState({over: true})
  },

  mouseLeave: function () {
    // console.log("mouseOver: " + util.inspect(event));
    this.setState({over: false})
  },

  onMouseMove: function(event){

    var window_width = window.innerWidth + 70,
        screenX = event.clientX ,
        screenY = event.clientY,
        diff = ( window_width - 500 ) / 2,
        left = 500 - (screenX - diff);

    this.setState({left: left, screenX: (screenX - 31), screenY: (screenY)});

  },

  onMouseUp: function (e) {
  // this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  },

  // componentDidMount: function () {
  //   console.log("componentDidMount");
  //   document.addEventListener('mousemove', this.onMouseMove)
  // },

  componentDidUpdate: function (props, state) {
    if (this.state.over) {
      document.addEventListener('mousemove', this.onMouseMove);
      // document.addEventListener('resize', this.onMouseMove);
      // document.addEventListener('scroll', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.over) {
      document.removeEventListener('mousemove', this.onMouseMove);
      // document.removeEventListener('resize', this.onMouseMove);
      // document.removeEventListener('scroll', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  },

  componentDidMount: function() {
    document.addEventListener('resize', this.onMouseMove);
    document.addEventListener('scroll', this.onMouseMove);
  },


  componentDidUnmount: function() {
    document.removeEventListener('resize', this.onMouseMove);
    document.removeEventListener('scroll', this.onMouseMove);
  },

  render: function render() {
    var self = this;
    var bottom = self.props.bottom,
        top = self.props.top,
        left = self.state.left,
        screenX = self.state.screenX,
        screenY = self.state.screenY,
        over = self.state.over;

    return (
      <div className={ over ? "post mouser" : "post mouser over" }>
        <div className="dragger_images">

          <div className="bottom_image" style={{backgroundImage: "url("+bottom+")"}}></div>
          <div className="top_image" style={{backgroundImage: "url("+top+")", width: left+"px"}}></div>
          <div className="mouse_overlay" onMouseEnter={self.mouseEnter} onMouseLeave={self.mouseLeave} ></div>
        </div>

        <span className="handle" style={{top: screenY, left: screenX }}>
          <Isvg src="/icons/new/slide.svg" />
        </span>
      </div>
    )
  }
})

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
          var words = thing.content.map(function(word, index){
            return (
              <span key={index} className={ "content " + word.style }>{word.content}</span>
            )
          });
          return (
            <div key={index} className={"post " + thing.type + " " + thing.style } style={block_style}>
              {words}
            </div>
          )
          // if (thing.style == "uppercase") {
          //   return (
          //     <div key={index} className={"post " + thing.type + " " + thing.style } style={block_style}><span className="content">{thing.content}</span></div>
          //   )
          // } else if (thing.style == "bold") {
          //   return (
          //     <div key={index} className={"post " + thing.type + " " + thing.style } style={block_style}>
          //       <span className="content">{thing.content}</span>
          //       <span className="bold-content">{thing.bold}</span>
          //     </div>
          //   )
          // } else {
          //   return (
          //     <div key={index} className={"post " + thing.type + " " + thing.style } style={block_style}><span className="content">{thing.content}</span></div>
          //   )
          // }
        }

        if (thing.type == "text") {
          return (
            <div key={index} className={"post " + thing.type + " " + thing.style }>
              {thing.headline ? <h2 className="headline">{thing.headline}</h2> : null}
              {thing.content}
            </div>
          )
        }

        if (thing.type == "pullquote") {
          if (thing.image) {
            return (
              <div key={index} className={"post " + thing.type + " " + thing.style }>
                <img className="break" src={self.state.content.content.break} />
                <img src={thing.image} />
                <img className="break" src={self.state.content.content.break} />
              </div>
            )
          }
          if (thing.content) {
            return (
              <div key={index} className={"post " + thing.type + " " + thing.style }><img className="break" src={self.state.content.content.break} /><p>{thing.content}</p><img className="break" src={self.state.content.content.break} /></div>
            )
          }
        }

        if (thing.type == "image") {
          return (
            <div key={index} className={"post " + thing.type + " " + thing.style }><img src={thing.url} /></div>
          )
        }

        if (thing.type == "logo") {
          var style = thing.style;
          return (
            <div key={index} className={"post " + thing.type + " " + thing.style } ><img src={thing.url} /></div>
          )
        }

        if (thing.type == "logos") {
          var logos = thing.content.map(function(small_logo, index){
            return (
              <span key={index} className="small_logo"><img src={small_logo} /></span>
            )
          });
          return (
            <div key={index} className={"post " + thing.type + " " + thing.style }>{logos}</div>
          )
        }

        if (thing.type == "images") {
          var images = thing.images.map(function(image, index){
            return (
              <div key={index} className="image-wrapper"><img src={image} /></div>
            )
          });
          return (
            <div key={index} className={"post " + thing.type + " " + thing.style }>
              {images}
            </div>
          )
        }

        if (thing.type == "video") {

          return (
            <div key={index} className={"post " + thing.type + " " + thing.style } >

            </div>
          )
        }

        if (thing.type == "videos") {
          return (
            <VideoGallery key={index} thing={thing} blockColor={self.state.content.block_color}/>
          )
        }

        if ( thing.type == "mouser" ) {
          var top = thing.top,
              bottom = thing.bottom;
          return (
            <Mouser bottom={bottom} top={top} />
          )
        }

        if ( thing.type == "dragger" ) {
          var top = thing.top,
              bottom = thing.bottom;
          return (
            <Dragger bottom={bottom} top={top} />
          )
        }

        if ( thing.type == "doublewide" ) {
          if (thing.arrangement == "image-left"){
            return (
              <div className={"post " + thing.type + " " + thing.style }>
                <div className="image">
                  <img src={thing.image} />
                </div>
                <p className="text">
                  { thing.vargas ? <img className="vargas-signature" src={thing.vargas} /> : null }
                  {thing.content}
                </p>
              </div>
            )

          } else if (thing.arrangement == "text-left"){
            return (
              <div className={"post " + thing.type + " " + thing.style }>
                <p className="text">
                  { thing.vargas ? <img className="vargas-signature" src={thing.vargas} /> : null }
                  {thing.content}
                </p>
                <div className="image">
                  <img src={thing.image} />
                </div>
              </div>
            )

          } else {
            return (
              <div className={"post " + thing.type + " " + thing.style }>
                <p>Which arrangement?</p>
              </div>
            )

          }
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
            <div className="post block top_block" style={block_style}>
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
