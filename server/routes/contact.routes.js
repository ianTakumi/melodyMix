import express from "express";
const router = express.Router();
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";

// Get all contacts
router.get("/", getAllContacts);

// Create a contact
router.post("/", createContact);

// Update a contact
router.put("/:contactId", updateContact);

// Delete a contact
router.delete("/delete/:contactId", deleteContact);

export default router;
