var React = require('react');
var Router = require('react-router');
var Helmet = require('react-helmet');
var request = require('superagent');

var Draggable = require('react-draggable');
var Isvg = require('react-inlinesvg');

var util = require('util');
var Channel = require('./channel_footer.jsx');

var Mouser = require("../components/mouser.jsx");
var Dragger = require("../components/dragger.jsx");
var VideoGallery = require("../components/video_gallery.jsx");

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
