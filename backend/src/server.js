const express = require("express");
const cors = require("cors");
const database = require("../src/config/database");
const nodemailer = require('nodemailer');


const UserRouter = require("../src/routes/user");
const UserApi = require("../src/api/user"); 
const authMiddleware = require("../src/middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/login", UserApi.login);
app.post("/api/user", UserApi.createUserViewer); 
app.post('/api/verify-access-code', UserApi.verifyAccessCode);
app.get('/:id', UserApi.findUser);

app.use("/api/user", authMiddleware(), UserRouter);

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000")
        });
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e)
    })
module.exports = app;