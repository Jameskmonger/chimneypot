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

console.log("all tests passed");

function shouldThrowError(func) {
  var thrown = false;

  try {
    func();
  } catch (err) {
    thrown = true;
  }

  if (!thrown) {
    throw new Error("Expected error to be thrown, but was not thrown");
  }
}

function shouldNotThrowError(func) {
  var thrown = false;

  try {
    func();
  } catch (err) {
    thrown = true;
  }

  if (thrown) {
    throw new Error("Expected error to not be thrown, but was thrown");
  }
}
