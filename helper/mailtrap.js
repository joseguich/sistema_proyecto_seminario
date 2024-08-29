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
    from: "Micr🍎Tech.com",
    to: email,
    subject: "Confirmar tu cuenta de Micr🍎Tech",
    text: "Confirmar tu cuenta de Micr🍎Tech",
    html: `
      <p>Hola ${nombre}, Comprueba tu cuenta en Micr🍎Tech</p>
      <p>Tu cuenta ya esta lista solo debe confimar en el siguiente enlace</p>
      <a href="http:/localhost:3000/auth/confirmar-cuenta/${token}">Confirmar Cuenta</a>
    `,
  });
};

export { emailRegistrar };
