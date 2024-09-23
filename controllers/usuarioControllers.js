import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../model/Usuario.js";
import { Op, where } from "sequelize";
import { generarToken } from "../helper/token.js";
import { emailRecuperacion, emailRegistrar } from "../helper/mailtrap.js";

const login = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesión",
  });
};

const registrar = (req, res) => {
  res.render("auth/registrar", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(),
  });
};

const registrarCuenta = async (req, res) => {
  const { nombre, email, rol, password } = req.body;
  //Validar
  await check("nombre")
    .notEmpty()
    .withMessage("Nombre es obligatorio")
    .run(req);
  await check("email").isEmail().withMessage("Email es obligatorio").run(req);
  await check("password")
    .isLength({ min: 8 })
    .withMessage("Contraseña minimo 8 caracteres")
    .run(req);
  await check("confirm_password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Contraseña no son iguales")
    .run(req);
  await check("rol").notEmpty().withMessage("Rol es obligatorio").run(req);

  const resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.render("auth/registrar", {
      pagina: "Crear Cuenta",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      usuario: {
        nombre,
        email,
        rol,
      },
    });
  }

  // Validar si el Email existe.
  const usuario = await Usuario.findOne({ where: { email } });

  if (usuario) {
    return res.render("auth/registrar", {
      pagina: "Crear Cuenta",
      errores: [{ msg: "Usuario ya existe" }],
      usuario: {
        nombre,
        email,
      },
    });
  }

  //Encritar constraseña
  const salt = await bcrypt.genSalt(10);
  const bcrpassword = await bcrypt.hash(password, salt);

  const usuarios = await Usuario.create({
    nombre,
    email,
    password: bcrpassword,
    rol,
    token: generarToken(),
  });

  emailRegistrar({
    nombre: usuarios.nombre,
    email: usuarios.email,
    token: usuarios.token,
  });

  res.render("template/mensaje", {
    pagina: "Cuenta creada",
    mensaje: "Cuenta fue creada correctamente, solo seria confirmarla",
  });
};

const confirmarCuenta = async (req, res) => {
  const { token } = req.params;
  console.log(token);

  //Validar si existe
  const usuario = await Usuario.findOne({ where: { token } });
  console.log(usuario);
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Confirmación de Cuenta",
      mensaje:
        "Hubo un error al confirmar la cuenta, codigo de token no valido",
      error: true,
    });
  }

  usuario.token = null;
  usuario.confirmacion = true;
  usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Confirmación de Cuenta",
    mensaje: "Cuenta confirmada correctamente",
  });
};

const olvidarPassword = (req, res) => {
  res.render("auth/olvidar-password", {
    pagina: "Recuperar Contraseña",
    csrfToken: req.csrfToken(),
  });
};

const retablecerPassword = async (req, res) => {
  console.log(req.body);
  const { identificador } = req.body;

  await check("identificador")
    .notEmpty()
    .withMessage("Nombre o Email son obligatorio")
    .run(req);

  const resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("auth/olvidar-password", {
      pagina: "Recuperar Contraseña",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      usuario: {
        identificador,
      },
    });
  }

  //Validar si el usurio o email existen.
  const usuario = await Usuario.findOne({
    where: { [Op.or]: [{ email: identificador }, { nombre: identificador }] },
  });

  if (!usuario) {
    return res.render("auth/olvidar-password", {
      pagina: "Recuperar Contraseña",
      errores: [{ msg: "Usuario o Email no existe" }],
      csrfToken: req.csrfToken(),
      usuario: {
        identificador,
      },
    });
  }

  //Generar el nuevo token
  usuario.token = generarToken();
  await usuario.save();

  //Enviar email
  emailRecuperacion({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  res.render("template/mensaje", {
    pagina: "Recuperar Contraseña",
    mensaje:
      "Se envio un correo con las instrucciones de retablecer tu contraseña",
  });
};

const recuperarPassword = async (req, res) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({ where: { token } });
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error de Recuperación de Contraseña",
      mensaje: "Hubo un error al recuperar la contraseña, token no valido",
      error: true,
    });
  }

  res.render("auth/nuevo-password", {
    pagina: "Nueva contraseña",
    csrfToken: req.csrfToken(),
  });
};

const nuevaPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  await check("password")
    .notEmpty()
    .withMessage("Contraseña no puede estar vacia")
    .isLength({ min: 8 })
    .withMessage("Contraseña no puede ser menor a 8 caracteres")
    .run(req);

  await check("confirmar_password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Contraseña no coincide")
    .run(req);

  const resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.render("auth/nuevo-password", {
      pagina: "Nueva contraseña",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
    });
  }

  //Confirmar que es el usuario actual
  const usuario = await Usuario.findOne({ where: { token } });

  //Hash nuevo password
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  usuario.token = null;

  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Retablecimiento de Contraseña",
    mensaje: "Tu contraseña ha sido retablecida correctamente",
    error: false,
  });
};

export {
  login,
  registrar,
  registrarCuenta,
  confirmarCuenta,
  olvidarPassword,
  retablecerPassword,
  recuperarPassword,
  nuevaPassword,
};
