const supabase = require("../../config/supaconfig_index");

function post_slider_model(payload) {
  return supabase
    .from("slider")
    .insert([
      {
        image: payload.image,
        webPage: payload.webPage,
      },
    ])
    .select();
}

function fetch_slider_model() {
  return supabase.from("slider").select("*");
}

function delete_slider_model(payload) {
  return supabase.from("slider").delete().eq("id", payload);
}

module.exports = { fetch_slider_model, post_slider_model, delete_slider_model };
