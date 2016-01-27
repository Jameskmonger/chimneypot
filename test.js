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

console.log("all tests passed");

function shouldThrowError(func, message) {
  var thrown = false;

  try {
    func();
  } catch (err) {
    thrown = true;
  }

  if (!thrown) {
    if (!message) {
      throw new Error("Expected error to be thrown, none thrown");
    }

    throw new Error("Expected error to be thrown, none thrown: " + message);
  }
}
