const express = require("express");
const cors = require("cors");
// const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
// app.use(express.json());
// app.options("*", cors());
// app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1", cors(), require("./routes/index"));
// app.get("/", (req, res) => {
//     res.send(req.body);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
