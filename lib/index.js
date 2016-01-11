var _ = require('lodash');
var util = require('sails-util');

module.exports = function (sails) {
  var originalBind;
  return {
    initialize: function (cb) {
      originalBind = sails.router.bind;
      sails.reverseRoutes = sails.reverseRoutes || {};
      sails.router.bind = this.wrapper;
      global.reverseRouteService = this.reverseRoute;
      return cb();
    },
    wrapper: function (/* path, target, verb, options */) {
      var path = arguments[0] === '*' ? '/*' : arguments[0];
      var options = arguments[3] || {};
      var detectedVerb = util.detectVerb(path);
      var verb = arguments[2] === null ? detectedVerb.verb : arguments[2];
      if (typeof options.controller !== 'undefined') {
        sails.reverseRoutes[options.controller + '.' + options.action] = detectedVerb.path
      }
      originalBind.apply(this, arguments);
    },
    reverseRoute: function (components, absolute) {
      var result = absolute ? sails.getBaseUrl() : '';

      var route = sails.reverseRoutes[components.controller];
      if (route === undefined) {
        return result;
      }
      var i = 0;
      // insert args.
      _.each(route.split('/'), function (fragment) {
        if (fragment === '') {
          return;
        }

        result += '/';

        if (fragment.substring(0, 1) === ':') {
          result += components.args[i];
          ++i;
        } else {
          result += fragment;
        }

      });

      return result;
    }
  }
};
