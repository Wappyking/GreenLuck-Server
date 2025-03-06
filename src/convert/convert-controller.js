const BaseURL = "https://convertbetcodes.com/api";
const ApiKey =
  "WGhKYW5VTmFmNlo0LzJMMlMvenhZS2s4OWs3M1F3NjJMbisrRE1SOXZYbTcxYlcrbEpIb25id2d1NkNXZnJOQg==";

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
    let array = Object.keys(data);
    return res.send(responseObject("bookies fetched", true, array));
  } catch (error) {
    return error;
  }
}

async function FetchBookieID(req, res) {
  let { bookieID } = req.body;

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
    return res.send(responseObject("bookies fetched", true, data[bookieID]));
  } catch (error) {
    return error;
  }
}

module.exports = { FetchSupportedBookies, FetchBookieID };
