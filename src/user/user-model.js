const supabase = require("../../config/supaconfig_index");
// const decode = require("base64-arraybuffer");

const GetUserByAccessToken = (token) => {
  return supabase.auth.getUser(token);
};

// model to insert image
function InsertImageModel(payload) {
  return supabase.storage
    .from("public_bucket")
    .upload(payload.fileName, payload.base64, {
      contentType: "image/png",
    });
}

module.exports = {
  GetUserByAccessToken,
  InsertImageModel,
  GetImageUrlModel,
};
