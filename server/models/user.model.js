const {Sequelize, DataTypes, where} = require("sequelize")
const {sequelize} = require("../config/db")

const User = sequelize.define("users",{
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_name: DataTypes.STRING,
      user_email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      user_password: DataTypes.STRING,
      user_image: DataTypes.STRING,
      total_orders: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      last_logged_in: DataTypes.DATE,
})

module.exports = {User}