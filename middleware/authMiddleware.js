const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token" });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);

  if (req.user && req.user.role === "Admin") {
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
