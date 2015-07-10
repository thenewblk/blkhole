var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return { animation: "start", current_frame: 0, x: 0, y: 0, interval: {} }
  },

  componentWillMount: function(){
    this.animate();
  },

  enter: function()	{
    this.setState({animation: "forward"});

	},

  out: function()	{
    this.setState({animation: "reverse"});
	},

  animate: function(){
    var self = this;
    var speed = ( 1000 * self.props.duration ) / self.props.frames;

    var interv = setInterval(function(){
        if ( self.state.animation == "start") {
        }

        if (( self.state.animation == "forward") && (self.state.current_frame != self.props.frames - 1 ) ) {
            var new_frame = self.state.current_frame + 1;
            var col = (new_frame % self.props.columns) +1;
            var row = Math.floor( ( new_frame ) / self.props.columns ) + 1;

            var x = (col - 1) * self.props.frameW * -1;
            var y = (row - 1) * self.props.frameH * -1;
            self.setState( { current_frame: new_frame, x: x, y: y } );
        }

        if ( (self.state.animation == "reverse")  && (self.state.current_frame != 0) ) {
            var new_frame = self.state.current_frame - 1;
            var col = (new_frame % self.props.columns) +1;
            var row = Math.floor( ( new_frame ) / self.props.columns ) + 1;

            var x = (col - 1) * self.props.frameW * -1;
            var y = (row - 1) * self.props.frameH * -1;
            self.setState( { current_frame: new_frame, x: x, y: y } );
        }

    }, speed);

    self.setState({interval: interv});
  },

  render: function() {
    var self = this;
    var image = self.props.image;
    var width = self.props.frameW * self.props.columns;
    var height = self.props.frameH * ( Math.ceil( self.props.frames / self.props.columns ) );

    var className = self.props.className + " icon sprite_container";

    var style = {
      transform: "translate3d(" + self.state.x + "px, " + self.state.y + "px, 0px)"
    };

    var size = {
      height: self.props.frameH + "px",
      width: self.props.frameW + "px",
    };

    return (
      <span onMouseEnter={self.enter} onMouseLeave={self.out} className={className} style={size} >
        <img src={image} width={width} height={height} style={ style} />
      </span>
    )
  }
});
