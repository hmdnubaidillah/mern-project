import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import multer from "multer";

// routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";

dotenv.config();
const app = express();
const port = 5000;
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/", postRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => console.log(`listening to port ${port}`));
