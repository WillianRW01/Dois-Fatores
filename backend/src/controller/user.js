const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const SECRET_KEY = "exemplo";
const SALT_VALUE = 10;

class UserController {
    async createUser(nome, email, senha, permissao) {
        if (!nome || !email || !senha) {
            throw new Error("Nome, email e senha são obrigatórios.");
        }

        const cypherSenha = await bcrypt.hash(String(senha), SALT_VALUE);

        return user.create({
            nome,
            email,
            senha: cypherSenha,
            permissao,
        });
    }

    async login(email, senha) {
        if (!email || !senha) {
            throw new Error("Email e senha são obrigatórios.");
        }

        const userValue = await user.findOne({ where: { email } });
        if (!userValue) {
            throw new Error("Usuário e senha inválidos.");
        }

        const senhaValida = await bcrypt.compare(String(senha), userValue.senha);
        if (!senhaValida) {
            throw new Error("Usuário e senha inválidos.");
        }

   
        const codigoAcesso = Math.floor(100000 + Math.random() * 900000).toString();
        userValue.codigo_acesso = codigoAcesso;
        userValue.codigo_acesso_create_at = new Date();
        await userValue.save();

        await this.sendAccessCode(email, codigoAcesso);

        return { message: "Código de acesso enviado para o seu email." };
    }

    async sendAccessCode(email, codigoAcesso) {
      const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        secure: false, 
        auth: {
            user: 'c25858f0b40195',
            pass: 'e9c117e1bb1fa4' 
        }
    });

        const mailOptions = {
            from: 'wesley18alanarruda@gmail.com',
            to: email,
            subject: 'Seu código de acesso',
            text: `Seu código de acesso é: ${codigoAcesso}`
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log('Email enviado com sucesso!');
      } catch (error) {
          console.error('Erro ao enviar email:', error);
          throw new Error('Erro ao enviar email.');
      }
    }

    async verifyAccessCode(email, codigoAcesso) {
        const userValue = await user.findOne({ where: { email } });
        const now = new Date();

        if (userValue && userValue.codigo_acesso === codigoAcesso) {
            const expirationTime = new Date(userValue.codigo_acesso_create_at);
            expirationTime.setMinutes(expirationTime.getMinutes() + 5);

            if (now <= expirationTime) {
                return jwt.sign({ id: userValue.id, permissao: userValue.permissao }, SECRET_KEY, { expiresIn: 60 * 60 });
            } else {
                throw new Error("Código de acesso expirado.");
            }
        } else {
            throw new Error("Código de acesso inválido.");
        }
    }

    
}

module.exports = new UserController();
