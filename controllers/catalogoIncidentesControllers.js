import { check, validationResult } from "express-validator";
import { categorias } from "../queries/consult.js";
import {
  Usuario,
  Tickets,
  TicketHistory,
  Rols,
  Categoria,
} from "../model/index.js";
import { where } from "sequelize";

const catalogoHome = (req, res) => {
  res.render("catalogo/home", {
    pagina: "Catalogo Incidentes",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
  });
};

const crearTicket = async (req, res) => {
  res.render("catalogo/crear-ticket", {
    pagina: "Crear Nuevo Ticket",
    user: req.user.nombre,
    csrfToken: req.csrfToken(),
    barra: true,
    categorias,
  });
};

const registrarTicket = async (req, res) => {
  const { categoria, email, asunto, ip, detalle, imagen } = req.body;
  //Validar
  await check("categoria")
    .isNumeric()
    .withMessage("Selecionar la categoria del problema ")
    .run(req);
  await check("email").isEmail().withMessage("Email es obligatorio").run(req);
  await check("asunto")
    .notEmpty()
    .withMessage("Campo Asunto es obligatoio")
    .isLength({ max: 100 })
    .withMessage("Asunto muy largo")
    .run(req);
  await check("ip").notEmpty().withMessage("IP es obligatorio").run(req);
  await check("detalle")
    .notEmpty()
    .withMessage("Campo Detalle Ticket es obligatorio")
    .isLength({ max: 500 })
    .withMessage("Detalle Ticket muy largo")
    .run(req);

  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.render("catalogo/crear-ticket", {
      pagina: "Crear Nuevo Ticket",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      barra: true,
      categorias,
      user: req.user.nombre,
      ticket: {
        categoria: parseInt(categoria),
        email,
        asunto,
        ip,
        detalle,
      },
    });
  }

  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.render("catalogo/crear-ticket", {
      pagina: "Crear Nuevo Ticket",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "Email del usuario no es valido" }],
      barra: true,
      categorias,
      user: req.user.nombre,
      ticket: {
        categoria: parseInt(categoria),
        email,
        asunto,
        ip,
        detalle,
      },
    });
  }

  if (usuario.rol !== "Estándar") {
    return res.render("catalogo/crear-ticket", {
      pagina: "Crear Nuevo Ticket",
      csrfToken: req.csrfToken(),
      categorias,
      barra: true,
      errores: [
        {
          msg: "Correo para la creación de tickets solo puede ser de un usuario de tipo Estandar",
        },
      ],
      user: req.user.nombre,
      ticket: {
        categoria: parseInt(categoria),
        email,
        asunto,
        ip,
        detalle,
      },
    });
  }

  const ticket = await Tickets.create({
    email,
    asunto,
    ip,
    detalle_ticket: detalle,
    usuarioId: usuario.id,
    categoriaId: parseInt(categoria),
    imagen,
  });

  // Selecionamos la columna especifica con attributes
  const rolUsuario = await Rols.findAll({ attributes: ["nombre"] });
  const rolesDisponibles = rolUsuario
    .map((rol) => rol.nombre)
    .filter((nombre) => nombre !== "Estándar")
    .filter((nombre) => nombre !== "Administrador");

  // Buscar la categoria selecionada por id
  const seleccionarCategorias = await Categoria.findOne({
    where: { id: categoria },
  });

  //Obtener los datos de las categorias
  const catgoriasSeleccionada = {
    Dispositivos: rolesDisponibles[0],
    Impresoras: rolesDisponibles[1],
  };

  let rolAsignado = "Soport General"

  // Obtener los datos de las categorias 
  for (const [claveCategoria, rol] of Object.entries(catgoriasSeleccionada)) {
    //startsWith: compara si la cadena comienza con el texto especificado
    if (seleccionarCategorias.nombre.startsWith(claveCategoria)) {
      rolAsignado = rol
      break;
    }
  }

  ticket.rol = rolAsignado;
  await ticket.save();

  await TicketHistory.create({
    id_ticket: ticket.id,
    id_user_creador: req.user.nombre_usuario,
    id_user_asignado: "sin asignar",
  });

  res.render("template/mensaje", {
    pagina: "Creación de Ticket",
    mensaje: "Ticket creado correctamente",
    exit: true,
  });
};

export { catalogoHome, crearTicket, registrarTicket };
