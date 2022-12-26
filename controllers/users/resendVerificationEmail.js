const { createError } = require("../../helpers/createError");
const sendEmail = require("../../helpers/sendEmail");
const User = require("../../models/users");

const { BASE_URL } = process.env;

async function resendVerificationEmail(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError({ status: 404, message: "User not found" });
  }

  if (user.verify) {
    throw createError({ status: 400, message: "User is already vherified" });
  }

  const verificationTokenUrl = `${BASE_URL}/api/users/verify/${user.verificationToken}`;
  const message = {
    to: email,
    subject: "Email verification",
    html: `<a href="${verificationTokenUrl}">Click to verify your email</a>`,
  };

  await sendEmail(message);
  res.json({
    message: "Email was resend successfully",
  });
}
module.exports = resendVerificationEmail;
