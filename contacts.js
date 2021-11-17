const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(user => String(user.id) === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter(user => String(user.id) !== contactId);
  return newContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    name: name,
    email: email,
    phone: phone,
    id: v4(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
