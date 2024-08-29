import express from "express";
import {
  login,
  registrar,
  registrarCuenta,
  olvidarPassword,
  confirmarCuenta,
} from "../controllers/usuarioControllers.js";

const router = express();

router.get("/login", login);
router.get("/registrar", registrar);
router.post("/registrar", registrarCuenta);
router.get("/confirmar-cuenta/:token", confirmarCuenta);
router.get("/olvidar-password", olvidarPassword);

export default router;
