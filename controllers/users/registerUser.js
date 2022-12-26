require("dotenv").config();
const User = require("../../models/users");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { createError } = require("../../helpers/createError");
const { BASE_URL } = process.env;
const sendEmail = require("../../helpers/sendEmail");

async function registerUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError({ status: 409, message: "Email in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { protocol: "https" });

  const verificationToken = uuidv4();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verificationTokenUrl = `${BASE_URL}/api/users/verify/${verificationToken}`;

  const message = {
    to: email,
    subject: "Email verification",
    html: `<a href="${verificationTokenUrl}">Click to verify your email</a>`,
  };

  await sendEmail(message);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
}

module.exports = registerUser;
