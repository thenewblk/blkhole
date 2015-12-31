var React = require('react');
var Router = require('react-router');

var Sprite = require('../components/sprite.jsx');
var Link = Router.Link;

module.exports = React.createClass({
  getInitialState: function(){
    return { };
  },

  render: function render() {

    return (
        <div className="navigator">
          <Link className="new-blk-logo" to="/"><img className="icon" src="/icons/icon_new-star.svg" /></Link>
          <div className="items">
            <Link className="channel_link" to="/agency">
              <img className="icon" src="/icons/icon_agency-1.svg" />
              <span className="name">Agency</span>
            </Link>
            <Link className="channel_link" to="/disruption" >
              <Sprite
                image="/icons/disruption-icon.png"
                columns={9}
                frames={18}
                duration={.5}
                frameW={50}
                frameH={50} />
              <span className="name">DISRUPTION</span>
            </Link>
            <Link className="channel_link" to="/experiential"  >
              <Sprite
                image="/icons/experiential-icon.png"
                columns={9}
                frames={17}
                duration={.5}
                frameW={50}
                frameH={50} />
              <span className="name">Experiential</span>
            </Link>
            <Link className="channel_link" to="/superfans" >
              <Sprite
                image="/icons/superfan-icon.svg"
                columns={9}
                frames={17}
                duration={.5}
                frameW={50}
                frameH={50} />
              <span className="name">Superfans</span>
            </Link>
            <Link className="channel_link" to="/handcrafted" >
              <Sprite
                image="/icons/handcrafted-icon.png"
                columns={8}
                frames={16}
                duration={.6}
                frameW={50}
                frameH={50} />
              <span className="name">Handcrafted</span>
            </Link>
          </div>
        </div>
    );
  }
});
