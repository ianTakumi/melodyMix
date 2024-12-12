import Contact from "../models/contact.model";

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getSingleContact = async (contactId: string) => {
  return await Contact.findById(contactId);
};
