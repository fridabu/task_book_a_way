const fs = require("fs").promises;

//This code should be moved to models/stations, so just models deals with files
const getStationsOfCityById = async (cityId) => {
  const data = await fs.readFile("./server/db/stations.json", "utf8");
  obj = JSON.parse(data); //convert file data to
  const result = obj.filter((station) => station.city.cityId === cityId);
  return result;
};

module.exports = {
  getStationsOfCityById,
};
