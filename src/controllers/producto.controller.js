const Producto = require("../models/Producto");
const Categoria = require("../models/Categoria");
const Proveedor = require("../models/Proveedor");
const Almacen = require("../models/Almacen");

exports.create = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [Categoria, Proveedor, Almacen]
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id, {
            include: [Categoria, Proveedor, Almacen]
        });
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Producto.update(req.body, {
            where: { id_producto: req.params.id }
        });
        if (updated) {
            const updatedProducto = await Producto.findByPk(req.params.id);
            res.json(updatedProducto);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Producto.destroy({
            where: { id_producto: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
