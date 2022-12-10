const User = require("../../models/users");

const { createError } = require("../../helpers/createError");

async function updateSubcription(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    throw createError({ status: 400, message: "missing field favorite" });
  }

  const { subscription } = req.body;
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }
  res.status(200).json(result);
}

module.exports = updateSubcription;
