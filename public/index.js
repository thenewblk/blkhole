var Routes = require('./routes.jsx');

var createHistory = require('history/lib/createBrowserHistory');
var useScroll = require('scroll-behavior/lib/useScrollToTop');

var history = useScroll(createHistory)()

// import the react-engine's client side booter
var ReactEngineClient = require('react-engine/lib/client');

// boot options
var options = {
  routes: Routes,
  // supply a function that can be called
  // to resolve the file that was rendered.
  viewResolver: function(viewName) {
    return require('./views/' + viewName);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
  // boot the app when the DOM is ready
  ReactEngineClient.boot(options, function onBoot(data, history) {
    var ScrollMagic = require('scrollmagic');
    var TweenMax = require('./components/tweenmax.js');
    require('./components/scrollTo.js');

    var controller = new ScrollMagic.Controller();
    controller.scrollTo(function(target) {
      TweenMax.to(window, 1, {
        scrollTo : {
          y : target, // scroll position of the target along y axis
          autoKill : true // allows user to kill scroll action smoothly
        },
        ease : Cubic.easeInOut
      });

    });
    controller.scrollTo(0);
  });
});
