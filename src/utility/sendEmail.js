const nodemailer = require("nodemailer");
const fs = require("fs");
const { promisify } = require("util");
const { info } = require("console");
const { emailTemplate } = require("./emailTemplate");

const readFileAsync = promisify(fs.readFile);

async function sendEmail(to, subject, greeting, message, extra) {
  //   const imageAttachment = await readFileAsync("/logo.png");
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    // secure: false,
    // service: "gmail",
    // host: "www.privateemail.com",
    // host: "www.localhost.com",
    // port: 25,
    auth: {
      // user: "greenlucktips@gmail.com",
      user: "admin@greenlucktips.com",
      // pass: "jtta tlzy blji gguj",
      pass: "Wappy5!ng",
    },
  });

  // Send email
  const info = await transporter.sendMail({
    from: {
      name: "Green Luck",
      address: "admin@greenlucktips.com",
    },
    // from: "greenlucktips@gmail.com",
    to: to,
    subject: subject,
    html: emailTemplate(greeting, message, extra),

    // attachments: [
    //   {
    //     filename: "logo.png",
    //     content: imageAttachment,
    //     encoding: "base64",
    //     cid: "uniqueImageCID", // Referenced in the HTML template
    //   },
    // ],
  });

  console.log("Email sent:", info.messageId);
}

// sendEmail();

module.exports = { sendEmail, info };
