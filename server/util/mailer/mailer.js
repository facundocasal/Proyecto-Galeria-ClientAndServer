const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASS_MAILER,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("ready to send");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = transporter;
