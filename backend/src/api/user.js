const UserController = require('../controller/user');
const nodemailer = require('nodemailer');



class UserApi {
    async createUserViewer(req, res) {
        const { nome, email, senha } = req.body;
        console.log ("entrou aqui")

        try {
            const user = await UserController.createUser(nome, email, senha, "viewer");
            return res.status(201).send(user);
        } catch (e) {
            console.log(e)
            return res.status(400).send({ error: `Erro ao criar usuário: ${e.message}` });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;

        try {
            const token = await UserController.login(email, senha);
            return res.status(200).send({ token });
        } catch (e) {
            return res.status(400).send({ error: e.message });
        }
    }

    async findUser(req, res) {
        try {
            const users = await UserController.getAllUsers(); // Supondo que você tenha um método no controlador
            return res.status(200).send(users);
        } catch (e) {
            return res.status(400).send({ error: e.message });
        }
    }

    async verifyAccessCode(req, res) {
        const { email, codigo_acesso } = req.body;

        try {
            const token = await UserController.verifyAccessCode(email, codigo_acesso);
            return res.status(200).send({ token });
        } catch (e) {
            return res.status(400).send({ error: e.message });
        }
    }
}

module.exports = new UserApi();