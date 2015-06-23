var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function render() {
    return (
        <div className="navigator">
          <Link to="/"><img src="/icons/icon_BLKstar_black.svg" /></Link>
          <Link to="/experiential" ><img src="/icons/icon_experiential-1.svg" /></Link>
          <Link to="/handcrafted" ><img src="/icons/icon_handcraft-1.svg" /></Link>
          <Link to="/agency" ><img src="/icons/icon_agency-1.svg" /></Link>
          <Link to="/disruption" ><img src="/icons/icon_disruptor-1.svg" /></Link>
          <Link to="/superfans" ><img src="/icons/icon_superfan-1.svg" /></Link>
        </div>
    );
  }
});
