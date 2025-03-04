const { Router } = require("express");
const {
  PostFreeGames,
  FetchFreeGames,
  PostPremiumGames,
  FetchPremiumGames,
  DeleteFreeGames,
  DeletePremiumGames,
} = require("./games-controller");

const routes = Router();

routes.post("/post-free-games", PostFreeGames);
routes.get("/fetch-free-games", FetchFreeGames);
routes.get("/delete-free-games", DeleteFreeGames);
routes.post("/post-premium-games", PostPremiumGames);
routes.get("/fetch-premium-games", FetchPremiumGames);
routes.get("/delete-premium-games", DeletePremiumGames);

module.exports = routes;
