'use strict';
var loopback = require('loopback');
module.exports = function enableAuthentication(server) {
    // enable authentication
    // server.enableAuth();
    // server
    server.use(loopback.token({
        model: server.models.customaccesstoken
    }));
};
//# sourceMappingURL=authentication.js.map