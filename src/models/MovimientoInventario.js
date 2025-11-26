const { DataTypes } = require("sequelize");
const sequelize = require("../settings/db");

const MovimientoInventario = sequelize.define("MovimientoInventario", {
    id_movimiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_movimiento: {
        type: DataTypes.ENUM('entrada', 'salida', 'ajuste'),
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    usuario_responsable: {
        type: DataTypes.STRING
    },
    motivo: {
        type: DataTypes.STRING
    }
}, {
    tableName: "movimientos_inventario",
    timestamps: false
});

module.exports = MovimientoInventario;
