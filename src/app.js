const express = require("express");
const cors = require("cors");

// const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
app.use(express.json());

const allowedOrigins = ["https://localhost.com", "https://greenlucktips.com"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};
app.use(cors(corsOptions));

app.use("/api/v1", require("./routes/index"));
// app.get("/", (req, res) => {
//     res.send(req.body);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
