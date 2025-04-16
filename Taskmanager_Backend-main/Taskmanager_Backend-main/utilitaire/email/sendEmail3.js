const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
// const nodemailMailgun = require("nodemailer-mailgun-transport");
// const mailjetTransport = require('nodemailer-mailjet-transport');
// const apikey = process.env.MAILGUN_API_KEY;
// const domain = process.env.MAILGUN_DOMAINE

// const mailgunAuth = {
//     auth: {apikey, domain }
// }

// const mailjetAuth = {
//     apiKey: '7766ef2151ec2b223f2475976d4426f1',
//     apiSecret: '716ac7c0577c9796f2728e33918a00f1'
// }

const sendEmail = async (email, subject, payload, template) => {

  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      port: 1025,
      auth: {
        user: 'user',
        pass: 'password', // naturally, replace both with your real credentials or an application-specific password
      },
    });

    // const transporter = nodemailer.createTransport(nodemailMailgun(mailgunAuth));
    // const transporter = nodemailer.createTransport(mailjetTransport({auth: mailjetAuth}));

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: 'amanipascal65@gmail.com',
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};


module.exports = sendEmail;
