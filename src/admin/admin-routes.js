const { Router } = require("express");
const {
  FetchAllUsersFunction,
  FetchPremiumUsersFunction,
} = require("./admin-controller");

const routes = Router();

routes.get("/get-all-users", FetchAllUsersFunction);
routes.get("/get-premium-users", FetchPremiumUsersFunction);

module.exports = routes;
