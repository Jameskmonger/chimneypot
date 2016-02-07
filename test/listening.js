// Stub the http library to prevent servers from actually being setup
var proxyquire =  require('proxyquire');
var httpStub = {
    createServer: function (cb) {
        return {
            listen: function () {},
            close: function () {}
        };
    }
};
var chimneypot = proxyquire('../index', {
    'http': httpStub
});


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

exports.testListenCalls = function (test) {
    test.throws(function () {
        c.listen();
    }, Error, 'Listen called before route throws an error.');

    c.route('push', function(){});

    c.listen();

    test.ok(c.server, 'Should have setup a server object');

    test.throws(function () {
        c.route('push', function(){});
    }, Error, 'Trying to add routes after listening throws an error.');

    test.done();
};



