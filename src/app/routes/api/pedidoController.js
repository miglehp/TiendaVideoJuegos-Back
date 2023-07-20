const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tu_correo_electronico@gmail.com',
    pass: 'tu_contraseña'
  }
});


function sendEmail(destinatario, estado){
    const mailOptions = {
        from: 'spotiGame0523@gmail.com',
        to: destinatario,
        subject: 'Notificación de cambio de estado del pedido',
        text: `Hola!! El estado de tu pedido ha sido actualizado a: ${estado}.`
    };

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error al enviar el correo electrónico:', error);     
    } else{
        console.log('Correo electrónico enviado:', info.response);
    }
});
}

exports.actualizarEstadoPedido = (req, res) => {
  const pedidoId = req.params.id;
  const nuevoEstado = req.body.estado;
  // Aquí iría la lógica para actualizar el estado del pedido en la base de datos
  // ...

  // Después de actualizar el estado, obtenemos el correo electrónico del usuario asociado al pedido
  const destinatario = 'usuario@example.com'; // Cambia esto por el correo del usuario del pedido
  sendEmail(destinatario, nuevoEstado);

  res.json({ mensaje: 'Estado del pedido actualizado correctamente.' });
};