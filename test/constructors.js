var chimneypot = require('../index.js');

exports.testEmptyConstructor = function (test) {
    test.throws(function () {
        new chimneypot();
    }, Error, 'Empty constructor throws an error.');
    test.done();
};

exports.testMissingPort = function (test) {
    test.throws(function () {
        new chimneypot({
            path: '/',
            secret: 'spooky'
        });
    }, Error, 'Missing port option throws an error.');
    test.done();
};

exports.testMissingPath = function (test) {
    test.throws(function () {
        new chimneypot({
            port: 1996,
            secret: 'spooky'
        });
    }, Error, 'Missing path option throws an error.');
    test.done();
};

exports.testMissingSecret = function (test) {
    test.throws(function () {
        new chimneypot({
            port: 1996,
            path: '/'
        });
    }, Error, 'Missing secret option throws an error.');
    test.done();
};

exports.testStringPort = function (test) {
    test.throws(function () {
        new chimneypot({
            port: 'wrong',
            path: '/',
            secret: 'spooky'
        });
    }, Error, 'Port as a string throws an error.');
    test.done();
};

exports.testPortAsArray = function (test) {
    test.throws(function () {
        new chimneypot({
            port: [],
            path: '/',
            secret: 'spooky'
        });
    }, Error, 'Port as an array throws an error.');
    test.done();
};

exports.testPortAsObject = function (test) {
    test.throws(function () {
        new chimneypot({
            port: {},
            path: '/',
            secret: 'spooky'
        });
    }, Error, 'Port as an object throws an error.');
    test.done();
};

exports.testPortAsFloat = function (test) {
    test.throws(function () {
        new chimneypot({
            port: 50.5,
            path: '/',
            secret: 'spooky'
        });
    }, Error, 'Port as a float throws an error.');
    test.done();
};

exports.testInjection = function (test) {
    chimneypot.injectHookHandler
    var c = new chimneypot({
        port: 50,
        path: '/',
        secret: 'spooky'
    });



    test.done();
};

exports.testPortAsBoolean = function (test) {
    test.throws(function () {
        new chimneypot({
            port: false,
            path: '/',
            secret: 'spooky'
        });
    }, Error, 'Port as a false boolean throws an error.');

    test.throws(function () {
        new chimneypot({
            port: true,
            path: '/',
            secret: 'spooky'
        });
    }, Error, 'Port as a true boolean throws an error.');

    test.done();
};

