var React = require('react');
var Router = require('react-router');
var Helmet = require('react-helmet');
var request = require('superagent');
var Link = Router.Link;

var Sprite = require('../components/sprite.jsx');
var Loader = require('../components/loader.jsx');

var util = require('util');

module.exports = React.createClass({
  mixins: [ Router.State ],

  contextTypes: {
    location: React.PropTypes.object
  },

  getInitialState: function(){
    return {params: {}, title: ''};
  },

  getDefaultProps: function(){
    var self = this;
    return { view_description: true };
  },

  getContent: function(){
    var self = this;
    var channel = self.props.channel || self.props.params.channel;
    request
      .get('/api/channel/'+channel)
      .end(function(err, res){
        if (res) {
          if (self.isMounted()) {
            self.setState({content: res.body, title: res.body.name, view_description: self.props.view_description });
          }
        }
      });
  },

  // componentWillMount: function() {
  //   var self = this;
  // },

  componentDidMount: function() {
    var self = this;
    self.setState({ params: this.props.params, view_description: self.props.view_description });
    self.getContent();
    // if (self.props.content && self.props.content.type == "channel"){
    //   self.setState({content: self.props.content, title: self.props.content.name});
    //   self.getContent();
    // }
    // else if (self.props.params.channel){
    //   self.getContent();
    // }
  },

  componentDidUpdate: function(nextProps) {
    var self = this;
    if ( nextProps != self.props ){
      self.getContent();
    }
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
    var no_title = self.props.no_title;
    if (self.state.view_description == true){
      var project_view = "featured_projects show";
    } else {
      var project_view = "featured_projects hide";
    }


    if  (self.state.content) {
      var name = self.state.content.name;
      var description = self.state.content.description;
      var icon = self.state.content.icon;

      var video_files = self.state.content.video;

      if (video_files) {
        var webm = video_files.webm,
            mp4 = video_files.mp4;
      }

      var projects = self.state.content.case_studies.map(function(project, index){
        var project_color = project.color;
        var tmp_styles = {
          backgroundImage: 'url('+project.featured_image+')'
        }
        var tmp_number = index+1;
        if (project.url) {
          return (
             <div key={index} className={"project project_"+tmp_number} style={tmp_styles}>
               <Link to={project.url}>
                 <div className="project_content">

                   <div className="project_inner">
                     <h1 className="project_name">{project.name}</h1>
                     <p className="project_tagline">{project.tagline}</p>
                   </div>
                   <div className="project_overlay" style={{background: project_color}}></div>
                 </div>
               </Link>
             </div>
           )
        } else {
          return (
            <div key={index} className={"project project_"+tmp_number} style={tmp_styles}>
              <div className="project_content">
                <div className="project_inner">
                  <h1 className="project_name">{project.name}</h1>
                  <p className="project_tagline">{project.tagline}</p>
                </div>
              </div>
            </div>
          )
        }
      });

      var formatted_description = self.state.content.descriptions.map(function(copy, index){
        return (
          <p key={index} className="decription_copy">{copy}</p>
        )
      });

      return (
        <div className="channel" key="channel">
          { no_title ? null : <Helmet title={title + " | The New BLK"} /> }
            <div className="content">
              <div className={project_view + " p_" +projects.length}>
                {projects.reverse()}
                <div className="channel_info">
                  <div className="channel_container">
                    <span className="channel_words">
                        <h1 className="channel_name">{name}</h1>
                        <div className="channel_description">{formatted_description}</div>
                    </span>
                    <span className="channel_button">
                      <span className="view_channel" onClick={self.toggleDescription}>View {name} projects</span>
                      <span className="channel_icon" key={name} id={name} onClick={self.toggleDescription}>
                        { icon ?
                        <Sprite
                          image={icon.image}
                          columns={icon.columns}
                          frames={icon.frames}
                          duration={icon.duration}
                          frameW={icon.frameW}
                          frameH={icon.frameH}
                          hover={true}
                        />
                      : null }
                      </span>
                    </span>
                  </div>
                  <div className="channel_overlay"></div>
                    { (webm || mp4) ?
                      <div className="video-container" key={title}>
                        <video className="visible" poster="/images/transparent.png" autoPlay muted="muted" loop>
                            { webm ? <source src={webm} type="video/webm" /> : null }
                            { mp4 ? <source src={mp4} type="video/mp4" /> : null }
                        </video>
                      </div>
                    : null }
                </div>
              </div>
            </div>
        </div>
      );
    } else {
      return (
        <div className="channel">
          <Loader />
        </div>
      );
    }
  }
});
