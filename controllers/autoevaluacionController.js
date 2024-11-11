const Autoevaluacion = require('../models/autoevaluacionModel');

exports.mostrarFormulario = (req, res) => {
    res.render('autoevaluacion', { preguntas: obtenerPreguntas() });
};

exports.procesarFormulario = async (req, res) => {
    const respuestas = req.body.respuestas.map(Number);
    const resultado = calcularResultado(respuestas);

    const nuevaAutoevaluacion = new Autoevaluacion({
        pacienteId: req.user._id,
        respuestas: respuestas,
        resultado: resultado
    });

    await nuevaAutoevaluacion.save();

    res.render('resultadoAutoevaluacion', { resultado });
};

function obtenerPreguntas() {
    return [
        "¿Alguna vez has perdido tiempo de trabajo o escuela debido al juego?",
        "¿El juego ha hecho que tu vida en el hogar sea infeliz?",
        "¿El juego ha afectado tu reputación?",
        "¿Alguna vez has sentido remordimiento después de jugar?",
        "¿Alguna vez has jugado para obtener dinero con el que pagar deudas o resolver dificultades financieras?",
        "¿El juego ha causado una disminución en tu ambición o eficiencia?",
        "Después de perder, ¿sientes que debes volver lo antes posible y recuperar tus pérdidas?",
        "Después de ganar, ¿tienes un fuerte impulso de volver y ganar más?",
        "¿A menudo juegas hasta que todo tu dinero se ha ido?",
        "¿Alguna vez has pedido prestado para financiar tu juego?",
        "¿Alguna vez has vendido algo para financiar el juego?",
        "¿Eres reacio a usar 'dinero de juego' para gastos normales?",
        "¿El juego te ha hecho descuidar el bienestar de ti mismo o de tu familia?",
        "¿Alguna vez has jugado más tiempo del que habías planeado?",
        "¿Alguna vez has jugado para escapar de preocupaciones, problemas, aburrimiento, soledad, tristeza o pérdida?",
        "¿Alguna vez has cometido, o considerado cometer, un acto ilegal para financiar el juego?",
        "¿El juego te ha causado dificultades para dormir?",
        "¿Las discusiones, decepciones o frustraciones crean en ti un impulso de jugar?",
        "¿Alguna vez has tenido un impulso de celebrar cualquier buena fortuna con unas horas de juego?",
        "¿Alguna vez has considerado la autodestrucción o el suicidio como resultado de tu juego?"
    ];
}

function calcularResultado(respuestas) {
    const totalPreguntas = respuestas.length;
    const respuestasPositivas = respuestas.filter(respuesta => respuesta === 1).length;
    return (respuestasPositivas / totalPreguntas) * 100;
}
