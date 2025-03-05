const supabase = require("../../config/supaconfig_index");

function fetch_all_plans_model() {
  return supabase.from("plan").select("*");
}

function fetch_plans_id_model(payload) {
  return supabase.from("plan").select("*").eq("id", payload);
}

module.exports = { fetch_all_plans_model, fetch_plans_id_model };
