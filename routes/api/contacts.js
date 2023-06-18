const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.get("/", ctrl.getAll);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id", ctrl.deleteById);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateById);

module.exports = router;

// router.get("/", async (req, res, next) => {
//   const result = await contacts.listContacts();
//   res.json(result);
// });

// router.get("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });
