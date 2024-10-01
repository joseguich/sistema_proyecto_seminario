import express from "express";
import {
  aplicaciones,
  catalogoHome,
} from "../controllers/catalogoIncidentesControllers.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express();

router.get("/catalogo", authenticateUser, catalogoHome);
router.get("/catalogo/aplicaciones", authenticateUser, aplicaciones);

export default router;
