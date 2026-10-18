import express from "express";
import { connectDB } from "./db/connectDB.js";
const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
