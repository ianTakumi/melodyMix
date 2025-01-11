import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

// Import routes and middleware
import contactRoutes from "./routes/contact.routes.js";
import authRoutes from "./routes/auth.routes.js";
import artistRoutes from "./routes/artist.routes.js";
import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import playlistRoutes from "./routes/playlist.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import categoryRoutes from "./routes/category.routes.js";
// Load environment variables
dotenv.config();

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/artists", artistRoutes);
app.use("/api/v1/auths", authRoutes);
app.use("/api/v1/playlists", playlistRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/categories", categoryRoutes);

// Initialize global error handler
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

// MongoDB Connection and Server Initialization
const mongoUrl = process.env.MONG_URL;
const port = parseInt(process.env.PORT || "5000", 10);

mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Working and Running!!! Connected to DB & listening on port ${port}`
      );
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Server is running!");
});
export default app;
