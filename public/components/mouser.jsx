var React = require('react');
var Isvg = require('react-inlinesvg');

var Mouser = module.exports = React.createClass({
  getInitialState: function(){
    // return { position: {top: 500, left: 250} };
    return { over: false, left: 250 };
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

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
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
        screenX = event.offsetX ,
        clientX = event.clientX ,
        screenY = event.offsetY;


        // console.log("window_width: " + window_width);
        // console.log("screenX: " + screenX);
        // console.log("clientX: " + clientX);
        // console.log("screenY: " + screenY);
        // console.log("margin_diff: " + margin_diff);
        // console.log("inner_left: " + inner_left);
        // console.log("left: " + left);

    this.setState({left: (500 - screenX), screenX: screenX, screenY: (screenY)});

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

  // componentWillReceiveProps: function(nextProps) {
  //   var self = this;
  //   self.setState({ params: self.getParams(), content: null });
  //   self.setTimeout(function() { self.getContent(); }, 500);
  // },


  // componentDidUnmount: function() {
  //   // document.removeEventListener('resize', this.onMouseMove);
  //   // document.removeEventListener('scroll', this.onMouseMove);
  // },

  render: function render() {
    var self = this;
    var bottom = self.props.bottom,
        top = self.props.top,
        left = self.state.left,
        screenX = self.state.screenX,
        screenY = self.state.screenY,
        over = self.state.over,
        windowWidth = self.state.windowWidth;
    if (windowWidth >= 500) {
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
    } else {
      return (
        <span>
          <div className="post image">
            <img src={top} />
          </div>
        </span>
      )
    }
  }
})
