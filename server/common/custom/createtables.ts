var dataSources = require('../../server/datasources.json');
var ds = dataSources.postgres;
var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role', 'custom_user', 'cluster', 'school', 'district', 'block', 'state'];

ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' , lbTables, '] created in ', ds.adapter.name);
  ds.disconnect();
});


// var appModels = ['AccessToken', 'ACL', 'RoleMapping', 'Role', 'custom_users'];

// var ds = app.dataSources.mydata;
// ds.isActual(appModels, function(err, actual) {
//   if (!actual) {
    
//   }
// });
