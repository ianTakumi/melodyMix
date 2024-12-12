import request from "supertest";
import app from "../server";
import mongoose, { ConnectOptions } from "mongoose";

// Assuming process.env.MONG_URL is correctly set up in .env
const MONGODB_URL = process.env.MONG_URL as string;
let contactId: string;

// Before all tests run, connect to MongoDB
beforeAll(async () => {
  await mongoose.connect(MONGODB_URL);
});

// After all tests finish, disconnect from MongoDB
afterAll(async () => {
  await mongoose.disconnect();
});

// Test the contact CRUD
describe("Contact Routes", () => {
  it("should retrieve all contacts", async () => {
    const response = await request(app).get("/api/v1/contacts");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should create a new contact with valid data", async () => {
    const newContact = {
      name: "Juan Luna",
      email: "juanLuna@gmail.com",
      phone: "09612132551",
      subject: "Need help",
      body: "I can't login",
    };

    const response = await request(app)
      .post("/api/v1/contacts")
      .send(newContact);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    expect(response.body.success).toBe(true);
    contactId = response.body.data._id;
  });

  it("should update status based on contact Id and status data", async () => {
    expect(contactId).toBeDefined();
    const data = {
      status: "resolved",
    };

    const response = await request(app)
      .put(`/api/v1/contacts/${contactId}`)
      .send(data);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should delete a contact with ID", async () => {
    expect(contactId).toBeDefined();

    const response = await request(app).delete(
      `/api/v1/contacts/delete/${contactId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
