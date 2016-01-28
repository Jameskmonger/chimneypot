# chimneypot

[![npm version](https://badge.fury.io/js/chimneypot.svg)](https://badge.fury.io/js/chimneypot)

Chimneypot is a lightweight Node.js handler for GitHub webhooks. It allows you to listen to all kinds of GitHub events and execute functions on your server.

## Usage

Chimneypot was designed to be simple, succinct and easy to use.

To print to the console every time you receive a push event from your repo:

    var chimneypot = require('chimneypot');

    var pot = new chimneypot({
      port: 3000,
      path: '/hook',
      secret: '08394e1da557b56373ece704d5bcee45'
    });

## License

Chimneypot is completely released into the public domain, using [The Unlicense](http://unlicense.org). To see the full license text included with the project, you can read the [LICENSE file](/LICENSE).
