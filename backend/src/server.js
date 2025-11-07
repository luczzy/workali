import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import cors from 'cors';
import { connectDB } from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js"; 

// conecta ao MongoDB
connectDB();

const app = express();

app.use(cors());

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
