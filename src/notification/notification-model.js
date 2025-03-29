const supabase = require("../../config/supaconfig_index");
// const { verifyOtp } = require("./auth-controller");

//getting user by uuid from notification table
function fetch_notification_uuid_model(payload) {
  return supabase.from("notification").select("*").eq("to", payload);
}

//getting user by id from notification table
function fetch_notification_id_model(payload) {
  return supabase.from("notification").select("*").eq("id", payload);
}

function delete_notification_model(payload) {
  return supabase.from("notification").delete("*").eq("to", payload);
}

function FCM_update_public_model(email, FCM) {
  return supabase
    .from("user_public")
    .update({ FCM: FCM })
    .eq("email", email)
    .select();
}
module.exports = {
  fetch_notification_uuid_model,
  fetch_notification_id_model,
  delete_notification_model,
  FCM_update_public_model,
};
