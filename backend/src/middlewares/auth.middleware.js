const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // console.log(req.body);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;
