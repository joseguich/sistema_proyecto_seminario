import { check, validationResult } from "express-validator";
import { categorias } from "../model/consult.js";
import { Usuario, Tickets, TicketHistory } from "../model/index.js";

const catalogoHome = (req, res) => {
  console.log(req.user.nombre);
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

  if (usuario.rol !== "estandar") {
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

  let new_id = ticket.id;

  const hticket = await TicketHistory.create({
    id_ticket:new_id,
    id_user_creador: req.user.nombre,
    id_user_asignado: "sin asignar",
  })

  ticket.save();

  res.render("template/mensaje", {
    pagina: "Creación de Ticket",
    mensaje: "Ticket creado correctamente",
    exit: true,
  });
};

export { catalogoHome, crearTicket, registrarTicket };
