const express = require("express");

const controllers = require("../../controllers/users");
const controllerWrapper = require("../../helpers/controllerWrapper");
const middlewares = require("../../middlewares");
const schema = require("../../schemas/users");

const router = express.Router();

router.post(
  "/register",
  middlewares.validateBody(schema.registerUserSchema),
  controllerWrapper(controllers.registerUser)
);

router.post(
  "/login",
  middlewares.validateBody(schema.loginUserSchema),
  controllerWrapper(controllers.loginUser)
);

router.get(
  "/current",
  middlewares.authenticate,
  controllerWrapper(controllers.getCurrentUser)
);

router.get(
  "/logout",
  middlewares.authenticate,
  controllerWrapper(controllers.logoutUser)
);

router.patch(
  "/",
  middlewares.authenticate,
  middlewares.validateBody(schema.updateSubcriptionSchema),
  controllerWrapper(controllers.updateSubcription)
);

module.exports = router;
