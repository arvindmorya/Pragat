var appModels = [
  "custom_user", 
  "cluster", 
  "school", 
  "district", 
  "block", 
  "state", 
  "custom_accesstoken",
  "student",
  "class",
  "student",
  "schools-classes"
];

var server = require("./server");
var ds = server.dataSources.postgres;
// var ds = app.dataSources.postgres;
ds.automigrate(appModels, function(err: any) {
  if (err) {
   console.log(err);
  }
});