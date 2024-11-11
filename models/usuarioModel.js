const pool = require('./db_connection');

const getUsuarioByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM usuario WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al obtener usuario por email:', error);
        throw error;
    }
};

const addUsuario = async (nombre_completo, email, contraseña, rol_id, usuario_id = null) => {
    try {
        const query = `
            INSERT INTO usuario (nombre_completo, email, contraseña, rol_id, usuario_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `;
        const values = [
            nombre_completo,
            email,
            contraseña,
            rol_id,
            rol_id === '2' ? usuario_id : null
        ];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        throw error;
    }
};

module.exports = {
    getUsuarioByEmail,
    addUsuario
};
