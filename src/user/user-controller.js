// const { accessToken } = require("../../config/supaconfig_index");
const { response } = require("express");
const {
  delete_public_user_model,
  delete_private_user_model,
  fetch_user_public_model,
  getUserByIdPrivate,
} = require("../auth/auth-model");
const {
  delete_notification_model,
} = require("../notification/notification-model");
const { responseObject, isTokenValid } = require("../utility");
const {
  GetUserByAccessToken,
  InsertImageModel,
  GetImageUrlModel,
} = require("./user-model");
const { update_plan_model } = require("../plan/plan-model");

const Get_logged_in_user_controller = (req, res) => {
  let token = req.headers;
  let authHeader = token["authorization"];

  if (!authHeader) {
    return res.send(responseObject("missing authorization", false, null));
  }

  let accessToken = authHeader.split(" ")[1];

  if (isTokenValid(accessToken) == false) {
    return res.send(responseObject("user session expired", false, null));
  }

  GetUserByAccessToken(accessToken)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }

      // let userData = { ...response.data.user.user_metadata };

      // return res.send(responseObject("success", true, userData));
      return res.send(response.data);
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });
};

const deleteUserFunction = (req, res) => {
  let { user } = req.body;

  delete_private_user_model(user)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }

      delete_public_user_model(user)
        .then((response) => {
          if (response.error) {
            return res.send(
              responseObject(response.error.message, false, null)
            );
          }

          return res.send(responseObject("User Deleted", true, null));
        })
        .catch((error) => {
          return res.send(responseObject(error));
        });
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });
};

const FetchUserFunction = (req, res) => {
  let { email } = req.body;

  let newEmail = email.toLowerCase();

  fetch_user_public_model(newEmail).then((userPublicResponse) => {
    if (userPublicResponse.error) {
      return res.send(
        responseObject(userPublicResponse.error.message, false, null)
      );
    }

    if (userPublicResponse.data.length < 1) {
      return res.send(responseObject("invalid user", false, null));
    }

    let userPublicData1 = userPublicResponse.data[0];

    let currentTime = new Date(Date.now());
    let expiryDate = new Date(userPublicData1.expiryDate);

    console.log(currentTime);

    if (currentTime > expiryDate) {
      let role = "free";
      let planName = "free";
      let expiryDate = null;

      let payload = { newEmail, expiryDate, planName, role };
      update_plan_model(payload).then((updatePlanResponse) => {
        if (updatePlanResponse.error) {
          return res.send(
            responseObject(updatePlanResponse.error.message, false, null)
          );
        }

        let userPublicData = updatePlanResponse.data[0];

        let uuid = userPublicData.uuid;
        console.log(uuid);

        getUserByIdPrivate(uuid).then((userPrivateResponse) => {
          if (userPrivateResponse.error) {
            return res.send(
              responseObject(
                userPrivateResponse.error.message,
                false,
                userPublicData
              )
            );
          }

          if (userPrivateResponse.data.length < 1) {
            return res.send(responseObject("invalid user", false, null));
          }

          let userPrivateData = userPrivateResponse.data.user;

          let data = { userPublicData, userPrivateData };
          return res.send(responseObject("userData fetched", true, data));
        });
      });
    } else {
      let userPublicData = userPublicData1;

      let uuid = userPublicData.uuid;
      console.log(uuid);

      getUserByIdPrivate(uuid).then((userPrivateResponse) => {
        if (userPrivateResponse.error) {
          return res.send(
            responseObject(
              userPrivateResponse.error.message,
              false,
              userPublicData
            )
          );
        }

        if (userPrivateResponse.data.length < 1) {
          return res.send(responseObject("invalid user", false, null));
        }

        let userPrivateData = userPrivateResponse.data.user;

        let data = { userPublicData, userPrivateData };
        return res.send(responseObject("userData fetched", true, data));
      });
    }
  });
};

const photoUploadFunction = (req, res) => {
  if (!req.file) {
    res.send(responseObject("no file upaloaded", false, null));
  }
  // extract buffer data
  let bufferData = req.file.buffer;

  // conert buffer data to a base 64 encoded string
  let base64Image = Buffer.from(bufferData).toString("base64");

  //extract mimetype of the uploaded file frome ther req object e.g mp4,png
  const fileType = req.file.mimetype;

  // determine the file name e.g image or video
  let fieldName = fileType.startsWith("image") ? "image" : "video";

  //extract file extention
  let fileExtention = fileType.split("/").pop();

  // giving file a unique name
  let fileName = `Wappy${Math.random()}.${fileExtention}`;

  //conerting from base64 to Blob
  function base64ToBlob(base64data, contentType = fileType) {
    const byteCharacters = atob(base64data);

    //create an array with same length as byte character converting each character to it's unicode code
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    //create array that can be used to construct a blob, 8-bit unsign integer
    let byteArray = new Uint8Array(byteNumbers);

    // create a new blob obsject from the byte array
    return new Blob([byteArray], { type: contentType });
  }

  const blob = base64ToBlob(base64Image);

  //create a form data object and append the blob to as a file to it
  let formData = new FormData();
  formData.append(fieldName, blob, fileName);

  //upload
  let payload = { fileName, formData };
  console.log(payload);

  InsertImageModel(payload)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }

      return res.send(responseObject("file uploaded", true, response.data));
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });

  console.log(formData);
};

module.exports = {
  Get_logged_in_user_controller,
  deleteUserFunction,
  photoUploadFunction,
  FetchUserFunction,
};
