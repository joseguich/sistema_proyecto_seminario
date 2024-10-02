import { check, validationResult } from "express-validator";
import { categorias } from "../model/consult.js";
import { Usuario, Tickets } from "../model/index.js";

const ticketsList = (req, res)=>{
    res.render("catalogo/ticketslist", {
        pagina: "Lista de Tickets",
        csrfToken: req.csrfToken(),
        user: req.user.nombre,
        barra: true,
      });
}

const workTickets = (req, res)=>{
    res.render("catalogo/worktickets", {
        pagina: "Trabajar Tickets",
        csrfToken: req.csrfToken(),
        user: req.user.nombre,
        barra: true,
      });
}

export {ticketsList, workTickets};