
let BASE_URL = "http://localhost:3001/";

if(process.env.NODE_ENV === 'production') {
  BASE_URL = '';
}

URL_USER_SIGN_UP = BASE_URL.concat("api/users/");
URL_SCHOOLS = BASE_URL.concat("api/schools");

export const appconfig = {
  env: process.env.NODE_ENV,
  URL_USER_SIGN_UP,
  URL_SCHOOLS,
};

export default appconfig;
