const express = require("express");
const cors = require("cors");

// const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
// app.use(express.json());

// const allowedOrigins = [
//   "http://localhost.com:3001",
//   "https://greenlucktips.com",
//   "https://192.168.1.122:3000",
// ];

// const corsOptions = { origin: "http://localhost.com:3001" };

//  {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg =
//         "The CORS policy for this site does not allow access from the specified Origin.";
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
// };
app.use(cors());

app.use("/api/v1", require("./routes/index"));
// app.get("/", (req, res) => {
//     res.send(req.body);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
