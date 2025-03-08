const { Router } = require("express");
const {
  FetchSlidersFunction,
  PostSliderFunction,
  DeleteSliderFunction,
} = require("./slider-controller");
const routes = Router();

routes.get("/fetch-sliders", FetchSlidersFunction);
routes.post("/post-slider", PostSliderFunction);
routes.post("/delete-slider", DeleteSliderFunction);

module.exports = routes;
