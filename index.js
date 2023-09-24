import * as contactServise from "./contacts.js";
import { program } from "commander";

const invokeAction = async ({ action, id, name, email, phone }) => {
    try {
        switch (action) {
            case 'list':
                const contactList = await contactServise.listContacts();
                console.table(contactList);
                break;

            case 'get':
                const oneContact = await contactServise.getContactById(id);
                console.log(oneContact);
                break;

            case 'add':
                const newContact = await contactServise.addContact(name, email, phone);
                console.log(newContact)
                break;

            case 'remove':
                const deleteContact = await contactServise.removeContact(id);
                console.log(deleteContact);
                break;

            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
};
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();
const options = program.opts();
console.log(options);




invokeAction(options);