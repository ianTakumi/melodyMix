import { Router, Request, Response } from "express";
const router = Router();
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller";

// Get all contacts
router.get("/", getAllContacts);

// Create a contact
router.post("/", createContact);

// Update a contact
router.put("/:contactId", updateContact);

// Delete a contact
router.delete("/delete/:contactId", deleteContact);

export default router;
