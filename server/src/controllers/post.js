import { connectToDb } from "../utils/db.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

// read post
export async function getPosts(req, res) {
  try {
    await connectToDb();
    const posts = await User.find();

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

export async function getUserPost(req, res) {
  const { userId } = req.params;

  try {
    await connectToDb();
    const userPost = await User.findById(userId);

    res.status(200).json(userPost);
  } catch (error) {
    console.log("Failed to fetch user's post, error : ", error);
    res.status(500).json({ message: "Failed to fetch user's post" });
  }
}

// create post
export async function newPost(req, res) {
  const { userId, caption, picturePath } = req.body;

  try {
    await connectToDb();
    const user = await User.findById(userId);

    const newPost = new User({
      userId,
      creator: user.username,
      caption,
      picturePath,
      comments: [],
    });

    await newPost.save();
    return res.status(200).json({ message: "Successfully created a post" });
  } catch (error) {
    console.log("Failed to create a post, error : ", error);
    return res.status(500).json({ message: "Failed to create a post" });
  }
}

// delete post

export async function deletePost(req, res) {
  const { postId } = req.parmas;
}
