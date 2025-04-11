const express = require("express");
const cors = require("cors");
// const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
app.use(express.json());
// app.use(cors());

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://your-frontend-app.com",
    "http://localhost:3000",
    "http://192.168.1.122:3000",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Handle Preflight Request
  if (req.method === "OPTIONS") {
    // Preflight requests should not reach your route handlers
    return res.sendStatus(204); // Respond with 204 No Content
  }

  next();
});

app.use("/api/v1", require("./routes/index"));
// app.get("/", (req, res) => {
//     res.send(req.body);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
