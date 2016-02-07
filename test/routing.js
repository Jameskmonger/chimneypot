var chimneypot = require('../index.js');

var c;

exports.setUp = function (cb) {
    c = new chimneypot({
        port: 8888,
        path: '/',
        secret: 'spooky'
    });
    cb();
}

exports.tearDown = function (cb) {
    c.kill();
    cb();
}

exports.testMultipleRoutesToSameEvent = function (test) {
    c.route('push', function(){});
    c.route('push', function(){});

    test.ok(c.routeCount === 2, 'Both routes should be setup.');

    c.route('delete', function(){});
    c.route('delete', function(){});

    test.ok(c.routeCount === 4, 'All routes should be setup.');

    test.done();
};

exports.testNonFunctionRoute = function (test) {
    test.throws(function () {
        c.route('push', 'monkey');
    }, Error, 'Trying to route to a string throws an error.');

    test.throws(function () {
        c.route('push', 123);
    }, Error, 'Trying to route to a number throws an error.');

    test.throws(function () {
        c.route('push', {name: 'monkey'});
    }, Error, 'Trying to route to an object throws an error.');

    test.done();
};


