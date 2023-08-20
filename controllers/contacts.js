const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json({
    code: 200,
    result: result,
  });
};
const getById = async (req, res) => {
  const { id } = req.params;
  // const contact = await Contact.findOne({_id: id});
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    code: 200,
    result: contact,
  });
};

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({ code: 201, result: contact });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const putContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!putContact) {
    throw HttpError(404, "Not Found");
  }
  res.json({ code: 200, result: putContact });
};

const updateFavoriteSchema = async (req, res) => {
  const { id } = req.params;
  const patchContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!patchContact) {
    throw HttpError(404, "Not Found");
  }
  res.json({ code: 200, result: patchContact });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const removeContact = await Contact.findByIdAndDelete(id);
  if (!removeContact) {
    throw HttpError(404, "Not Found");
  }
  res.json({ code: 200, message: "Delete success" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavoriteSchema:ctrlWrapper(updateFavoriteSchema),
  deleteById: ctrlWrapper(deleteById),
};
