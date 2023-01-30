const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContactsController = async (_, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
};

const deleteContactController = async (req, res) => {
  const isDeleted = await removeContact(req.params.contactId);
  isDeleted
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(400).json({ message: "Not found" });
};

const addContactController = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const updateContactController = async (req, res, next) => {
  const newContact = await updateContact(req.params.contactId, req.body);
  newContact
    ? res.status(200).json(newContact)
    : res.status(404).json({ message: "Not found" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  addContactController,
  updateContactController,
};
