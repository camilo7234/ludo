// controllers/citasController.js
const CitasModel = require('../models/CitasModel');

class CitasController {
    static async crear(req, res) {
        try {
            const cita = await CitasModel.crearCita(req.body);
            res.status(201).json(cita);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obtener(req, res) {
        try {
            const cita = await CitasModel.obtenerCita(req.params.id);
            if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
            res.json(cita);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async actualizar(req, res) {
        try {
            const cita = await CitasModel.actualizarCita(req.params.id, req.body);
            if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
            res.json(cita);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async eliminar(req, res) {
        try {
            const cita = await CitasModel.eliminarCita(req.params.id);
            if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
            res.json(cita);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CitasController;
