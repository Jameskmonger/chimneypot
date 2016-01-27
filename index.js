var http = require('http');
var webhookHandler = require('github-webhook-handler');

module.exports = (function() {
  function chimneypot(opts) {
    if (!opts || !isOptionsValid(opts)) {
      throw new Error("Required options: port, path, secret");
    }

    this.options = {
      port: opts.port,
      path: opts.path,
      secret: opts.secret
    };

    this.routeCount = 0;
    this.routes = {};
  }

  function isOptionsValid(opts) {
    if (opts.port === undefined || opts.path === undefined) {
      return false;
    }

    // Non numbers and non-integers
    if (Number(opts.port) !== opts.port || opts.port % 1 !== 0) {
      return false;
    }

    return true;
  }

  function route(path, callback) {
    this.routeCount++;

    if (this.routes[path] === undefined) {
      this.routes[path] = [];
    }

    this.routes[path][this.routes[path].length - 1] = callback;
  }

  function listen() {
    if (this.routeCount === 0) {
      throw new Error("Routes must be applied before listening.");
    }
  }

  chimneypot.prototype = {
    constructor: chimneypot,

    route: route,

    listen: listen
  };

  return chimneypot;
})();
