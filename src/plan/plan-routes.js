const { Router } = require("express");
const {
  FetchAllPlansFunction,
  FetchPlansIDFunction,
  GetPlanFunction,
} = require("./plan-controller");
const routes = Router();

routes.get("/get-all-plans", FetchAllPlansFunction);
routes.post("/get-plan-byID", FetchPlansIDFunction);
routes.post("/get-plan", GetPlanFunction);

module.exports = routes;
