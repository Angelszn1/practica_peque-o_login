if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET no configurado en producción");
}

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "cambia_este_secreto",
  JWT_EXPIRES_IN: "1h",
};