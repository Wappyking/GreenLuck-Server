const { Router } = require("express");
const {
  FetchSupportedBookies,
  FetchBookieID,
  ConvertBetCode,
} = require("./convert-controller");

const routes = Router();

routes.get("/fetch-supported-bookies", FetchSupportedBookies);
routes.post("/convert-code", ConvertBetCode);

module.exports = routes;
