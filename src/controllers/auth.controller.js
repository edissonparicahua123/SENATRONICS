const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secreto_super_seguro"; // En producción usar variables de entorno

exports.register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const newUser = await Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            rol
        });

        // Generar token
        const token = jwt.sign(
            { id: newUser.id_usuario, rol: newUser.rol },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "Usuario registrado", token });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        // Generar token
        const token = jwt.sign(
            { id: user.id_usuario, rol: user.rol },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
};
