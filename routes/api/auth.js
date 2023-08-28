// ----------------- router auth/user-------------------------------
const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { authSchema } = require("../../models/user");

const router = express.Router();

router.get("/signup", validateBody(authSchema), ctrl.signup);
router.post("/login", validateBody(authSchema), ctrl.console.login);
router.post("/loguot", authenticate, ctrl.logout);
router.post("/current", authenticate, ctrl.current);

module.exports = router;
