const {Sequelize} = require("sequelize")


const sequelize = new Sequelize("quadb", "root", "AltafSql688",{
    host:"localhost",
    dialect:"mysql"
})


module.exports = {sequelize}