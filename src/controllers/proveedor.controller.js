const Proveedor = require("../models/Proveedor");

exports.create = async (req, res) => {
    try {
        const proveedor = await Proveedor.create(req.body);
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByPk(req.params.id);
        if (proveedor) {
            res.json(proveedor);
        } else {
            res.status(404).json({ error: "Proveedor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Proveedor.update(req.body, {
            where: { id_proveedor: req.params.id }
        });
        if (updated) {
            const updatedProveedor = await Proveedor.findByPk(req.params.id);
            res.json(updatedProveedor);
        } else {
            res.status(404).json({ error: "Proveedor no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Proveedor.destroy({
            where: { id_proveedor: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Proveedor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
