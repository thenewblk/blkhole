var Routes = require('./routes.jsx');

var createHistory = require('history/lib/createBrowserHistory');
var useScroll = require('scroll-behavior/lib/useScrollToTop');

var history = useScroll(createHistory)()

// import the react-engine's client side booter
var ReactEngineClient = require('react-engine/lib/client');

// boot options
var options = {
  routes: Routes,
  history: history,
  // supply a function that can be called
  // to resolve the file that was rendered.
  viewResolver: function(viewName) {
    return require('./views/' + viewName);
  }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
  // boot the app when the DOM is ready
  ReactEngineClient.boot(options, function onBoot(data, history) {
    // console.log("fuck you");
  });
});
