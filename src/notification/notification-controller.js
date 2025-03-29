const { response } = require("express");

const { responseObject } = require("../utility");
const { fetch_user_uuid_model } = require("../auth/auth-model");
const {
  fetch_notification_uuid_model,
  FCM_update_public_model,
} = require("./notification-model");

const AllNotificationsFunction = (req, res) => {
  let { user } = req.body;

  fetch_notification_uuid_model(user)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }
      if (response.data.length < 1) {
        return res.send("invalid phone");
      }

      let notifications = response.data;
      return res.send(responseObject("all notifications", true, notifications));
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });
};

const UpdateFCM = (req, res) => {
  let { email, token } = req.body;

  FCM_update_public_model(email, token).then((FCMresponse) => {
    if (FCMresponse.error) {
      return res.send(responseObject(FCMresponse.error.message, false, null));
    }

    return res.send(responseObject("FCM updated", true, FCMresponse.data));
  });
};

async function PushNotificationAllUsers(req, res) {
  let {} = req.body;

  let response = await admin.messaging().sendMulticast({
    tokens: [
      /* ... */
    ], // ['token_1', 'token_2', ...]
    notification: {
      title: "Basic Notification",
      body: "This is a basic notification sent from the server!",
      imageUrl: "https://my-cdn.com/app-logo.png",
    },
  });
}

module.exports = { AllNotificationsFunction, UpdateFCM };
