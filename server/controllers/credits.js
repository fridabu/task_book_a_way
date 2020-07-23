const { getCreditsModel } = require("../models/dynamic_api");
const { getToken } = require("./authentication");

const getCredits = () => {
  return getCreditsModel();
};

const whatIsMyCredits = () => {
  return getToken().then(async (response) => {
    cache.set("access_token", response.data.access_token);
    const credits = await getCredits();
    return credits.data;
  });
};

module.exports = { getCredits, whatIsMyCredits };
