var React = require('react');
var util = require('util');

module.exports = React.createClass({
  componentDidMount: function() {
    document.title = "Login";
  },
  render: function render() {
    console.log("Login props: " + util.inspect(this.props));
    console.log("Login state: " + util.inspect(this.state));
    return (
      <div className='login'>
        <h1>Log In</h1>
      	<form action="/login" method="post">
      		<div className="form-group">
      			<p className="cf">
      				<label>Email</label>
      				<input type="text" name="email" />
      			</p>
      		</div>
      		<div className="form-group">
      			<p className="cf">
      				<label>Password</label>
      				<input type="password" name="password" />
      			</p>

      		</div>

      		<button type="submit">Login</button>
      	</form>

      	<hr />
      	<p>Or go <a href="/">home</a>.</p>
      </div>
    );
  }
});
