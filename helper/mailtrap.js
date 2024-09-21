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
      <a href="http:/localhost:3000/auth/confirmar-cuenta/${token}">Confirmar Cuenta</a>
    `,
  });
};
const emailRecuperacion = async (datos) => {
  const { nombre, email, token } = datos;
  await transport.sendMail({
    from: "GesTick.com",
    to: email,
    subject: "Retablecer tu Contraseña de GesTick",
    text: "Retablecer tu Contraseña de GesTick",
    html: `
      <p>Hola ${nombre}, Comprueba tu cuenta en GesTick</p>
      <p>Se olvido tu contraseña, solo debe confirmar en el siguiente enlace</p>
      <a href="">Cambiar Contraseña</a>
    `,
  });
};

export { emailRegistrar, emailRecuperacion };
