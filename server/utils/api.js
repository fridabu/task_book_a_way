const {
  STAGEING_API_BASE_URL,
  STAGEING_AUTH_API_BASE_URL,
} = require("../../constants");
const axios = require("axios");

const callApi = async (method, path, body, auth = false) => {
  let headers = {
    Accept: "application/json, text/plain, */*",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  let base_url = STAGEING_API_BASE_URL;
  if (auth) {
    base_url = STAGEING_AUTH_API_BASE_URL;
  } else {
    headers.Authorization = `Bearer ${cache.get("access_token")}`;
  }

  return axios({
    method: method,
    url: base_url + path,
    data: body ? JSON.stringify(body) : null,
    headers: headers,
  });
};

module.exports = { callApi };
