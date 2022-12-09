const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const middlewares = require("../../middlewares");
const schema = require("../../schemas/contacts");
const controllerWrapper = require("../../helpers/controllerWrapper");

router.get(
  "/",
  middlewares.authenticate,
  controllerWrapper(controllers.getContacts)
);

router.get(
  "/:id",
  middlewares.authenticate,
  controllerWrapper(controllers.getContactById)
);

router.post(
  "/",
  middlewares.authenticate,
  middlewares.validateBody(schema.addContactSchema),
  controllerWrapper(controllers.addContact)
);

router.delete(
  "/:id",
  middlewares.authenticate,
  controllerWrapper(controllers.removeContact)
);

router.put(
  "/:id",
  middlewares.authenticate,
  middlewares.validateBody(schema.updateContactSchema),
  controllerWrapper(controllers.updateContactById)
);

router.patch(
  "/:id/favorite",
  middlewares.authenticate,
  middlewares.validateBody(schema.updateFavoriteSchema),
  controllerWrapper(controllers.updateFavorite)
);

module.exports = router;
