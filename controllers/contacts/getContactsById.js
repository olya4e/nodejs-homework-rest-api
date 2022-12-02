const Contact = require("../../models");

const { createError } = require("../../helpers/createError");
async function getContactsById(req, res, next) {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }
  res.json(result);
}

module.exports = getContactsById;
