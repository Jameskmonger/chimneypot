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
    if (opts.port === undefined || opts.path === undefined || opts.secret === undefined) {
      return false;
    }

    // Non numbers and non-integers
    if (Number(opts.port) !== opts.port || opts.port % 1 !== 0) {
      return false;
    }

    return true;
  }

  function route(path, callback) {
    if (this.server !== undefined) {
      throw new Error("Route cannot be applied while the server is listening");
    }

    this.routeCount++;

    if (this.routes[path] === undefined) {
      this.routes[path] = [];
    }

    this.routes[path][this.routes[path].length + 1] = callback;
  }

  function listen() {
    if (this.routeCount === 0) {
      throw new Error("Routes must be applied before listening.");
    }

    var handler = webhookHandler({ path: this.options.path, secret: this.options.secret });

    this.server = http.createServer(function (req, res) {
      handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
      });
    });

    this.server.listen(this.options.port, function() {
      console.log("listening on *:" + this.options.port);
    }.bind(this));

    for (var path in this.routes) {
      (function (path) {
        handler.on(path, function(data) {
          for (var c in this.routes[path]) {
            this.routes[path][c](data);
          }
        }.bind(this));
      })(path);
    }
  }

  function kill() {
    if (this.server !== undefined) {
      this.server.close();
    }

    this.server = undefined;
    console.log("Server killed");
  }

  chimneypot.prototype = {
    constructor: chimneypot,

    route: route,

    listen: listen,

    kill: kill
  };

  return chimneypot;
})();
