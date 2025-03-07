const BaseURL = "https://convertbetcodes.com/api";
const ApiKey =
  "WGhKYW5VTmFmNlo0LzJMMlMvenhZS2s4OWs3M1F3NjJMbisrRE1SOXZYbTcxYlcrbEpIb25id2d1NkNXZnJOQg==";

const {
  fetch_user_public_model,
  unit_update_public_model,
} = require("../auth/auth-model");
const { responseObject } = require("../utility");

async function FetchSupportedBookies(req, res) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BaseURL}/supported_bookies&api_key=${ApiKey}`,
      requestOptions
    );
    const result_1 = await response.text();
    let data = JSON.parse(result_1).data.bookies;
    let array = Object.values(data);
    return res.send(responseObject("bookies fetched", true, array));
  } catch (error) {
    return error;
  }
}

async function ConvertBetCode(req, res) {
  let { email, to, from, code } = req.body;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BaseURL}/conversion?from=${from}&to=${to}&booking_code=${code}&api_key=${ApiKey}`,
      requestOptions
    );
    const result_1 = await response.text();
    fetch_user_public_model(email).then((userPublicResponse) => {
      if (userPublicResponse.error) {
        return res.send(
          responseObject(userPublicResponse.error.message, false, null)
        );
      }

      if (userPublicResponse.data.length < 1) {
        return res.send("invalid user", false, null);
      }

      let userPublicData = userPublicResponse.data[0];
      let unit = userPublicData.unit;

      if (unit < 1) {
        return res.send(
          responseObject(
            "You dont have any conversion units, buy more units and try again",
            false,
            null
          )
        );
      }

      let newUnit = unit - 1;

      unit_update_public_model(email, newUnit).then((unitUpdateResponse) => {
        if (unitUpdateResponse.error) {
          return res.send(
            responseObject(unitUpdateResponse.error.message, false, null)
          );
        }

        let data = JSON.parse(result_1).data;
        if (data == null) {
          return res.send(
            responseObject(
              "There was a problem converting your code",
              false,
              null
            )
          );
        }

        let newCode = data.conversion.destination_code;

        return res.send(responseObject("bookies fetched", true, newCode));
      });
    });
  } catch (error) {
    return error;
  }
}

module.exports = { FetchSupportedBookies, ConvertBetCode };
