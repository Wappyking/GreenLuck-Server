const { Router } = require("express");

const {
  FetchAllUnitsFunction,
  FetchUnitsIDFunction,
  BuyUnitFunction,
} = require("./unit-controller");

const routes = Router();

routes.get("/get-all-units", FetchAllUnitsFunction);
routes.post("/get-unit-byID", FetchUnitsIDFunction);
routes.post("/buy-unit", BuyUnitFunction);

module.exports = routes;
