const supabase = require("../../config/supaconfig_index");

function fetch_all_plans_model() {
  return supabase.from("plan").select("*");
}

function fetch_plans_id_model(payload) {
  return supabase.from("plan").select("*").eq("id", payload);
}

function update_plan_model(payload) {
  return supabase
    .from("user_public")
    .update({
      role: payload.role,
      planName: payload.planName,
      expiryDate: payload.expiryDate,
    })
    .eq("email", payload.newEmail)
    .select();
}

module.exports = {
  fetch_all_plans_model,
  fetch_plans_id_model,
  update_plan_model,
};
