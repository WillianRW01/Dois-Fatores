const UserController = require('../controller/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');



class UserApi {
    async createUserViewer(req, res) {
        const { nome, email, senha } = req.body;
        console.log ("entrou aqui")

        try {
            const user = await UserController.createUser(nome, email, senha, "viewer");

            const token = jwt.sign(
                { id: user.id, permissao: user.permissao },
                process.env.SECRET_KEY || 'exemplo',
                { expiresIn: '1h' }
            );

            return res.status(201).send({ message: "Usuário criado com sucesso!", token });
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
        const {codigo_acesso } = req.body;

        try {
            const result = await UserController.verifyAccessCode(codigo_acesso);
            console.log (result);
            if (result.token) {
                return res.status(200).json({success: true, token: result.token });
            } else {
                return res.status(400).json({ error: 'Codigo de acesso invalido' });
            }
        } catch (e) {
            console.error(e);
            return res.status(400).json({ error: e.message });
        }
    }

    async batata(req, res) {
        return res.status(400).json({ mensagem: 'batata' });
            
    }
}

module.exports = new UserApi();