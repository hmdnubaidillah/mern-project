import User from "../models/User.js";
import { connectToDb } from "../utils/db.js";

export async function getUsers(req, res) {
  try {
    await connectToDb();
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log("Failed to fetch users, error : ", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function getUser(req, res) {
  const { username } = req.params;

  try {
    await connectToDb();
    const user = await User.findOne({ username });

    res.status(200).json(user);
  } catch (error) {
    console.log("Failed to fetch users, error : ", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
