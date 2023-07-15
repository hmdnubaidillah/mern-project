import { connectToDb } from "../utils/db.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

// read post
export async function getPosts(req, res) {
  try {
    await connectToDb();
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

export async function getUserPost(req, res) {
  const { postId } = req.params;

  try {
    await connectToDb();
    const userPost = await Post.findById(postId);

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

    const newPost = new Post({
      userId,
      creator: user.username,
      caption,
      picturePath,
      comments: [],
    });

    await newPost.save();
    return res.status(200).json({ message: "Successfully created post" });
  } catch (error) {
    console.log("Failed to create post, error : ", error);
    return res.status(500).json({ message: "Failed to create post" });
  }
}

// delete post
export async function deletePost(req, res) {
  const { postId } = req.params;

  try {
    await connectToDb();
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Successfully deleted the post" });
  } catch (error) {
    console.log("Failed to delete the post, error : ", error);
    return res.status(500).json({ message: "Failed to delete the post" });
  }
}

// edit post
export async function editPost(req, res) {
  const { postId } = req.params;
  const { caption } = req.body;

  try {
    await connectToDb();

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      { caption },
      { new: true, upsert: true }
    );

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log("Cant update post, ", error);
    res.status(500).json({ message: "Cant update post" });
  }
}
