// model/user.js
const database = require("../config/database");

class User {
    constructor() {
        this.model = database.db.define("users", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: database.db.Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            senha: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            codigo_acesso: {
                type: database.db.Sequelize.STRING,
                allowNull: true,
            },
            codigo_acesso_create_at: {
                type: database.db.Sequelize.DATE,
                allowNull: true,
            },
            permissao: {
                type: database.db.Sequelize.STRING,
                validate: {
                    isIn: [["admin", "viewer"]],
                },
                defaultValue: "viewer",
            },
            status: {
                type: database.db.Sequelize.ENUM("active", "blocked"),
                defaultValue: "active",
            },
        }, {
            timestamps: true,
        });
    }
}

module.exports = new User().model;
