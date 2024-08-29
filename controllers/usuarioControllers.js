import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../model/Usuario.js";
import { where } from "sequelize";
import { generarToken } from "../helper/token.js";
import { emailRegistrar } from "../helper/mailtrap.js";

const login = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesión",
  });
};

const registrar = (req, res) => {
  res.render("auth/registrar", {
    pagina: "Crear Cuenta",
  });

  console.log(generarToken());
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

  const resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.render("auth/registrar", {
      pagina: "Crear Cuenta",
      errores: resultado.array(),
    });
  }

  // Validar si el Email existe.
  const usuario = await Usuario.findOne({ where: { email } });

  if (usuario) {
    return res.render("auth/registrar", {
      pagina: "Crear Cuenta",
      errores: [{ msg: "Usuario ya existe" }],
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
  });
};

export { login, registrar, registrarCuenta, confirmarCuenta, olvidarPassword };
