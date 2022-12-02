const Contact = require("../../models");

const { createError } = require("../../helpers/createError");

async function updateFavorite(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    throw createError({ status: 400, message: "missing field favorite" });
  }
  const { id } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }
  res.status(200).json(result);
}

module.exports = updateFavorite;
