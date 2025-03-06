const { Router } = require("express");
const {
  FetchSupportedBookies,
  FetchBookieID,
} = require("./convert-controller");

const routes = Router();

routes.get("/fetch-supported-bookies", FetchSupportedBookies);
routes.get("/fetch-bookie-byID", FetchBookieID);

module.exports = routes;
