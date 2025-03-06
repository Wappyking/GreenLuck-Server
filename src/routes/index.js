const { Router } = require("express");
const routes = Router();

routes.use("/auth", require("../auth/auth-routes"));

routes.use("/user", require("../user/user-routes"));
routes.use("/games", require("../games/games-routes"));
routes.use("/plan", require("../plan/plan-routes"));
routes.use("/unit", require("../unit/unit-routes"));
routes.use("/convert", require("../convert/convert-routes"));

module.exports = routes;
