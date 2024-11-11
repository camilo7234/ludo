const pool = require('./db_connection'); // Ajusta la ruta según tu estructura

// Crear un nuevo familiar
const crearFamiliar = async ({ nombre_completo, paciente_id, relacion, telefono }) => {
    const result = await pool.query(
        'INSERT INTO familiar (nombre_completo, paciente_id, relacion, telefono) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre_completo, paciente_id, relacion, telefono]
    );
    return result.rows[0];
};

module.exports = { crearFamiliar };
