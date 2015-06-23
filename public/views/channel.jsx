var React = require('react');
var Router = require('react-router');
var Helmet = require('react-helmet');
var request = require('superagent');

var util = require('util');

module.exports = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function(){
    return {params: {}, title: 'things'};
  },

  getContent: function(){
    var self = this;
    request
      .get('/api/channel/'+self.getParams().channel)
      .end(function(err, res){
        if (res) {
          console.log('res: ' + util.inspect(res));
          self.setState({content: res.body, title: res.body.name });
        }

      });
  },

  componentDidMount: function() {
    var self = this;
    self.setState({ params: self.getParams() });
    if (self.getParams().channel){
      self.getContent();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var self = this;

    self.setState({params: self.getParams(), title: self.getParams().channel, content: null });
    self.getContent();
  },

  changeTitle: function(){
    this.setState({title: "New Title"});
  },

  render: function render() {
    var self = this;
    var title = self.state.title;
    if  (self.state.content) {
      var name = self.state.content.name;
      var description = self.state.content.description;
    }
    return (
      <div>
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
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
          : "Loading..."
        }

        <button onClick={self.changeTitle}>Change</button>
      </div>
    );
  }
});
