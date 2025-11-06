document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-login");
  const inputEmail = document.querySelector(".input-email");
  const modal = document.getElementById("login-modal");
  const closeModal = document.querySelector(".close-modal");
  const btnEntrar = document.querySelector(".btn-entrar");

  // === Mostrar e fechar modal ===
  btnEntrar.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // === Envio do e-mail para login ou registro ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = inputEmail.value.trim();

    if (!email) return alert("Digite um e-mail válido!");

    try {
      // 1. Tenta login
      let resposta = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: "123456" }), // senha padrão temporária
      });

      // 2. Se falhar, tenta cadastro
      if (!resposta.ok) {
        await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha: "123456" }),
        });

        resposta = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha: "123456" }),
        });
      }

      const dados = await resposta.json();

      if (dados.token) {
        localStorage.setItem("token", dados.token);
        alert("Login realizado com sucesso!");
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
