var React = require('react');
var Router = require('react-router');

var Sprite = require('../components/sprite.jsx');
var Link = Router.Link;

var Isvg = require('react-inlinesvg');

module.exports = React.createClass({
  getInitialState: function(){
    return { };
  },

  render: function render() {

    return (
        <div className="navigator">
          <Link className="new-blk-logo" to="/"><Isvg uniquifyIDs={false} className="newblk_logo" src="/images/blk_logo.svg" /></Link>
          <div className="items">
            <Link className="channel_link" to="/agency">
              <Sprite
                image="/icons/agency_icon_sprite-01.svg"
                columns={9}
                frames={9}
                duration={.25}
                frameW={50}
                frameH={50} />
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
                image="/icons/experiential-sprite-01.svg"
                columns={9}
                frames={15}
                duration={.5}
                frameW={50}
                frameH={50} />
              <span className="name">Experiential</span>
            </Link>
            <Link className="channel_link" to="/superfans" >
              <Sprite
                image="/icons/superfan-sprite-01.svg"
                columns={9}
                frames={17}
                duration={.5}
                frameW={50}
                frameH={50} />
              <span className="name">Superfans</span>
            </Link>
            <Link className="channel_link" to="/handcrafted" >
              <Sprite
                image="/icons/handcrafted-sprite-01.svg"
                columns={8}
                frames={16}
                duration={.4}
                frameW={50}
                frameH={50} />
              <span className="name">Handcrafted</span>
            </Link>
          </div>
        </div>
    );
  }
});
