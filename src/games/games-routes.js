const { Router } = require("express");
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
routes.get("/fetch-free-code", FetchFreeID);
routes.get("/fetch-free-games_list", FetchFreeGamesList);
routes.get("/delete-free-games", DeleteFreeGames);
routes.post("/post-premium-games", PostPremiumGames);
routes.get("/fetch-premium-games", FetchPremiumGames);
routes.get("/fetch-premium-code", FetchPremiumID);
routes.get("/fetch-premium-games_list", FetchPremiumGamesList);
routes.get("/delete-premium-games", DeletePremiumGames);

module.exports = routes;
