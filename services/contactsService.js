const { Contact } = require("../db/contactModel");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  return deletedContact;
};

const addContact = async (body) => {
  const contact = new Contact({
    name: body.name,
    email: body.email,
    phone: body.phone,
  });

  const result = contact.save();
  return result;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, {
    name: body.name,
    email: body.email,
    phone: body.phone,
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
