const pool = require('./db_connection');

class ProfesionalModel {
    static async crearProfesional({ nombre_completo, numero_tarjeta_profesional, especialidad }) {
        const query = `
            INSERT INTO profesional (nombre_completo, numero_tarjeta_profesional, especialidad) 
            VALUES ($1, $2, $3) RETURNING *`;
        const values = [nombre_completo, numero_tarjeta_profesional, especialidad];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async obtenerProfesional(id) {
        const query = `SELECT * FROM profesional WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    static async actualizarProfesional(id, data) {
        const { nombre_completo, numero_tarjeta_profesional, especialidad } = data;
        const query = `
            UPDATE profesional SET nombre_completo = $1, numero_tarjeta_profesional = $2, especialidad = $3 
            WHERE id = $4 RETURNING *`;
        const values = [nombre_completo, numero_tarjeta_profesional, especialidad, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async eliminarProfesional(id) {
        const query = `DELETE FROM profesional WHERE id = $1 RETURNING *`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
}

module.exports = ProfesionalModel;