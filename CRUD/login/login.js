const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { users } = require("../../db");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");
 
const router = express.Router();
 
router.post("/", async (req, res) => {
  const { nombre, password } = req.body;
 
  if (!nombre || !password) {
    return res.status(400).json({ message: "nombre y password son obligatorios" });
  }
 
  const user = users.find((u) => u.nombre === nombre);
  if (!user) return res.status(401).json({ message: "Credenciales incorrectas" });
 
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Credenciales incorrectas" });
 
  const token = jwt.sign({ id: user.id, nombre: user.nombre }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
 
  res.json({ message: "Login exitoso", token });
});
 
module.exports = router;