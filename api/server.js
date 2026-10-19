// Build api server
import express from "express";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";
import cors from "cors";
import authRouter from "./routes/authRoute.js";

// Configure dotenv
dotenv.config();

// Create express app
const app = express();

// Setup mididlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRouter);

// Error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

// Store port value
const port = process.env.PORT;

// Run server
app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Api server is running on Port: ${port} `);
});
