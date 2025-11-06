import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();

// conecta ao MongoDB
connectDB();

const app = express();

// middleware para JSON
app.use(express.json());

// rotas
app.use("/api/auth", authRoutes);

// rota de teste 
app.get("/", (req, res) => {
  res.send("Servidor e banco estão funcionando 🔥");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
