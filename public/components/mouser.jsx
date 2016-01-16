var React = require('react');
var Isvg = require('react-inlinesvg');

var Mouser = module.exports = React.createClass({
  getInitialState: function(){
    // return { position: {top: 500, left: 250} };
    return { over: false, left: 250 };
  },

  mouseEnter: function () {
    // console.log("mouseOver: " + util.inspect(event));
    this.setState({over: true})
  },

  mouseLeave: function () {
    // console.log("mouseOver: " + util.inspect(event));
    this.setState({over: false})
  },

  onMouseMove: function(event){

    var window_width = window.innerWidth - 130,
        screenX = event.clientX ,
        screenY = event.clientY,
        margin_diff = ( window_width - 1200 ) / 2;

        if (window_width > 1200) {
          var inner_left = 300;
          var left = screenX - inner_left - margin_diff - 84;
        } else {
          var inner_left = .25 * window_width;
          var left = screenX - inner_left - 80;
        }

        console.log("window_width: " + window_width);
        console.log("screenX: " + screenX);
        console.log("screenY: " + screenY);
        console.log("margin_diff: " + margin_diff);
        console.log("inner_left: " + inner_left);
        console.log("left: " + left);

    this.setState({left: (500 - left), screenX: screenX, screenY: (screenY)});

  },

  onMouseUp: function (e) {
  // this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  },

  // componentDidMount: function () {
  //   console.log("componentDidMount");
  //   document.addEventListener('mousemove', this.onMouseMove)
  // },

  componentDidUpdate: function (props, state) {
    if (this.state.over) {
      document.addEventListener('mousemove', this.onMouseMove);
      // document.addEventListener('resize', this.onMouseMove);
      // document.addEventListener('scroll', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.over) {
      document.removeEventListener('mousemove', this.onMouseMove);
      // document.removeEventListener('resize', this.onMouseMove);
      // document.removeEventListener('scroll', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  },

  componentDidMount: function() {
    // document.addEventListener('resize', this.onMouseMove);
    // document.addEventListener('scroll', this.onMouseMove);
  },


  componentDidUnmount: function() {
    // document.removeEventListener('resize', this.onMouseMove);
    // document.removeEventListener('scroll', this.onMouseMove);
  },

  render: function render() {
    var self = this;
    var bottom = self.props.bottom,
        top = self.props.top,
        left = self.state.left,
        screenX = self.state.screenX,
        screenY = self.state.screenY,
        over = self.state.over;

    return (
      <div className={ over ? "post mouser" : "post mouser over" }>
        <div className="block_wrapper">
          <span className="left_label"></span>
          <span className="content">
            <div className="dragger_images">

              <div className="bottom_image" style={{backgroundImage: "url("+bottom+")"}}></div>
              <div className="top_image" style={{backgroundImage: "url("+top+")", width: left+"px"}}></div>
              <div className="mouse_overlay" onMouseEnter={self.mouseEnter} onMouseLeave={self.mouseLeave} ></div>
            </div>

            <span className="handle" style={{top: screenY, left: screenX }}>
              <Isvg src="/icons/new/slide.svg" />
            </span>
          </span>
        </div>
      </div>
    )
  }
})
