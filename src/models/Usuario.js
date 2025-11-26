const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Usuario = sequelize.define("Usuario", {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "usuarios",
    timestamps: false
});

module.exports = Usuario;
