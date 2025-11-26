const MovimientoInventario = require("../models/MovimientoInventario");
const Producto = require("../models/Producto");

exports.create = async (req, res) => {
    try {
        const movimiento = await MovimientoInventario.create(req.body);

        // Update product stock based on movement type
        const producto = await Producto.findByPk(movimiento.id_producto);
        if (producto) {
            if (movimiento.tipo_movimiento === 'entrada') {
                producto.stock_actual += movimiento.cantidad;
            } else if (movimiento.tipo_movimiento === 'salida') {
                producto.stock_actual -= movimiento.cantidad;
            } else if (movimiento.tipo_movimiento === 'ajuste') {
                // For adjustment, we might need more logic or just assume it adds/subtracts. 
                // Usually adjustment sets the stock or adds/subtracts. 
                // Given the schema doesn't specify, I'll assume it's an additive adjustment (can be negative).
                // Or simply, let's assume 'ajuste' acts like a correction, but without knowing if it's absolute or relative, 
                // I'll treat it as relative for now to be safe, or maybe just log it.
                // Let's assume it updates the stock by the quantity (positive or negative).
                producto.stock_actual += movimiento.cantidad;
            }
            await producto.save();
        }

        res.status(201).json(movimiento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const movimientos = await MovimientoInventario.findAll({
            include: [Producto]
        });
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const movimiento = await MovimientoInventario.findByPk(req.params.id, {
            include: [Producto]
        });
        if (movimiento) {
            res.json(movimiento);
        } else {
            res.status(404).json({ error: "Movimiento no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Usually movements are not updated or deleted to maintain audit trail, but I'll implement them for completeness.
exports.update = async (req, res) => {
    try {
        const [updated] = await MovimientoInventario.update(req.body, {
            where: { id_movimiento: req.params.id }
        });
        if (updated) {
            const updatedMovimiento = await MovimientoInventario.findByPk(req.params.id);
            res.json(updatedMovimiento);
        } else {
            res.status(404).json({ error: "Movimiento no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await MovimientoInventario.destroy({
            where: { id_movimiento: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Movimiento no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
