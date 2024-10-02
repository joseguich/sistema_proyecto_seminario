import { tickets } from "../model/consult.js";

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

export {ticketsList, workTickets};