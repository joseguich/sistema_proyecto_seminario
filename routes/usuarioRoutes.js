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
  logout,
} from "../controllers/usuarioControllers.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express();

router.get("/login", login);
router.post("/login", authUser);

router.get("/registrar", authenticateUser, registrar);
router.post("/registrar", authenticateUser, registrarCuenta);
router.get("/confirmar-cuenta/:token", authenticateUser, confirmarCuenta);

router.get("/olvidar-password", olvidarPassword);
router.post("/olvidar-password", retablecerPassword);

router.get("/olvidar-password/:token", recuperarPassword);

router.post("/olvidar-password/:token", nuevaPassword);

router.get("/logout", logout);

export default router;
