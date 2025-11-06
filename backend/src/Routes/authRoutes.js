import express from "express";
import { registrarUsuario, loginUsuario } from "../Controllers/authController.js";

const router = express.Router();

// rota de cadastro
router.post("/register", registrarUsuario);

// rota de login
router.post("/login", loginUsuario);

export default router;
