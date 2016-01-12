var React = require('react');

var Draggable = require('react-draggable');
var Isvg = require('react-inlinesvg');


var Dragger = module.exports = React.createClass({
  getInitialState: function(){
    return { position: {top: 500, left: 250} };
  },

  handleStart: function (event, ui) {
    this.setState( { position: ui.position } );
  },

  handleDrag: function (event, ui) {
    this.setState( { position: ui.position } );
  },

  handleStop: function (event, ui) {
    this.setState( { position: ui.position } );
  },
  render: function render() {
    var self = this;
    var bottom = self.props.bottom,
        top = self.props.top,
        left = self.state.position.left;

    return (
      <div className="post dragger">
        <div className="dragger_images">
          <Draggable
              axis="x"
              start={{x: 250, y: 500}}
              bounds="parent"
              moveOnStartChange={false}
              zIndex={100}
              onStart={self.handleStart}
              onDrag={self.handleDrag}
              onStop={self.handleStop}>
                <span className="handle">
                  <Isvg src="/icons/new/slide.svg" />
                </span>
          </Draggable>
          <div className="bottom_image" style={{backgroundImage: "url("+bottom+")"}}></div>
          <div className="top_image" style={{backgroundImage: "url("+top+")", width: left+1+"px"}}></div>

        </div>

      </div>
    )
  }
})
