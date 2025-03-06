const { responseObject } = require("../utility");
const { fetch_unit_id_model, fetch_all_units_model } = require("./unit-model");

const FetchAllUnitsFunction = (req, res) => {
  fetch_all_units_model().then((response) => {
    if (response.error) {
      return res.send(responseObject(response.error.message, false, null));
    }

    if (response.data.length < 1) {
      return res.send(responseObject("no units available", false, null));
    }

    return res.send(responseObject("units fetched", true, response.data));
  });
};

const FetchUnitsIDFunction = (req, res) => {
  let { id } = req.body;

  fetch_unit_id_model(id).then((response) => {
    if (response.error) {
      return res.send(responseObject(response.error.message, false, null));
    }

    if (response.data.length < 1) {
      return res.send(responseObject("units not available", false, null));
    }

    return res.send(responseObject("unit fetched", true, response.data[0]));
  });
};

module.exports = { FetchAllUnitsFunction, FetchUnitsIDFunction };
