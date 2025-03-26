const { unit_update_public_model } = require("../auth/auth-model");
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

const BuyUnitFunction = (req, res) => {
  let { totalUnit, email } = req.body;

  fetch_user_public_model(email).then((fetchUserResponse) => {
    if (fetchUserResponse.error) {
      return res.send(
        responseObject(fetchUserResponse.error.message, false, null)
      );
    }

    if (fetchUserResponse.data.length < 1) {
      return res.send(responseObject("invalid user", false, null));
    }

    let userData = fetchUserResponse.data[0];
    let oldUnit = userData.unit;
    let newUnit = oldUnit + parseInt(totalUnit);

    unit_update_public_model(email, newUnit).then((UpdateUnitResponse) => {
      if (UpdateUnitResponse.error) {
        return res.send(
          responseObject(UpdateUnitResponse.error.message, false, null)
        );
      }

      return res.send(
        responseObject("payment successful", true, UpdateUnitResponse.data)
      );
    });
  });
};

module.exports = {
  FetchAllUnitsFunction,
  FetchUnitsIDFunction,
  BuyUnitFunction,
};
