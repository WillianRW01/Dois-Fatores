const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const SECRET_KEY = "exemplo";
const SALT_VALUE = 10;

class UserController {
    async createUser(nome, email, senha, permissao ) {
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
    
        return jwt.sign({ id: userValue.id, permissao: userValue.permissao }, SECRET_KEY, { expiresIn: 60 * 60 });
      }
}

module.exports = new UserController();