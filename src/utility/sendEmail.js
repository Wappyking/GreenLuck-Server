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
    service: "gmail",
    auth: {
      user: "greenlucktips@gmail.com",
      pass: "jtta tlzy blji gguj",
    },
  });

  // Send email
  const info = await transporter.sendMail({
    from: "greenlucktips@gmail.com",
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
