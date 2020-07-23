const { getTripsModel } = require("../models/dynamic_api");
const { getToken } = require("./authentication");
const { getCityIdByName } = require("./cities");
const { getStationsOfCityById } = require("./stations");

const getTrips = (
  departureStation,
  arrivalStation,
  departure,
  passengers = 1,
  limit = 100,
  offset = 0
) =>
  getTripsModel(
    departureStation,
    arrivalStation,
    departure,
    passengers,
    limit,
    offset
  );

const searchForTrip = (source, des, date, numberOfPassengers) => {
  return getToken().then(async (response) => {
    cache.set("access_token", response.data.access_token);
    let sourceStaionIds = [];
    let desStaionIds = [];

    const sourceID = await getCityIdByName(source);
    const desID = await getCityIdByName(des);

    const sourceStations = await getStationsOfCityById(sourceID);
    sourceStations.map((element) => sourceStaionIds.push(element.stationId));

    const desStations = await getStationsOfCityById(desID);
    desStations.map((element) => desStaionIds.push(element.stationId));

    const trips = await getTrips(
      sourceStaionIds,
      desStaionIds,
      date,
      numberOfPassengers
    );

    return trips.data.data;
  });
};

module.exports = { getTrips, searchForTrip };
