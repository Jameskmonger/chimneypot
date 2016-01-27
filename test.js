var chimneypot = require('./index.js');

function shouldThrowError(func, message) {
  var thrown = false;

  try {
    func();
  } catch {
    thrown = true;
  }

  if (!thrown) {
    if (!message) {
      throw new Error("Expected error to be thrown, none thrown");
    }

    throw new Error("Expected error to be thrown, none thrown: " + message);
  }
}
