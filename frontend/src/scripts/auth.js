const API_URL = "http://localhost:5000/api/auth";

// === função de cadastro ===
async function cadastrarUsuario(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  try {
    const resposta = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert("✅ Cadastro realizado com sucesso!");
      window.location.href = "./login.html";
    } else {
      alert(`❌ Erro: ${dados.erro}`);
    }
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    alert("Erro na conexão com o servidor.");
  }
}

// === função de login ===
async function fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  try {
    const resposta = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem("token", dados.token);
      alert("🎉 Login realizado com sucesso!");
      window.location.href = "./perfil.html";
    } else {
      alert(`❌ Erro: ${dados.erro}`);
    }
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
    alert("Erro na conexão com o servidor.");
  }
}
