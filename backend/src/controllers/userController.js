const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User already exists with this email.");
    }
    console.log("x");

    // Create a new user with hashed password
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const hashedPassword = req.body.password;

    const user = new User({
      email: req.body.email,
      passwordHash: req.body.password,
      name: req.body.name,
      folders: [],
    });
    console.log("y");
    console.log(user);

    // Save the user
    await user.save();
    console.log("z");

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    // Check if user exists and password is correct
    console.log(password, user.passwordHash);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      // Create JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
      console.log(token);
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
