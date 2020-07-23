const { request } = require("./requests/postToken");
const { callApi } = require("../utils/api");

const getTokenModel = (clientId, clientSecret) => {
  request.client_id = clientId || process.env.CLIENT_ID;
  request.client_secret = clientSecret || process.env.CLIENT_SECRET;
  return callApi("POST", "", request, true);
};

module.exports = { getTokenModel };
