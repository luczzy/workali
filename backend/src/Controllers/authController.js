import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// cadastrar novo usuário
export const registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // verifica se o usuário já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Este e-mail já está cadastrado." });
    }

    // criptografa a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
      nome,
      email,
      senha: senhaCriptografada,
    });

    await novoUsuario.save();
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao cadastrar usuário.", detalhes: erro.message });
  }
};

// fazer login
export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não encontrado." });
    }

    // compara a senha digitada com a criptografada
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta." });
    }

    // gera token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ mensagem: "Login realizado com sucesso!", token });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao realizar login.", detalhes: erro.message });
  }
};
