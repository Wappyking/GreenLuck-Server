const supabase = require("../../config/supaconfig_index");

function fetch_all_units_model() {
  return supabase.from("plan").select("*");
}

function fetch_unit_id_model(payload) {
  return supabase.from("unit").select("*").eq("id", payload);
}

module.exports = { fetch_all_units_model, fetch_unit_id_model };
