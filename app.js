const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Configuración de variables de entorno
dotenv.config();

// Importar middlewares
const { authenticateToken, authorizeRole } = require('./middlewares/authMiddleware');
const { validateUserRegistration, validateCita } = require('./middlewares/validationMiddleware');
const errorHandler = require('./middlewares/errorHandler');

// Importar controladores
const usuarioController = require('./controllers/usuarioController');
const pacienteController = require('./controllers/pacienteController');
const profesionalController = require('./controllers/profesionalController');
const citasController = require('./controllers/citasController');
const historialClinicoController = require('./controllers/historialClinicoController');
const autoevaluacionController = require('./controllers/autoevaluacionController');

// Configuración de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas de Usuario (Login/Registro)
app.get('/login', (_, res) => res.render('login', { error: null }));
app.post('/login', usuarioController.loginUsuario);
app.get('/register', (_, res) => res.render('register'));
app.post('/register', validateUserRegistration, usuarioController.registerUsuario); // Validación en registro

// Rutas de Pacientes
app.get('/paciente', authenticateToken, authorizeRole(['Paciente', 'Administrador']), pacienteController.obtener);
app.post('/paciente', authenticateToken, authorizeRole(['Administrador']), pacienteController.crear);
app.post('/paciente/:id/delete', authenticateToken, authorizeRole(['Administrador']), pacienteController.eliminar);
app.post('/paciente/:id/edit', authenticateToken, authorizeRole(['Paciente', 'Administrador']), pacienteController.actualizar);
app.get('/dashboardPaciente', authenticateToken, authorizeRole(['Paciente']), (req, res) => res.render('dashboardPaciente'));

// Rutas de Profesionales
app.get('/profesional', authenticateToken, authorizeRole(['Profesional', 'Administrador']), profesionalController.obtener);
app.post('/profesional', authenticateToken, authorizeRole(['Administrador']), profesionalController.crear);
app.post('/profesional/:id/delete', authenticateToken, authorizeRole(['Administrador']), profesionalController.eliminar);
app.post('/profesional/:id/edit', authenticateToken, authorizeRole(['Profesional', 'Administrador']), profesionalController.actualizar);
app.get('/profesional/dashboard', authenticateToken, authorizeRole(['Profesional']), profesionalController.dashboard);

// Rutas de Citas
app.post('/citas', authenticateToken, authorizeRole(['Paciente']), validateCita, citasController.crear); // Validación de citas
app.get('/paciente/:id/citas', authenticateToken, authorizeRole(['Paciente', 'Profesional']), citasController.obtener);
app.post('/citas/:id/delete', authenticateToken, authorizeRole(['Paciente', 'Profesional']), citasController.eliminar);
app.post('/citas/:id/edit', authenticateToken, authorizeRole(['Paciente', 'Profesional']), validateCita, citasController.actualizar);

// Rutas de Historial Clínico
app.get('/historial/:paciente_id', authenticateToken, authorizeRole(['Profesional', 'Administrador']), historialClinicoController.obtener);
app.post('/historial', authenticateToken, authorizeRole(['Profesional', 'Administrador']), historialClinicoController.agregar);
app.post('/historial/:id/delete', authenticateToken, authorizeRole(['Administrador']), historialClinicoController.eliminar);

// Rutas de Autoevaluación
app.get('/autoevaluacion', authenticateToken, authorizeRole(['Paciente']), autoevaluacionController.mostrarFormulario);
app.post('/autoevaluacion', authenticateToken, authorizeRole(['Paciente']), autoevaluacionController.procesarFormulario);

// Ruta principal
app.get('/', (_, res) => res.redirect('/login'));

// Manejo de errores
app.use(errorHandler);

// Inicialización del servidor en puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
