module.exports = (function() {
  function chimneypot(opts) {
    if (!opts || !isOptionsValid(opts)) {
      throw new Error("Required options: port, path, secret");
    }
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

  }

  chimneypot.prototype = {
    constructor: chimneypot,

    route: route
  };

  return chimneypot;
})();
