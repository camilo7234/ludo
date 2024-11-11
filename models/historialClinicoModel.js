// models/HistorialClinicoModel.js
const pool = require('./db_connection');

class HistorialClinicoModel {
    static async agregarRegistro({ paciente_id, antecedentes, acompanante_nombre, acompanante_telefono }) {
        const query = `
            INSERT INTO historial_clinico (paciente_id, antecedentes, acompanante_nombre, acompanante_telefono)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [paciente_id, antecedentes, acompanante_nombre, acompanante_telefono];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async obtenerHistorial(id) {
        const query = `SELECT * FROM historial_clinico WHERE paciente_id = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows;
    }

    static async eliminarRegistro(id) {
        const query = `DELETE FROM historial_clinico WHERE id = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = HistorialClinicoModel;
