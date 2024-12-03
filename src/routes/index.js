const { Router } = require("express");
const routes = Router();

routes.use("/auth", require("../auth/auth-routes"));

routes.use("/user", require("../user/user-routes"));
routes.use("/games", require("../games/games-routes"));

module.exports = routes;
