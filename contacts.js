const path = require('path');
const fs = require('fs/promises');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const updateContacts =  async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

async function listContacts() { 
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(contactId) { 
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id.toString() === contactId.toString())
    if (!contact) { 
        return null;
    }
    return contact;
}

async function removeContact(contactId) { 
    const contacts = await listContacts();
    const idx = contacts.findIndex(cont => cont.id.toString() === contactId.toString())
    if (idx === -1) { 
        return null;
    }
    const removeById = contacts.splice(idx, 1);
    await updateContacts(contacts);
    return removeById;
}

async function addContact(name, email, phone) { 
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: v4() };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

module.exports = { 
    listContacts,
    getContactById,
    removeContact,
    addContact
}