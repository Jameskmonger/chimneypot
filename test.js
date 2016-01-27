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
shouldThrowError(function() {
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

  // Boolean port (true)
  shouldThrowError(function() {
    new chimneypot({
      port: true,
      path: '/',
      secret: 'spooky'
    });
  });

  // Array port
  shouldThrowError(function() {
    new chimneypot({
      port: [],
      path: '/',
      secret: 'spooky'
    });
  });

  // Object port
  shouldThrowError(function() {
    new chimneypot({
      port: {},
      path: '/',
      secret: 'spooky'
    });
  });

  // Non-integer port
  shouldThrowError(function() {
    new chimneypot({
      port: 50.5,
      path: '/',
      secret: 'spooky'
    });
  });
})();

// listen() errors
(function() {
  var c = _setupValidChimneypot();

  // Listen before routes
  shouldThrowError(function() {
    c.listen();
  });

  c.route('push', function(){});

  // Listen after routing (valid)
  shouldNotThrowError(function() {
    c.listen();
  });

  c.kill();
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

function _setupValidChimneypot() {
  return new chimneypot({
    port: 1996,
    path: '/',
    secret: 'spooky'
  });
}

function _throws(func) {
  try {
    func();
  } catch (err) {
    console.log(err);

    return true;
  }
  return false;
}
