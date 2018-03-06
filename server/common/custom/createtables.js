var dataSources = require('../../server/datasources.json');
var ds = dataSources.postgres;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'user', 'cluster', 'school', 'district'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});