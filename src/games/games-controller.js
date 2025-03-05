const BaseURL = "https://convertbetcodes.com/api";
const ApiKey =
  "WGhKYW5VTmFmNlo0LzJMMlMvenhZS2s4OWs3M1F3NjJMbisrRE1SOXZYbTcxYlcrbEpIb25id2d1NkNXZnJOQg==";
const { response, json } = require("express");
const { responseObject } = require("../utility");
const {
  post_free_games_model,
  post_premium_games_model,
  fetch_free_games_model,
  fetch_premium_games_model,
  delete_free_games_model,
  delete_premium_games_model,
  post_free_gamesList_model,
  post_premium_gamesList_model,
  delete_free_gamesList_model,
  delete_premium_gamesList_model,
  fetch_free_gamesList_model,
  fetch_free_code_model,
  fetch_premium_code_model,
} = require("./games-model");

async function PostFreeGames(req, res) {
  let { code } = req.body;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BaseURL}/retrieve_bet_code?origin_bookie=sportybet:ng&booking_code=${code}&api_key=${ApiKey}`,
      requestOptions
    );
    const result_1 = await response.text();
    let data = JSON.parse(result_1).data.lists;
    let totalOdds = JSON.parse(result_1).data.home.odds;
    let bookie = JSON.parse(result_1).data.home.bookie_name;
    let numberOfGames = JSON.parse(result_1).data.home.no_of_entries;

    let games = data;
    console.log(games);

    fetch_free_code_model(code).then((fetchCodeResponse) => {
      if (fetchCodeResponse.error) {
        return res.send(
          responseObject(fetchCodeResponse.error.message, false, null)
        );
      }

      if (fetchCodeResponse.data.length > 0) {
        return res.send(responseObject("code already posted", false, null));
      }

      let payload = { code, games, totalOdds, bookie, numberOfGames };
      post_free_games_model(payload)
        .then((response2) => {
          if (response2.error) {
            return res.send(
              responseObject(response2.error.message, false, null)
            );
          }
          let payload = { code, games };
          post_free_gamesList_model(payload).then((gamesListResponse) => {
            if (gamesListResponse.error) {
              return res.send(
                responseObject(gamesListResponse.error.message, false, null)
              );
            }

            return res.send(
              responseObject("games posted", true, {
                response2,
                gamesListResponse,
              })
            );
          });
        })
        .catch((error) => {
          return res.send(error);
        });
    });
  } catch (error) {
    return error;
  }
}

const FetchFreeGames = (req, res) => {
  fetch_free_games_model()
    .then((response3) => {
      if (response3.error) {
        return res.send(responseObject(response3.error.message, false, null));
      }

      if (response3.data.length < 1) {
        return res.send(responseObject("no free game available", false, null));
      }

      return res.send(responseObject("games posted", true, response3.data));
    })
    .catch((error) => {
      return res.send(error);
    });
};

const FetchFreeGamesList = (req, res) => {
  let { code } = req.body;

  fetch_free_gamesList_model(code)
    .then((response3) => {
      if (response3.error) {
        return res.send(responseObject(response3.error.message, false, null));
      }

      if (response3.data.length < 1) {
        return res.send(responseObject("no free game available", false, null));
      }

      return res.send(
        responseObject("gamesList fetched", true, response3.data)
      );
    })
    .catch((error) => {
      return res.send(error);
    });
};

const DeleteFreeGames = (req, res) => {
  let { code } = req.body;

  delete_free_games_model(code).then((response) => {
    if (response.error) {
      return res.send(responseObject(response.error.message, false, null));
    }

    delete_free_gamesList_model(code).then((response2) => {
      if (response2.error) {
        return res.send(responseObject(response2.error.message, false, null));
      }

      return res.send(responseObject("gameList deleted", true, response2.data));
    });
  });
};

async function PostPremiumGames(req, res) {
  let { code, collection } = req.body;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BaseURL}/retrieve_bet_code?origin_bookie=sportybet:ng&booking_code=${code}&api_key=${ApiKey}`,
      requestOptions
    );
    const result_1 = await response.text();
    let data = JSON.parse(result_1).data.lists;
    let totalOdds = JSON.parse(result_1).data.home.odds;
    let bookie = JSON.parse(result_1).data.home.bookie_name;
    let numberOfGames = JSON.parse(result_1).data.home.no_of_entries;

    let games = { games: data };
    console.log(games);

    fetch_premium_code_model(code).then((fetchCodeResponse) => {
      if (fetchCodeResponse.error) {
        return res.send(
          responseObject(fetchCodeResponse.error.message, false, null)
        );
      }

      if (fetchCodeResponse.data.length > 0) {
        return res.send(responseObject("code already posted", false, null));
      }

      let payload = { code, games, totalOdds, bookie, numberOfGames };
      post_premium_games_model(payload)
        .then((response2) => {
          if (response2.error) {
            return res.send(
              responseObject(response2.error.message, false, null)
            );
          }

          let payload = { code, games };
          post_premium_gamesList_model(payload).then((gamesListResponse) => {
            if (gamesListResponse.error) {
              return res.send(
                responseObject(gamesListResponse.error.message, false, null)
              );
            }

            return res.send(
              responseObject("games posted", true, {
                response2,
                gamesListResponse,
              })
            );
          });
        })
        .catch((error) => {
          return res.send(error);
        });
    });
  } catch (error) {
    return error;
  }
}

const FetchPremiumGames = (req, res) => {
  fetch_premium_games_model()
    .then((response3) => {
      if (response3.error) {
        return res.send(responseObject(response3.error.message, false, null));
      }

      if (response3.data.length < 1) {
        return res.send(responseObject("no game", false, null));
      }

      return res.send(responseObject("games posted", true, response3.data));
    })
    .catch((error) => {
      return res.send(error);
    });
};

const FetchPremiumGamesList = (req, res) => {
  let { code } = req.body;

  fetch_premium_games_model(code)
    .then((response3) => {
      if (response3.error) {
        return res.send(responseObject(response3.error.message, false, null));
      }

      if (response3.data.length < 1) {
        return res.send(responseObject("no game", false, null));
      }

      return res.send(
        responseObject("gamesList fetched", true, response3.data)
      );
    })
    .catch((error) => {
      return res.send(error);
    });
};

const DeletePremiumGames = (req, res) => {
  let { code } = req.body;

  delete_premium_games_model(code).then((response) => {
    if (response.error) {
      return res.send(responseObject(response.error.message, false, null));
    }

    delete_premium_gamesList_model(code).then((response2) => {
      if (response2.error) {
        return res.send(responseObject(response2.error.message, false, null));
      }

      return res.send(responseObject("game deleted", true, response2.data));
    });
  });
};

module.exports = {
  PostFreeGames,
  PostPremiumGames,
  DeleteFreeGames,
  DeletePremiumGames,
  FetchFreeGames,
  FetchPremiumGames,
  FetchFreeGamesList,
  FetchPremiumGamesList,
};
