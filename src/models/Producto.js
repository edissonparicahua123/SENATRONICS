const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const Producto = sequelize.define("Producto", {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING
    },
    modelo: {
        type: DataTypes.STRING
    },
    categoría: { // Keeping the accent as per user request schema, but usually better to use english or no accents. Will map to 'categoría' column if needed, or just use field name.
        type: DataTypes.STRING
    },
    descripción: {
        type: DataTypes.STRING
    },
    precio_compra: {
        type: DataTypes.DECIMAL(10, 2)
    },
    precio_venta: {
        type: DataTypes.DECIMAL(10, 2)
    },
    stock_actual: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    stock_minimo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    // Foreign keys will be added via associations in index.js or here directly. 
    // Sequelize adds them automatically with associations, but explicit definition is also fine.
    // I will let associations handle the FK columns to ensure consistency.
}, {
    tableName: "productos",
    timestamps: false
});

module.exports = Producto;
