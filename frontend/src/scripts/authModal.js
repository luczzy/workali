document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const inputEmail = document.querySelector(".input-email");
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
      // 1tenta login
      let resposta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // se não existir, cadastra e depois faz login
      if (!resposta.ok) {
        await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: email.split("@")[0], email }),
        });

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
        alert("Erro: " + (dados.mensagem || "Tente novamente."));
      }
    } catch (erro) {
      console.error(erro);
      alert("Erro ao conectar com o servidor.");
    }
  });
});
