const { Router } = require("express");
const {
  LoginFunction,

  RequestOtp,
  SignupFunction,
  UpdatePasswordFunction,
  ResetPasswordFunction,
} = require("./auth-controller");
const routes = Router();

routes.post("/request-otp", RequestOtp);
routes.post("/signup", SignupFunction);
routes.post("/login", LoginFunction);
routes.post("/reset-password", ResetPasswordFunction);
routes.post("/update-password", UpdatePasswordFunction);

module.exports = routes;
