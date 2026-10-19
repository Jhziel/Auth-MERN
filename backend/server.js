import express from "express";
import { connectDB } from "./db/connectDB.js";
const PORT = process.env.PORT;
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/users", authRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running on ${PORT}`);
});
