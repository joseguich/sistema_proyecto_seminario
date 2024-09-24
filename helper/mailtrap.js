import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b71e6aab0e5400",
    pass: "3b3904d11f00e1",
  },
});

const emailRegistrar = async (datos) => {
  const { nombre, email, token } = datos;
  await transport.sendMail({
    from: "GesTick.com",
    to: email,
    subject: "Confirmar tu cuenta de GesTick",
    text: "Confirmar tu cuenta de GesTick",
    html: `
      <p>Hola ${nombre}, Comprueba tu cuenta en GesTick</p>
      <p>Tu cuenta ya esta lista solo debe confimar en el siguiente enlace</p>
      <a href="http://localhost:3000/auth/confirmar-cuenta/${token}">Confirmar Cuenta</a>
    `,
  });
};
const emailRecuperacion = async (datos) => {
  const { nombre, email, token } = datos;
  await transport.sendMail({
    from: "BienesRaices.com <no-reply@bienesraices.com",
    to: email,
    subject: "Solicutaste Retablecer tu contraseña BienesRaices.com",
    text: "Solicutaste Retablecer tu contraseña BienesRaices.com",
    html: `
          <div style="max-width: 448px; margin: 0 auto; backgronud-color: rgb(243 244 246); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); text-align: left;">
            <h2>Restablecimiento de contraseña de BienesRaices</h2>
            <p>Hola, ${nombre} nos enteramos de que perdiste tu contraseña de BienesRaices. ¡Lo sentimos!</p>

            <p>Pero no te preocupes, puedes utilizar el siguiente botón para restablecer tu contraseña:</p>
            <a href="${process.env.BACKEND_URL}:${
      process.env.PORTSERVER ?? 4000
    }/auth/olvidaste-password/${token}" style="background-color: rgb(67 56 202); display:block; padding:10px; text-decoration: none; border-radius: 5px; color:#fff; width:45%; margin:0 auto; text-align: center; " >Restablecer tu contraseña</a>

            <p>Si no hiciste la solicitud de restablecer contraseña, puedes ignorar el mensaje</p>
        </div>
      `,
  });
};

export { emailRegistrar, emailRecuperacion };
