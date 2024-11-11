// controllers/historialClinicoController.js
const HistorialClinicoModel = require('../models/historialClinicoModel');

class HistorialClinicoController {
    static async agregar(req, res) {
        try {
            const registro = await HistorialClinicoModel.agregarRegistro(req.body);
            res.status(201).json(registro);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obtener(req, res) {
        try {
            const historial = await HistorialClinicoModel.obtenerHistorial(req.params.id);
            if (!historial.length) return res.status(404).json({ message: "Historial no encontrado" });
            res.json(historial);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async eliminar(req, res) {
        try {
            const registro = await HistorialClinicoModel.eliminarRegistro(req.params.id);
            if (!registro) return res.status(404).json({ message: "Registro no encontrado" });
            res.json(registro);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = HistorialClinicoController;
