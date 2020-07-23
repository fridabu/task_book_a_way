const {
  bookingsModel,
  bookingsPayModel,
  getBookingByIdModel,
} = require("../models/dynamic_api");

const { getToken } = require("./authentication");
const { searchForTrip } = require("./trips");
const { getTransferById } = require("./transfers");

const postBooking = (tripId, passengers, contact, extraoptions = null) => {
  return bookingsModel(tripId, passengers, contact, extraoptions);
};

const postBookingPay = (bookingId) => {
  return getToken().then(async (response) => {
    cache.set("access_token", response.data.access_token);
    return bookingsPayModel(bookingId);
  });
};

const getBookingById = (id) => {
  return getToken().then(async (response) => {
    cache.set("access_token", response.data.access_token);
    return getBookingByIdModel(id);
  });
};

const bookTrip = (source, des, date, numberOfPassengers) => {
  return getToken().then(async (response) => {
    cache.set("access_token", response.data.access_token);

    const tripsArray = await searchForTrip(
      source,
      des,
      date,
      numberOfPassengers
    );

    //find the cheapest trip that has instant confirmation
    //If no trip is instant confirmation, just pick the cheapest one.
    let firstElement = tripsArray.find(
      (element) => element.isInstantConfirmation
    );
    let flagForCancelingFale = false;

    if (!firstElement) {
      firstElement = tripsArray[0];
      flagForCancelingFale = true;
    }

    let minItem = tripsArray.reduce((minItem, item) => {
      minItem =
        item.price.totalAmount < minItem.price.totalAmount &&
        (item.isInstantConfirmation || flagForCancelingFale)
          ? item
          : minItem;
      return minItem;
    }, firstElement);

    const transfer = await getTransferById(minItem.transferId);

    //booking
    const tripId = minItem.id;
    const passenger1 = {
      firstName: "John", //should get it from input
      lastName: "Doe", //should get it from input
      extraInfos: [
        {
          definition: transfer.passengerExtraInfos[0].id,
          value: "Estonian", //should get it from input
        },
      ],
    };
    const passenger2 = {
      firstName: "Ran", //should get it from input
      lastName: "Van", //should get it from input
    };

    const passengers = [passenger1, passenger2];
    try {
      var formatedPassengers = passengers.map((item) => {
        let extraInfos = [];
        transfer.passengerExtraInfos.map((extra) => {
          extraInfos = extraInfos.concat(
            Object.assign({}, { definition: extra.id, value: "Estonian" })
          );
          return;
        });
        item = Object.assign(
          { ...item },
          {
            extraInfos: extraInfos,
          }
        );
        return item;
      });
    } catch (e) {
      console.log(e);
    }

    const contact = {
      email: "johndoe@gmail.com", //should get it from input
      phone: "+1 (234) 556-6677", //should get it from input
    };

    const booking = await postBooking(tripId, formatedPassengers, contact);
    return booking;
  });
};

const checkBookingStatus = async (bookingId) => {
  const bookingFromServer = await getBookingById(bookingId);
  if (bookingFromServer.data.status === "approved") {
    return true;
  } else {
    return false;
  }
};

const checkBookingStatusContious = (bookId) =>
  new Promise((resolve, reject) => {
    var startTime = new Date().getTime();
    //time out of 2 minutes
    //interval of 3 seconds
    timeout = 1000 * 60 * 2;
    (interval = 3000), (canPoll = true);

    (async function p() {
      canPoll = new Date().getTime() - startTime <= timeout;
      const check = await checkBookingStatus(bookId);
      if (!check && canPoll) {
        setTimeout(p, interval);
      } else {
        return false;
      }
    })();
  });

module.exports = {
  checkBookingStatus,
  bookTrip,
  postBooking,
  postBookingPay,
  getBookingById,
  checkBookingStatusContious,
};
