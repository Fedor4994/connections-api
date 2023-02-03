const { Contact } = require("../db/contactModel");

const listContacts = async (userId) => {
  const contacts = await Contact.find({ userId });
  return contacts;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

const removeContact = async (contactId, userId) => {
  const deletedContact = await Contact.findOneAndRemove({
    _id: contactId,
    userId,
  });
  return deletedContact;
};

const addContact = async (body, userId) => {
  const { name, email = "", phone = "", favorite = false } = body;
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
    userId,
  });

  const result = contact.save();
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const { name, email, phone } = body;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    {
      name,
      email,
      phone,
    }
  );
  return updatedContact;
};

const updateStatusContact = async (contactId, body, userId) => {
  const { favorite } = body;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    {
      favorite,
    }
  );
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
