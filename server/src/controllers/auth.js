import { connectToDb } from "../utils/db.js";
import User from "../models/User.js";

// register user
export async function register(req, res) {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    await connectToDb();

    // check if username/email already exist
    const existingUser = await User.findOne({ email });

    // if (existingUser.username === username) {
    //   console.log("Username already exist");
    // return res.json({ message: "Username already exist" });
    // }
    // if (existingUser.email === email) {
    //   console.log("Email already exist");
    // return res.json({ message: "Email already exist" });
    // }

    // make new user
    const newUser = new User({
      username,
      email,
      password,
    });
    const savedUser = await newUser.save();

    console.log("Successfully created user");

    return res.status(201).json({ message: "Successfully created user", savedUser });
  } catch (error) {
    console.error("Failed to create user, error : ", error);
    return res.status(500).json({ message: error });
  }
}

// login user
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    await connectToDb();

    const existingUser = await User.findOne({ email });

    // check if user does not exist
    if (!existingUser) return res.json({ message: "User doesnt exist" });

    // login user
    if (existingUser.password !== password) {
      return res.json({ message: "Invalid credentials" });
    } else {
      return res.json({ message: "Login success!!!", existingUser });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
