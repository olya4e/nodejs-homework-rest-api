const Contact = require("../../models/contacts");

const { createError } = require("../../helpers/createError");
async function getContactsById(req, res, next) {
  const { id } = req.params;
  const { _id } = req.user;

  const result = await Contact.find({ _id: id, owner: _id });
  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }
  res.json(result);
}

module.exports = getContactsById;
