import express from "express";
import {
  catalogoHome,
  crearTicket,
  registrarTicket,
  asignarTicket

} from "../controllers/catalogoIncidentesControllers.js";
import { ticketsList, workTickets, detalleTicket, buscarTicket, buscarTicketID } from "../controllers/ticketsList.js"
import authenticateUser from "../middleware/authMiddleware.js";

const router = express();

router.get("/catalogo", authenticateUser, catalogoHome);
router.get("/catalogo/crear-ticket", authenticateUser, crearTicket);
router.post("/catalogo/crear-ticket", authenticateUser, registrarTicket);
router.get("/catalogo/tickets-list", authenticateUser, ticketsList);
router.get("/catalogo/work-ticket", authenticateUser, workTickets);
router.get("/catalogo/detalle-ticket", authenticateUser, detalleTicket);
router.get("/catalogo/buscar-ticket", authenticateUser, buscarTicket);
router.get("/catalogo/buscar-ticketID", authenticateUser, buscarTicketID);

router.get('/catalogo/asignar-ticket', authenticateUser, asignarTicket);


export default router;
