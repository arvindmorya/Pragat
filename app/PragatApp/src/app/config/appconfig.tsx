
// let BASE_URL = "http://127.0.0.1:3000/";
let BASE_URL = "http://172.29.4.84:3000/";

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
var URL_REQUEST_PASSWORD_RESET: string = BASE_URL.concat("request-password-reset");
var URL_RESET_PASSWORD: string = BASE_URL.concat("resetPassword");
var URL_UPLOAD_AVATAR: string = BASE_URL.concat("api/attachments/avatar/upload");
var URL_UPLOAD_REPORT: string = BASE_URL.concat("api/attachments/saral_report/upload");


export const configs = {
  //env: process.env.NODE_ENV,
  URL_USER_TEACHER,
  URL_USER_KP,
  URL_SCHOOLS,
  URL_CLUSTERS,
  URL_BLOCKS,
  URL_LOGIN,
  URL_REQUEST_PASSWORD_RESET,
  URL_RESET_PASSWORD,
  URL_UPLOAD_AVATAR,
  URL_UPLOAD_REPORT,
};

export default configs;
