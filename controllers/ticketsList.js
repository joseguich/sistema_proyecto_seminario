import { tickets } from "../model/consult.js";
import { Usuario, Tickets, TicketHistory } from "../model/index.js";

const ticketsList = (req, res) => {
  res.render("catalogo/ticketslist", {
    pagina: "Lista de Tickets",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
    tickets,
  });
};

const workTickets = (req, res)=>{
    res.render("catalogo/worktickets", {
        pagina: "Trabajar Tickets",
        csrfToken: req.csrfToken(),
        user: req.user.nombre,
        barra: true,
      });

      
}

const buscarTicket = async (req, res)=>{

  res.render("catalogo/buscarTicket", {
    pagina: "Buscar Ticket",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
    ticket: ticket,
  });
}

const buscarTicketID = async (req, res)=>{
  const id = req.query.ticketId;

  const ticket = await Tickets.findOne({where: {id}});

  res.render("catalogo/buscarTicket", {
    pagina: "Buscar Ticket",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
    ticket: ticket,
  });
}

const detalleTicket = (req, res) => {
  
}

export {ticketsList, workTickets, buscarTicketID, buscarTicket, detalleTicket};