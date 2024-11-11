const ProfesionalModel = require('../models/profesionalModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class ProfesionalController {
    static async crear(req, res) {
        try {
            // Validación de entrada
            const { nombre_completo, numero_tarjeta_profesional, especialidad, email, password } = req.body;
            if (!nombre_completo || !numero_tarjeta_profesional || !especialidad || !email || !password) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }

            // Verificar si el profesional ya existe
            const profesionalExistente = await ProfesionalModel.obtenerProfesionalPorEmail(email);
            if (profesionalExistente) {
                return res.status(400).json({ message: "El profesional ya está registrado" });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el profesional
            const profesional = await ProfesionalModel.crearProfesional({
                ...req.body,
                password: hashedPassword
            });

            res.status(201).json(profesional);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obtener(req, res) {
        try {
            // Autenticación
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) return res.status(401).json({ message: "Token inválido" });

            const profesional = await ProfesionalModel.obtenerProfesional(req.params.id);
            if (!profesional) return res.status(404).json({ message: "Profesional no encontrado" });
            res.json(profesional);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async actualizar(req, res) {
        try {
            // Autenticación
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) return res.status(401).json({ message: "Token inválido" });

            const profesional = await ProfesionalModel.actualizarProfesional(req.params.id, req.body);
            if (!profesional) return res.status(404).json({ message: "Profesional no encontrado" });
            res.json(profesional);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async eliminar(req, res) {
        try {
            // Autenticación
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) return res.status(401).json({ message: "Token inválido" });

            const profesional = await ProfesionalModel.eliminarProfesional(req.params.id);
            if (!profesional) return res.status(404).json({ message: "Profesional no encontrado" });
            res.json(profesional);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Nuevo método para renderizar el dashboard del profesional
    static async dashboard(req, res) {
        try {
            // Autenticación
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) return res.status(401).json({ message: "Token inválido" });

            const profesional = await ProfesionalModel.obtenerProfesional(decoded.id);
            if (!profesional) return res.status(404).json({ message: "Profesional no encontrado" });
            res.render('dashboardProfesional', { profesionalNombre: profesional.nombre_completo });
        } catch (error) {
            console.error("Error al cargar el dashboard del profesional:", error);
            res.status(500).json({ error: "Error al cargar el dashboard" });
        }
    }
}

module.exports = ProfesionalController;
