import { Request, Response, NextFunction } from "express";
import Contact from "../models/contact.model";

// Get all contacts
export const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving contacts",
      error: (error as Error).message,
    });
  }
};

// Get single contact by ID
export const getSingleContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contactId } = req.params;

    if (!contactId) {
      return next({ statusCode: 400, message: "Contact ID is required" });
    }

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next({ statusCode: 404, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact retrieved successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    next({
      statusCode: 500,
      message: "An error occurred while retrieving the contact",
      error: (error as Error).message,
    });
  }
};

// Add a contact
export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, phone, subject, body } = req.body;

    if (!name || !email || !phone || !subject || !body) {
      return next({ statusCode: 400, message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, subject, body });
    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact sent successfully",
      data: savedContact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    next({
      statusCode: 500,
      message: "An error occurred while creating the contact",
      error: (error as Error).message,
    });
  }
};

// Update a contact
export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contactId } = req.params;
    const { status } = req.body;

    if (!status) {
      return next({ statusCode: 400, message: "Status is required" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { status },
      { new: true }
    );

    if (!updatedContact) {
      return next({ statusCode: 404, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    next({
      statusCode: 500,
      message: "An error occurred while updating the contact",
      error: (error as Error).message,
    });
  }
};

// Delete a contact
export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { contactId } = req.params;

    if (!contactId) {
      return next({ statusCode: 400, message: "Contact ID is required" });
    }

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return next({ statusCode: 404, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    next({
      statusCode: 500,
      message: "An error occurred while deleting the contact",
      error: (error as Error).message,
    });
  }
};

// Error Interface
interface CustomError {
  statusCode?: number;
  message: string;
  error?: string;
}
