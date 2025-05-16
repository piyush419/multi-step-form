import express from "express";
import cors from "cors";
import router from "./routes/userRoutes.js";
import dotenv from "dotenv";
import { connectDb } from "./db/db.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve()

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/user", router);
app.use(express.static(path.join(__dirname, "frontend","dist")))

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on port ${PORT}`);
});
