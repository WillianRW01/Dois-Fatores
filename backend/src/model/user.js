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