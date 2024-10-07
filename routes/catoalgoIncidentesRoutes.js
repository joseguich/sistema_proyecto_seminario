import express from "express";
import {
  catalogoHome,
  crearTicket,
  registrarTicket,
} from "../controllers/catalogoIncidentesControllers.js";
import {
  ticketsList,
  workTickets,
  buscarTicket,
  buscarTicketID,
  ticketHistories,
} from "../controllers/ticketsList.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express();

router.get("/catalogo", authenticateUser, catalogoHome);
router.get("/catalogo/crear-ticket", authenticateUser, crearTicket);
router.post("/catalogo/crear-ticket", authenticateUser, registrarTicket);
router.get("/catalogo/tickets-list", authenticateUser, ticketsList);
router.get("/catalogo/work-ticket", authenticateUser, workTickets);
// router.get("/catalogo/detalle-ticket", authenticateUser, detalleTicket);
router.get("/catalogo/buscar-ticket", authenticateUser, buscarTicket);
router.get("/catalogo/buscar-ticketID", authenticateUser, buscarTicketID);
router.get("/catalogo/ticket-histories", authenticateUser, ticketHistories);

export default router;
