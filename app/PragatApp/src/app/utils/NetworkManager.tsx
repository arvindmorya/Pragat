import * as appconfig from "../config/appconfig";
import NetInfo from 'react';

export const signUp = (signupdetails: any) => {
  let url =
    signupdetails.role === "Kendra Pramukh"
      ? appconfig.configs.URL_USER_KP
      : appconfig.configs.URL_USER_TEACHER;
  console.log("signup requestBody : " + JSON.stringify(signupdetails));
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(signupdetails)
  })
    .then(response => response.json())
    .catch(error => {
     // alert(error);
    });
};

async function fetchSchoolDetails(schoolUdiseId: string, errorFun: Function) {
  var url: string = appconfig.configs.URL_SCHOOLS.concat(
    "?filter[where][udise_id]="
  ).concat(schoolUdiseId);
  console.log("fetchSchoolDetails url : " + url);
  let schoolDetail: any = {
    school_name: "",
    cluster: "",
    cluster_udise_id: "",
    kp_name: "",
    kp_udise_id: ""
  };
  let response = await fetch(url);
  let responseJson = await response.json();
  console.log("response fetch school details: " + JSON.stringify(response));
  console.log("responseJson: " + JSON.stringify(responseJson));

  if (responseJson.error) {
    console.log("Error: " + responseJson.error.message);
    return responseJson;
  } else {
    let schoolResponseObj = responseJson[0];
    console.log("school responseObj: " + JSON.stringify(schoolResponseObj));
    if (schoolResponseObj && schoolResponseObj.name) {
      schoolDetail.school_name = schoolResponseObj.name;
    }

    if (schoolResponseObj && schoolResponseObj.cluster) {
      let clusterObj = schoolResponseObj.cluster;
      if (clusterObj && clusterObj.name) {
        schoolDetail.cluster = clusterObj.name;
      }
      if (clusterObj && clusterObj.udise_id) {
        schoolDetail.cluster_udise_id = clusterObj.udise_id;
      }

      if (clusterObj && clusterObj.kp) {
        let kpObj = clusterObj.kp;
        if (kpObj && kpObj.name) {
          schoolDetail.kp_name = kpObj.name;
        }

        if (kpObj && kpObj.udise_id) {
          schoolDetail.kp_udise_id = kpObj.udise_id;
        }
      }
    }

    return schoolDetail;
  }
}

async function fetchClusterDetails(clusterUdiseId: string) {
  var url: string = appconfig.configs.URL_CLUSTERS.concat(
    "?filter[where][udise_id]="
  ).concat(clusterUdiseId);

  let clusterDetail = {
    cluster_name: ""
  };

  let response = await fetch(url);
  let responseJson = await response.json();
  console.log("response from fetch cluster details");
  if (responseJson && responseJson.error) {
    "Failed to fetch cluster details\n".concat(responseJson.error);
  } else {
    let responseObj = responseJson[0];
    if (responseObj && responseObj.name) {
      clusterDetail.cluster_name = responseObj.name;
    }
    return clusterDetail;
  }
}

async function uploadAvatar(avatar: any) {
  const data = new FormData();

  try {
    data.append("avatar", dataURItoBlob(avatar.uri, avatar.type), avatar.name);
  } catch (error) {
    throw Error("Could not creat blob");
  }

  let response = await fetch(appconfig.configs.URL_UPLOAD_AVATAR, {
    method: "post",
    body: data
  });

  console.log("response status " + response.status);

  let responseJson = await response.json();
  return responseJson;
}

function dataURItoBlob(dataURI: string, dataType: string):Blob {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

async function loginUser(loginDetails: any) {
  console.log("login details : " + JSON.stringify(loginDetails));
  let response = await fetch(appconfig.configs.URL_LOGIN, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginDetails)
  });

  let responseJson = await response.json();
  return responseJson;
}

async function requestTokenForForgotPassword(requestBody: any) {
  console.log("request token requestBody : " + JSON.stringify(requestBody));
  let response = await fetch(appconfig.configs.URL_REQUEST_PASSWORD_RESET, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  //console.log("resetPassword response = " + JSON.stringify(response));
  //let responseJson = await response.json();
  //console.log("responseJson = " + JSON.stringify(responseJson));
  return response;
}

async function resetPassword(requestBody: any) {
  console.log("resetPassword requestBody : " + JSON.stringify(requestBody));
  let response = await fetch(appconfig.configs.URL_RESET_PASSWORD, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  //console.log("resetPassword response = " + JSON.stringify(response));
  //let responseJson = await response.json();
  //console.log("responseJson = " + JSON.stringify(responseJson));
  return response;
}

export const NetworkApis = {
  fetchClusterDetails,
  fetchSchoolDetails,
  loginUser,
  requestTokenForForgotPassword,
  resetPassword,
  uploadAvatar
};

export default NetworkApis;
