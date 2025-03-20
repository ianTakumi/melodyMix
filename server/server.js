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
import ProductRoutes from "./routes/product.routes.js";
import AlbumRoutes from "./routes/Album.routes.js";
import SongRoutes from "./routes/song.routes.js";

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
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/albums", AlbumRoutes);
app.use("/api/v1/songs", SongRoutes);

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

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
