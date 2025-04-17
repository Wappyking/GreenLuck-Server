const supabase = require("../../config/supaconfig_index");

function fetch_all_users_model() {
  return supabase.from("user_public").select("*");
}

function fetch_premium_users_model() {
  return supabase.from("plan").select("*").eq("role", "paid");
}

module.exports = {
  fetch_all_users_model,
  fetch_premium_users_model,
};
