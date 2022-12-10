const User = require("../../models/users");
async function loguotUser(req, res) {
  const { _id } = req.user;
  await User.updateOne({ _id }, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
}
module.exports = loguotUser;
