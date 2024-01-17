const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // console.log(req.body);
    const token = req.headers.authorization.split(" ")[1]; // Assuming token is sent as "Bearer [token]"
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace JWT_SECRET with your secret key
    req.user = { userId: decoded.userId }; // Adjust according to your token payload structure
    console.log("AUTH-YEYSYSYYYSYS");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;
