import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";

// Import routes and middleware
import contactRoutes from "./routes/contact.routes";
import authRoutes from "./routes/auth.routes";
import artistRoutes from "./routes/artist.routes";
import userRoutes from "./routes/user.routes";
import errorHandler from "./middleware/error.middleware";
import playlistRoutes from "./routes/playlist.routes";
import subscriptionRoutes from "./routes/subscription.routes";

// Load environment variables
dotenv.config();

// Express app
const app: Application = express();

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

// Initialize global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// MongoDB Connection and Server Initialization
const mongoUrl = process.env.MONG_URL as string;
const port: number = parseInt(process.env.PORT || "5000", 10);

mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Working and Running!!! Connected to DB & listening on port ${port}`
      );
    });
  })
  .catch((error: Error) => {
    console.error("Database connection error:", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});
export default app;
