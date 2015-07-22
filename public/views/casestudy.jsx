var React = require('react');
var Router = require('react-router');
var Helmet = require('react-helmet');
var request = require('superagent');

var util = require('util');

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
    if (self.props.content && self.props.content.type == "case-study"){
      self.setState({content: self.props.content, title: self.props.content.name});
    }
    else if (self.getParams().casestudy){
      self.getContent();
    }
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
      var top_image = {
        backgroundImage: 'url(' + self.state.content.content.top_image + ')'
      }
      var things = self.state.content.content.things.map(function(thing, index){
        if (thing.type == "text") {
          return (
            <div className="post text">{thing.content}</div>
          )
        }
        if (thing.type == "pullquote") {
          if (thing.image) {
            return (
              <div className="post pullquote">
                <img className="break" src={self.state.content.content.break} />
                <img src={thing.image} />
                <img className="break" src={self.state.content.content.break} />
              </div>
            )
          }
          if (thing.content) {
            return (
              <div className="post pullquote"><img className="break" src={self.state.content.content.break} /><p>{thing.content}</p><img className="break" src={self.state.content.content.break} /></div>
            )
          }
        }
        if (thing.type == "image") {
          return (
            <div className="post image"><img src={thing.url} /></div>
          )
        }
        if (thing.type == "logo") {
          return (
            <div className="post logo"><img src={thing.url} /></div>
          )
        }
        if (thing.type == "two") {
          var little_things = thing.content.map(function(little_thing, index){
            if (little_thing.type == "text") {
              return (
                <div className="post text">{little_thing.content}</div>
              )
            }
            if (little_thing.type == "pullquote") {
              if (little_thing.image) {
                return (
                  <div className="post pullquote"><img className="break" src={self.state.content.content.break} /><img src={little_thing.image} /><img className="break" src={self.state.content.content.break} /></div>
                )
              }
              if (little_thing.content) {
                return (
                  <div className="post pullquote"><img className="break" src={self.state.content.content.break} /><p>{little_thing.content}</p><img className="break" src={self.state.content.content.break} /></div>
                )
              }
            }
            if (little_thing.type == "image") {
              return (
                <div className="post image"><img src={little_thing.url} /></div>
              )
            }
            if (little_thing.type == "logo") {
              return (
                <div className="post logo"><img src={little_thing.url} /></div>
              )
            }

          });
          return (
            <div className="post two">
              <div className="thing_1">{little_things[0]}</div>
              <div className="thing_2">{little_things[1]}</div>
            </div>
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
            {things}
          </div>
          : "Loading..."
        }
      </div>
    );
  }
});
