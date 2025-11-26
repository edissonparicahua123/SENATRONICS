const Categoria = require("../models/Categoria");

exports.create = async (req, res) => {
    try {
        const categoria = await Categoria.create(req.body);
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (categoria) {
            res.json(categoria);
        } else {
            res.status(404).json({ error: "Categoría no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Categoria.update(req.body, {
            where: { id_categoria: req.params.id }
        });
        if (updated) {
            const updatedCategoria = await Categoria.findByPk(req.params.id);
            res.json(updatedCategoria);
        } else {
            res.status(404).json({ error: "Categoría no encontrada" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Categoria.destroy({
            where: { id_categoria: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Categoría no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
