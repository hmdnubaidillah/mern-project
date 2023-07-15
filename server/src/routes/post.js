import express from "express";
import { getPosts, getUserPost, newPost, deletePost, editPost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:postId", getUserPost);

router.post("/new", newPost);

router.delete("/delete/:postId", deletePost);

router.patch("/edit/:postId", editPost);

export default router;
