import express from "express";
import { getPosts, getUserPost, newPost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:userId", getUserPost);

router.post("/new", newPost);

router.delete("/delete", () => {});

router.patch("/edit", () => {});

export default router;
