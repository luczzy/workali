import express from "express";
import { registrarUsuario, loginUsuario } from "../Controllers/authController.js";
import { verificarToken } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// rota de cadastro
router.post("/register", registrarUsuario);

// rota de login
router.post("/login", loginUsuario);

// rota protegida 
router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensagem: "Acesso autorizado 🔒",
    usuario: req.user, 
  });
});

export default router;
