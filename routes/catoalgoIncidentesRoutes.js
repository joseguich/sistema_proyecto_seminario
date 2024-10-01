import express from "express";
import {
  catalogoHome,
  crearTicket,
  registrarTicket,
} from "../controllers/catalogoIncidentesControllers.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express();

router.get("/catalogo", authenticateUser, catalogoHome);
router.get("/catalogo/crear-ticket", authenticateUser, crearTicket);

router.post("/catalogo/crear-ticket", authenticateUser, registrarTicket);

export default router;
