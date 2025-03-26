const { fetch_user_public_model } = require("../auth/auth-model");
const { responseObject } = require("../utility");
const {
  fetch_all_plans_model,
  fetch_plans_id_model,
  update_plan_model,
} = require("./plan-model");

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

const GetPlanFunction = (req, res) => {
  let { duration, planName, email } = req.body;

  fetch_user_public_model(email).then((fetchUserResponse) => {
    if (fetchUserResponse.error) {
      return res.send(
        responseObject(fetchUserResponse.error.message, false, null)
      );
    }

    if (fetchUserResponse.data.length < 1) {
      return res.send(responseObject("invalid user", false, null));
    }

    let expiryDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
    let role = "paid";

    let payload = { email, planName, expiryDate, role };

    update_plan_model(payload).then((UpdatePlanResponse) => {
      if (UpdatePlanResponse.error) {
        return res.send(
          responseObject(UpdatePlanResponse.error.message, false, null)
        );
      }

      return res.send(
        responseObject("upgraded to premium", true, UpdatePlanResponse.data)
      );
    });
  });
};

module.exports = {
  FetchAllPlansFunction,
  FetchPlansIDFunction,
  GetPlanFunction,
};
