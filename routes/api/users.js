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

router.patch(
  "/avatars",
  middlewares.authenticate,
  middlewares.upload.single("avatar"),
  controllerWrapper(controllers.updateAvatar)
);
router.get("/verify/:verificationToken", controllerWrapper(controllers.verify));

router.post(
  "/verify",
  middlewares.validateBody(schema.resendVerificationEmail),
  controllerWrapper(controllers.resendVerificationEmail)
);

module.exports = router;
