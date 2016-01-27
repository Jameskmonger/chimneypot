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

    return true;
  }

  chimneypot.prototype = {
    constructor: chimneypot
  };

  return chimneypot;
})();
