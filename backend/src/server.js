import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js"; 
import { getMongooseState } from "./Config/db.js";

// carrega .env relativo a este arquivo (evita depender do cwd ao iniciar o processo)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// conecta ao MongoDB
connectDB();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// middleware para JSON
app.use(express.json());

// rotas
app.use("/api/auth", authRoutes);

// rota health-check (útil para debug / orquestração)
app.get("/health", (req, res) => {
  try {
    const mongo = getMongooseState();
    res.json({
      status: "ok",
      mongo,
      env: {
        hasMongoUri: !!process.env.MONGO_URI,
        port: process.env.PORT || null,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// rota de teste 
app.get("/", (req, res) => {
  res.send("Servidor e banco estão funcionando 🔥");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
