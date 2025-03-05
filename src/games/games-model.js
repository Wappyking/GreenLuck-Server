const supabase = require("../../config/supaconfig_index");

function post_free_games_model(payload) {
  return supabase
    .from("free")
    .insert([
      {
        code: payload.code,
        totalOdds: payload.totalOdds,
        bookie: payload.bookie,
        numberOfGames: payload.numberOfGames,
      },
    ])
    .select();
}

function post_free_gamesList_model(payload) {
  return supabase
    .from("free_games")
    .insert([
      {
        code: payload.code,
        games: payload.games,
      },
    ])
    .select();
}

function fetch_free_games_model() {
  return supabase.from("free").select("*");
}

function fetch_free_code_model(payload) {
  return supabase.from("free").select("*").eq("code", payload);
}

function fetch_free_gamesList_model(payload) {
  return supabase.from("free_games").select("*").eq("code", payload);
}

function delete_free_games_model(payload) {
  return supabase.from("free").delete().eq("code", payload);
}

function delete_free_gamesList_model(payload) {
  return supabase.from("free_games").delete().eq("code", payload);
}

function post_premium_games_model(payload) {
  return supabase
    .from("premium")
    .insert([
      {
        code: payload.code,
        totalOdds: payload.totalOdds,
        bookie: payload.bookie,
        numberOfGames: payload.numberOfGames,
      },
    ])
    .select();
}

function post_premium_gamesList_model(payload) {
  return supabase
    .from("premium_games")
    .insert([
      {
        code: payload.code,
        games: payload.games,
      },
    ])
    .select();
}

function fetch_premium_games_model() {
  return supabase.from("premium").select("*");
}

function fetch_premium_code_model(payload) {
  return supabase.from("premium").select("*").eq("code", payload);
}

function fetch_premium_gamesList_model(payload) {
  return supabase.from("premium_games").select("*").eq("code", payload);
}

function delete_premium_games_model(payload) {
  return supabase.from("premium").delete().eq("code", payload);
}

function delete_premium_gamesList_model(payload) {
  return supabase.from("premium_games").delete().eq("code", payload);
}

module.exports = {
  post_free_games_model,
  post_premium_games_model,
  fetch_free_games_model,
  fetch_premium_games_model,
  delete_free_games_model,
  delete_premium_games_model,
  post_free_gamesList_model,
  post_premium_gamesList_model,
  fetch_free_gamesList_model,
  fetch_premium_gamesList_model,
  delete_free_gamesList_model,
  delete_premium_gamesList_model,
  fetch_free_code_model,
  fetch_premium_code_model,
};
