const API_URL = "http://localhost:5000/api/auth";

export async function login(email) {
  const resposta = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return resposta.json();
}

export async function register(nome, email) {
  const resposta = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email }),
  });
  return resposta.json();
}

export async function loginOuRegistrar(email) {
  let dados = await login(email);
  if (!dados.token) {
    await register("Usuário", email);
    dados = await login(email);
  }
  return dados;
}
