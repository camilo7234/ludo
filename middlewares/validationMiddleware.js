const { validationResult } = require('express-validator');

const validateUserRegistration = (req, res, next) => {
    const errors = [];

    console.log('Datos recibidos:', req.body); // Depuración: Ver datos recibidos

    // Convertir rol_id a rol
    if (req.body.rol_id) {
        req.body.rol = req.body.rol_id === '1' ? 'Paciente' : 'Profesional';
    }

    // Validaciones comunes
    if (!req.body.email || !/\S+@\S+\.\S+/.test(req.body.email)) {
        errors.push({ msg: 'Correo electrónico inválido', param: 'email' });
    }
    if (!req.body.rol) {
        errors.push({ msg: 'El rol es obligatorio', param: 'rol' });
    }

    // Validaciones específicas para pacientes
    if (req.body.rol === 'Paciente') {
        console.log('Validando paciente'); // Depuración: Validando paciente
        if (!req.body.nombre) {
            errors.push({ msg: 'El nombre es obligatorio', param: 'nombre' });
        }
        if (!req.body.apellido) {
            errors.push({ msg: 'El apellido es obligatorio', param: 'apellido' });
        }
        if (!req.body.cedula) {
            errors.push({ msg: 'La cédula es obligatoria para pacientes', param: 'cedula' });
        }
        if (!req.body.direccion) {
            errors.push({ msg: 'La dirección es obligatoria para pacientes', param: 'direccion' });
        }
        if (!req.body.telefono) {
            errors.push({ msg: 'El teléfono es obligatorio para pacientes', param: 'telefono' });
        }
        if (!req.body.ciudad) {
            errors.push({ msg: 'La ciudad es obligatoria para pacientes', param: 'ciudad' });
        }
    }

    // Validaciones específicas para profesionales
    if (req.body.rol === 'Profesional') {
        console.log('Validando profesional'); // Depuración: Validando profesional
        if (!req.body.nombre_completo) {
            errors.push({ msg: 'El nombre completo es obligatorio para profesionales', param: 'nombre_completo' });
        }
        if (!req.body.numero_tarjeta_profesional) {
            errors.push({ msg: 'El número de tarjeta profesional es obligatorio para profesionales', param: 'numero_tarjeta_profesional' });
        }
        if (!req.body.especialidad) {
            errors.push({ msg: 'La especialidad es obligatoria para profesionales', param: 'especialidad' });
        }
    }

    if (errors.length > 0) {
        console.log('Errores de validación:', errors); // Depuración: Ver errores de validación
        return res.status(400).json({ errors });
    }

    next();
};

const { body } = require('express-validator');

const validateCita = [
    body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
    body('hora').notEmpty().withMessage('La hora es obligatoria'),
    body('profesionalId').notEmpty().withMessage('El ID del profesional es obligatorio'),
    (req, res, next) => {
        console.log(req.body); // Depuración: Ver datos recibidos
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Errores de validación:', errors.array()); // Depuración: Ver errores de validación
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUserRegistration, validateCita };
