//usuarioController.js
const bcrypt = require('bcrypt');
const { getUsuarioByEmail, addUsuario } = require('../models/usuarioModel');
const { crearPaciente } = require('../models/pacienteModel');
const { crearProfesional } = require('../models/profesionalModel');
const { crearFamiliar } = require('../models/familiarModel');

// Iniciar sesión
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await getUsuarioByEmail(email);
        if (usuario && await bcrypt.compare(password, usuario.contraseña)) {
            switch (usuario.rol_id) {
                case 1:
                    res.render('dashboardPaciente', { pacienteNombre: usuario.nombre_completo });
                    break;
                case 2:
                    res.render('dashboardProfesional', { profesionalNombre: usuario.nombre_completo });
                    break;
                case 3:
                    res.redirect('/administrador');
                    break;
                default:
                    res.render('login', { error: 'Rol no reconocido' });
            }
        } else {
            res.render('login', { error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.render('login', { error: 'Error al iniciar sesión' });
    }
};

// Registrar usuario
const registerUsuario = async (req, res) => {
    const {
        nombre_completo, email, contraseña, rol_id, cedula, telefono,
        direccion, ciudad, nombre_familiar, relacion_familiar, telefono_familiar,
        numero_tarjeta_profesional, especialidad
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        let usuario_id = null;

        if (rol_id === '1') {  // Si es paciente
            // Creación de paciente y familiar, sin especialidad
            const paciente = await crearPaciente({ nombre_completo, cedula, telefono, direccion, ciudad });
            await crearFamiliar({ nombre_completo: nombre_familiar, paciente_id: paciente.id, relacion: relacion_familiar, telefono: telefono_familiar });
            usuario_id = paciente.id;
        } else if (rol_id === '2') {  // Si es profesional
            // Validar que se incluya `especialidad` y `numero_tarjeta_profesional`
            if (!especialidad || !numero_tarjeta_profesional) {
                return res.render('register', { error: 'Por favor complete los campos de especialidad y tarjeta profesional para el rol de Profesional.', success: null });
            }
            const profesional = await crearProfesional({ nombre_completo, numero_tarjeta_profesional, especialidad });
            usuario_id = profesional.id;
        } else {
            return res.render('register', { error: 'Rol no válido.', success: null });
        }

        // Registro en la tabla usuario, solo si el usuario_id es válido
        if (usuario_id || rol_id !== '2') {
            await addUsuario(nombre_completo, email, hashedPassword, rol_id, usuario_id);
            res.render('register', { success: 'Usuario registrado exitosamente', error: null });
        } else {
            res.render('register', { error: 'Error al registrar el usuario', success: null });
        }

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.render('register', { error: 'Error al registrar el usuario', success: null });
    }
};

module.exports = {
    loginUsuario,
    registerUsuario
};
