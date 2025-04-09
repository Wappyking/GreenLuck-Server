const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(express.json());
app.use(cors());

app.use("/api/v1", require("./routes/index"));
// app.get("/", (req, res) => {
//     res.send(req.body);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
