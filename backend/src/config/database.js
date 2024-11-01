const { Sequelize } = require("sequelize");

class Database {

    constructor() {
        this.init();
    }
    
    init(){
        this.db = new Sequelize({
            database:"DoisFatores",
            host:"localhost",
            password:"",
            username:"root",
            dialect:"mysql"
        })
    }
}

module.exports = new Database();