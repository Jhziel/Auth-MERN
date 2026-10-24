import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
const PORT = process.env.PORT;
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", authRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running on ${PORT}`);
});
