const supabase = require("../../config/supaconfig_index");
const { decode } = require("base64-arraybuffer");

const GetUserByAccessToken = (token) => {
  return supabase.auth.getUser(token);
};

// model to insert image
function InsertImageModel(payload) {
  return supabase.storage
    .from("public_bucket")
    .upload(payload.fileName, decode(payload.base64), {
      contentType: "image/png",
    });
}

function GetImageUrlModel(payload) {
  return supabase.storage.from("public_bucket").getPublicUrl(payload, {
    download: true,
  });
}

module.exports = {
  GetUserByAccessToken,
  InsertImageModel,
  GetImageUrlModel,
};
