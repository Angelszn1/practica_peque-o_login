const express = require("express");
const bcrypt = require("bcryptjs");
const { users, getNextId } = require("../../db");
 
const router = express.Router();
 
router.post("/", async (req, res) => {
  const { nombre, password, pais } = req.body;
 
  if (!nombre || !password || !pais) {
    return res.status(400).json({ message: "nombre, password y pais son obligatorios" });
  }
  if (users.find((u) => u.nombre === nombre)) {
    return res.status(409).json({ message: "El usuario ya existe" });
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: getNextId(), nombre, password: hashedPassword, pais };
  users.push(user);
 
  res.status(201).json({ message: "Usuario registrado", user: { id: user.id, nombre, pais } });
});
 
module.exports = router;