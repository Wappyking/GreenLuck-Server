let express = require("express");
// require("dotenv").config();

// require rxpress path module
const path = require("path");
const http = require("http");
// importing body parser
const bodyParser = require("body-parser");

// const { initializeSocket, getIo } = require("./utilities/io");
// const { Port } = require("../config/supabase-auth");

// port
// let port = Port || 9090;
let port = 1111;

let app = express();

const server = http.createServer(app);

// Initialize Socket.IO
// initializeSocket(server);

// this package helps us recieve data from users in json format durring post method
// app.use(bodyParser.json({ limit: "10mb" })); //application json

// for post requests
app.use(express.json());

app.use("/assets/images", express.static(path.join(__dirname, "images")));

app.use(express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  // req.IO = getIo();
  res.setHeader("Access-Control-Allow-Origin", "*"); // this can be predictor.com
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
// app.use("/API/V1", require("./"))
// app.use("/APP", require("./APP/routes/index"))
app.use("/", (req, res) => {
  res.send("Welcome to pocket voucher server");
});

server.listen(process.env.PORT || 9090, () => {
  console.log("Server started on port " + 9090);
});
