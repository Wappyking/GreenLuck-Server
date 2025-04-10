const express = require("express");
const cors = require("cors");

// const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:3001",
  "https://greenlucktips.com",
  "https://192.168.1.122:3000",
];

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
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders:
    "Content-Type,Authorization,X-Requested-With,Accept,application/json",
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false, // Pass the OPTIONS request to the next handler (rarely needed)
  maxAge: 3600, // Cache preflight response for 1 hour
};

app.use("/api/v1", require("./routes/index"));
// app.get("/", (req, res) => {
//     res.send(req.body);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
