const { getToken } = require("./authentication");
const {
  getCities,
  getStations,
  getTransfers,
} = require("../models/static_api");

const updateCites = () => {
  getToken().then(async (response) => {
    cache.set("access_token", response.data.access_token);
    getCities();
  });
};

const updateStations = () => {
  getToken().then(async (response) => {
    cache.set("access_token", response.data.access_token);
    getStations();
  });
};

const updateTransfers = () => {
  getToken().then(async (response) => {
    cache.set("access_token", response.data.access_token);
    getTransfers();
  });
};

const updateAllStaticFiles = () => {
  updateCites();
  updateStations();
  updateTransfers();
};

module.exports = {
  updateCites,
  updateStations,
  updateTransfers,
  updateAllStaticFiles,
};
