const ProfesionalModel = require('../models/profesionalModel');

class ProfesionalController {
    static async crear(req, res) {
        try {
            const profesional = await ProfesionalModel.crearProfesional(req.body);
            res.status(201).json(profesional);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obtener(req, res) {
        try {
            const profesional = await ProfesionalModel.obtenerProfesional(req.params.id);
            if (!profesional) return res.status(404).json({ message: "Profesional no encontrado" });
            res.json(profesional);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async actualizar(req, res) {
        try {
            const profesional = await ProfesionalModel.actualizarProfesional(req.params.id, req.body);
            if (!profesional) return res.status(404).json({ message: "Profesional no encontrado" });
            res.json(profesional);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async eliminar(req, res) {
        try {
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
            const profesional = await ProfesionalModel.obtenerProfesional(req.session.userId);
            if (!profesional) return res.status(404).json({ message: "Profesional no encontrado" });
            res.render('dashboardProfesional', { profesionalNombre: profesional.nombre_completo });
        } catch (error) {
            console.error("Error al cargar el dashboard del profesional:", error);
            res.status(500).json({ error: "Error al cargar el dashboard" });
        }
    }
}

module.exports = ProfesionalController;