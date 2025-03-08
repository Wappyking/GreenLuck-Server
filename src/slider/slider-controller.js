const { responseObject } = require("../utility");
const {
  fetch_slider_model,
  post_slider_model,
  delete_slider_model,
} = require("./slider-model");

const FetchSlidersFunction = (req, res) => {
  fetch_slider_model().then((FetchResponse) => {
    if (FetchResponse.error) {
      return res.send(responseObject(FetchResponse.error.message, false, null));
    }

    if (FetchResponse.data.length < 1) {
      return res.send(responseObject("no slider available", false, null));
    }

    return res.send(responseObject("sliders fetch", true, FetchResponse.data));
  });
};

const PostSliderFunction = (req, res) => {
  let { image, webPage } = req.body;

  let payload = { image, webPage };
  post_slider_model(payload).then((PostResponse) => {
    if (PostResponse.error) {
      return res.send(responseObject(PostResponse.error.message, false, null));
    }

    return res.send(responseObject("slider posted", true, PostResponse.data));
  });
};

const DeleteSliderFunction = (req, res) => {
  let { id } = req.body;

  delete_slider_model(id).then((DeleteResponse) => {
    if (DeleteResponse.error) {
      return res.send(
        responseObject(DeleteResponse.error.message, false, null)
      );
    }

    return res.send(
      responseObject("slider deleted", true, DeleteResponse.data)
    );
  });
};

module.exports = {
  FetchSlidersFunction,
  PostSliderFunction,
  DeleteSliderFunction,
};
