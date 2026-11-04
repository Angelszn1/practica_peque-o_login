const express = require("express");
const registerRouter = require("./CRUD/register/register");
const loginRouter = require("./CRUD/login/login");
const userRouter = require("./CRUD/user/user");
 
const app = express();
app.use(express.json());
 
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));