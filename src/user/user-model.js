const supabase = require("../../config/supaconfig_index");

const GetUserByAccessToken = (token) => {
  return supabase.auth.getUser(token);
};

module.exports = {
  GetUserByAccessToken,
};
