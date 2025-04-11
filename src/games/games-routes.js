const { Router } = require("express");
const cors = require("cors");

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

routes.post("/post-free-games", PostFreeGames);
routes.get("/fetch-free-games", FetchFreeGames);
routes.post("/fetch-free-code", FetchFreeID);
routes.post("/fetch-free-games-list", FetchFreeGamesList);
routes.post("/delete-free-games", DeleteFreeGames);
routes.post("/post-premium-games", PostPremiumGames);
routes.get("/fetch-premium-games", FetchPremiumGames);
routes.post("/fetch-premium-code", FetchPremiumID);
routes.post("/fetch-premium-games-list", FetchPremiumGamesList);
routes.post("/delete-premium-games", DeletePremiumGames);

module.exports = routes;
