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
          <Link className="new-blk-logo" to="/"><img className="icon" src="/icons/icon_BLKstar_black.svg" /></Link>
          <div className="items">
            <Link to="/channel/experiential" >
              <Sprite
                image="/icons/superfan-icon.png"
                width={450}
                height={100}
                columns={9}
                frames={17}
                duration={0.25}
                frameW={50}
                frameH={50} />
              <span className="name">Experiential</span>
            </Link>
            <Link to="/channel/handcrafted" >
              <Sprite
                image="/icons/superfan-icon.png"
                width={450}
                height={100}
                columns={9}
                frames={17}
                duration={0.5}
                frameW={50}
                frameH={50} />
              <span className="name">Handcrafted</span>
            </Link>
            <Link to="/agency" >
              <Sprite
                image="/icons/superfan-icon.png"
                width={450}
                height={100}
                columns={9}
                frames={17}
                duration={0.75}
                frameW={50}
                frameH={50} />
            <span className="name">Agency</span></Link>
            <Link to="/channel/disruption" >
              <Sprite
                image="/icons/disruption-icon.png"
                width={450}
                height={100}
                columns={9}
                frames={18}
                duration={.5}
                frameW={50} 
                frameH={50} />
              <span className="name">DISRUPTION</span>
            </Link>
            <Link to="/channel/superfans" >
              <Sprite
                image="/icons/superfan-icon.png"
                width={450}
                height={100}
                columns={9}
                frames={17}
                duration={.5}
                frameW={50}
                frameH={50} />
              <span className="name">Superfans</span>
            </Link>
          </div>
        </div>
    );
  }
});
