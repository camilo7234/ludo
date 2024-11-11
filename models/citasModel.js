// models/CitasModel.js
const pool = require('./db_connection');

class CitasModel {
    static async crearCita({ paciente_id, profesional_id, fecha, hora, motivo }) {
        const query = `
            INSERT INTO citas (paciente_id, profesional_id, fecha, hora, motivo)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [paciente_id, profesional_id, fecha, hora, motivo];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async obtenerCita(id) {
        const query = `SELECT * FROM citas WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    static async actualizarCita(id, data) {
        const { fecha, hora, motivo } = data;
        const query = `
            UPDATE citas SET fecha = $1, hora = $2, motivo = $3 WHERE id = $4 RETURNING *`;
        const values = [fecha, hora, motivo, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async eliminarCita(id) {
        const query = `DELETE FROM citas WHERE id = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = CitasModel;
