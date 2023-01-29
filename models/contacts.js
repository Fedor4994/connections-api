const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsArr = JSON.parse(data);
  const contact = contactsArr.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsArr = JSON.parse(data);
  const filtredContacts = contactsArr.filter(
    (contact) => contact.id !== contactId
  );

  if (filtredContacts.length === contactsArr.length) {
    return false;
  }

  await fs.writeFile(contactsPath, JSON.stringify(filtredContacts));
  return true;
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsArr = JSON.parse(data);
  const newContact = {
    id: new Date().getTime().toString(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactsArr = JSON.parse(data);
  const newContact = {
    id: contactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  let isApdated = false;

  contactsArr.forEach((contact) => {
    if (contact.id === contactId) {
      contact.name = newContact.name;
      contact.email = newContact.email;
      contact.phone = newContact.phone;
      isApdated = true;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));

  return isApdated ? newContact : false;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
