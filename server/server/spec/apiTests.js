var loopbackApiTesting = require('loopback-api-testing');
var tests = require('./basicAPITestsConfig.json');
var server = require('../server.js');
var url = 'http://localhost:3000/api';
loopbackApiTesting.run(tests, server, url, function (err) {
    if (err) {
        console.log(err);
    }
});
//# sourceMappingURL=apiTests.js.map