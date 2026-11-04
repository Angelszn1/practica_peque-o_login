const express = require("express");
const bcrypt = require("bcryptjs");
const { users } = require("../../db");
const verifyToken = require("./verifytoken");

const router = express.Router();
router.use(verifyToken);
 
router.get("/", (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json({ id: user.id, nombre: user.nombre, pais: user.pais });
});
 
router.put("/", async (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
 
    const { nombre, pais, password } = req.body;
    
  if (nombre && nombre !== user.nombre) {
    if (users.find((u) => u.nombre === nombre)) {
      return res.status(409).json({ message: "El nombre ya está en uso" });
    }
    user.nombre = nombre;
  }
  if (pais) user.pais = pais;
  if (password) user.password = await bcrypt.hash(password, 10);
 
  res.json({ message: "Usuario actualizado", user: { id: user.id, nombre: user.nombre, pais: user.pais } });
});
 
router.delete("/", (req, res) => {
  const index = users.findIndex((u) => u.id === req.user.id);
  if (index === -1) return res.status(404).json({ message: "Usuario no encontrado" });
  users.splice(index, 1);
  res.json({ message: "Usuario eliminado" });
});
 
module.exports = router;