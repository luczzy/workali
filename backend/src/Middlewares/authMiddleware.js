import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ erro: "Acesso negado. Token ausente ou inválido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // salva os dados do usuário no request
    next();
  } catch (erro) {
    res.status(400).json({ erro: "Token inválido ou expirado." });
  }
};
