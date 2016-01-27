var chimneypot = (function() {
  function chimneypot(opts) {
    if (!opts) {
      throw new Error("Required options: port, path, secret");
    }
  }

  chimneypot.prototype = {
    constructor: chimneypot
  };

  return chimneypot;
});

module.exports = chimneypot;
