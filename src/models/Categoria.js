const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Categoria = sequelize.define("Categoria", {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripción: {
        type: DataTypes.STRING
    }
}, {
    tableName: "categorias",
    timestamps: false
});

module.exports = Categoria;
