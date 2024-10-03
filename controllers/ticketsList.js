import { tickets } from "../model/consult.js";
import { Usuario, Tickets, TicketHistory } from "../model/index.js";
import { check, validationResult } from "express-validator";

const ticketsList = (req, res) => {
  res.render("catalogo/ticketslist", {
    pagina: "Lista de Tickets",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
    tickets,
  });
};

const workTickets = (req, res) => {
  res.render("catalogo/worktickets", {
    pagina: "Trabajar Tickets",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
  });
};

const buscarTicket = async (req, res) => {
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

const detalleTicket = (req, res) => {};

export {
  ticketsList,
  workTickets,
  buscarTicketID,
  buscarTicket,
  detalleTicket,
};
