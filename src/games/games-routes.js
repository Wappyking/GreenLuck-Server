const { Router } = require("express");
var cors = require("cors");

const {
  PostFreeGames,
  FetchFreeGames,
  PostPremiumGames,
  FetchPremiumGames,
  DeleteFreeGames,
  DeletePremiumGames,
  FetchPremiumGamesList,
  FetchFreeGamesList,
  FetchFreeID,
  FetchPremiumID,
} = require("./games-controller");

const routes = Router();

routes.post("/post-free-games", cors(), PostFreeGames);
routes.get("/fetch-free-games", cors(), FetchFreeGames);
routes.post("/fetch-free-code", cors(), FetchFreeID);
routes.post("/fetch-free-games-list", cors(), FetchFreeGamesList);
routes.post("/delete-free-games", cors(), DeleteFreeGames);
routes.post("/post-premium-games", cors(), PostPremiumGames);
routes.get("/fetch-premium-games", cors(), FetchPremiumGames);
routes.post("/fetch-premium-code", cors(), FetchPremiumID);
routes.post("/fetch-premium-games-list", cors(), FetchPremiumGamesList);
routes.post("/delete-premium-games", cors(), DeletePremiumGames);

module.exports = routes;
