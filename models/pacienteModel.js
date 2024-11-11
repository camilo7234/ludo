const pool = require('./db_connection');

class PacienteModel {
    static async crearPaciente({ nombre_completo, cedula, telefono, direccion, ciudad }) {
        const query = `
            INSERT INTO paciente (nombre_completo, cedula, telefono, direccion, ciudad) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [nombre_completo, cedula, telefono, direccion, ciudad];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async obtenerPaciente(id) {
        const query = `SELECT * FROM paciente WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    static async actualizarPaciente(id, data) {
        const { nombre_completo, cedula, telefono, direccion, ciudad } = data;
        const query = `
            UPDATE paciente SET nombre_completo = $1, cedula = $2, telefono = $3, direccion = $4, ciudad = $5 
            WHERE id = $6 RETURNING *`;
        const values = [nombre_completo, cedula, telefono, direccion, ciudad, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async eliminarPaciente(id) {
        const query = `DELETE FROM paciente WHERE id = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = PacienteModel;
