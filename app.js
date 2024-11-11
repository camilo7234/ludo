const express = require('express');
const dotenv = require('dotenv');
const pool = require('./models/db_connection');  // Importar la conexión a la base de datos
const app = express();

// Configuración de variables de entorno
dotenv.config();

// Importar controladores
const usuarioController = require('./controllers/usuarioController');
const pacienteController = require('./controllers/pacienteController');
const profesionalController = require('./controllers/profesionalController');
const citasController = require('./controllers/citasController');
const historialClinicoController = require('./controllers/historialClinicoController');
const autoevaluacionController = require('./controllers/autoevaluacionController');

// Configuración de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.use(express.static('public'));  // Asegúrate de que esta línea esté presente para servir archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas de Usuario (Login/Registro)
app.get('/login', (_, res) => res.render('login', { error: null }));
app.post('/login', usuarioController.loginUsuario);
app.get('/register', (_, res) => res.render('register'));
app.post('/register', usuarioController.registerUsuario);

// Rutas de Pacientes
app.get('/paciente', pacienteController.obtener);
app.post('/paciente', pacienteController.crear);
app.post('/paciente/:id/delete', pacienteController.eliminar);
app.post('/paciente/:id/edit', pacienteController.actualizar);
app.get('/dashboardPaciente', (req, res) => res.render('dashboardPaciente'));

// Rutas de Profesionales
app.get('/profesional', profesionalController.obtener);
app.post('/profesional', profesionalController.crear);
app.post('/profesional/:id/delete', profesionalController.eliminar);
app.post('/profesional/:id/edit', profesionalController.actualizar);
app.get('/profesional/dashboard', profesionalController.dashboard);

// Rutas de Citas
app.post('/citas', citasController.crear);
app.get('/paciente/:id/citas', citasController.obtener);
app.post('/citas/:id/delete', citasController.eliminar);
app.post('/citas/:id/edit', citasController.actualizar);

// Rutas de Historial Clínico
app.get('/historial/:paciente_id', historialClinicoController.obtener);
app.post('/historial', historialClinicoController.agregar);
app.post('/historial/:id/delete', historialClinicoController.eliminar);

// Rutas de Autoevaluación
app.get('/autoevaluacion', autoevaluacionController.mostrarFormulario);
app.post('/autoevaluacion', autoevaluacionController.procesarFormulario);

// Ruta principal
app.get('/', (_, res) => res.redirect('/login'));

// Inicialización del servidor en puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
