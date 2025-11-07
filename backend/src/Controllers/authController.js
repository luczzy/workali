import User from "../Models/User.js";
import jwt from "jsonwebtoken";

// cadastrar novo usuário (email-only)
export const registrarUsuario = async (req, res) => {
  try {
    const { nome, email } = req.body;

    // verifica se o usuário já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Este e-mail já está cadastrado." });
    }

    const novoUsuario = new User({ nome, email });
    await novoUsuario.save();

    // gera token JWT
    const token = jwt.sign(
      { id: novoUsuario._id, email: novoUsuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({ token });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao cadastrar usuário.", detalhes: erro.message });
  }
};

// login por email-only
export const loginUsuario = async (req, res) => {
  try {
    const { email } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não encontrado." });
    }

    // gera token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ token });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao realizar login.", detalhes: erro.message });
  }
};
