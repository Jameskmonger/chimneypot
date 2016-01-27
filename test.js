var chimneypot = require('./index.js');

shouldThrowError(function() { new chimneypot(); });

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
