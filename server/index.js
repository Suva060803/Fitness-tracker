import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config(); // ✅ Loads .env variables

console.log("Mongo URI:", process.env.MONGODB_URL); 
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", UserRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Root route
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});

// MongoDB connection
const connectDB = () => {
  const mongoURI = process.env.MONGODB_URL;

  if (!mongoURI) {
    console.error("MongoDB URI is undefined. Please check your .env file.");
    return;
  }

  mongoose.set("strictQuery", true);
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to Mongo DB")) // ✅ <--- This one
    .catch((err) => {
      console.error("Failed to connect with MongoDB");
      console.error(err);
    });
};

// Start the server
const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080")); // ✅ <--- And this one
  } catch (error) {
    console.log(error);
  }
};

startServer();
