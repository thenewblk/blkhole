var React = require('react');
var util = require('util');

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};


var timer = {
    running: false,
    iv: 5000,
    timeout: false,
    cb : function(){},
    start : function(cb,iv){
        var elm = this;
        clearInterval(this.timeout);
        this.running = true;
        if(cb) this.cb = cb;
        if(iv) this.iv = iv;
        this.timeout = setTimeout(function(){elm.execute(elm)}, this.iv);
    },
    execute : function(e){
        if(!e.running) return false;
        e.cb();
        e.start();
    },
    stop : function(){
        this.running = false;
    },
    set_interval : function(iv){
        clearInterval(this.timeout);
        this.start(false, iv);
    }
};

module.exports = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function() {
    return { animation: "start", current_frame: 0, x: 0, y: 0, interval: {} }
  },

  componentWillMount: function(){
    this.animate();
  },
  componentWillUnmount: function(){
    this.setState({animation: "stop"});
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

    // interv = this.setInterval(function(){
    //     if ( self.state.animation == "start") {
    //     }
    //
    //     if (( self.state.animation == "forward") && (self.state.current_frame != self.props.frames - 1 ) ) {
    //         console.log(self.state);
    //         var new_frame = self.state.current_frame + 1;
    //         var col = (new_frame % self.props.columns) +1;
    //         var row = Math.floor( ( new_frame ) / self.props.columns ) + 1;
    //
    //         var x = (col - 1) * self.props.frameW * -1;
    //         var y = (row - 1) * self.props.frameH * -1;
    //         self.setState( { current_frame: new_frame, x: x, y: y } );
    //     }
    //
    //     if ( (self.state.animation == "reverse")  && (self.state.current_frame != 0) ) {
    //         var new_frame = self.state.current_frame - 1;
    //         var col = (new_frame % self.props.columns) +1;
    //         var row = Math.floor( ( new_frame ) / self.props.columns ) + 1;
    //
    //         var x = (col - 1) * self.props.frameW * -1;
    //         var y = (row - 1) * self.props.frameH * -1;
    //         self.setState( { current_frame: new_frame, x: x, y: y } );
    //     }
    //     if ( self.state.animation == "stop") {
    //       clearInterval(interv);
    //     }
    //
    // }, speed);


    interval = speed; // initial condition


    timer.start(function(){
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
    } , speed );
  },

  render: function() {
    var self = this;

    var image = self.props.image;
    var width = self.props.frameW * self.props.columns;
    var height = self.props.frameH * ( Math.ceil( self.props.frames / self.props.columns ) );
    if (self.props.className) {
      var className = self.props.className + " icon sprite_container";
    } else {
      var className = "icon sprite_container";
    }

    var style = {
      transform: "translate3d(" + self.state.x + "px, " + self.state.y + "px, 0px)",
      WebkitTransform: "translate3d(" + self.state.x + "px, " + self.state.y + "px, 0px)"
    };

    var size = {
      height: self.props.frameH + "px",
      width: self.props.frameW + "px",
    };
    if (self.props.duration && self.props.frames) {
      self.animate();
    }

    return (
      <span onMouseEnter={self.enter} onMouseLeave={self.out} className={className} style={size} >
        <img src={image} width={width} height={height} style={ style } />
      </span>
    )
  }
});
