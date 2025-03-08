const { Router } = require("express");
const {
  FetchSlidersFunction,
  PostSliderFunction,
} = require("./slider-controller");
const routes = Router();

routes.get("/fetch-slider", FetchSlidersFunction);
routes.post("/post-slider", PostSliderFunction);

module.exports = routes;
