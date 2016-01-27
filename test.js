var chimneypot = require('./index.js');

// Empty constructor
shouldThrowError(function() {
  new chimneypot();
});

// No port
shouldThrowError(function() {
  new chimneypot({
    path: '/',
    secret: 'spooky'
  });
});

// No path
shouldThrowError(function() {
  new chimneypot({
    port: 1996,
    secret: 'spooky'
  });
});

// No secret
shouldNotThrowError(function() {
  new chimneypot({
    port: 1996,
    path: '/'
  });
});

// Non numeric port
(function() {
  // String port
  shouldThrowError(function() {
    new chimneypot({
      port: 'wrong',
      path: '/',
      secret: 'spooky'
    });
  });

  // Boolean port (false)
  shouldThrowError(function() {
    new chimneypot({
      port: false,
      path: '/',
      secret: 'spooky'
    });
  });
})();

console.log("all tests passed");

function shouldThrowError(func) {
  if (!_throws(func)) {
    throw new Error("Expected error to be thrown, but was not thrown");
  }
}

function shouldNotThrowError(func) {
  if (_throws(func)) {
    throw new Error("Expected error to not be thrown, but was thrown");
  }
}

function _throws(func) {
  try {
    func();
  } catch (err) {
    return true;
  }
  return false;
}
