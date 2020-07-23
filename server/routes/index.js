const express = require("express");
const { Router } = express; //Here we destructure (ES6) the Router value off of express
const router = Router();
const { getToken } = require("../controllers/authentication");
const { getCityStationsNumber } = require("../controllers/cities");
const { searchForTrip } = require("../controllers/trips");
const { whatIsMyCredits } = require("../controllers/credits");
const {
  bookTrip,
  postBookingPay,
  getBookingById,
  checkBookingStatus,
  checkBookingStatusContious,
} = require("../controllers/bookings");

//These routes are all promise based - promises are native feature of javascript that provide an alternative way of handling
//asynchronous actions. You make a request and use the '.then()' syntax to handle the response.

// =========================================================
// Routes
// =========================================================

router.get("/access_token", (req, res, next) =>
  getToken()
    .then((data) => {
      res.status(200).json(data.data.access_token);
    })
    .catch((err) => err)
);

/*
 * '/city_staions_number/:city'
 */
router.get("/city_staions_number/:city", ({ params: { city } }, res, next) => {
  getCityStationsNumber(city)
    .then((data) => res.status(200).json(data))
    .catch((err) => err);
});

/*
 * '/trips'
 */
router.get(
  "/trips/:source/:destination/:date/:numberOfPassenger",
  ({ params: { source, destination, date, numberOfPassenger } }, res, next) => {
    searchForTrip(source, destination, date, numberOfPassenger)
      .then((data) => res.status(200).json(data))
      .catch((err) => err);
  }
);

/*
 * '/credits'
 */
router.get("/credits", (req, res, next) => {
  whatIsMyCredits()
    .then((data) => res.status(200).json(data))
    .catch((err) => err);
});

/*
 * '/book-the-cheapest'
 */
router.get(
  "/book_the_cheapest/:source/:destination/:date/:numberOfPassenger",
  ({ params: { source, destination, date, numberOfPassenger } }, res, next) => {
    bookTrip(source, destination, date, numberOfPassenger)
      .then((data) => res.status(200).json(data.data))
      .catch((err) => err);
  }
);

/*
 * '/pay'
 */
router.get("/pay/:bookId", ({ params: { bookId } }, res, next) => {
  postBookingPay(bookId)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((err) => console.log(err));
});

/*
 * '/booking'
 */
router.get("/booking/:bookId", ({ params: { bookId } }, res, next) => {
  getBookingById(bookId)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((err) => console.log(err));
});

/*
 * '/booking_status/:bookId'
 */
router.get("/booking_status/:bookId", ({ params: { bookId } }, res, next) => {
  checkBookingStatus(bookId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
});

/*
 * '/booking_status_pooling/:bookId'
 */
router.get(
  "/booking_status_pooling/:bookId",
  ({ params: { bookId } }, res, next) => {
    checkBookingStatusContious(bookId)
      .then((data) => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
