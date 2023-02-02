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
  const { name, email = "", phone = "", favorite = false } = body;
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
  });

  const result = contact.save();
  return result;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, {
    name,
    email,
    phone,
  });
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, {
    favorite,
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
