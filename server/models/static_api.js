const { callApi } = require("../utils/api");
var fs = require("fs");

//Get cities
//Get Api, expected result a json of all cities
//Save data in db/cities.json
const getCities = async () => {
  const cities = await callApi("GET", "/cities", null);
  writeDataToDbFile(cities.data, "cities");
};

//Get stations
//Get Api, expected result a json of all stations
//Save data in db/stations.json
const getStations = async () => {
  const stations = await callApi("GET", "/stations", null);
  writeDataToDbFile(stations.data, "stations");
};

//Get transfers
//Get Api, expected result a json of all the available transfers
//Save data in db/transfers.json
const getTransfers = async () => {
  const transfers = await callApi("GET", "/transfers", null);
  writeDataToDbFile(transfers.data, "transfers");
};

function writeDataToDbFile(data, fileName) {
  fs.writeFile(
    `./server/db/${fileName}.json`,
    JSON.stringify(data),
    { flag: "w" },
    (error) => {
      if (error) {
        return console.log(error);
      }
      console.log(`data saved to db/${fileName}.json`);
    }
  );
}

module.exports = { getCities, getStations, getTransfers };
