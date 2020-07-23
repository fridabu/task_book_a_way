const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const dotenv = require("dotenv");
const schedule = require("node-schedule");

const { updateAllStaticFiles } = require("../server/controllers/staticData");

const NodeCache = require("node-cache");
global.cache = new NodeCache();
dotenv.config();

const app = express();

// Parses the request payload (if JSON) before the request goes to the handler
app.use(bodyParser.json());
app.use(routes);
//app.use(express.static("public"));

//update all static file once a day at 00:00
var updateStaticFile = schedule.scheduleJob("00 00 * * *", function () {
  updateAllStaticFiles();
});

module.exports = app;
