import express from "express";
import {
  login,
  authUser,
  registrar,
  registrarCuenta,
  confirmarCuenta,
  olvidarPassword,
  retablecerPassword,
  recuperarPassword,
  nuevaPassword,
} from "../controllers/usuarioControllers.js";

const router = express();

router.get("/login", login);
router.post("/login", authUser);

router.get("/registrar", registrar);
router.post("/registrar", registrarCuenta);
router.get("/confirmar-cuenta/:token", confirmarCuenta);

router.get("/olvidar-password", olvidarPassword);
router.post("/olvidar-password", retablecerPassword);

router.get("/olvidar-password/:token", recuperarPassword);

router.post("/olvidar-password/:token", nuevaPassword);

export default router;
