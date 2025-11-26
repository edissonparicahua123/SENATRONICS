const Almacen = require("../models/Almacen");

exports.create = async (req, res) => {
    try {
        const almacen = await Almacen.create(req.body);
        res.status(201).json(almacen);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const almacenes = await Almacen.findAll();
        res.json(almacenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const almacen = await Almacen.findByPk(req.params.id);
        if (almacen) {
            res.json(almacen);
        } else {
            res.status(404).json({ error: "Almacén no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Almacen.update(req.body, {
            where: { id_almacen: req.params.id }
        });
        if (updated) {
            const updatedAlmacen = await Almacen.findByPk(req.params.id);
            res.json(updatedAlmacen);
        } else {
            res.status(404).json({ error: "Almacén no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Almacen.destroy({
            where: { id_almacen: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Almacén no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
