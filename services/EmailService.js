const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
require("dotenv").config();

//Can be used in any custom email function we want to send different types of email
const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_KEY,
  })
);

//Here we create a function that uses our transport variable to send a certain type of email
const postAddedEmail = (post) => {
  transport
    .sendMail({
      from: "<otaku.jensen.sendgrid@hotmail.com>",
      to: `${post.username} <${post.email}>`,
      subject: "Message receieved",
      text: `Hi ${post.f}, your message (${post.title}) has been receieved`,
      html: `<h1 style="color: red;">Your message has been received</h1>
                <p>Hi ${post.username}, your message (${post.title}) has been receieved</p>
                <p>We will get back to you soon!</p>
                <p>Have a great day!</p>`,
    })
    .then(() => console.log("Email sent"))
    .catch((err) => console.log(err));
};

//from property alternatives
/*
from: {
          email: "christianjohannesson@live.se",
          name: "Christian"
      },
fromName: "Christian",
*/

//syntax used to be able to export multiple functions from the same module
exports.postAddedEmail = postAddedEmail;