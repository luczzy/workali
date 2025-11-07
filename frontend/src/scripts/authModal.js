document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const inputEmail = document.getElementById("email");
  const modal = document.getElementById("login-modal");
  const closeModal = document.querySelector(".close-modal");
  const btnEntrar = document.querySelector(".btn-entrar");

  const API_URL = "http://localhost:5000/api/auth";

  // === Mostrar e fechar modal ===
  btnEntrar.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // === Envio do e-mail ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = inputEmail.value.trim();
    if (!email) return alert("Digite um e-mail válido!");

    try {
      // tenta login primeiro
      let resposta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // se usuário não existir, registra e faz login
      if (!resposta.ok) {
        // registra usuário
        const registro = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: "Usuário", email }),
        });

        const registroDados = await registro.json();
        if (!registro.ok && registroDados.erro) {
          return alert("❌ Erro ao registrar: " + registroDados.erro);
        }

        // tenta login novamente
        resposta = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      }

      const dados = await resposta.json();

      if (dados.token) {
        localStorage.setItem("token", dados.token);
        alert("🎉 Login realizado com sucesso!");
        modal.style.display = "none";
      } else {
        alert("❌ Erro: " + (dados.erro || "Tente novamente."));
      }
    } catch (erro) {
      console.error(erro);
      alert("Erro ao conectar com o servidor.");
    }
  });
});
