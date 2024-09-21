import express from "express";
import {
  aplicaciones,
  catalogoHome,
} from "../controllers/catalogoIncidentesControllers.js";

const router = express();

router.get("/catalogo", catalogoHome);
router.get("/catalogo/aplicaciones", aplicaciones);

export default router;
