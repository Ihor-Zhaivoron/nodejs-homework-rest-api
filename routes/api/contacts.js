const express = require("express");

const ctrl = require("../../controllers/contacts");

const {isValidId, validateBody,authorization} = require("../../middlewares");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get("/",authorization, ctrl.getAll);

router.get("/:id",authorization,isValidId, ctrl.getById);

router.post("/",authorization, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id",authorization,isValidId, ctrl.deleteById);

router.put("/:id",authorization, isValidId,validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/favorite",authorization, isValidId,validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
