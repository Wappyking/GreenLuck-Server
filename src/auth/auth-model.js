const supabase = require("../../config/supaconfig_index");

function SignUp_public_model(payload) {
  return supabase
    .from("user_public")
    .insert([
      {
        userName: payload.userName,
        email: payload.email,
        phone: payload.phone,
        uuid: payload.uuid,
      },
    ])
    .select();
}

function SignUp_private_model(payload) {
  return supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    // options: { data: payload.data },
  });
}

function login_model({ email, password }) {
  return supabase.auth.signInWithPassword({ email, password });
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

function ResetPasswordModel(email) {
  return supabase.auth.resetPasswordForEmail(email);
}

function UpdatePasswordModel({ email, newPassword }) {
  return supabase.auth.updateUser({
    email: email,
    password: newPassword,
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
};
