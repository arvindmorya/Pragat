import * as appconfig from "../config/appconfig";

export const signUp = (signupdetails: any) => {
  let url = signupdetails.role === "kp" ? appconfig.configs.URL_USER_KP : appconfig.configs.URL_USER_TEACHER;
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
      alert(error);
    });
};
async function fetchSchoolDetails(schoolUdiseId: string, errorFun: Function) {
  var url: string = appconfig.configs.URL_SCHOOLS.concat(
    "?filter[where][udise_id]="
  ).concat(schoolUdiseId);
  console.log("fetchSchoolDetails url : "+url)
  let schoolDetail: any = {
    school_name: "",
    cluster: "",
    clusterId:NaN,
    cluster_udise_id: "",
    kp_name: "",
    kpId: NaN,
    kp_udise_id: ""
  };
  let response = await fetch(url);
  let responseJson = await response.json();
  console.log("response fetch school details: "+JSON.stringify(response))
  console.log("responseJson: "+JSON.stringify(responseJson))

  if (responseJson.error) {
    console.log("Error: "+ responseJson.error.message);
    return responseJson;
  } else {
    let responseObj = responseJson[0];
    console.log("school responseObj: "+JSON.stringify(responseObj))
    if (responseObj && responseObj.name) {
      schoolDetail.school_name = responseObj.name;
    }
    if (responseObj && responseObj.clusterId) {
      schoolDetail.clusterId = responseObj.clusterId;
      let clusterDetails = await fetchClusterFromClusterId(
        responseObj.clusterId,
        errorFun
      );
      if (clusterDetails && clusterDetails.error) {
        return clusterDetails;
      }
      if (clusterDetails && clusterDetails.cluster) {
        schoolDetail.cluster = clusterDetails.cluster;
      }
      if (clusterDetails && clusterDetails.cluster_udise_id) {
        schoolDetail.cluster_udise_id = clusterDetails.cluster_udise_id;
      }
      if (clusterDetails && clusterDetails.kp_name) {
        schoolDetail.kp_name = clusterDetails.kp_name;
      }
      if (clusterDetails && clusterDetails.kpId) {
        schoolDetail.kpId = clusterDetails.kpId;
      }
      if (clusterDetails && clusterDetails.kp_udise_id) {
        schoolDetail.kp_udise_id = clusterDetails.kp_udise_id;
      }
    }
    return schoolDetail;
  }
}

async function fetchClusterFromClusterId(id: string, erroFun: Function) {
  var url: string = appconfig.configs.URL_CLUSTERS.concat(
    "?filter[where][id]="
  ).concat(id);
  let clusterDetails = {
    cluster: "",
    cluster_udise_id: "",
    kp_name: "",
    kpId:NaN,
    kp_udise_id: ""
  };

  let response = await fetch(url);
  let responseJson = await response.json();
  if (responseJson.error) {
    return responseJson;
  } else {
    let responseObj = responseJson[0];
    console.log("cluster responseObj: "+JSON.stringify(responseObj))
    if (responseObj.cluster) {
      clusterDetails.cluster = responseObj.cluster;
    }
    if (responseObj.udise_id) {
      clusterDetails.cluster_udise_id = responseObj.udise_id;
    }
    if (responseObj.id) {
      let details = await fetchKpFromClusterId(responseObj.id, erroFun);

      if(details && details.error) {
        return details;
      }

      if (details && details.kp_name) {
        clusterDetails.kp_name = details.kp_name;
      }
      if (details && details.kpId) {
        clusterDetails.kpId = details.kpId;
      }
      if (details && details.kp_udise_id) {
        clusterDetails.kp_udise_id = details.kp_udise_id;
      }
      return clusterDetails;
    }
  }
}

async function fetchKpFromClusterId(id: string, errorFun: Function) {
  var url: string = appconfig.configs.URL_USER_KP.concat(
    "?filter[where][clusterId]="
  ).concat(id);

  let response = await fetch(url);
  let responseJson = await response.json();
  console.log("response from fetchKpFromClusterId")
  if (responseJson.error) {
    return responseJson;
  } else {
    let responseObj = responseJson[0];
    console.log("kp responseObj: "+JSON.stringify(responseObj))
    let kpDetails = { kp_name: "", kp_udise_id: "", kpId:NaN };
    if (responseObj && responseObj.name) {
      kpDetails.kp_name = responseObj.name;
    }
    if (responseObj && responseObj.kpId) {
      kpDetails.kpId = responseObj.kpId;
    }
    if (responseObj.udise_id) {
      kpDetails.kp_udise_id = responseObj.udise_id;
    }
    return kpDetails;
  }
}

async function fetchClusterDetails(clusterUdiseId: string) {
  var url: string = appconfig.configs.URL_CLUSTERS.concat(
    "?filter[where][udise_id]="
  ).concat(clusterUdiseId);
  let clusterDetail = {
    cluster: "",
    clusterId:NaN,
    block_name: "",
    block_udise_id:"",
    blockId:NaN,
  };

  let response = await fetch(url);
  let responseJson = await response.json();
  console.log("response from fetchClusterDetails")
  if (responseJson && responseJson.error) {
    "Failed to fetch cluster details\n".concat(responseJson.error);
  } else {
    let responseObj = responseJson[0];
    if(responseObj && responseObj.cluster) {
      clusterDetail.cluster = responseObj.cluster;
    }
    if(responseObj && responseObj.id) {
      clusterDetail.clusterId = responseObj.id;
    }
    if(responseObj.blockId) {
      let blockDetails = await fetchBlockDetailsFromBlockId(responseObj.blockId);
      if(blockDetails && blockDetails.error) {
        return blockDetails;
      }
      if(blockDetails && blockDetails.block_name) {
        clusterDetail.block_name = blockDetails.block_name;
      }
      if(blockDetails && blockDetails.block_udise_id) {
        clusterDetail.block_udise_id = blockDetails.block_udise_id;
      }
    }
    return clusterDetail;
  }
}

async function fetchBlockDetailsFromBlockId(blockId:string) {
  var url: string = appconfig.configs.URL_BLOCKS.concat(
    "?filter[where][id]="
  ).concat(blockId);
  
  let response = await fetch(url);
  let responseJson = await response.json();
  if(responseJson.error) {
    return responseJson;
  } else {
    let responseObj = responseJson[0];
    let blockDetails = { block_name: "", block_udise_id: "" };
    if (responseObj.name) {
      blockDetails.block_name = responseObj.name;
    }
    if (responseObj.udise_id) {
      blockDetails.block_udise_id = responseObj.udise_id;
    }
    return blockDetails;
  }
}

async function loginUser(loginDetails: any) {
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

export const NetworkApis = {
  fetchClusterDetails,
  fetchSchoolDetails,
  loginUser,
};

export default NetworkApis;
