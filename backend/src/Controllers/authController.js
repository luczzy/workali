import User from "../Models/User.js";
import jwt from "jsonwebtoken";

// === CADASTRAR NOVO USUÁRIO (apenas e-mail) ===
export const registrarUsuario = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ erro: "O e-mail é obrigatório." });
    }

    // Verifica se já existe
    let usuario = await User.findOne({ email });
    if (usuario) {
      return res.status(200).json({ mensagem: "Usuário já existe." });
    }

    // Cria novo usuário só com e-mail
    usuario = new User({ email });
    await usuario.save();

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar usuário.", detalhes: erro.message });
  }
};

// === LOGIN POR E-MAIL ===
export const loginUsuario = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ erro: "O e-mail é obrigatório." });
    }

    // Verifica se o usuário existe
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ mensagem: "Login realizado com sucesso!", token });
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
    res.status(500).json({ erro: "Erro ao realizar login.", detalhes: erro.message });
  }
};
