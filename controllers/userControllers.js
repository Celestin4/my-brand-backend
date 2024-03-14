const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function registerUser(req, res) {
  try {
    const { fullName, email, password, role } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validateName(fullName)) {
      return res.status(400).json({ message: "Invalid name format" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one number and be 6-12 characters long with special characters",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || "Guest",
    });

    const additionalClaims = {
      iat: Math.floor(Date.now() / 1000),
      iss: "nteziryo.netlify.app",
    };

    const token = jwt.sign(
      { userId: user._id, email, role: user.role, ...additionalClaims },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name) {
  const nameRegex = /^[a-zA-Z ]+$/;
  return nameRegex.test(name);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,12}$/;
  return passwordRegex.test(password);
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      console.log("Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const additionalClaims = {
      iat: Math.floor(Date.now() / 1000),
      iss: "nteziryo.netlify.app",
    };

    const token = jwt.sign(
      {
        userId: user._id,
        email,
        fullName: user.fullName,
        role: user.role,
        ...additionalClaims,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token });
    console.log("Successfully signed in");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Server error");
    console.log(error);
    c;
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getSingleUser(req, res, next) {
  try {
    const userEmail = req.params.email;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const userId = req.params.userId;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  const { userId } = req.params;
  const { fullName, password, role, email } = req.body;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== existingUser.email) {
      return res.status(400).json({ message: "Cannot change email" });
    }

    if (fullName) {
      existingUser.fullName = fullName;
    }
    if (password) {
      existingUser.password = password;
    }
    if (role) {
      existingUser.role = role;
    }

    await existingUser.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getSingleUser,
  updateUser,
};
