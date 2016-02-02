var React = require('react');
var Router = require('react-router');

var Sprite = require('react-spritesheet-animations');
var Link = Router.Link;

var Isvg = require('react-inlinesvg');

module.exports = React.createClass({
  getInitialState: function(){
    return { open: false };
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  toggleOpen: function(e) {
    this.props.deploy();
    this.setState({open: !this.state.open});
  },

  newblkClick: function(e) {
    if(this.state.open){
      this.props.deploy();
      this.setState({open: !this.state.open});
    }
  },

  componentDidMount: function(){
    var self = this;
    self.setState({windowWidth: window.innerWidth});
    window.addEventListener('resize', self.handleResize);
  },

  componentWillUnmount: function(){
    var self = this;
    window.removeEventListener('resize', self.handleResize);
  },

  render: function render() {
    var self = this;
    var windowWidth = self.state.windowWidth;
    var open = self.state.open;

    if (windowWidth >= 900) {
      return (
          <div className="navigator" key="navigator" onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut} >
            <Link className="new-blk-logo" to="/"><Isvg uniquifyIDs={false} className="newblk_logo" src="/images/blk_logo.svg" /></Link>
            <div className="items">
              <Link className="channel_link" to="/agency">
                <Sprite
                  image="/icons/agency_icon_sprite-01.svg"
                  columns={9}
                  frames={9}
                  duration={.25}
                  frameW={50}
                  frameH={50}
                  hover={true} />
                <span className="name">Agency</span>
              </Link>
              <Link className="channel_link lost" to="/disruption" >
                <Sprite
                  image="/icons/disruption-icon.png"
                  columns={9}
                  frames={18}
                  duration={.5}
                  frameW={50}
                  frameH={50}
                  loop={true} />
                <span className="name">DISRUPTION</span>
              </Link>
              <Link className="channel_link" to="/experiential"  >
                <Sprite
                  image="/icons/experiential-sprite-01.svg"
                  columns={9}
                  frames={15}
                  duration={.5}
                  frameW={50}
                  frameH={50}
                  hover={true} />
                <span className="name">Experiential</span>
              </Link>
              <Link className="channel_link lost" to="/superfans" >
                <Sprite
                  image="/icons/superfan-sprite-01.svg"
                  columns={9}
                  frames={17}
                  duration={.5}
                  frameW={50}
                  frameH={50}
                  hover={true}/>
                <span className="name">Superfans</span>
              </Link>
              <Link className="channel_link" to="/handcrafted" >
                <Sprite
                  image="/icons/handcrafted-sprite-01.svg"
                  columns={8}
                  frames={16}
                  duration={.4}
                  frameW={50}
                  frameH={50}
                  hover={true} />
                <span className="name">Handcrafted</span>
              </Link>
            </div>
          </div>
      );
    } else {
      return (
        <div className="navigator" key="navigator">
            <Link className="new-blk-logo" to="/" onClick={self.newblkClick}><Isvg uniquifyIDs={false} className="newblk_logo" src="/images/blk_logo.svg" /></Link>
            <div id="navicon" onClick={self.toggleOpen}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          <div className="items">
            <Link className="channel_link" to="/agency" onClick={self.toggleOpen}>
              <Sprite
                image="/icons/agency_icon_sprite-01.svg"
                columns={9}
                frames={9}
                duration={.25}
                frameW={50}
                frameH={50}
                hover={true} />
              <span className="name">Agency</span>
            </Link>
            <Link className="channel_link lost" to="/disruption" onClick={self.toggleOpen} >
              <Sprite
                image="/icons/disruption-icon.png"
                columns={9}
                frames={18}
                duration={.5}
                frameW={50}
                frameH={50}
                loop={true} />
              <span className="name">DISRUPTION</span>
            </Link>
            <Link className="channel_link" to="/experiential" onClick={self.toggleOpen} >
              <Sprite
                image="/icons/experiential-sprite-01.svg"
                columns={9}
                frames={15}
                duration={.5}
                frameW={50}
                frameH={50}
                hover={true} />
              <span className="name">Experiential</span>
            </Link>
            <Link className="channel_link lost" to="/superfans" onClick={self.toggleOpen} >
              <Sprite
                image="/icons/superfan-sprite-01.svg"
                columns={9}
                frames={17}
                duration={.5}
                frameW={50}
                frameH={50}
                hover={true}/>
              <span className="name">Superfans</span>
            </Link>
            <Link className="channel_link" to="/handcrafted" onClick={self.toggleOpen}>
              <Sprite
                image="/icons/handcrafted-sprite-01.svg"
                columns={8}
                frames={16}
                duration={.4}
                frameW={50}
                frameH={50}
                hover={true} />
              <span className="name">Handcrafted</span>
            </Link>
          </div>
        </div>
      )
    }
  }
});
