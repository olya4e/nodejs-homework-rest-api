const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const middlewares = require("../../middlewares/validateBody");
const schema = require("../../schemas/contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.get("/", controllerWrapper(controllers.getContacts));

router.get("/:id", controllerWrapper(controllers.getContactById));

router.post(
  "/",
  middlewares.validateBody(schema.addContactSchema),
  controllerWrapper(controllers.addContact)
);

router.delete("/:id", controllerWrapper(controllers.removeContact));

router.put(
  "/:id",
  middlewares.validateBody(schema.updateContactSchema),
  controllerWrapper(controllers.updateContactById)
);

router.patch(
  "/:id/favorite",
  middlewares.validateBody(schema.updateFavoriteSchema),
  controllerWrapper(controllers.updateFavorite)
);

module.exports = router;
