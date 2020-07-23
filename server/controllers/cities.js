const { getStationsOfCityById } = require("./stations");
const fs = require("fs").promises;

//This code should be moved to models/cities, so just models deals with files
const getCityIdByName = async (cityName) => {
  const data = await fs.readFile("./server/db/cities.json", "utf8");
  obj = JSON.parse(data); //convert file data to
  city = obj.find((element) => element.name === cityName);
  return city.id;
};

const getCityStationsNumber = async (cityName) => {
  return getCityIdByName(cityName).then((id) => {
    return getStationsOfCityById(id).then((result) => result.length);
  });
};

module.exports = {
  getCityIdByName,
  getCityStationsNumber,
};
