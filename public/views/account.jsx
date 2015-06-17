var React = require('react');

module.exports = React.createClass({
  componentDidMount: function() {
    document.title = "Hoem Page";
  },
  displayName: 'account',

  render: function render() {
    return (
      <div id='account'>
        <h1>{this.props.name}</h1>
        <h6>I am a React Router rendered view</h6>
        <a href='/login'>Click to go to an unhandled route</a>
      </div>
    );
  }
});
