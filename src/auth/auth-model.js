const supabase = require("../../config/supaconfig_index");

function SignUp_public_model(payload) {
  return supabase
    .from("user_public")
    .insert([
      {
        userName: payload.userName,
        email: payload.newEmail,
        uuid: payload.uuid,
        password: payload.password,
        unit: 0,
        role: "free",
        phone: payload.phone,
        country: payload.country,
        countryFlag: payload.countryFlag,
      },
    ])
    .select();
}

function SignUp_private_model(payload) {
  return supabase.auth.signUp({
    email: payload.newEmail,
    password: payload.password,
    // options: { data: payload.data },
  });
}

function login_model(payload) {
  return supabase.auth.signInWithPassword({
    email: payload.newEmail,
    password: payload.password,
  });
}

function fetch_user_public_model(payload) {
  return supabase
    .from("user_public")
    .select("*")
    .or(`email.eq.${payload}`, `phone.eq.${payload}`);
}

function name_update_model(email, name) {
  return supabase
    .from("user_public")
    .update({ name: name })
    .eq("email", email)
    .select();
}

function uuid_update_public_model(email, uuid) {
  return supabase
    .from("user_public")
    .update({ uuid: uuid })
    .eq("email", email)
    .select();
}

function unit_update_public_model(email, unit) {
  return supabase
    .from("user_public")
    .update({ unit: unit })
    .eq("email", email)
    .select();
}

function password_update_public_model(payload) {
  return supabase
    .from("user_public")
    .update({ password: payload.newPassword })
    .eq("email", payload.newEmail)
    .select();
}

function profile_update_public_model(payload) {
  return supabase
    .from("user_public")
    .update({
      phone: payload.phone,
      country: payload.country,
      countryFlag: payload.countryFlag,
    })
    .eq("email", payload.email)
    .select();
}

//getting user by id from public table
function fetch_user_uuid_model(payload) {
  return supabase.from("user_public").select("*").eq("uuid", payload);
}

function fetch_user_email_model(payload) {
  return supabase.from("user_public").select("*").eq("email", payload);
}

function fetch_user_userName_model(payload) {
  return supabase.from("user_public").select("*").eq("userName", payload);
}

function getUserByIdPrivate(uuid) {
  return supabase.auth.admin.getUserById(uuid);
}

function fetch_user_phone_model(phone) {
  return supabase.from("user_public").select("*").eq("phone", phone);
}

function UpdataUserInfoModel({ uuid, data }) {
  return supabase.auth.admin.updateUserById(uuid, { user_metadata: data });
}

function ResetPasswordModel(payload) {
  return supabase.auth.resetPasswordForEmail(payload);
}

function UpdatePasswordModel(payload) {
  return supabase.auth.updateUser({
    email: payload.newEmail,
    password: payload.newPassword,
  });
}

function delete_public_user_model(payload) {
  return supabase.from("user_public").delete().eq("uuid", payload);
}

function delete_private_user_model(payload) {
  return supabase.auth.admin.deleteUser(payload);
}

module.exports = {
  SignUp_public_model,
  SignUp_private_model,

  login_model,
  fetch_user_public_model,
  fetch_user_uuid_model,
  getUserByIdPrivate,
  UpdataUserInfoModel,

  fetch_user_phone_model,
  delete_public_user_model,
  delete_private_user_model,
  uuid_update_public_model,
  fetch_user_email_model,
  fetch_user_userName_model,
  ResetPasswordModel,
  UpdatePasswordModel,
  unit_update_public_model,
  password_update_public_model,
  profile_update_public_model,
};
