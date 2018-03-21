import * as appconfig from '../config/appconfig'

export const signUp = (signupdetails:object) => {
  return fetch(appconfig.appconfig.URL_USER_SIGN_UP, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupdetails),
  }).then(response => response.json())
  .catch(error => {alert(error)});
}

export const fetchSchoolDetails = (schoolUdiseId:string) => {
  var url:string = appconfig.appconfig.URL_SCHOOLS.concat("?filter[where][id]=").concat(schoolUdiseId);
  return fetch(url).
  then(response => response.json())
  .catch((error) => alert("error".concat(url.concat(error))));
}

export const fetchClusterDetails = (clusterUdiseId:string) => {
  var url:string = appconfig.appconfig.URL_CLUSTERS.concat("?filter[where][id]=").concat(clusterUdiseId);
  return fetch(url).
  then(response => response.json())
  .catch((error) => alert("error".concat(url.concat(error))));
}
