const Contact = require("../../models");

async function getContacts(req, res, next) {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
}

module.exports = getContacts;
