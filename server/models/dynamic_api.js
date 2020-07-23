const { callApi } = require("../utils/api");
const { bookingRequest } = require("./requests/postBooking");

const URL = require("url");

//Get trips
//Get Api,
//authorization: true
//Request params:
//departureStation array[string]    required
//arrivalStation   array[string]    required
//departure        string           required    the required date in format: "YYYY-MM-DD"  required
//passengers       number                       amount of passengers [1..15
//limit            number                       limit the number of results. default is 100, maximum allowed is 1000
//offset           number                       result offset. default is zero

//expected result
// {
//     "total": 0,
//     "limit": 100,
//     "offset": 0,
//     "data": []
// }
const getTripsModel = (
  departureStation,
  arrivalStation,
  departure,
  passengers = 1,
  limit = 100,
  offset = 0
) => {
  let params = new URLSearchParams({
    departureStation: departureStation.join(),
    arrivalStation: arrivalStation.join(),
    departure: departure,
    passengers: passengers,
    limit: limit,
    offset: offset,
  });

  return callApi("GET", `/trips?${params.toString()}`, null);
};

//Get credits
//Get Api,
//authorization: true
//Request params:(Nothing)
//expected result example
//{
//     "balance": 100,
//     "currency": "USD"
//}
const getCreditsModel = () => {
  return callApi("GET", `/credits`, null);
};

const bookingsModel = (tripId, passengers, contact, extraoptions = null) => {
  bookingRequest.tripId = tripId;
  bookingRequest.passengers = passengers;
  bookingRequest.contact = contact;
  //TODO: give it deafult value
  //bookingRequest.extraOptions = extraoptions;

  return callApi("POST", "/bookings", bookingRequest);
};

const getBookingByIdModel = (bookingId) => {
  return callApi("GET", `/bookings/${bookingId}`, null);
};

const bookingsPayModel = (bookingId) => {
  return callApi("POST", `/bookings/${bookingId}/pay`, null);
};

module.exports = {
  getTripsModel,
  getCreditsModel,
  bookingsModel,
  bookingsPayModel,
  getBookingByIdModel,
};
