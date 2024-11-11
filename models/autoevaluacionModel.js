const mongoose = require('mongoose');

const autoevaluacionSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
    respuestas: [{ type: Number, required: true }],
    resultado: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Autoevaluacion', autoevaluacionSchema);
