const { responseObject } = require("../utility");
const {
  fetch_all_users_model,
  fetch_premium_users_model,
} = require("./admin-model");

const FetchAllUsersFunction = async (req, res) => {
  fetch_all_users_model().then((fetchUsersResponse) => {
    if (fetchUsersResponse.error) {
      return res.send(
        responseObject(fetchUsersResponse.error.message, false, null)
      );
    }

    return res.send(
      responseObject("Users fetched successfully", true, {
        users: fetchUsersResponse.data,
      })
    );
  });
};

const FetchPremiumUsersFunction = async (req, res) => {
  fetch_premium_users_model().then((fetchUsersResponse) => {
    if (fetchUsersResponse.error) {
      return res.send(
        responseObject(fetchUsersResponse.error.message, false, null)
      );
    }

    return res.send(
      responseObject("Users fetched successfully", true, {
        PremiumUsers: fetchUsersResponse.data,
      })
    );
  });
};

module.exports = {
  FetchAllUsersFunction,
  FetchPremiumUsersFunction,
};
