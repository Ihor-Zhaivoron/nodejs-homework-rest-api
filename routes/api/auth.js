// ----------------- router auth/user-------------------------------
const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authorization } = require("../../middlewares");
const { authSchema } = require("../../models/user");

const router = express.Router();

router.get("/signup", validateBody(authSchema), ctrl.signup);
router.post("/login", validateBody(authSchema), ctrl.console.login);
router.post("/loguot", authorization, ctrl.logout);
router.post("/current", authorization, ctrl.current);

module.exports = router;
