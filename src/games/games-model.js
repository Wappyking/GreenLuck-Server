const supabase = require("../../config/supaconfig_index");

function post_free_games_model(payload) {
  return supabase
    .from("free")
    .insert([
      {
        code: payload.code,
        games: payload.games,
        totalOdds: payload.totalOdds,
        bookie: payload.bookie,
        numberOfGames: payload.numberOfGames,
      },
    ])
    .select();
}

function fetch_free_games_model(payload) {
  return supabase.from("free").select("*").eq("code", payload);
}

function delete_free_games_model(payload) {
  return supabase.from("free").delete().eq("code", payload);
}

function post_premium_games_model(payload) {
  return supabase
    .from("premium")
    .insert([
      {
        code: payload.code,
        games: payload.games,
        totalOdds: payload.totalOdds,
        bookie: payload.bookie,
        numberOfGames: payload.numberOfGames,
      },
    ])
    .select();
}

function fetch_premium_games_model(payload) {
  return supabase.from("premium").select("*").eq("code", payload);
}

function delete_premium_games_model(payload) {
  return supabase.from("premium").delete().eq("code", payload);
}

module.exports = {
  post_free_games_model,
  post_premium_games_model,
  fetch_free_games_model,
  fetch_premium_games_model,
  delete_free_games_model,
  delete_premium_games_model,
};
