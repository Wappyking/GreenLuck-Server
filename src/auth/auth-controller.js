const { response } = require("express");
const { responseObject } = require("../utility");
const {
  emailValidation,
  fullNameValidation,
  passwordValidation,
  phoneValidation,
  phoneNumberValidation,
} = require("../utility/formValidation");
const {
  SignUp_public_model,
  SignUp_private_model,
  SignUp_private_model2,
  SignUp_public_model2,
  login_model,
  fetch_user_public_model,
  otp_model,
  verify_otp_model,
  name_update_model,
  personal_details_update_model,
  civil_service_details_update_model,
  getUserByIdPrivate,
  UpdataUserInfoModel,
  uuid_update_public_model,
  fetch_user_phone_model,
  fetch_user_email_model,
  otp_phone_model,
  fetch_user_userName_model,
  UpdatePassword,
  UpdatePasswordModel,
  ResetPasswordModel,
} = require("./auth-model");
const { use } = require("./auth-routes");
const { sendEmail } = require("../utility/sendEmail");

const RequestOtp = (req, res) => {
  let { email, userName } = req.body;

  let newEmail = email.toLowerCase();

  fetch_user_public_model(newEmail).then((fetchEmailResponse) => {
    if (fetchEmailResponse.error) {
      return res.send(
        responseObject(fetchEmailResponse.error.message, false, null)
      );
    }

    if (fetchEmailResponse.data.length > 0) {
      return res.send(
        responseObject(
          "Email Already Registered,   Please login instead",
          false,
          null
        )
      );
    }

    fetch_user_userName_model(userName).then((userNameResponse) => {
      if (userNameResponse.error) {
        return res.send(
          responseObject(userNameResponse.error.message, false, null)
        );
      }

      if (userNameResponse.data.length > 0) {
        return res.send("Username is not available", false, null);
      }

      function otp() {
        return Math.floor(100000 + Math.random() * 900000);
      }
      var otpNumber = otp();
      var otpExpiry = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      let OtpObj = { otpNumber, otpExpiry };

      let message = `<p style="color:black">Copy the One Time Password (OTP) below <br></p><h6 style="font-size:large; color:#016401;">${otpNumber}<h6/>`;

      sendEmail(
        newEmail,
        "One Time Password (OTP)",
        `Hello ${userName}`,
        message
      );

      return res.send(responseObject("Otp sent", true, OtpObj));
    });
  });
};

const LoginFunction = (req, res) => {
  let { email, password } = req.body;

  let newEmail = email.toLowerCase();

  //feltching

  fetch_user_public_model(newEmail)
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }
      if (response.data.length < 1) {
        return res.send(responseObject("User does not exist", false, null));
      }

      let userData = response.data[0];
      let actualEmail = userData.email;
    })
    .catch((error) => {
      return res.send(responseObject(error));
    });

  login_model({ newEmail, password })
    .then((response) => {
      if (response.error) {
        return res.send(responseObject(response.error.message, false, null));
      }

      let email = newEmail;
      let uuid = response.data.user.id;
      let access_token = response.data.session.access_token;
      let refresh_token = response.data.session.refresh_token;

      let token = { access_token, refresh_token };
      let userPublicData = { email, uuid };
      let userPrivateData = response.data.user;
      let data = { token, userPublicData, userPrivateData };
      res.send(responseObject("Login successful", true, data));
    })
    .catch((error) => {
      return res.send(responseObject());
    });
};

const SignupFunction = (req, res) => {
  let { userName, email, phone, password } = req.body;

  let newEmail = email.toLowerCase();

  fetch_user_public_model(newEmail).then((fetchEmailResponse) => {
    if (fetchEmailResponse.error) {
      return res.send(
        responseObject(fetchEmailResponse.error.message, false, null)
      );
    }

    if (fetchEmailResponse.data.length > 0) {
      return res.send(responseObject("User Already Registered", false, null));
    }
    let payload = { newEmail, password };

    SignUp_private_model(payload)
      .then((SignUpPrivateResponse) => {
        if (SignUpPrivateResponse.error) {
          return res.send(
            responseObject(SignUpPrivateResponse.error.message, false, null)
          );
        }
        let uuid = SignUpPrivateResponse.data.user.id;

        let payload = { userName, newEmail, phone, uuid };

        SignUp_public_model(payload)
          .then((SignUpPublicResponse) => {
            if (SignUpPublicResponse.error) {
              return res.send(
                responseObject(SignUpPublicResponse.error.message, false, null)
              );
            }

            let userPublicData = SignUpPublicResponse;
            let userPrivateData = SignUpPrivateResponse;
            let access_token = SignUpPrivateResponse.data.session.access_token;
            let refresh_token =
              SignUpPrivateResponse.data.session.refresh_token;

            let token = { access_token, refresh_token };

            let data = { userPublicData, userPrivateData, token };

            return res.send(responseObject("SignUp successfull", true, data));
          })
          .catch((error) => {
            return res.send(error);
          });
      })
      .catch((error) => {
        return res.send(error);
      });
  });
};

const ResetPasswordFunction = (req, res) => {
  let { email } = req.body;

  let newEmail = email.toLowerCase();

  ResetPasswordModel(newEmail).then((resetPasswordResponse) => {
    if (resetPasswordResponse.error) {
      return res.send(
        responseObject(resetPasswordResponse.error.message, false, null)
      );
    }

    return res.send(
      responseObject("password reset sent", true, resetPasswordResponse.data)
    );
  });
};

const UpdatePasswordFunction = (req, res) => {
  let { email, newPassword } = req.body;

  let newEmail = email.toLowerCase();

  UpdatePasswordModel({ newEmail, newPassword }).then(
    (UpdatePasswordResponse) => {
      if (UpdatePasswordResponse.error) {
        return res.send(
          responseObject(UpdatePasswordResponse.error.message, false, null)
        );
      }

      return res.send(
        responseObject("password Updated", true, UpdatePasswordResponse.data)
      );
    }
  );
};

module.exports = {
  RequestOtp,
  SignupFunction,
  LoginFunction,
  ResetPasswordFunction,
  UpdatePasswordFunction,
};
