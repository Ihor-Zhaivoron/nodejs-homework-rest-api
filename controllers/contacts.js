const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json({
    code: 200,
    result: result,
  });
};
const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    code: 200,
    result: contact,
  });
};

const add = async (req, res) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json({ code: 201, result: contact });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const putContact = await contacts.updateContact(id, req.body);
  if (!putContact) {
    throw HttpError(404, "Not Found");
  }
  res.json({ code: 200, result: putContact });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const removeContact = await contacts.removeContact(id);
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
  deleteById: ctrlWrapper(deleteById),
};
