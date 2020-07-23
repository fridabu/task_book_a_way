const { callApi } = require("../utils/api");
const { getTokenModel } = require("../models/authentication");

const getToken = (clientId, clientSecret) =>
  getTokenModel(clientId, clientSecret);

module.exports = { getToken };
