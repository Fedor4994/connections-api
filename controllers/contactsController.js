const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");

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
  await removeContact(req.params.contactId);
  res.status(200).json({ message: "contact deleted" });
};

const addContactController = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const updateContactController = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  await updateContact(req.params.contactId, req.body);
  res.status(200).json({ message: "contact updated" });
};

const updateStatusContactController = async (req, res, next) => {
  if (req.body.favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  await updateStatusContact(req.params.contactId, req.body);
  res.status(200).json({ message: "contact updated" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
