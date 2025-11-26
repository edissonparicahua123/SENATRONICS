const express = require("express");
const sequelize = require("./settings/db");

// Importar modelos
const Categoria = require("./models/Categoria");
const Proveedor = require("./models/Proveedor");
const Almacen = require("./models/Almacen");
const Producto = require("./models/Producto");
const MovimientoInventario = require("./models/MovimientoInventario");
const Usuario = require("./models/Usuario");

// Definir relaciones
Producto.belongsTo(Categoria, { foreignKey: "id_categoria" });
Categoria.hasMany(Producto, { foreignKey: "id_categoria" });

Producto.belongsTo(Proveedor, { foreignKey: "id_proveedor" });
Proveedor.hasMany(Producto, { foreignKey: "id_proveedor" });

Producto.belongsTo(Almacen, { foreignKey: "id_almacen" });
Almacen.hasMany(Producto, { foreignKey: "id_almacen" });

MovimientoInventario.belongsTo(Producto, { foreignKey: "id_producto" });
Producto.hasMany(MovimientoInventario, { foreignKey: "id_producto" });

// Importar rutas
const productoRoutes = require("./routes/producto.routes");
const categoriaRoutes = require("./routes/categoria.routes");
const proveedorRoutes = require("./routes/proveedor.routes");
const almacenRoutes = require("./routes/almacen.routes");
const movimientoRoutes = require("./routes/movimiento.routes");
const usuarioRoutes = require("./routes/usuario.routes");

const app = express();

app.use(express.json());

app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/almacenes", almacenRoutes);
app.use("/api/movimientos", movimientoRoutes);
app.use("/api/usuarios", usuarioRoutes);

module.exports = app;