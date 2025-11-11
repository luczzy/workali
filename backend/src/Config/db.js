import mongoose from "mongoose";

// mapeamento simples dos estados do mongoose
const STATE_TEXT = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

const setupConnectionListeners = () => {
  mongoose.connection.on("connected", () => {
    console.log("✅ Mongoose conectado ao MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ Erro na conexão do Mongoose:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Mongoose desconectado. Tentando reconectar...");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🔁 Mongoose reconectado ao MongoDB");
  });
};

/**
 * tenta conectar ao MongoDB com tentativas (retry) e backoff exponencial
 * @param {number} maxAttempts
 * @param {number} initialDelayMs
 */
export const connectDB = async (maxAttempts = 5, initialDelayMs = 1000) => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error(
      "❌ MONGO_URI não definido. Verifique o arquivo .env e o carregamento das variáveis de ambiente."
    );
    process.exit(1);
  }

  setupConnectionListeners();

  let attempt = 0;
  let delay = initialDelayMs;

  while (attempt < maxAttempts) {
    try {
      attempt += 1;
      console.log(`➡️ Tentativa ${attempt} de conexão ao MongoDB...`);

      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log("✅ Conectado ao MongoDB com sucesso!");
      return;
    } catch (error) {
      console.error(
        `❌ Falha na tentativa ${attempt} ao conectar ao MongoDB:`,
        error.message || error
      );
      if (attempt >= maxAttempts) {
        console.error(
          `❌ Não foi possível conectar ao MongoDB após ${attempt} tentativas.`
        );

        process.exit(1);
      }

      console.log(`⏳ Aguardando ${delay}ms antes da próxima tentativa...`);

      await new Promise((res) => setTimeout(res, delay));
      delay *= 2; 
    }
  }
};

export const getMongooseState = () => {
  const state = mongoose.connection.readyState;
  return { code: state, text: STATE_TEXT[state] || "unknown" };
};
