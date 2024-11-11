//pacienteController.js
const PacienteModel = require('../models/pacienteModel');

class PacienteController {
    static async crear(req, res) {
        try {
            const paciente = await PacienteModel.crearPaciente(req.body);
            res.status(201).json(paciente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obtener(req, res) {
        try {
            const paciente = await PacienteModel.obtenerPaciente(req.params.id);
            if (!paciente) return res.status(404).json({ message: "Paciente no encontrado" });
            res.json(paciente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async actualizar(req, res) {
        try {
            const paciente = await PacienteModel.actualizarPaciente(req.params.id, req.body);
            if (!paciente) return res.status(404).json({ message: "Paciente no encontrado" });
            res.json(paciente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async eliminar(req, res) {
        try {
            const paciente = await PacienteModel.eliminarPaciente(req.params.id);
            if (!paciente) return res.status(404).json({ message: "Paciente no encontrado" });
            res.json(paciente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PacienteController;
