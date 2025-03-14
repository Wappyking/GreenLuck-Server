const supabase = require("../../config/supaconfig_index");
import { decode } from "base64-arraybuffer";

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

function Get_Image_URL_Model(payload) {
  return supabase.storage.from("public-bucket").getPublicUrl(payload, {
    download: true,
  });
}

module.exports = {
  GetUserByAccessToken,
  InsertImageModel,
  Get_Image_URL_Model,
};
