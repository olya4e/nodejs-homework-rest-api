const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const { createError } = require("../../helpers/createError");

async function registerUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError({ status: 409, message: "Email in  use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, password: hashPassword });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
}

module.exports = registerUser;
