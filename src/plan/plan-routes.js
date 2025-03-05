const { Router } = require("express");
const {
  FetchAllPlansFunction,
  FetchPlansIDFunction,
} = require("./plan-controller");
const routes = Router();

routes.get("/get-all-plans", FetchAllPlansFunction);
routes.post("/get-plan-byID", FetchPlansIDFunction);

module.exports = routes;
