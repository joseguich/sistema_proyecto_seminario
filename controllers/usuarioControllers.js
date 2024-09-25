import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Usuario from "../model/Usuario.js";
import { Op } from "sequelize";
import { generarToken, rememberToken } from "../helper/token.js";
import { emailRecuperacion, emailRegistrar } from "../helper/mailtrap.js";

const login = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesión",
    csrfToken: req.csrfToken(),
  });
};

const authUser = async (req, res) => {
  const { identificador, password, remember } = req.body;
  await check("identificador")
    .notEmpty()
    .withMessage("Campo Email es obligatorio")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("Contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("Contraseña minima 8 caracteres")
    .run(req);

  const resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesión",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      usuario: {
        identificador,
      },
    });
  }

  const usuario = await Usuario.findOne({
    where: {
      [Op.or]: [{ email: identificador }, { nombre_usuario: identificador }],
    },
  });
  if (!usuario) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesión",
      errores: [{ msg: "Usuario no valido o Email no valido" }],
      csrfToken: req.csrfToken(),
      usuario: {
        identificador,
      },
    });
  }

  if (!usuario.confirmacion) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesión",
      errores: [{ msg: "Usuario no esta confirmado o no existe" }],
      csrfToken: req.csrfToken(),
      usuario: {
        identificador,
      },
    });
  }
  //Verificar si el passowrd son iguales
  const verificarPassword = bcrypt.compareSync(password, usuario.password);

  if (!verificarPassword) {
    return res.render("auth/login", {
      pagina: "Iniciar Sesión",
      errores: [{ msg: "Contraseña incorrecta" }],
      csrfToken: req.csrfToken(),
      usuario: {
        identificador,
      },
    });
  }

  // Remember token
  let expiresIn = "1d";

  // Validar que el recordarme este seleccioando
  if (remember) {
    const tokenRemember = rememberToken(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      remember,
      (expiresIn = "4d")
    );

    //Hash the token
    const salt = await bcrypt.genSalt(10);
    const hashRemember = await bcrypt.hashSync(tokenRemember, salt);

    // Almacenar el token hash en la base de datos
    await usuario.update(
      { remember: hashRemember },
      { where: { id: usuario.id } }
    );

    // Enviar el token no hash en la cookie del navegador
    res.cookie("_auth_token", tokenRemember, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } else {
    const tokenTemporar = rememberToken(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      remember,
      expiresIn
    );

    // NO Enviar token a la base de datos si el recordatodio no esta seleccioando
    await usuario.update({ remember: null }, { where: { id: usuario.id } });

    res.cookie("_auth_token", tokenTemporar, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  }
  res.redirect("/catalogo");
};

const registrar = (req, res) => {
  res.render("auth/registrar", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(),
  });
};

const registrarCuenta = async (req, res) => {
  const { nombre, nombre_usuario, email, rol, password } = req.body;
  //Validar
  await check("nombre")
    .notEmpty()
    .withMessage("Nombre es obligatorio")
    .run(req);
  await check("nombre_usuario")
    .notEmpty()
    .withMessage("Usuario es obligatorio")
    .run(req);
  await check("email").isEmail().withMessage("Email es obligatorio").run(req);
  await check("password")
    .isLength({ min: 8 })
    .withMessage("Contraseña minimo 8 caracteres")
    .run(req);
  await check("confirmar_password")
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
        nombre_usuario,
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
      csrfToken: req.csrfToken(),
      usuario: {
        nombre,
        nombre_usuario,
        email,
      },
    });
  }

  //Encritar constraseña
  const salt = await bcrypt.genSalt(10);
  const bcrpassword = await bcrypt.hash(password, salt);

  const usuarios = await Usuario.create({
    nombre,
    nombre_usuario,
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
    csrfToken: req.csrfToken(),
  });
};

const retablecerPassword = async (req, res) => {
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
    where: {
      [Op.or]: [{ email: identificador }, { nombre_usuario: identificador }],
    },
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

const logout = (req, res) => {
  res.clearCookie("_auth_token");
  res.clearCookie("_token");
  res.redirect("/auth/login");
};

export {
  login,
  authUser,
  registrar,
  registrarCuenta,
  confirmarCuenta,
  olvidarPassword,
  retablecerPassword,
  recuperarPassword,
  nuevaPassword,
  logout,
};
