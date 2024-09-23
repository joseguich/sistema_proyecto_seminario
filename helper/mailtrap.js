import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
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
      <a href="${process.env.URL_BACKEND}${
      process.env.PORT ?? 8080
    }/auth/confirmar-cuenta/${token}">Confirmar Cuenta</a>
     <p>Si no fue usted ignore este mensaje</p>
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
      <a href="${process.env.URL_BACKEND}${
      process.env.PORT ?? 8080
    }/auth/olvidar-password/${token}">Cambiar Contraseña</a>
    <p>Si no fue usted ignore este mensaje</p>
    `,
  });
};

export { emailRegistrar, emailRecuperacion };
