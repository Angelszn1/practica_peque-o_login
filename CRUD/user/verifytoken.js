const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.startsWith("Bearer ") ? header.split(" ")[1] : null;
 
  if (!token) return res.status(401).json({ message: "Token requerido" });
 
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};