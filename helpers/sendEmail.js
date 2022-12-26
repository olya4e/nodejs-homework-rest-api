const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

async function sendEmail(data) {
  const message = {
    ...data,
    from: SENDGRID_SENDER_EMAIL,
  };
  await sgMail.send(message).then((response) => {
    console.log("Email sent");
  });
}
module.exports = sendEmail;
