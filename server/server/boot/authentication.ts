'use strict';
var loopback = require('loopback');

export = function enableAuthentication(server: any) {
  // enable authentication
  // server.enableAuth();
  // server
  server.use(loopback.token({
    model: server.models.customaccesstoken
  }));
};
