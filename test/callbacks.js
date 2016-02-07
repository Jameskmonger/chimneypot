var proxyquire =  require('proxyquire');
var listenerMethods = {};
var hookHandlerStub = function() {
    function mock (req, res, cb) {}

    mock.on = function (eventName, eventHandler) {
        listenerMethods[eventName] = eventHandler;
    };

    return mock;
};
var httpStub = {
    createServer: function (cb) {
        return {
            listen: function (port, cb) {cb();},
            close: function () {}
        };
    }
};
var chimneypot = proxyquire('../index', {
    'http': httpStub,
    'github-webhook-handler': hookHandlerStub
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

exports.testMultipleHandlers = function (test) {

    var pushCount = 0;
    var incrementPush = function () {
        pushCount++;
    };

    c.route('push', incrementPush);
    c.route('push', incrementPush);
    c.route('push', incrementPush);

    c.listen();

    listenerMethods['push']();

    test.ok(pushCount === 3, 'Expected 2 push events. Received ' + pushCount);


    test.done();
};

exports.testMultipleCallbacks = function (test) {

    var pushCount = 0;
    var incrementPush = function () {
        pushCount++;
    };

    c.route('push', incrementPush);
    c.route('push', incrementPush);
    c.route('push', incrementPush);

    c.listen();

    listenerMethods['push']();
    listenerMethods['push']();
    listenerMethods['push']();

    test.ok(pushCount === 9, 'Expected 9 push events. Received ' + pushCount);


    test.done();
};

exports.testMultipleEventsAndHandlers = function (test) {
    var pushCount = 0;
    var deleteCount = 0;
    var incrementPush = function () {
        pushCount++;
    };
    var incrementDelete = function () {
        deleteCount++;
    };

    c.route('push', incrementPush);
    c.route('delete', incrementDelete);
    c.route('push', incrementPush);
    c.route('delete', incrementDelete);

    c.listen();

    listenerMethods['push']();
    listenerMethods['delete']();

    test.ok(pushCount === 2, 'Expected 2 push events. Received ' + pushCount);
    test.ok(deleteCount === 2, 'Expected 2 delete events. Received ' + deleteCount);


    test.done();
};