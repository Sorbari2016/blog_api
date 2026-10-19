import jwt from "jsonwebtoken";

// Create authentication middldeware
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Splits "Bearer <token>" into just the "<token>"
  const token = authHeader && authHeader.split(" ")[1];

  // check if token is available
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
}

export default authenticate;
