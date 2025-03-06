const { responseObject } = require("../utility");
const { fetch_all_plans_model, fetch_plans_id_model } = require("./plan-model");

const FetchAllPlansFunction = (req, res) => {
  fetch_all_plans_model().then((response) => {
    if (response.error) {
      return res.send(responseObject(response.error.message, false, null));
    }

    if (response.data.length < 1) {
      return res.send(responseObject("no plans available", false, null));
    }

    return res.send(responseObject("plans fetched", true, response.data));
  });
};

const FetchPlansIDFunction = (req, res) => {
  let { id } = req.body;

  fetch_plans_id_model(id).then((response) => {
    if (response.error) {
      return res.send(responseObject(response.error.message, false, null));
    }

    if (response.data.length < 1) {
      return res.send(responseObject("plans not available", false, null));
    }

    return res.send(responseObject("plan fetched", true, response.data[0]));
  });
};

module.exports = { FetchAllPlansFunction, FetchPlansIDFunction };
