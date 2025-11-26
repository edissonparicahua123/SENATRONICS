const app = require("./src/app");
const sequelize = require("./src/settings/db");

const PORT = 3000;

async function start() {
    try {
        // Modo normal: no elimina datos en cada reinicio
        // Si necesitas recrear la tabla, usa: sync({ force: true })
        await sequelize.sync();
        console.log("Base de datos sincronizada correctamente");
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    } catch (err) {
        console.log("Error", err);
    }
}

start();
