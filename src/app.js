const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// port
let port = 3000;

// this package helps us recieve data from users in json format durring post method
app.use(bodyParser.json()); //application json

// for post requests
app.use(express.json());

app.use(cors());

// this middleware allows CORS (cross origin resource sharing)
// which means api can be shared between different servers running
// on different ports,
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // this can be predictor.com
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1", require("./routes/index"));
// app.get("/", (req, res) => {
//     res.send(req.body);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
