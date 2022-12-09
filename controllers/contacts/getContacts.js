const Contact = require("../../models/contacts");

async function getContacts(req, res, next) {
  const { _id } = req.user;

  const { page = 1, limit = 10, favorite = true } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const result = await Contact.find(
    { owner: _id, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");
  res.json(result);
}

module.exports = getContacts;
