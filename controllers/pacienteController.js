const PacienteModel = require('../models/pacienteModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class PacienteController {
    static async crear(req, res) {
        try {
            // Validación de entrada
            const { nombre_completo, cedula, telefono, direccion, ciudad, email, password } = req.body;
            if (!nombre_completo || !cedula || !telefono || !direccion || !ciudad || !email || !password) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }

            // Verificar si el paciente ya existe
            const pacienteExistente = await PacienteModel.obtenerPacientePorEmail(email);
            if (pacienteExistente) {
                return res.status(400).json({ message: "El paciente ya está registrado" });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el paciente
            const paciente = await PacienteModel.crearPaciente({
                ...req.body,
                password: hashedPassword
            });

            res.status(201).json(paciente);
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

            const paciente = await PacienteModel.obtenerPaciente(req.params.id);
            if (!paciente) return res.status(404).json({ message: "Paciente no encontrado" });
            res.json(paciente);
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

            const paciente = await PacienteModel.actualizarPaciente(req.params.id, req.body);
            if (!paciente) return res.status(404).json({ message: "Paciente no encontrado" });
            res.json(paciente);
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

            const paciente = await PacienteModel.eliminarPaciente(req.params.id);
            if (!paciente) return res.status(404).json({ message: "Paciente no encontrado" });
            res.json(paciente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PacienteController;
