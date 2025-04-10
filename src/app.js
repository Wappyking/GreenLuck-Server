const express = require("express");
const cors = require("cors");
// const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));

var whitelist = [
  "http://greenlucktips.com",
  "https://greenlucktips.com",
  "http://localhost:3000",
  "http://localhost.com:3000",
  "http://192.168.1.122:3000",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;

  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

app.use("/api/v1", require("./routes/index"));
// app.get("/", (req, res) => {
//     res.send(req.body);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
