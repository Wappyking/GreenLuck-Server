const { Router } = require("express");
const {
  AllNotificationsFunction,
  UpdateFCM,
} = require("./notification-controller");

const routes = Router();

routes.get("/notifications", AllNotificationsFunction);
routes.get("/update-FCM", UpdateFCM);

module.exports = routes;
