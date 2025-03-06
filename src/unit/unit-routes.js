const {
  FetchAllUnitsFunction,
  FetchUnitsIDFunction,
} = require("./unit-controller");

const routes = Router();

routes.get("/get-all-units", FetchAllUnitsFunction);
routes.post("/get-unit-byID", FetchUnitsIDFunction);

module.exports = routes;
