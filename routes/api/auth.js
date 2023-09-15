// ----------------- router auth/user-------------------------------
const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authorization, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// register
router.post("/signup", validateBody(schemas.registerSchema), ctrl.signup);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.verifySchema),
  ctrl.resendVerifyEmail
);
// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
// current
router.get("/current", authorization, ctrl.current);
// logout
router.post("/logout", authorization, ctrl.logout);
router.patch(
  "/",
  authorization,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateUser
);
router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
