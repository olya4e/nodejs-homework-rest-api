const Contact = require("../../models/contacts");

const { createError } = require("../../helpers/createError");

async function removeContact(req, res, next) {
  const { id } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id, owner: _id });
  if (!result) {
    throw createError({ status: 404, message: "Not found" });
  }
  res.status(200).json({ message: "Contact deleted" });
}

module.exports = removeContact;
