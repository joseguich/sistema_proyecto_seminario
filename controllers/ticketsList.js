// import { Usuario, Tickets, TicketHistory } from "../model/index.js";
import Tickets from "../model/Tickets.js";
import TicketHistory from "../model/TicketHistory.js";
import { check, validationResult } from "express-validator";

const ticketsList = async (req, res) => {
  let tickets;
  if (req.user.rol === "Administrador") {
    tickets = await Tickets.findAll();
  } else if (req.user.rol === "Estándar") {
    tickets = await Tickets.findAll({
      where: { usuarioId: req.user.id },
    });
  } else {
    tickets = await Tickets.findAll({
      where: { id_user_asignado: req.user.nombre },
    });
  }

  res.render("catalogo/ticketslist", {
    pagina: "Lista de Tickets",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
    tickets,
  });
};

const workTickets = async (req, res) => {
  if (req.user.rol === "Estándar") {
    return res.render("catalogo/home", {
      pagina: "Catalogo Incidentes",
      mensaje:
        "No tienes permisos para acceder a esta opción de trabajar tickets",
      user: req.user.nombre,
      barra: true,
      alerta: true,
    });
  }
  let tickets;
  if (req.user.rol === "Administrador") {
    tickets = await Tickets.findAll();
  } else {
    tickets = await Tickets.findAll({
      where: { id_user_asignado: req.user.nombre },
    });
  }
  res.render("catalogo/worktickets", {
    pagina: "Trabajar Tickets",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
    tickets,
  });
};

const buscarTicket = async (req, res) => {
  console.log(req.user);
  if (req.user.rol !== "Administrador") {
    return res.render("catalogo/home", {
      pagina: "Catalogo Incidentes",
      mensaje: "No tienes permisos para acceder a esta opción de buscar ticket",
      user: req.user.nombre,
      csrfToken: req.csrfToken(),
      barra: true,
      alerta: true,
    });
  }
  res.render("catalogo/buscarTicket", {
    pagina: "Buscar Ticket",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
  });
};

const buscarTicketID = async (req, res) => {
  const id = req.query.ticketId;

  await check("ticketId")
    .trim()
    .notEmpty()
    .withMessage("Campo a buscar es oblicatogio inserte el ID del ticket")
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("catalogo/buscarTicket", {
      pagina: "Buscar Ticket",
      csrfToken: req.csrfToken(),
      user: req.user.nombre,
      barra: true,
      errores: resultado.array(),
    });
  }

  const ticket = await Tickets.findOne({ where: { id } });

  if (!ticket) {
    return res.render("catalogo/buscarTicket", {
      pagina: "Buscar Ticket",
      csrfToken: req.csrfToken(),
      user: req.user.nombre,
      barra: true,
      errores: [{ msg: "El ID de ticket no es valido " }],
    });
  }

  res.render("catalogo/buscarTicket", {
    pagina: "Buscar Ticket",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
    ticket,
  });
};

const ticketHistories = async (req, res) => {
  console.log(req.user.nombre);
  const ticket = await TicketHistory.findAll({
    where: { id_user_asignado: req.user.nombre },
  });
  console.log(ticket.id);

  res.render("catalogo/ticket-histories", {
    pagina: "Historial Ticket",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
  });
};

export {
  ticketsList,
  workTickets,
  buscarTicketID,
  buscarTicket,
  ticketHistories,
};
