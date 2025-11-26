const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Almacen = sequelize.define("Almacen", {
    id_almacen: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicación: {
        type: DataTypes.STRING
    }
}, {
    tableName: "almacenes",
    timestamps: false
});

module.exports = Almacen;
