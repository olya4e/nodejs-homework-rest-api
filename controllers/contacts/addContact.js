const Contact = require("../../models");

async function addcontact(req, res, next) {
  const { name, email, phone, favorite } = req.body;
  const result = await Contact.create({ name, email, phone, favorite });

  res.status(201).json(result);
}

module.exports = addcontact;
