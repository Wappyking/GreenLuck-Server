const express = require("express");
const cors = require("cors");
// const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
// app.use(express.json());

// Define allowed origins
// const allowedOrigins = [
//   "https://greenlucktips.com",
//   "https://www.greenlucktips.com",
//   "http://localhost:3000",
//   "http://192.168.1.122:3000",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.indexOf(origin) === -1) {
//       console.warn(`CORS: Blocked origin ${origin}`); // Log blocked origins
//       const msg =
//         "The CORS policy for this site does not allow access from the specified Origin.";
//       // return callback(new Error(msg), false);
//       return callback(null, true); // Allow the origin
//     }
//     return callback(null, true); // Allow the origin
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
//   allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization", // Allowed headers
//   credentials: true, // Allow cookies/auth headers
//   optionsSuccessStatus: 204, // Respond with 204 for preflight requests
//   maxAge: 86400, // Cache preflight for 1 day (in seconds)
// };

// Apply CORS middleware globally or to specific routes
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Optionally enable pre-flight across-the-board
// Useful if you have complex routing and want OPTIONS handled early
// app.options("*", cors(corsOptions));

app.use("/api/v1", require("./routes/index"));
// app.get("/", (req, res) => {
//     res.send(req.body);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
