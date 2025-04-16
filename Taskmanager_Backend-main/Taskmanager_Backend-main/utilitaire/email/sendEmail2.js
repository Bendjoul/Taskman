const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const mg = require("nodemailer-mailgun-transport");
const mj = require('nodemailer-mailjet-transport');
 

const transportOptions = () => {
  switch (process.env.MAIL_SERVER) {
    case 'mailjet': return mj({auth: { apiKey: process.env.MAILJET_APIKEY, apiSecret: process.env.MAILJET_SECRET_KEY }})
    case 'mailgun': return mg({auth:{api_key: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAINE}})
    default: return null;
  }
}

const sendEmail = async (email, subject, payload, template) => {

  try {
    const transporter = nodemailer.createTransport(transportOptions()) 

    // console.log("mailgun params: ", process.env.MAILGUN_API_KEY, '  ', process.env.MAILGUN_DOMAINE, 'email sender: ', process.env.EMAIL_SENDER)

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    // console.log('Template source: ', source)
    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log('email error ', error)
        return error;
      } else {
        console.log('successfully sent !!')
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    // return  error;
    console.log('send error: ', error)
  }
};


module.exports = sendEmail;
