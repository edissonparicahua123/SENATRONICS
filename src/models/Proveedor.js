const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Proveedor = sequelize.define("Proveedor", {
    id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teléfono: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    dirección: {
        type: DataTypes.STRING
    }
}, {
    tableName: "proveedores",
    timestamps: false
});

module.exports = Proveedor;
