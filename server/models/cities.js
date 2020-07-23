const fs = require("fs").promises;

const getCityIdByNameModel = async (cityName) => {
  const data = await fs.readFile("./server/db/cities.json", "utf8");
  obj = JSON.parse(data); //convert file data to
  city = obj.find((element) => element.name === cityName);
  return city.id;
};

module.exports = {
  getCityIdByNameModel,
};
