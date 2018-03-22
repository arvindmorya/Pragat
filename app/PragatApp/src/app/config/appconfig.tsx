
let BASE_URL = "http://localhost:3001/";
// var process: any;
// if(process.env.NODE_ENV === 'production') {
//   let BASE_URL: string = '';
// }

var URL_USER_SIGN_UP: string = BASE_URL.concat("api/users/");
var URL_SCHOOLS: string = BASE_URL.concat("api/schools");
var URL_CLUSTERS: string = BASE_URL.concat("api/clusters");


export const appconfig = {
  //env: process.env.NODE_ENV,
  URL_USER_SIGN_UP,
  URL_SCHOOLS,
  URL_CLUSTERS,
};

export default appconfig;
