
let BASE_URL = "http://172.29.3.30:3000/";
// var process: any;
// if(process.env.NODE_ENV === 'production') {
//   let BASE_URL: string = '';
// }

var URL_USER_TEACHER: string = BASE_URL.concat("api/teachers/");
var URL_USER_KP: string = BASE_URL.concat("api/kp/");

var URL_SCHOOLS: string = BASE_URL.concat("api/schools");
var URL_CLUSTERS: string = BASE_URL.concat("api/clusters");
var URL_BLOCKS: string = BASE_URL.concat("api/blocks");
var URL_LOGIN: string = BASE_URL.concat("login");


export const configs = {
  //env: process.env.NODE_ENV,
  URL_USER_TEACHER,
  URL_USER_KP,
  URL_SCHOOLS,
  URL_CLUSTERS,
  URL_BLOCKS,
  URL_LOGIN
};

export default configs;
