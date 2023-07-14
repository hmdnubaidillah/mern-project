import express from "express";
import { getUsers, getUser } from "../controllers/users.js";
import { register } from "../controllers/auth.js";

const router = express.Router();

router.get("/user", getUsers);
router.get("/:username", getUser);

router.post("/register", register);

export default router;
